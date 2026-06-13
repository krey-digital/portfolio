import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Admin mutation: log import history
export const logImport = mutation({
  args: {
    fileName: v.string(),
    fileType: v.union(v.literal("csv"), v.literal("json")),
    totalRecords: v.number(),
    successCount: v.number(),
    failedCount: v.number(),
    updatedCount: v.number(),
    errors: v.array(v.string()),
    importedBy: v.string(),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    const id = await ctx.db.insert("importHistory", {
      ...args,
      createdAt: Date.now(),
    });
    return id;
  },
});

// Admin query: list import history
export const list = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    const history = await ctx.db
      .query("importHistory")
      .withIndex("by_created")
      .order("desc")
      .take(args.limit || 20);
    
    return history;
  },
});

// Admin query: get import details
export const get = query({
  args: { id: v.id("importHistory") },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    return await ctx.db.get(args.id);
  },
});
