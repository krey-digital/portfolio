/* ─────────────────────────────────────────────────────────────────
   Niche Projects Data
   Source: /projects folder brochures (PDF analysis)
   Each niche maps to a URL slug: /services/[serviceSlug]/[nicheSlug]
──────────────────────────────────────────────────────────────────── */

export interface TierPage {
  name: string;
  description: string;
}

export interface TierFeature {
  title: string;
  description: string;
}

export interface ProjectTier {
  tier: number;
  label: string;
  tagline: string;
  price: string;
  priceNote: string;
  description: string;
  pages: TierPage[];
  keyCapabilities: TierFeature[];
  supportFunctions: string[];
  techStack: { name: string; role: string }[];
  deliveryTime: string;
  videoId: string | null;
  brochurePdf: string | null;
  demoUrl?: string;
  demoLabel?: string;
  accent: string;
  highlights: string[]; // Top 4-5 selling points for hero
}

export interface NicheProject {
  niche: string;           // Exact niche name (matches pill)
  nicheSlug: string;       // URL-safe slug
  serviceSlug: string;     // Parent service slug
  headline: string;
  intro: string;
  coverImage: string;
  tiers: ProjectTier[];
}

/* ─────────────────────────────────────────────────────────────────
   CHEMICAL BUSINESS (from Krey Digital brochures)
──────────────────────────────────────────────────────────────────── */
export const NICHE_PROJECTS: NicheProject[] = [
  {
    niche: 'Chemical Manufacturers',
    nicheSlug: 'chemical-manufacturers',
    serviceSlug: 'web-development',
    headline: 'Professional Website Development for Chemical Businesses',
    intro:
      'Purpose-built web solutions for chemical manufacturers, distributors, and trading companies in India. From a high-trust brochure site to a fully integrated B2B platform with buyer portal and ERP sync — choose the tier that matches your business stage.',
    coverImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&fit=crop',
    tiers: [
      /* ── TIER 1 ── */
      {
        tier: 1,
        label: 'Informative / Brochure Website',
        tagline: 'Establish trust. Showcase products. Generate leads.',
        price: '₹20,000',
        priceNote: 'One-time. No recurring platform fee.',
        description:
          'A professional, static brochure website that puts your chemical business on the map — built with Next.js 14 and fully optimised for Google. Showcases your product range, certifications, and company story with a clean, trust-building design. Perfect for businesses wanting a credible web presence without a backend.',
        highlights: [
          'Static Site — 95+ Google Lighthouse score',
          '7-page professional website',
          'WhatsApp & Contact Form lead capture',
          'ISO/GMP Certification showcase',
          'SEO-optimised for Google ranking',
          'Delivered in 7–10 working days',
        ],
        pages: [
          { name: 'Home', description: 'Hero section, product category overview, certifications banner, client testimonials, and CTA' },
          { name: 'About', description: 'Company story, mission & values, team, manufacturing facility details' },
          { name: 'Products', description: 'Product category cards with descriptions, applications, and grades' },
          { name: 'Certifications', description: 'ISO/GMP certificate display, compliance information, quality standards' },
          { name: 'Contact', description: 'Contact form (Formspree), business hours, WhatsApp CTA, Google Maps embed' },
          { name: 'Privacy Policy', description: 'Data protection policy, GDPR-compliant content' },
          { name: 'Terms of Service', description: 'Terms and conditions for website usage' },
        ],
        keyCapabilities: [
          { title: 'Product Catalogue', description: 'Organized product categories with CAS numbers, grades (Technical/Lab/Pharma), packaging options, and applications — all managed from TypeScript content files.' },
          { title: 'Certifications Showcase', description: 'Dedicated certifications page with ISO/GMP badge display, issuing body details, and downloadable certificate links to build buyer trust.' },
          { title: 'Lead Generation', description: 'Formspree contact form with inquiry types (RFQ, General, COA), plus a floating WhatsApp button for instant messaging — captures leads 24/7.' },
          { title: 'Google Maps & Location', description: 'Embedded Google Maps for office/factory location, business hours, and directions — essential for walk-in buyers and distributors.' },
          { title: 'SEO Optimisation', description: 'Proper meta tags, OpenGraph, sitemap.xml, robots.txt, and semantic HTML structure — built to rank on Google for chemical product searches.' },
          { title: 'Client Testimonials', description: 'Curated testimonial section with client company names and quotes — builds social proof for new buyers visiting the site.' },
          { title: 'WhatsApp Integration', description: 'One-click WhatsApp CTA button linked to your business number — the most-used lead channel for Indian chemical businesses.' },
          { title: 'Fully Responsive', description: 'Mobile-first design that works flawlessly across all screen sizes — phones, tablets, desktops, and industrial monitors.' },
        ],
        supportFunctions: [
          'Free content updates for 30 days post-launch',
          'Formspree setup and form testing',
          'Google Analytics 4 setup and verification',
          'Google Search Console submission',
          'Domain configuration assistance (if hosted on Vercel/Netlify)',
          'WhatsApp Business number integration',
          'Basic SEO keyword optimisation',
          'Performance audit post-launch',
        ],
        techStack: [
          { name: 'Next.js 14', role: 'React framework with SSG (Static Site Generation)' },
          { name: 'TypeScript', role: 'Type-safe codebase for reliability and maintainability' },
          { name: 'Tailwind CSS', role: 'Utility-first CSS for fast, responsive styling' },
          { name: 'Formspree', role: 'Backend-free contact form handling with email notifications' },
          { name: 'Vercel / Netlify', role: 'Free hosting with global CDN and automatic deployments' },
          { name: 'Google Analytics 4', role: 'Visitor tracking, page views, lead form analytics' },
        ],
        deliveryTime: '7–10 working days',
        videoId: null,
        brochurePdf: '/brochures/chemical-business/tier-1-brochure.pdf',
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Live Demo',
        accent: '#34d399',
      },

      /* ── TIER 2 ── */
      {
        tier: 2,
        label: 'Informative + Admin Platform',
        tagline: 'Dynamic catalogue. Real-time inquiry management. No code required.',
        price: '₹55,000',
        priceNote: 'One-time + ₹1,500/month Convex DB hosting.',
        description:
          'Everything in Tier 1 plus a powerful real-time database (Convex) and a private admin dashboard where you can manage products, track inquiries, upload SDS documents, and publish certifications — all without touching code. Your team manages the website like a CMS.',
        highlights: [
          'Full Admin Dashboard — manage without a developer',
          'Real-time product catalogue with 500+ product support',
          'SDS (Safety Data Sheet) upload & download system',
          'Inquiry inbox with RFQ pipeline tracking',
          'GHS-compliant product pages with pictograms',
          'CSV/JSON bulk product import',
        ],
        pages: [
          { name: 'Home', description: 'Dynamic hero, live product counts, featured products, certifications, testimonials' },
          { name: 'About', description: 'Company story, mission, facility, values, team section' },
          { name: 'Products', description: 'Filterable product catalogue — by category, grade, application. Individual product detail pages.' },
          { name: 'Product Detail', description: 'CAS number, purity range, GHS pictograms, packaging options, SDS download, RFQ form' },
          { name: 'Certifications', description: 'Admin-managed certifications with expiry tracking and file storage' },
          { name: 'Contact', description: 'Multi-type inquiry form (RFQ, COA, TDS, General), WhatsApp, Maps' },
          { name: 'Admin — Dashboard', description: 'Overview metrics: total products, new inquiries, pending RFQs, certifications expiring' },
          { name: 'Admin — Products', description: 'Create/edit/delete products. Bulk import via CSV. Draft/Publish toggle.' },
          { name: 'Admin — Inquiries', description: 'View all inquiries with status pipeline: New → Contacted → Quoted → Closed. Add admin notes.' },
          { name: 'Admin — Certifications', description: 'Upload certification files, set expiry dates, toggle active status' },
        ],
        keyCapabilities: [
          { title: 'Real-time Database', description: 'Convex DB provides instant, real-time data sync. Product updates go live the moment you save — no build step, no deployment delay.' },
          { title: 'GHS-Compliant Products', description: 'Each product page displays GHS pictograms, signal words (DANGER/WARNING), UN numbers, and purity ranges — exactly what industrial buyers expect.' },
          { title: 'SDS Document System', description: 'Upload Safety Data Sheets per product with version tracking. Buyers can download directly from the product page — no email required.' },
          { title: 'Inquiry Management', description: 'Full inquiry inbox with status tracking. Mark inquiries as New, Contacted, Quoted, or Closed. Add internal admin notes per inquiry.' },
          { title: 'Bulk Product Import', description: 'Import hundreds of products at once via CSV or JSON file. The import history panel shows success/failure counts and error details per row.' },
          { title: 'Draft & Publish', description: 'Create product drafts internally, review, then publish when ready. Unpublished products are invisible to website visitors.' },
          { title: 'Admin Authentication', description: 'Secure admin panel protected by Clerk authentication. Only authorised email addresses can access the dashboard.' },
          { title: 'Packaging Options', description: 'Each product can have multiple packaging sizes (KG, L, ML, G, MT) — displayed clearly for industrial buyers calculating order quantities.' },
        ],
        supportFunctions: [
          'Admin panel walkthrough training session (1 hour)',
          'Initial product data migration (up to 100 products)',
          'CSV import template provided',
          'SDS upload assistance for first batch',
          'Convex DB setup and environment configuration',
          'Clerk Auth setup with your team email addresses',
          '60-day post-launch support for bugs and adjustments',
          'Google Analytics 4 + Search Console setup',
        ],
        techStack: [
          { name: 'Next.js 14', role: 'React framework with SSG + Server Components' },
          { name: 'Convex DB', role: 'Real-time database with automatic sync and file storage' },
          { name: 'Clerk Auth', role: 'Admin authentication and access control' },
          { name: 'TypeScript', role: 'Type-safe full-stack codebase' },
          { name: 'Tailwind CSS', role: 'Responsive, utility-first styling' },
          { name: 'Vercel', role: 'Hosting with serverless functions and edge CDN' },
        ],
        deliveryTime: '3–4 weeks',
        videoId: null,
        brochurePdf: '/brochures/chemical-business/tier-2-brochure.pdf',
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Live Demo',
        accent: '#60a5fa',
      },

      /* ── TIER 3 ── */
      {
        tier: 3,
        label: 'Advanced B2B Platform',
        tagline: 'Buyer portal, ERP sync, multi-product quoting & bilingual CMS.',
        price: '₹1,20,000',
        priceNote: 'One-time + ₹3,000/month platform hosting.',
        description:
          'The complete B2B digital platform for scaling chemical businesses. Built for companies with 1000+ product SKUs, registered buyer accounts, multi-product quote requests, ERP webhook integration, a bilingual (English + Hindi) blog and case-study CMS, and advanced SDS versioning with per-buyer download logs.',
        highlights: [
          'Buyer portal with accounts, quote history & SDS access',
          'Multi-product quote cart — submit one request for many chemicals',
          'ERP webhook sync for real-time stock & pricing updates',
          'Bilingual content — English + Hindi across all pages',
          'Blog & case-study CMS with Tiptap rich editor',
          'Advanced SDS versioning with per-buyer download audit log',
        ],
        pages: [
          { name: 'Home', description: 'Full dynamic homepage with featured products, blog highlights, case studies, certifications, global reach stats' },
          { name: 'Products', description: 'Advanced search index, full-text search, filter by category/grade/application, related products' },
          { name: 'Product Detail', description: 'Full GHS page, SDS version history, quote add-to-cart, related products, bilingual description' },
          { name: 'Blog', description: 'Tiptap CMS-powered blog with categories (Regulatory, Market, Application, Company), EN/HI toggle' },
          { name: 'Case Studies', description: 'Industry vertical case studies linked to specific products, cover images, published by admin' },
          { name: 'Quote Request', description: 'Multi-product quote cart — add multiple chemicals with quantities, packaging, destination, submit as one RFQ' },
          { name: 'Buyer Dashboard', description: 'Registered buyer\'s personal dashboard: quote history, SDS download log, account settings' },
          { name: 'Admin — Buyers', description: 'View all registered buyers, verify accounts, view their quote and SDS download history' },
          { name: 'Admin — Quotes', description: 'Multi-product quote management: review → respond with pricing → mark accepted/declined' },
          { name: 'Admin — Blog', description: 'Create/edit blog posts and case studies with Tiptap editor. Publish/draft toggle. EN + HI content.' },
          { name: 'Admin — SDS', description: 'Upload new SDS versions per product. View version history. See which buyers downloaded which version.' },
          { name: 'Admin — ERP Log', description: 'Webhook event log for ERP sync: event type, payload, success/failure status, timestamp' },
        ],
        keyCapabilities: [
          { title: 'Buyer Portal & Accounts', description: 'Buyers register with company name, GSTIN, city, and phone. Verified accounts get access to gated SDS downloads and full quote history.' },
          { title: 'Multi-Product Quote Cart', description: 'Buyers add multiple chemicals to a quote cart — specifying quantity, unit, and packaging for each — then submit as a single RFQ. Admins respond with consolidated pricing.' },
          { title: 'ERP Webhook Integration', description: 'Your ERP system pushes stock and pricing updates via webhooks. The platform receives, logs, and applies them automatically — keeping product data in sync without manual intervention.' },
          { title: 'Advanced SDS Versioning', description: 'Each SDS upload creates a new version record with uploader, timestamp, and "isLatest" flag. Buyer downloads are logged per-buyer — creating a full audit trail for compliance.' },
          { title: 'Bilingual CMS', description: 'Every product, blog post, and case study has an optional Hindi translation field. A language toggle on the frontend serves EN or HI content based on user preference.' },
          { title: 'Tiptap Blog & Case Studies', description: 'Full rich-text editor with headings, images, tables, and code blocks. Admins write and publish blog posts and case studies without any developer involvement.' },
          { title: 'Full-Text Product Search', description: 'Convex search index enables real-time full-text search across product names, with filters for category and grade — helping buyers find chemicals in seconds.' },
          { title: 'Related Products & Cross-Sell', description: 'Admin-curated related product links on each product page — increasing page depth, reducing bounce rate, and helping buyers discover complementary chemicals.' },
        ],
        supportFunctions: [
          '2-hour admin & buyer portal training session',
          'Full product data migration (unlimited products)',
          'ERP webhook endpoint documentation and testing',
          'Initial blog/case study content setup assistance',
          'Convex DB + Clerk Auth advanced configuration',
          'Buyer account import from existing CRM/Excel',
          '90-day post-launch priority support',
          'Performance audit and Core Web Vitals optimisation',
          'SEO advanced setup: schema markup, hreflang for EN/HI',
        ],
        techStack: [
          { name: 'Next.js 14', role: 'Full-stack React with App Router, Server Components, API routes' },
          { name: 'Convex DB', role: 'Real-time DB with search index, file storage, webhooks' },
          { name: 'Clerk Auth', role: 'Buyer and admin authentication with role-based access' },
          { name: 'Tiptap', role: 'Rich-text CMS editor for blog and case studies' },
          { name: 'TypeScript', role: 'End-to-end type safety across client and server' },
          { name: 'Tailwind CSS', role: 'Responsive design system' },
          { name: 'Vercel', role: 'Edge hosting, serverless API, automatic deployments' },
        ],
        deliveryTime: '6–8 weeks',
        videoId: null,
        brochurePdf: '/brochures/chemical-business/tier-3-brochure.pdf',
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Live Demo',
        accent: '#a78bfa',
      },
    ],
  },
];

/* Utility: find by slug */
export const getNicheProject = (nicheSlug: string): NicheProject | null =>
  NICHE_PROJECTS.find((p) => p.nicheSlug === nicheSlug) ?? null;

export const getNicheByName = (niche: string): NicheProject | null =>
  NICHE_PROJECTS.find((p) => p.niche === niche) ?? null;

/** Map niche name → nicheSlug for URL routing */
export const NICHE_SLUG_MAP: Record<string, { nicheSlug: string; serviceSlug: string }> = Object.fromEntries(
  NICHE_PROJECTS.map((p) => [p.niche, { nicheSlug: p.nicheSlug, serviceSlug: p.serviceSlug }])
);
