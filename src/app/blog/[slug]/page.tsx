import BlogPost from "@/components/blog-post";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageParams {
  slug: string;
}

// Generate metadata for each page
export async function generateMetadata(props: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return {
    title: `${post.frontmatter.title} - doukutsu-rs blog`,
    description: post.frontmatter.excerpt,
    openGraph: post.frontmatter.coverImage
      ? {
          images: [
            {
              url: post.frontmatter.coverImage ?? "/img/blog_placeholder.webp",
            },
          ],
        }
      : undefined,
  };
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage(props: {
  params: Promise<PageParams>;
}) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPost content={post.content} frontmatter={post.frontmatter} />;
}
