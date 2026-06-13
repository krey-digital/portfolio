import { httpAction, internalMutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";

// HTTP action to receive webhook from ERP system
export const receiveProductUpdate = httpAction(async (ctx, request) => {
  // Validate webhook secret header
  const secret = request.headers.get("x-webhook-secret");
  const expectedSecret =
    process.env.ERP_WEBHOOK_SECRET || "default-secret-change-me";

  if (secret !== expectedSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const payload = await request.json();

    // Log the webhook event
    await ctx.runMutation(internal.erp.logWebhookEvent, {
      event: "product.updated",
      payload: JSON.stringify(payload),
      status: "success",
    });

    // Process the update
    // Example: Update product availability, pricing notes, etc.
    // TODO: Implement ERP product lookup and sync when needed
    // if (payload.erpProductCode && payload.availability !== undefined) {
    //   // Find product by ERP code and update
    //   const product = await ctx.db.query("products")
    //     .filter(p => p.eq(p.field("erpProductCode"), payload.erpProductCode))
    //     .unique();
    // }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("ERP webhook error:", error);

    await ctx.runMutation(internal.erp.logWebhookEvent, {
      event: "product.updated",
      payload: JSON.stringify({ error: String(error) }),
      status: "failed",
    });

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Internal: Log webhook event
export const logWebhookEvent = internalMutation({
  args: {
    event: v.string(),
    payload: v.string(),
    status: v.union(v.literal("success"), v.literal("failed")),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("erpWebhookLog", {
      event: args.event,
      payload: args.payload,
      status: args.status,
      createdAt: Date.now(),
    });
  },
});

// Internal: Get product by ERP code
export const getProductByErpCode = query({
  args: { erpProductCode: v.string() },
  handler: async (ctx, args) => {
    // This would need a proper index or search
    const products = await ctx.db.query("products").collect();
    return products.filter((p) => p.erpProductCode === args.erpProductCode);
  },
});

// Get webhook event log (admin only)
export const getWebhookLog = query({
  args: {
    event: v.optional(v.string()),
    status: v.optional(v.union(v.literal("success"), v.literal("failed"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when ready

    let queryBuilder = ctx.db.query("erpWebhookLog");

    if (args.event) {
      queryBuilder = queryBuilder.filter((q) =>
        q.eq(q.field("event"), args.event)
      );
    }

    if (args.status) {
      queryBuilder = queryBuilder.filter((q) =>
        q.eq(q.field("status"), args.status)
      );
    }

    const logs = await queryBuilder.collect();
    return logs.slice(0, args.limit || 20);
  },
});

// Get recent webhook activity (admin only)
export const getWebhookStats = query({
  args: {},
  handler: async (ctx) => {
    // TODO: Add auth check when ready

    const logs = await ctx.db.query("erpWebhookLog").collect();
    const lastDay = Date.now() - 24 * 60 * 60 * 1000;
    const lastWeek = Date.now() - 7 * 24 * 60 * 60 * 1000;

    return {
      totalWebhooks: logs.length,
      successCount: logs.filter((l) => l.status === "success").length,
      failedCount: logs.filter((l) => l.status === "failed").length,
      lastDayCount: logs.filter((l) => l.createdAt > lastDay).length,
      lastWeekCount: logs.filter((l) => l.createdAt > lastWeek).length,
      lastWebhookTime: logs.length > 0 ? logs[0].createdAt : null,
    };
  },
});

// Receive inquiry export to ERP (called after admin creates inquiry)
export const exportInquiryToErp = internalMutation({
  args: {
    inquiryId: v.id("inquiries"),
  },
  handler: async (ctx, args) => {
    const inquiry = await ctx.db.get(args.inquiryId);
    if (!inquiry) {
      throw new ConvexError("Inquiry not found");
    }

    // In production, would call ERP API here
    // const response = await fetch(process.env.ERP_INQUIRY_ENDPOINT, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.ERP_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     name: inquiry.name,
    //     company: inquiry.company,
    //     productName: inquiry.productName,
    //     quantity: inquiry.quantity,
    //     email: inquiry.email,
    //   }),
    // });

    // Log the export event
    await ctx.db.insert("erpWebhookLog", {
      event: "inquiry.exported",
      payload: JSON.stringify(inquiry),
      status: "success",
      createdAt: Date.now(),
    });

    return true;
  },
});
