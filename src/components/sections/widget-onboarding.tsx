"use client";

import { useState } from "react";
import { Container } from "../container";
import { Eyebrow } from "../eyebrow";
import { FORM_FIELDS, getDefaultValues, type WidgetFormValues } from "@/lib/config-schema";
import { generateEmbedKey } from "@/lib/widget-api";

interface WidgetOnboardingProps {
  onGenerated: (response: { embedKey: string; workspaceName: string; allowedDomain: string; environment: string; createdAt: string; adminPassword?: string }) => void;
}

export function WidgetOnboarding({ onGenerated }: WidgetOnboardingProps) {
  const [values, setValues] = useState<WidgetFormValues>(getDefaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    for (const field of FORM_FIELDS) {
      if (field.required && !values[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === "email" && values[field.name] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values[field.name])) {
        newErrors[field.name] = "Enter a valid email address";
      }
      if (field.type === "url" && values[field.name] && !/^https?:\/\/.+/.test(values[field.name])) {
        newErrors[field.name] = "Enter a valid URL starting with http:// or https://";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setGenerating(true);

    const response = await generateEmbedKey({
      workspaceName: values.workspaceName,
      slackChannelUrl: values.slackChannelUrl || undefined,
      notificationPreference: values.notificationPreference as "slack" | "email" | "webhook",
      teamEmail: values.teamEmail,
      allowedDomain: values.allowedDomain,
      environment: values.environment as "production" | "staging",
      mode: "customer",
    });

    setGenerating(false);

    if (response.success && response.data) {
      setGenerated(true);
      onGenerated({
        embedKey: response.data.embedKey,
        workspaceName: response.data.workspaceName,
        allowedDomain: response.data.allowedDomain,
        environment: response.data.environment,
        createdAt: response.data.createdAt,
        adminPassword: response.data.adminPassword,
      });
    } else {
      setErrors({ form: response.error ?? "Failed to generate embed key. Please try again." });
    }
  }

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  if (generated) {
    return null; // Parent handles showing credentials
  }

  return (
    <section id="configure" className="py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Configure Your Widget</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            Get your embed key in seconds
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            Fill in the details below and we&apos;ll generate a unique widget
            configuration for your website.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-lg">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-line bg-bg-raised p-8 shadow-2xl"
          >
            {errors.form && (
              <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {errors.form}
              </div>
            )}

            <div className="space-y-6">
              {FORM_FIELDS.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="text-sm font-600 text-ink"
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-ink-faint">*</span>
                    )}
                  </label>

                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={values[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      disabled={generating}
                      className={`mt-2 w-full rounded-lg border bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors[field.name] ? "border-red-500/50" : "border-line focus:border-ink-faint"
                      }`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23656e64' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                      }}
                    >
                      <option value="" disabled>
                        {field.placeholder}
                      </option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={values[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      disabled={generating}
                      className={`mt-2 w-full rounded-lg border bg-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint/50 disabled:opacity-50 disabled:cursor-not-allowed ${
                        errors[field.name] ? "border-red-500/50" : "border-line focus:border-ink-faint"
                      }`}
                    />
                  )}

                  {field.helpText && !errors[field.name] && (
                    <p className="mt-1.5 text-xs text-ink-faint">{field.helpText}</p>
                  )}
                  {errors[field.name] && (
                    <p className="mt-1.5 text-xs text-red-400">{errors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={generating}
              className="mt-8 w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Generating Widget...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v6M12 16v6M4 12h6M14 12h6M7 7l3 3M14 14l3 3M17 7l-3 3M10 14l-3 3" />
                  </svg>
                  Generate Widget
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-ink-faint">
              No credit card required. Your configuration is generated instantly.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}

