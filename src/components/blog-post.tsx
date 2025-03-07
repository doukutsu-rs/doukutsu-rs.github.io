"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next-image-export-optimizer";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { PostFrontmatterType } from "../lib/mdx";

interface BlogPostProps {
  content: any;
  frontmatter: PostFrontmatterType;
}

function Tag({ tag }: { tag: string }) {
  return (
    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-950">
      {tag}
    </span>
  );
}

export default function BlogPost({ content, frontmatter }: BlogPostProps) {
  return (
    <>
      <div className="-z-10">
        <Image
          src={frontmatter.image ?? "/img/blog_placeholder.webp"}
          alt={frontmatter.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="bg-gradient-to-t from-white dark:from-black to-transparent absolute left-0 top-0 right-0 bottom-0" />
      </div>
      <div className="container pb-8 md:pb-24 lg:pb-32 pt-40">
        <div className="max-w-3xl mx-auto bg-gray-50/95 dark:bg-gray-950/95 px-4 md:px-6 py-8 md:py-10 rounded-2xl shadow-2xl">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="mb-6 flex items-center gap-2 text-orange-600 hover:text-orange-50 hover:bg-orange-500/50 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to Blog
            </Button>
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-2">
                {frontmatter.title}
              </h1>
              <p className="text-muted-foreground">
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {frontmatter.author && ` • ${frontmatter.author}`}
              </p>
            </header>

            {frontmatter.coverImage && (
              <div className="mb-8">
                <Image
                  src={frontmatter.coverImage}
                  alt={frontmatter.title}
                  width={1200}
                  height={630}
                  className="rounded-lg"
                />
              </div>
            )}

            <div className="prose prose-stone dark:prose-invert max-w-none">
              <MDXRemote {...content} />
            </div>

            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="mt-8 pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  {frontmatter.tags.map((tag, i) => (
                    <Tag key={i} tag={tag} />
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  );
}
