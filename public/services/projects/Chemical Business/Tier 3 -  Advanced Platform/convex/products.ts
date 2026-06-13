import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";

// Public query: list all published products with optional filtering
export const list = query({
  args: {
    category: v.optional(v.string()),
    grade: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();

    return products.filter(
      (p) =>
        !p.isDraft &&
        (!args.category || p.category === args.category) &&
        (!args.grade || p.grade === args.grade)
    );
  },
});

// Public query: get product by slug (for SSG/ISR)
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .filter((q) => q.eq(q.field("isPublished"), true))
      .filter((q) => q.eq(q.field("isDraft"), false))
      .unique();

    if (!product) {
      return null;
    }

    // Fetch related products if available (Tier 3 feature)
    if (product.relatedProductIds && product.relatedProductIds.length > 0) {
      const related = await Promise.all(
        product.relatedProductIds.map((id) => ctx.db.get(id))
      );
      return {
        ...product,
        related: related.filter((r) => r && r.isPublished && !r.isDraft),
      };
    }

    return product;
  },
});

// Public query: get product by ID for display purposes
export const get = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (product && (!product.isPublished || product.isDraft)) {
      return null;
    }
    return product;
  },
});

// Public query: get all published product slugs for SSG
export const listSlugs = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect();

    return products.filter(p => !p.isDraft).map((p) => p.slug);
  },
});

// Public query: search products (full-text)
export const search = query({
  args: { query: v.string() },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("products")
      .withIndex("by_published", (q) => q.eq("isPublished", true))
      .collect()
      .then((products) =>
        products.filter(
          (p) =>
            !p.isDraft &&
            p.name.toLowerCase().includes(args.query.toLowerCase())
        )
      );

    return results;
  },
});

// Admin mutation: create product
export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    casNumber: v.string(),
    unNumber: v.optional(v.string()),
    category: v.union(
      v.literal("acids"),
      v.literal("solvents"),
      v.literal("reagents"),
      v.literal("salts"),
      v.literal("glass-chemicals"),
      v.literal("other")
    ),
    grade: v.union(
      v.literal("technical"),
      v.literal("commercial"),
      v.literal("lab"),
      v.literal("pharma")
    ),
    description: v.string(),
    descriptionHi: v.optional(v.string()), // Tier 3 feature
    purityMin: v.optional(v.number()),
    purityMax: v.optional(v.number()),
    packagingOptions: v.array(
      v.object({
        size: v.string(),
        unit: v.union(
          v.literal("KG"),
          v.literal("L"),
          v.literal("ML"),
          v.literal("G"),
          v.literal("MT")
        ),
      })
    ),
    ghsSignalWord: v.optional(
      v.union(v.literal("DANGER"), v.literal("WARNING"))
    ),
    ghsPictograms: v.array(v.string()),
    images: v.optional(
      v.array(
        v.object({
          fileId: v.id("_storage"),
          isPrimary: v.boolean(),
        })
      )
    ),
    sdsFileId: v.optional(v.id("_storage")),
    sdsVersion: v.optional(v.string()),
    sdsIssuedAt: v.optional(v.number()),
    applications: v.array(v.string()),
    relatedProductIds: v.optional(v.array(v.id("products"))), // Tier 3 feature
    erpProductCode: v.optional(v.string()), // Tier 3 feature
    isPublished: v.boolean(),
    isDraft: v.optional(v.boolean()), // defaults to true (save as draft)
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    const id = await ctx.db.insert("products", {
      ...args,
      images: args.images || [], // Default to empty array
      relatedProductIds: args.relatedProductIds || [], // Default to empty array
      isDraft: args.isDraft !== false, // Default to true if not specified
      isPublished: args.isPublished || false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return id;
  },
});

// Admin mutation: update product
export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    casNumber: v.optional(v.string()),
    unNumber: v.optional(v.string()),
    category: v.optional(
      v.union(
        v.literal("acids"),
        v.literal("solvents"),
        v.literal("reagents"),
        v.literal("salts"),
        v.literal("glass-chemicals"),
        v.literal("other")
      )
    ),
    grade: v.optional(
      v.union(
        v.literal("technical"),
        v.literal("commercial"),
        v.literal("lab"),
        v.literal("pharma")
      )
    ),
    description: v.optional(v.string()),
    descriptionHi: v.optional(v.string()), // Tier 3 feature
    purityMin: v.optional(v.number()),
    purityMax: v.optional(v.number()),
    packagingOptions: v.optional(
      v.array(
        v.object({
          size: v.string(),
          unit: v.union(
            v.literal("KG"),
            v.literal("L"),
            v.literal("ML"),
            v.literal("G"),
            v.literal("MT")
          ),
        })
      )
    ),
    ghsSignalWord: v.optional(
      v.union(v.literal("DANGER"), v.literal("WARNING"))
    ),
    ghsPictograms: v.optional(v.array(v.string())),
    images: v.optional(
      v.array(
        v.object({
          fileId: v.id("_storage"),
          isPrimary: v.boolean(),
        })
      )
    ),
    sdsFileId: v.optional(v.id("_storage")),
    sdsVersion: v.optional(v.string()),
    sdsIssuedAt: v.optional(v.number()),
    applications: v.optional(v.array(v.string())),
    relatedProductIds: v.optional(v.array(v.id("products"))), // Tier 3 feature
    erpProductCode: v.optional(v.string()), // Tier 3 feature
    isPublished: v.optional(v.boolean()),
    isDraft: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
    return id;
  },
});

// Admin mutation: delete product
export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    await ctx.db.delete(args.id);
    return args.id;
  },
});

// Admin query: get product by ID for editing
export const getForAdmin = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    return await ctx.db.get(args.id);
  },
});

// Admin query: get product by ID (alias for getForAdmin)
export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    return await ctx.db.get(args.id);
  },
});

// Admin query: list all products (published and unpublished)
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    // TODO: Add auth check when ready
    return await ctx.db.query("products").collect();
  },
});

// Admin query: list products with filtering (alias for admin dashboard)
export const listAdmin = query({
  args: {
    published: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready

    let queryBuilder = ctx.db.query("products");
    
    const products = await queryBuilder.collect();
    
    let filtered = products;
    if (args.published !== undefined) {
      filtered = products.filter((p) => p.isPublished === args.published);
    }

    return filtered.slice(0, args.limit || 50);
  },
});

// Admin mutation: publish a draft product
export const publish = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    await ctx.db.patch(args.id, {
      isDraft: false,
      isPublished: true,
      updatedAt: Date.now(),
    });
    return args.id;
  },
});

// Admin mutation: unpublish product
export const unpublish = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    await ctx.db.patch(args.id, {
      isDraft: true,
      isPublished: false,
      updatedAt: Date.now(),
    });
    return args.id;
  },
});

// Public action: get image preview URLs
export const getImageUrls = action({
  args: { fileIds: v.array(v.id("_storage")) },
  handler: async (ctx, args) => {
    const urls: Record<string, string> = {};
    for (const fileId of args.fileIds) {
      const url = await ctx.storage.getUrl(fileId);
      if (url) {
        urls[fileId] = url;
      }
    }
    return urls;
  },
});

// Admin query: find product by slug or CAS number (for import updates)
export const findBySlugOrCas = query({
  args: {
    slug: v.optional(v.string()),
    casNumber: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    if (args.slug) {
      const product = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", args.slug))
        .unique();
      if (product) return product;
    }
    
    if (args.casNumber) {
      const products = await ctx.db.query("products").collect();
      const product = products.find((p) => p.casNumber === args.casNumber);
      if (product) return product;
    }
    
    return null;
  },
});

// Admin mutation: upsert product (create or update)
export const upsert = mutation({
  args: {
    existingId: v.optional(v.id("products")),
    name: v.string(),
    slug: v.string(),
    casNumber: v.string(),
    unNumber: v.optional(v.string()),
    category: v.union(
      v.literal("acids"),
      v.literal("solvents"),
      v.literal("reagents"),
      v.literal("salts"),
      v.literal("glass-chemicals"),
      v.literal("other")
    ),
    grade: v.union(
      v.literal("technical"),
      v.literal("commercial"),
      v.literal("lab"),
      v.literal("pharma")
    ),
    description: v.string(),
    descriptionHi: v.optional(v.string()),
    purityMin: v.optional(v.number()),
    purityMax: v.optional(v.number()),
    packagingOptions: v.array(
      v.object({
        size: v.string(),
        unit: v.union(
          v.literal("KG"),
          v.literal("L"),
          v.literal("ML"),
          v.literal("G"),
          v.literal("MT")
        ),
      })
    ),
    ghsSignalWord: v.optional(
      v.union(v.literal("DANGER"), v.literal("WARNING"))
    ),
    ghsPictograms: v.array(v.string()),
    images: v.optional(
      v.array(
        v.object({
          fileId: v.id("_storage"),
          isPrimary: v.boolean(),
        })
      )
    ),
    sdsFileId: v.optional(v.id("_storage")),
    sdsVersion: v.optional(v.string()),
    sdsIssuedAt: v.optional(v.number()),
    applications: v.array(v.string()),
    relatedProductIds: v.optional(v.array(v.id("products"))),
    erpProductCode: v.optional(v.string()),
    isPublished: v.boolean(),
    isDraft: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready
    
    const { existingId, ...productData } = args;
    
    if (existingId) {
      // Update existing product
      await ctx.db.patch(existingId, {
        ...productData,
        updatedAt: Date.now(),
      });
      return { id: existingId, action: "updated" as const };
    } else {
      // Create new product
      const id = await ctx.db.insert("products", {
        ...productData,
        images: productData.images || [],
        relatedProductIds: productData.relatedProductIds || [],
        isDraft: productData.isDraft !== false,
        isPublished: productData.isPublished || false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return { id, action: "created" as const };
    }
  },
});
