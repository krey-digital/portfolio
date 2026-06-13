'use client';

import React, { createContext, useContext, ReactNode } from 'react';

export interface SubService {
  id: number;
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  demoLabel: string;
  /** Image shown on the sub-service card */
  previewImage: string;
  /** Accent colour for this specific sub-service */
  accent: string;
}

export interface ServiceCategory {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  accent: string;
  bgColor: string;
  textColor: string;
  subServices: SubService[];
}

const servicesData: ServiceCategory[] = [
  /* ───────────────────────────────────────────────
     1. UI/UX DESIGN
  ─────────────────────────────────────────────── */
  {
    slug: 'ui-ux-design',
    title: 'UI/UX Design',
    tagline: 'Interfaces that feel as good as they look.',
    category: 'DESIGN • STRATEGY',
    description:
      'From wireframes to pixel-perfect prototypes, I craft intuitive, visually compelling interfaces rooted in user research and modern design systems.',
    accent: '#a78bfa',
    bgColor: '#1a1025',
    textColor: '#e9d5ff',
    subServices: [
      {
        id: 0,
        title: 'Landing Page Design',
        description:
          'High-converting, visually stunning landing pages that captivate visitors and drive action — built in Figma with precise developer hand-off.',
        tags: ['Figma', 'Wireframing', 'Prototyping', 'Conversion Design'],
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Demo — Bonus Galaxy',
        previewImage:
          'https://bonus-galaxy-demo.vercel.app/images/captaion-klaus.jpg',
        accent: '#c4b5fd',
      },
      {
        id: 1,
        title: 'Web App UI Design',
        description:
          'Complex dashboards and multi-page web applications designed with clarity, consistency, and a scalable design system.',
        tags: ['Design Systems', 'Component Libraries', 'Figma Auto-Layout'],
        demoUrl: 'https://demo-upd-123.vercel.app/',
        demoLabel: 'View Demo — Unlimited Perfect Deals',
        previewImage:
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&fit=crop',
        accent: '#a78bfa',
      },
      {
        id: 2,
        title: 'Mobile App UI Design',
        description:
          'Native-quality mobile UI adhering to platform guidelines while expressing a unique brand identity across every screen.',
        tags: ['Flutter UI', 'Material Design', 'iOS Guidelines', 'Responsive'],
        demoUrl: 'https://play.google.com/store/apps/details?id=com.heatbubble.app',
        demoLabel: 'View App — HeatBubble',
        previewImage:
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&fit=crop',
        accent: '#7c3aed',
      },
    ],
  },

  /* ───────────────────────────────────────────────
     2. WEB DEVELOPMENT
  ─────────────────────────────────────────────── */
  {
    slug: 'web-development',
    title: 'Web Development',
    tagline: 'Industry-specific websites built to perform.',
    category: 'DEVELOPMENT • ENGINEERING',
    description:
      'Tailored web solutions for every industry — from chemical businesses to SaaS platforms — built with Next.js, TypeScript, and modern backend integrations.',
    accent: '#34d399',
    bgColor: '#0d1f17',
    textColor: '#a7f3d0',
    subServices: [
      {
        id: 0,
        title: 'Chemical Business Website',
        description:
          'Professional brochure and catalogue websites for chemical companies — showcasing product lines, safety data sheets, certifications, and compliance information with a clean, trust-building design.',
        tags: ['Next.js', 'Brochure Site', 'Product Catalogue', 'SEO', 'Tailwind CSS'],
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Demo',
        previewImage:
          'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&fit=crop',
        accent: '#34d399',
      },
      {
        id: 1,
        title: 'Business / Corporate Website',
        description:
          'Polished corporate websites that establish credibility, communicate your value proposition, and generate leads — with seamless contact forms and CMS integration.',
        tags: ['Next.js', 'CMS Integration', 'Lead Generation', 'TypeScript', 'SEO'],
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Demo — Bonus Galaxy',
        previewImage:
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&fit=crop',
        accent: '#6ee7b7',
      },
      {
        id: 2,
        title: 'Dental Booking System',
        description:
          'Full-stack dental clinic websites with online appointment booking, patient portals, treatment showcases, and automated email/SMS reminders.',
        tags: ['Next.js', 'Booking System', 'Calendar API', 'Email Automation', 'PostgreSQL'],
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Demo',
        previewImage:
          'https://images.unsplash.com/photo-1588776814546-1ffbb172ef05?w=800&fit=crop',
        accent: '#5eead4',
      },
      {
        id: 3,
        title: 'E-Commerce Store',
        description:
          'High-converting online stores with product management, cart, checkout, payment gateway integration, and an admin dashboard for real-time inventory and order tracking.',
        tags: ['Next.js', 'Stripe / Razorpay', 'Admin Dashboard', 'REST API', 'TypeScript'],
        demoUrl: 'https://demo-upd-123.vercel.app/',
        demoLabel: 'View Demo — UPD Marketplace',
        previewImage:
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&fit=crop',
        accent: '#10b981',
      },
      {
        id: 4,
        title: 'SaaS Platform',
        description:
          'Scalable Software-as-a-Service web apps with authentication, subscription billing, role-based access control, and analytics dashboards — ready to onboard your first paying customers.',
        tags: ['Next.js', 'Auth.js', 'Stripe Billing', 'Prisma / Supabase', 'TypeScript'],
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Demo',
        previewImage:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop',
        accent: '#2dd4bf',
      },
    ],
  },

  /* ───────────────────────────────────────────────
     3. MOBILE APP DEVELOPMENT
  ─────────────────────────────────────────────── */
  {
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    tagline: 'Cross-platform apps that feel truly native.',
    category: 'MOBILE • CROSS-PLATFORM',
    description:
      'End-to-end Flutter apps shipped to the Google Play Store and Apple App Store — from architecture to deployment.',
    accent: '#60a5fa',
    bgColor: '#0d1626',
    textColor: '#bfdbfe',
    subServices: [
      {
        id: 0,
        title: 'Emergency & Safety Apps',
        description:
          'Mission-critical, real-time mobile applications for emergency response, incident tracking, and public safety with push alerts.',
        tags: ['Flutter', 'Firebase', 'Push Notifications', 'Maps API'],
        demoUrl: 'https://socalwildfire.org/',
        demoLabel: 'View Project — LAIT911',
        previewImage:
          'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&fit=crop',
        accent: '#f87171',
      },
      {
        id: 1,
        title: 'Utility & Productivity Apps',
        description:
          'Clean, lightweight utility apps with beautiful UIs, background services, home screen widgets, and optional premium tiers.',
        tags: ['Flutter', 'Background Services', 'AdMob', 'In-App Purchase'],
        demoUrl: 'https://play.google.com/store/apps/details?id=com.heatbubble.app',
        demoLabel: 'View App — HeatBubble',
        previewImage:
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&fit=crop',
        accent: '#60a5fa',
      },
      {
        id: 2,
        title: 'App Store Optimisation & Publishing',
        description:
          'Full Play Store / App Store submission including screenshots, store listing copy, signing, and release management.',
        tags: ['Play Console', 'App Store Connect', 'ASO', 'Release Management'],
        demoUrl: 'https://play.google.com/store/apps/details?id=com.heatbubble.app',
        demoLabel: 'View on Play Store',
        previewImage:
          'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&fit=crop',
        accent: '#38bdf8',
      },
    ],
  },

  /* ───────────────────────────────────────────────
     4. BRAND IDENTITY
  ─────────────────────────────────────────────── */
  {
    slug: 'brand-identity',
    title: 'Brand Identity',
    tagline: 'A visual language that speaks before you do.',
    category: 'BRANDING • VISUAL DESIGN',
    description:
      'Defining your brand from the ground up — logo, colour palette, typography, and guidelines that scale across every touchpoint.',
    accent: '#fb923c',
    bgColor: '#1f1008',
    textColor: '#fed7aa',
    subServices: [
      {
        id: 0,
        title: 'Logo & Mark Design',
        description:
          'Distinctive, memorable logos crafted to work across digital, print, and motion contexts — delivered in all formats.',
        tags: ['Figma', 'Illustrator', 'SVG', 'Brand Marks'],
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Identity — Bonus Galaxy',
        previewImage:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&fit=crop',
        accent: '#fb923c',
      },
      {
        id: 1,
        title: 'Brand Guidelines',
        description:
          'Comprehensive brand style guides covering usage rules, colour systems, typography scales, and do/don\'t examples.',
        tags: ['Style Guide', 'Color Systems', 'Typography', 'Documentation'],
        demoUrl: 'https://demo-upd-123.vercel.app/',
        demoLabel: 'View Branding — UPD',
        previewImage:
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&fit=crop',
        accent: '#f97316',
      },
      {
        id: 2,
        title: 'Marketing Collateral',
        description:
          'Social media kits, pitch decks, banners, and promotional assets that maintain visual consistency across campaigns.',
        tags: ['Social Media Kit', 'Pitch Decks', 'Banners', 'Print Assets'],
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Demo — Bonus Galaxy',
        previewImage:
          'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&fit=crop',
        accent: '#fdba74',
      },
    ],
  },

  /* ───────────────────────────────────────────────
     5. MOTION & ANIMATION
  ─────────────────────────────────────────────── */
  {
    slug: 'motion-animation',
    title: 'Motion & Animation',
    tagline: 'Bring your interface to life.',
    category: 'ANIMATION • INTERACTION',
    description:
      'Purposeful micro-interactions, scroll-driven animations, and page transitions that make digital experiences feel alive and premium.',
    accent: '#f472b6',
    bgColor: '#1f0a18',
    textColor: '#fbcfe8',
    subServices: [
      {
        id: 0,
        title: 'Page Transitions & Scroll Animation',
        description:
          'Silky smooth page transitions and scroll-driven reveal animations using GSAP and Framer Motion — as seen on this portfolio.',
        tags: ['GSAP', 'Framer Motion', 'Locomotive Scroll', 'Next.js'],
        demoUrl: 'https://hetrajsinh-portfolio.vercel.app/',
        demoLabel: 'Experience It Here',
        previewImage:
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&fit=crop',
        accent: '#f472b6',
      },
      {
        id: 1,
        title: 'Micro-Interactions & Hover Effects',
        description:
          'Delightful hover states, button animations, and interactive feedback that elevate perceived quality and user engagement.',
        tags: ['CSS Animations', 'GSAP', 'React Spring', 'UX Design'],
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Demo — Bonus Galaxy',
        previewImage:
          'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&fit=crop',
        accent: '#e879f9',
      },
      {
        id: 2,
        title: 'Loading & Skeleton Animations',
        description:
          'Branded loading screens, skeleton placeholders, and progress indicators that keep users engaged while content loads.',
        tags: ['Lottie', 'CSS', 'Skeleton UI', 'Performance'],
        demoUrl: 'https://demo-upd-123.vercel.app/',
        demoLabel: 'View Demo — UPD',
        previewImage:
          'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=800&fit=crop',
        accent: '#d946ef',
      },
    ],
  },

  /* ───────────────────────────────────────────────
     6. SEO & PERFORMANCE
  ─────────────────────────────────────────────── */
  {
    slug: 'seo-performance',
    title: 'SEO & Performance',
    tagline: 'Rank higher. Load faster. Convert better.',
    category: 'GROWTH • OPTIMISATION',
    description:
      'Technical SEO audits, Core Web Vitals optimisation, and analytics setup that turn your website into a high-performing growth engine.',
    accent: '#facc15',
    bgColor: '#1a1500',
    textColor: '#fef08a',
    subServices: [
      {
        id: 0,
        title: 'Technical SEO Audit',
        description:
          'A thorough audit covering crawlability, meta structure, schema markup, internal linking, and indexation — with an actionable fix list.',
        tags: ['Schema Markup', 'Sitemap', 'Robots.txt', 'Core Web Vitals'],
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Optimised Site',
        previewImage:
          'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&fit=crop',
        accent: '#facc15',
      },
      {
        id: 1,
        title: 'Core Web Vitals Optimisation',
        description:
          'Improving LCP, CLS, and INP scores through image optimisation, code splitting, lazy loading, and caching strategies.',
        tags: ['LCP', 'CLS', 'INP', 'Next.js Image', 'Bundle Splitting'],
        demoUrl: 'https://demo-upd-123.vercel.app/',
        demoLabel: 'View Optimised Site',
        previewImage:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop',
        accent: '#fbbf24',
      },
      {
        id: 2,
        title: 'Analytics & Conversion Setup',
        description:
          'Google Analytics 4, Search Console, heatmaps, and goal tracking configured so every business decision is backed by real data.',
        tags: ['GA4', 'Google Search Console', 'Hotjar', 'Conversion Tracking'],
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Demo',
        previewImage:
          'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&fit=crop',
        accent: '#fde68a',
      },
    ],
  },
];

/* ── Context ── */
const ServicesContext = createContext<ServiceCategory[]>(servicesData);

export const ServicesProvider = ({ children }: { children: ReactNode }) => (
  <ServicesContext.Provider value={servicesData}>
    {children}
  </ServicesContext.Provider>
);

export const useServicesContext = () => useContext(ServicesContext);

/** Utility: find one category by slug */
export const getServiceBySlug = (slug: string) =>
  servicesData.find((s) => s.slug === slug) ?? null;

export default ServicesContext;
