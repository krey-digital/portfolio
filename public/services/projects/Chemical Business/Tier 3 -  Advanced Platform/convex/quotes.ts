import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Admin query: list all quote requests
export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("submitted"),
        v.literal("reviewing"),
        v.literal("quoted"),
        v.literal("accepted"),
        v.literal("declined")
      )
    ),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    let queryBuilder = ctx.db.query("quoteRequests");
    if (args.status) {
      queryBuilder = queryBuilder.withIndex("by_status", (q) =>
        q.eq("status", args.status)
      );
    }

    const quotes = await queryBuilder.order("desc").collect();
    return quotes.slice(0, args.limit || 50);
  },
});

// Admin query: get quote by ID
export const get = query({
  args: { id: v.id("quoteRequests") },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);
    return await ctx.db.get(args.id);
  },
});

// Admin mutation: update quote status
export const updateStatus = mutation({
  args: {
    id: v.id("quoteRequests"),
    status: v.union(
      v.literal("submitted"),
      v.literal("reviewing"),
      v.literal("quoted"),
      v.literal("accepted"),
      v.literal("declined")
    ),
    adminResponse: v.optional(v.string()),
    quotedPricing: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    const updates: any = {
      status: args.status,
      respondedAt: Date.now(),
    };

    if (args.adminResponse !== undefined) {
      updates.adminResponse = args.adminResponse;
    }
    if (args.quotedPricing !== undefined) {
      updates.quotedPricing = args.quotedPricing;
    }

    await ctx.db.patch(args.id, updates);
    return await ctx.db.get(args.id);
  },
});

// Admin query: get stats
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    // TODO: Add auth check - await requireAdminAuth(ctx);

    const quotes = await ctx.db.query("quoteRequests").collect();

    return {
      total: quotes.length,
      submitted: quotes.filter((q) => q.status === "submitted").length,
      reviewing: quotes.filter((q) => q.status === "reviewing").length,
      quoted: quotes.filter((q) => q.status === "quoted").length,
      accepted: quotes.filter((q) => q.status === "accepted").length,
      declined: quotes.filter((q) => q.status === "declined").length,
    };
  },
});

// Public mutation: submit quote request
export const submit = mutation({
  args: {
    buyerId: v.optional(v.id("buyers")),
    sessionId: v.optional(v.string()),
    name: v.string(),
    company: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    items: v.array(
      v.object({
        productId: v.id("products"),
        productName: v.string(),
        quantity: v.string(),
        unit: v.string(),
        packaging: v.optional(v.string()),
      })
    ),
    destination: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("quoteRequests", {
      ...args,
      status: "submitted",
      createdAt: Date.now(),
    });
    return await ctx.db.get(id);
  },
});
