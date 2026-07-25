import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";
import { GmLeadsWidget } from "@/components/gmleads-widget";
import { BLOG_POSTS, getBlogPost } from "@/lib/blog-posts";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Ashlar Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <main className="py-24 md:py-32">
        <Container className="max-w-2xl">
          <Link href="/blog" className="text-sm text-ink-faint transition-colors hover:text-ink">
            &larr; Blog
          </Link>
          <p className="mt-6 text-xs text-ink-faint">{formatDate(post.date)}</p>
          <h1 className="mt-3 font-display text-3xl font-800 leading-tight md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-ink-soft">
            {post.author} &middot; {post.role}
          </p>
          <div className="mt-10 space-y-6">
            {post.body.map((para, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-ink-soft">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
      <GmLeadsWidget />
    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
