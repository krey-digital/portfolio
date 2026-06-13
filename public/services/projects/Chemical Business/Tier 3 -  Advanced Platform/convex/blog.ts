import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Public query: list published blog posts
export const listPublished = query({
  args: {
    category: v.optional(
      v.union(
        v.literal("regulatory"),
        v.literal("market"),
        v.literal("application"),
        v.literal("company")
      )
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db
      .query("blogPosts")
      .withIndex("by_published", (q) => q.eq("isPublished", true));

    const posts = await queryBuilder.order("desc").collect();

    let filtered = posts;
    if (args.category) {
      filtered = posts.filter((p) => p.category === args.category);
    }

    return filtered.slice(0, args.limit || 20);
  },
});

// Public query: get blog post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .unique();
  },
});

// Admin query: list all blog posts
export const listAll = query({
  args: {
    published: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    let queryBuilder = ctx.db.query("blogPosts");

    const posts = await queryBuilder.order("desc").collect();

    let filtered = posts;
    if (args.published !== undefined) {
      filtered = posts.filter((p) => p.isPublished === args.published);
    }

    return filtered.slice(0, args.limit || 50);
  },
});

// Admin query: get blog post by ID
export const getById = query({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);
    return await ctx.db.get(args.id);
  },
});

// Admin mutation: create blog post
export const create = mutation({
  args: {
    title: v.string(),
    titleHi: v.optional(v.string()),
    excerpt: v.string(),
    body: v.string(),
    bodyHi: v.optional(v.string()),
    coverImageId: v.optional(v.id("_storage")),
    category: v.union(
      v.literal("regulatory"),
      v.literal("market"),
      v.literal("application"),
      v.literal("company")
    ),
    tags: v.array(v.string()),
    authorName: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    // Generate slug
    const slug = args.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const postId = await ctx.db.insert("blogPosts", {
      ...args,
      slug,
      isPublished: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await ctx.db.get(postId);
  },
});

// Admin mutation: update blog post
export const update = mutation({
  args: {
    id: v.id("blogPosts"),
    title: v.optional(v.string()),
    titleHi: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    body: v.optional(v.string()),
    bodyHi: v.optional(v.string()),
    coverImageId: v.optional(v.id("_storage")),
    category: v.optional(
      v.union(
        v.literal("regulatory"),
        v.literal("market"),
        v.literal("application"),
        v.literal("company")
      )
    ),
    tags: v.optional(v.array(v.string())),
    authorName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    const { id, ...updates } = args;
    await ctx.db.patch(id, { ...updates, updatedAt: Date.now() });
    return await ctx.db.get(id);
  },
});

// Admin mutation: publish blog post
export const publish = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    await ctx.db.patch(args.id, {
      isPublished: true,
      publishedAt: Date.now(),
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.id);
  },
});

// Admin mutation: unpublish blog post
export const unpublish = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    await ctx.db.patch(args.id, {
      isPublished: false,
      updatedAt: Date.now(),
    });

    return await ctx.db.get(args.id);
  },
});

// Admin mutation: delete blog post
export const deleteBlogPost = mutation({
  args: { id: v.id("blogPosts") },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    await ctx.db.delete(args.id);
    return true;
  },
});
