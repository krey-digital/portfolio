import { mutation } from "./_generated/server";

// Generate upload URL for file storage
export const generateUploadUrl = mutation(async (ctx) => {
  // TODO: Add auth check when ready
  return await ctx.storage.generateUploadUrl();
});
