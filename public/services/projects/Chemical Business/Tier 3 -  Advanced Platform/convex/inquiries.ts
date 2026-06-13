import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Public mutation: submit inquiry
export const submit = mutation({
  args: {
    productId: v.optional(v.id("products")),
    productName: v.optional(v.string()),
    name: v.string(),
    company: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    quantity: v.optional(v.string()),
    destination: v.optional(v.string()),
    message: v.string(),
    type: v.union(
      v.literal("rfq"),
      v.literal("coa"),
      v.literal("tds"),
      v.literal("general")
    ),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
    return id;
  },
});

// Admin query: list inquiries with filtering
export const list = query({
  args: {
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("contacted"),
        v.literal("quoted"),
        v.literal("closed")
      )
    ),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    let inquiries;

    if (args.status) {
      inquiries = await ctx.db
        .query("inquiries")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    } else {
      inquiries = await ctx.db.query("inquiries").order("desc").collect();
    }

    return inquiries;
  },
});

// Admin query: get inquiry by ID
export const get = query({
  args: { id: v.id("inquiries") },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    return await ctx.db.get(args.id);
  },
});

// Admin mutation: update inquiry status
export const updateStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("quoted"),
      v.literal("closed")
    ),
    adminNotes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    const { id, status, adminNotes } = args;
    const updates: any = { status };
    if (adminNotes !== undefined) {
      updates.adminNotes = adminNotes;
    }
    await ctx.db.patch(id, updates);
    return id;
  },
});

// Admin query: get recent inquiries (last N)
export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    const limit = args.limit || 5;
    return await ctx.db
      .query("inquiries")
      .order("desc")
      .take(limit);
  },
});
