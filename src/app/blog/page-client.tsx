"use client";

import { Hero, HeroTitle } from "@/components/hero";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BLOG_CATEGORIES } from "@/lib/constants";
import { Post } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import Image from "next-image-export-optimizer";
import Link from "next/link";
import { useMemo, useState } from "react";

const POSTS_PER_PAGE = 12;

// Hero section component
function HeroSection() {
  return (
    <Hero>
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <HeroTitle>Blog</HeroTitle>
        </div>
      </div>
    </Hero>
  );
}

// Category filters component
interface CategoryFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryFilters({
  activeCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="flex gap-2 overflow-x-auto p-2 scrollbar-hide">
        {BLOG_CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "secondary" : "ghost"}
            className={cn(
              "text-sm whitespace-nowrap transition-colors",
              activeCategory === category.id
                ? "bg-orange-700/50 text-white hover:bg-orange-700/70"
                : "text-orange-900 dark:text-gray-300 hover:text-white hover:bg-orange-800/30"
            )}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

// Blog post card component
interface BlogPostCardProps {
  post: Post;
}

function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="h-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 overflow-hidden transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 pt-0">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.frontmatter.image ?? "/img/blog_placeholder.webp"}
            alt={post.frontmatter.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.frontmatter.category && (
              <>
                <span>•</span>
                <span className="capitalize">{post.frontmatter.category}</span>
              </>
            )}
          </div>
          <CardTitle className="text-xl group-hover:text-orange-600 transition-colors">
            {post.frontmatter.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {post.frontmatter.excerpt && (
            <p className="text-gray-600 dark:text-gray-400">
              {post.frontmatter.excerpt}
            </p>
          )}
        </CardContent>
        <CardFooter>
          {post.frontmatter.author && (
            <p className="text-sm text-gray-500">{post.frontmatter.author}</p>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

// Blog pagination component
interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              href="#"
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

// Main BlogClient component
export default function BlogClient({ posts }: { posts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = useMemo(() => {
    return activeCategory === "all"
      ? posts
      : posts.filter((post) => post.frontmatter.category === activeCategory);
  }, [activeCategory, posts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  function handleCategoryChange(category: string) {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  return (
    <div className="container">
      <div className="relative w-full">
        <HeroSection />
        <CategoryFilters
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="px-4 py-12 md:px-6">
        {filteredPosts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No posts found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
