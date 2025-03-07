import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Blog Post Not Found</h1>
      <p className="text-xl mb-8">
        Sorry, the blog post you are looking for doesn't exist.
      </p>
      <Link
        href="/blog"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Back to Blog
      </Link>
    </div>
  );
}
