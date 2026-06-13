import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Products catalog
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    casNumber: v.string(), // Format: XXXXXXX-XX-X
    unNumber: v.optional(v.string()), // Format: UN####
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
    descriptionHi: v.optional(v.string()), // Hindi description for Tier 3
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
    ghsSignalWord: v.optional(v.union(v.literal("DANGER"), v.literal("WARNING"))),
    ghsPictograms: v.array(v.string()), // ["GHS01", "GHS05"]
    images: v.optional(
      v.array(
        v.object({
          fileId: v.id("_storage"),
          isPrimary: v.boolean(),
        })
      )
    ), // Product images with one marked as primary
    sdsFileId: v.optional(v.id("_storage")), // Direct SDS file (Tier 2 style)
    sdsVersion: v.optional(v.string()),
    sdsIssuedAt: v.optional(v.number()),
    currentSdsId: v.optional(v.id("sdsVersions")), // Advanced SDS versioning (Tier 3)
    applications: v.array(v.string()),
    relatedProductIds: v.optional(v.array(v.id("products"))), // Tier 3 feature
    erpProductCode: v.optional(v.string()), // Tier 3 ERP integration
    isPublished: v.boolean(),
    isDraft: v.boolean(), // true = draft (unpublished), false = published
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_published", ["isPublished"])
    .index("by_draft", ["isDraft"])
    .searchIndex("search_products", { searchField: "name", filterFields: ["category", "grade"] }),

  // SDS version history
  sdsVersions: defineTable({
    productId: v.id("products"),
    fileId: v.id("_storage"),
    version: v.string(),
    issuedAt: v.number(),
    revisedAt: v.optional(v.number()),
    uploadedBy: v.string(),
    isLatest: v.boolean(),
  })
    .index("by_product", ["productId"])
    .index("by_latest", ["productId", "isLatest"]),

  // Product inquiries and RFQs
  inquiries: defineTable({
    productId: v.optional(v.id("products")),
    productName: v.optional(v.string()),
    buyerId: v.optional(v.id("buyers")),
    name: v.string(),
    company: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    quantity: v.optional(v.string()),
    destination: v.optional(v.string()),
    message: v.string(),
    type: v.union(v.literal("rfq"), v.literal("coa"), v.literal("tds"), v.literal("general")),
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("quoted"), v.literal("closed")),
    adminNotes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_buyer", ["buyerId"])
    .index("by_created", ["createdAt"]),

  // Multi-product quote requests (cart)
  quoteRequests: defineTable({
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
    status: v.union(
      v.literal("submitted"),
      v.literal("reviewing"),
      v.literal("quoted"),
      v.literal("accepted"),
      v.literal("declined")
    ),
    adminResponse: v.optional(v.string()),
    quotedPricing: v.optional(v.string()),
    createdAt: v.number(),
    respondedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_buyer", ["buyerId"]),

  // Buyer accounts
  buyers: defineTable({
    userId: v.string(),
    name: v.string(),
    company: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    gstin: v.optional(v.string()),
    city: v.optional(v.string()),
    isVerified: v.boolean(),
    sdsDownloadLog: v.array(
      v.object({
        productId: v.id("products"),
        sdsVersionId: v.id("sdsVersions"),
        downloadedAt: v.number(),
      })
    ),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_email", ["email"]),

  // Blog posts with Tiptap JSON content
  blogPosts: defineTable({
    title: v.string(),
    titleHi: v.optional(v.string()),
    slug: v.string(),
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
    isPublished: v.boolean(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["isPublished"])
    .searchIndex("search_blog", { searchField: "title", filterFields: ["category"] }),

  // Case studies
  caseStudies: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    body: v.string(),
    industryVertical: v.string(),
    productIds: v.array(v.id("products")),
    coverImageId: v.optional(v.id("_storage")),
    isPublished: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["isPublished"]),

  // Certifications
  certifications: defineTable({
    name: v.string(),
    issuingBody: v.string(),
    certNumber: v.optional(v.string()),
    issuedAt: v.number(),
    expiresAt: v.optional(v.number()),
    fileId: v.optional(v.id("_storage")),
    isActive: v.boolean(),
  }),

  // ERP webhook event log
  erpWebhookLog: defineTable({
    event: v.string(),
    payload: v.string(),
    status: v.union(v.literal("success"), v.literal("failed")),
    createdAt: v.number(),
  }),

  // Import history tracking
  importHistory: defineTable({
    fileName: v.string(),
    fileType: v.union(v.literal("csv"), v.literal("json")),
    totalRecords: v.number(),
    successCount: v.number(),
    failedCount: v.number(),
    updatedCount: v.number(),
    errors: v.array(v.string()),
    importedBy: v.string(), // admin email or user ID
    createdAt: v.number(),
  }).index("by_created", ["createdAt"]),
});
