import { Metadata } from "next";
import { getAllPosts } from "../../lib/mdx";
import BlogClient from "./page-client";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest blog posts",
};

export default async function BlogPage() {
  // Fetch the posts from the filesystem
  const posts = await getAllPosts();
  
  // Pass the posts to the client component
  return <BlogClient posts={posts} />;
}
