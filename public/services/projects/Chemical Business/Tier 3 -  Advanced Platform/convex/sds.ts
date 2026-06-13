import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Public query: get SDS versions for a product
export const getSdsVersions = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    // Check if sdsVersions table exists (Tier 3 feature)
    try {
      const versions = await ctx.db
        .query("sdsVersions")
        .withIndex("by_product", (q) => q.eq("productId", args.productId))
        .order("desc")
        .collect();
      return versions;
    } catch (error) {
      // If sdsVersions table doesn't exist, return empty array
      return [];
    }
  },
});

// Admin mutation: generate upload URL for SDS file
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // TODO: Add auth check when ready
    return await ctx.storage.generateUploadUrl();
  },
});

// Public action: get signed download URL for SDS file
export const getDownloadUrl = action({
  args: { fileId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.fileId);
  },
});

// Admin mutation: delete SDS file
export const deleteFile = mutation({
  args: { fileId: v.id("_storage") },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    await ctx.storage.delete(args.fileId);
    return args.fileId;
  },
});
