import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Container } from "@/components/container";
import { Eyebrow } from "@/components/eyebrow";
import { GmLeadsWidget } from "@/components/gmleads-widget";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog — Ashlar",
  description: "Notes on engineering process from teams building on Ashlar.",
};

export default function BlogIndexPage() {
  return (
    <>
      <Nav />
      <main className="py-24 md:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Blog</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-800 leading-tight md:text-5xl">
              Notes on shipping
            </h1>
            <p className="mt-5 text-lg text-ink-soft">
              Short write-ups from engineering teams on what actually changed
              when they rebuilt their process.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl divide-y divide-line-soft border-y border-line-soft">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block py-8 transition-opacity hover:opacity-80"
              >
                <p className="text-xs text-ink-faint">
                  {formatDate(post.date)} · {post.author}, {post.role}
                </p>
                <h2 className="mt-2 font-display text-xl font-700">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
              </Link>
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
