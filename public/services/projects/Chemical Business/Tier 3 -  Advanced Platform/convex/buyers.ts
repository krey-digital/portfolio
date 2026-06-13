import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Admin query: list all buyers
export const list = query({
  args: {
    verified: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    let queryBuilder = ctx.db.query("buyers");
    
    const buyers = await queryBuilder.order("desc").collect();
    
    let filtered = buyers;
    if (args.verified !== undefined) {
      filtered = buyers.filter((b) => b.isVerified === args.verified);
    }

    return filtered.slice(0, args.limit || 50);
  },
});

// Admin query: get buyer by ID
export const get = query({
  args: { id: v.id("buyers") },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);
    return await ctx.db.get(args.id);
  },
});

// Admin mutation: verify buyer
export const verify = mutation({
  args: { id: v.id("buyers") },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    await ctx.db.patch(args.id, { isVerified: true });
    return await ctx.db.get(args.id);
  },
});

// Admin mutation: unverify buyer
export const unverify = mutation({
  args: { id: v.id("buyers") },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    await ctx.db.patch(args.id, { isVerified: false });
    return await ctx.db.get(args.id);
  },
});

// Admin query: get stats
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    const buyers = await ctx.db.query("buyers").collect();

    return {
      total: buyers.length,
      verified: buyers.filter((b) => b.isVerified).length,
      unverified: buyers.filter((b) => !b.isVerified).length,
    };
  },
});
