"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";

// Disable static generation for this dynamic page
export const dynamic = "force-dynamic";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const post = useQuery(api.blog.getBlogPostBySlug, { slug });

  if (post === undefined) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-600 pb-8 border-b">
            <span>By {post.authorName}</span>
            <span>{new Date(post.publishedAt || 0).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-700 mb-8 italic">{post.excerpt}</p>
        )}

        {/* Body */}
        <div className="prose prose-lg max-w-none mb-8">
          {/* Parse Tiptap JSON or render as plain text */}
          {typeof post.body === "string" ? (
            <div className="text-gray-700 whitespace-pre-wrap">
              {post.body}
            </div>
          ) : (
            <p>{post.body}</p>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t">
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t">
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← Back to blog
          </Link>
        </div>
      </article>
    </div>
  );
}
