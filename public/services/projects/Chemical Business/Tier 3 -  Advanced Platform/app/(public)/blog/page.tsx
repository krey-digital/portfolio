"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { useState } from "react";

// Disable static generation for this dynamic page
export const dynamic = "force-dynamic";

export default function BlogListPage() {
  const [category, setCategory] = useState<string | undefined>();

  const posts = useQuery(api.blog.listBlogPosts, {
    category: category as any,
    limit: 20,
  });

  const categories = [
    { value: "regulatory", label: "Regulatory" },
    { value: "market", label: "Market" },
    { value: "application", label: "Application" },
    { value: "company", label: "Company" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{Latest Blog Posts}</h1>
          <p className="text-gray-600 max-w-2xl">
            Stay updated with our latest insights on chemical industry trends, regulatory changes, and market updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h3 className="font-bold text-lg mb-4">{Category}</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setCategory(undefined)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    category === undefined
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  All Posts
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setCategory(cat.value)}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      category === cat.value
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="lg:col-span-3">
            {posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/en/blog/${post.slug}`}
                    className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition"
                  >
                    {post.coverImageId && (
                      <div className="w-full h-40 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Posted by {post.authorName}</span>
                        <span>
                          {new Date(post.publishedAt || 0).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600">{Loading...}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
