import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Public query: list active certifications
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("certifications")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Admin query: list all certifications
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    // TODO: Add auth check when ready
    return await ctx.db.query("certifications").collect();
  },
});

// Admin query: get certification by ID
export const get = query({
  args: { id: v.id("certifications") },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    return await ctx.db.get(args.id);
  },
});

// Admin mutation: create certification
export const create = mutation({
  args: {
    name: v.string(),
    issuingBody: v.string(),
    certNumber: v.optional(v.string()),
    issuedAt: v.number(),
    expiresAt: v.optional(v.number()),
    fileId: v.optional(v.id("_storage")),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    const id = await ctx.db.insert("certifications", args);
    return id;
  },
});

// Admin mutation: update certification
export const update = mutation({
  args: {
    id: v.id("certifications"),
    name: v.optional(v.string()),
    issuingBody: v.optional(v.string()),
    certNumber: v.optional(v.string()),
    issuedAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    fileId: v.optional(v.id("_storage")),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Admin mutation: delete certification
export const deleteCert = mutation({
  args: { id: v.id("certifications") },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    await ctx.db.delete(args.id);
    return args.id;
  },
});
