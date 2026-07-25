export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  role: string;
  body: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "cycle-time-is-a-symptom-not-a-metric",
    title: "Cycle time is a symptom, not a metric",
    excerpt:
      "Teams that chase cycle time as a number usually make it worse. Teams that treat it as a symptom of something upstream usually fix the real problem.",
    date: "2026-06-02",
    author: "Priya Raman",
    role: "Head of Engineering, Fernway",
    body: [
      "Every engineering leader eventually gets asked to explain why cycle time went up last quarter. The honest answer is almost never \"engineers got slower.\" It's usually one of three things: reviews are queuing, requirements are shifting mid-sprint, or the definition of \"done\" quietly grew.",
      "When we moved onto Ashlar, the automation rules surfaced something we hadn't measured before: issues were sitting in \"In Review\" for a median of 34 hours, not because reviewers were slow, but because nobody was notified a review was waiting. A one-line automation rule — ping the reviewer's channel the moment a PR links to an issue — cut that number to under 6 hours within two weeks.",
      "The number didn't improve because we told anyone to move faster. It improved because the system stopped hiding where time was actually going.",
    ],
  },
  {
    slug: "the-roadmap-view-our-ceo-actually-opens",
    title: "The roadmap view our CEO actually opens",
    excerpt:
      "Most roadmaps exist to be presented once and then quietly go stale. Here's what we changed to make ours a living document people check on their own.",
    date: "2026-05-14",
    author: "Tomás Herrera",
    role: "VP Product, Northloop",
    body: [
      "For years our roadmap lived in a slide deck that got rebuilt every quarter and was wrong within a week of shipping. Executives didn't distrust the plan — they distrusted the artifact.",
      "The fix wasn't a better deck. It was removing the deck entirely and pointing stakeholders at the same live filterable timeline engineering already worked from. No translation layer, no stale snapshot — if a date moved because a dependency slipped, the roadmap moved with it, visibly.",
      "The surprising part was adoption. We didn't have to convince anyone to check it. Once it was accurate often enough to be trusted, people started checking it on their own before asking in Slack.",
    ],
  },
  {
    slug: "the-monday-triage-meeting-we-deleted",
    title: "The Monday triage meeting we deleted",
    excerpt:
      "We used to spend the first 45 minutes of every week manually sorting a backlog. Here's what replaced it, and why nobody misses it.",
    date: "2026-04-22",
    author: "Ada Whitfield",
    role: "Engineering Manager, Voxel",
    body: [
      "Every Monday, for years, our team lost the first 45 minutes to triage: reading new issues out loud, arguing about labels, assigning owners nobody remembered agreeing to. It was boring, it was necessary, and everyone dreaded it equally.",
      "We replaced it with three automation rules: label by keyword and reporting team, auto-assign based on code ownership from the linked repo, and auto-close anything untouched for 60 days with a comment asking the reporter to reopen if it still mattered.",
      "The rules aren't clever. That's the point — the busywork wasn't a hard problem, it was just a repeated one. The meeting didn't get shorter. It stopped existing.",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
