import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { z } from "zod";
import { BLOG_CATEGORIES } from "./constants";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

const BLOG_CATEGORIES_IDS = BLOG_CATEGORIES.map((category) => category.id) as [
  string,
  ...string[],
];

// Define the schema for blog post frontmatter
export const PostFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  excerpt: z.string().optional(),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  category: z.enum(BLOG_CATEGORIES_IDS).optional(),
  author: z.string().optional(),
  image: z.string().optional(),
});

// Use zod's inferred type
export type PostFrontmatterType = z.infer<typeof PostFrontmatterSchema>;

// Create the Post interface that extends the zod schema
export interface Post {
  slug: string;
  frontmatter: PostFrontmatterType;
}

// This function can be used in both generateStaticParams and in the page components
export async function getAllPosts(): Promise<Post[]> {
  // Ensure the directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      // Validate the frontmatter data against the schema
      try {
        const validatedData = PostFrontmatterSchema.parse(data);
        return {
          slug: file.replace(/\.mdx?$/, ""),
          frontmatter: validatedData,
        };
      } catch (error) {
        console.error(`Invalid frontmatter in ${file}:`, error);
        throw new Error(
          `Invalid frontmatter in ${file}: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    })
    .sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });

  return posts;
}

export async function latestThreePosts(): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, 3);
}

// For use in the blog post page
export async function getPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdFilePath = path.join(BLOG_DIR, `${slug}.md`);

  let actualPath;
  if (fs.existsSync(filePath)) {
    actualPath = filePath;
  } else if (fs.existsSync(mdFilePath)) {
    actualPath = mdFilePath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(actualPath, "utf8");
  const { data, content } = matter(fileContents);

  // Validate the frontmatter
  try {
    const validatedData = PostFrontmatterSchema.parse(data);
    const mdxSource = await serialize(content);

    return {
      frontmatter: validatedData,
      content: mdxSource,
    };
  } catch (error) {
    console.error(`Invalid frontmatter in ${slug}:`, error);
    throw new Error(
      `Invalid frontmatter in ${slug}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
