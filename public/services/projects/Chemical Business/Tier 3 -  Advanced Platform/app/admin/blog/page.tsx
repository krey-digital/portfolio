"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { useState } from "react";
import { BookOpen, Eye, EyeOff } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminBlogPage() {
  const [publishedFilter, setPublishedFilter] = useState<boolean | undefined>();
  const posts = useQuery(api.blog.listAll, { published: publishedFilter });
  const publishPost = useMutation(api.blog.publish);
  const unpublishPost = useMutation(api.blog.unpublish);
  const deletePost = useMutation(api.blog.deleteBlogPost);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handlePublish = async (id: string) => {
    await publishPost({ id: id as any });
  };

  const handleUnpublish = async (id: string) => {
    await unpublishPost({ id: id as any });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setDeletingId(id);
      try {
        await deletePost({ id: id as any });
      } finally {
        setDeletingId(null);
      }
    }
  };

  const tabs = [
    { label: "All", value: undefined, icon: "📚" },
    { label: "Published", value: true, icon: "✅" },
    { label: "Drafts", value: false, icon: "📝" },
  ];

  if (posts === undefined) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Blog Posts
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Manage your blog content
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
        >
          ➕ New Post
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.value?.toString() || "all"}
            onClick={() => setPublishedFilter(tab.value)}
            className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base rounded-full transition-all duration-300 whitespace-nowrap flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-105 ${
              publishedFilter === tab.value
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow duration-200"
            >
              {/* Cover image placeholder */}
              <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-amber-600" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      post.category === "regulatory"
                        ? "bg-blue-100 text-blue-700"
                        : post.category === "market"
                        ? "bg-green-100 text-green-700"
                        : post.category === "application"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {post.category}
                  </span>
                  {post.isPublished ? (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
                      <Eye size={12} />
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 flex items-center gap-1">
                      <EyeOff size={12} />
                      Draft
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 mb-3 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span>By {post.authorName}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/blog/${post._id}/edit`}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm text-center"
                  >
                    Edit
                  </Link>
                  {post.isPublished ? (
                    <button
                      onClick={() => handleUnpublish(post._id)}
                      className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm"
                    >
                      Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublish(post._id)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
                    >
                      Publish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(post._id)}
                    disabled={deletingId === post._id}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium text-sm disabled:opacity-50"
                  >
                    {deletingId === post._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 text-center bg-white rounded-xl shadow-lg">
            <div className="text-5xl mb-3">📝</div>
            <p className="text-slate-600 font-medium text-lg mb-4">
              No blog posts yet
            </p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              Create your first post →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
