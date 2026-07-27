"use client";

import { Container } from "../container";
import { Eyebrow } from "../eyebrow";

interface WidgetPreviewProps {
  embedKey: string;
}

export function WidgetPreview({ embedKey }: WidgetPreviewProps) {
  return (
    <section id="widget-preview" className="py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Live Preview</Eyebrow>
          <h2 className="mt-4 font-display text-3xl font-800 leading-tight md:text-4xl">
            Your widget is live
          </h2>
          <p className="mt-5 text-lg text-ink-soft">
            The GmLeads chat widget is now active on this page using your
            generated embed key. Click the chat button in the bottom-right
            corner to see exactly what your visitors will experience.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md">
          <div className="rounded-2xl border border-line bg-bg-raised p-6 shadow-2xl">
            <div className="flex items-start gap-4">
              {/* Animated indicator */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-600 text-ink">Widget Active</p>
                  <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                    LIVE
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                  Using embed key{" "}
                  <code className="rounded bg-bg-inset px-1 py-0.5 text-[11px] font-mono text-accent">
                    {embedKey.slice(0, 16)}...
                  </code>
                </p>

                {/* Preview hint */}
                <div className="mt-4 rounded-lg border border-line-soft bg-bg-inset px-4 py-3">
                  <p className="text-xs text-ink-soft">
                    <span className="text-accent font-semibold">Tip:</span>{" "}
                    Look for the chat button in the bottom-right corner of
                    this page. That&apos;s your widget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

