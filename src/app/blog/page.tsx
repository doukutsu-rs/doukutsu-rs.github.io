import { Metadata } from "next";
import { getAllPosts } from "../../lib/mdx";
import BlogClient from "./page-client";

export const metadata: Metadata = {
  title: "Blog - doukutsu-rs",
  description:
    "Mimiga Village's local blog. Totally not a doukutsu-rs changelog.",
};

export default async function BlogPage() {
  // Fetch the posts from the filesystem
  const posts = await getAllPosts();

  // Pass the posts to the client component
  return <BlogClient posts={posts} />;
}
