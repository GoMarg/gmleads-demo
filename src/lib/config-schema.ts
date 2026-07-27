// Schema-driven configuration form definition.
// This is the single source of truth for what fields the onboarding form
// exposes. If the backend requirements change, update this schema — every
// React component that renders the form derives from it.

export const NOTIFICATION_OPTIONS = [
  { value: "slack", label: "Slack", description: "Receive lead alerts in a Slack channel" },
  { value: "email", label: "Email", description: "Get notified via team email" },
  { value: "webhook", label: "Webhook", description: "Forward events to an HTTP endpoint" },
] as const;

export const ENVIRONMENTS = [
  { value: "production", label: "Production", description: "Real traffic, real leads" },
  { value: "staging", label: "Staging", description: "Test and development" },
] as const;

export interface FormField<T = string> {
  /** Unique field key — maps to API payload keys */
  name: string;
  /** Human-readable label */
  label: string;
  /** Placeholder text */
  placeholder: string;
  /** Field type for rendering */
  type: "text" | "url" | "email" | "select" | "toggle";
  /** Whether the field is required */
  required: boolean;
  /** Help text shown below the field */
  helpText?: string;
  /** Options for select fields */
  options?: ReadonlyArray<{ value: T; label: string; description?: string }>;
  /** Default value */
  defaultValue?: T;
}

// The form fields that drive the UI.
// Only fields that map to actual backend capabilities are included —
// no invented configuration.
export const FORM_FIELDS: FormField[] = [
  {
    name: "workspaceName",
    label: "Workspace / Company Name",
    type: "text",
    placeholder: "Acme Inc.",
    required: true,
    helpText: "Used to identify your workspace in the dashboard and Slack notifications.",
  },
  {
    name: "slackChannelUrl",
    label: "Slack Channel URL",
    type: "url",
    placeholder: "https://your-workspace.slack.com/archives/C0123456789",
    required: false,
    helpText: "Paste a channel link from Slack. Notifications will be sent here.",
  },
  {
    name: "notificationPreference",
    label: "Notification Preference",
    type: "select",
    placeholder: "Select a channel",
    required: true,
    options: NOTIFICATION_OPTIONS,
    defaultValue: "slack",
  },
  {
    name: "teamEmail",
    label: "Team Email",
    type: "email",
    placeholder: "team@acme.com",
    required: true,
    helpText: "Used for email notifications and dashboard invitations.",
  },
  {
    name: "allowedDomain",
    label: "Allowed Website / Domain",
    type: "text",
    placeholder: "acme.com",
    required: true,
    helpText: "The domain where you'll install the widget. Prevents unauthorized usage.",
  },
  {
    name: "environment",
    label: "Environment",
    type: "select",
    placeholder: "Select environment",
    required: true,
    options: ENVIRONMENTS,
    defaultValue: "production",
  },
];

// Type for the form values derived from the schema.
export type WidgetFormValues = Record<string, string>;

export function getDefaultValues(): WidgetFormValues {
  const values: WidgetFormValues = {};
  for (const field of FORM_FIELDS) {
    values[field.name] = field.defaultValue ?? "";
  }
  return values;
}

