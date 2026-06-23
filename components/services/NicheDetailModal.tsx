'use client';

import React, { useEffect, useRef, useState } from 'react';
import { HiXMark, HiPlay, HiArrowUpRight, HiCheckCircle, HiChatBubbleLeftRight } from 'react-icons/hi2';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
export interface ProjectTier {
  tier: number;
  label: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  /** YouTube embed ID or full URL; null = placeholder */
  videoId: string | null;
  /** Optional brochure/demo link */
  demoUrl?: string;
  demoLabel?: string;
  accent: string;
}

export interface NicheProject {
  /** Matches a niche item name exactly */
  niche: string;
  headline: string;
  intro: string;
  tiers: ProjectTier[];
}

/* ─────────────────────────────────────────────
   Project data extracted from /projects folder
───────────────────────────────────────────── */
export const NICHE_PROJECTS: NicheProject[] = [
  {
    niche: 'Chemical Manufacturers',
    headline: 'Chemical Business Websites',
    intro:
      'Full-stack web solutions purpose-built for chemical manufacturers, distributors & trading companies — from a trust-building brochure site to a fully integrated B2B buyer portal with ERP sync.',
    tiers: [
      {
        tier: 1,
        label: 'Brochure / Informative Website',
        tagline: 'Establish trust. Generate leads. No backend needed.',
        description:
          'A static, high-performance brochure site built with Next.js 14 and SSG. Presents your product range, ISO/GMP certifications, and company story with a clean, professional design. Perfect for companies wanting an affordable first web presence.',
        features: [
          'Static Site Generation (SSG) — 95+ Lighthouse score',
          'Product category showcase with CAS numbers',
          'ISO / GMP certification page with badge display',
          'Formspree contact form + WhatsApp CTA',
          'Google Maps embed for walk-in customers',
          'SEO-optimised meta, OpenGraph, sitemap',
          'Accessibility compliant (WCAG 2.1 AA)',
          'Client testimonials section',
        ],
        tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Formspree', 'SSG'],
        videoId: null,
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Live Demo',
        accent: '#34d399',
      },
      {
        tier: 2,
        label: 'Informative + Admin Platform',
        tagline: 'Dynamic product catalogue with a full admin panel.',
        description:
          'All of Tier 1 plus a real-time database, an admin panel to manage products/inquiries, and an SDS (Safety Data Sheet) download system. Owners can update product listings, track RFQs, and upload certifications — no code required.',
        features: [
          'Everything in Tier 1',
          'Convex real-time database for product management',
          'Admin dashboard — products, inquiries, certifications',
          'GHS-compliant product pages (pictograms, signal words)',
          'SDS file upload & download with version tracking',
          'Inquiry inbox with status pipeline (New → Quoted → Closed)',
          'CSV/JSON bulk product import',
          'Individual product detail pages with purity & packaging info',
          'RFQ (Request for Quote) form per product',
        ],
        tech: ['Next.js 14', 'Convex DB', 'TypeScript', 'Tailwind CSS', 'Clerk Auth'],
        videoId: null,
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Live Demo',
        accent: '#60a5fa',
      },
      {
        tier: 3,
        label: 'Advanced B2B Platform',
        tagline: 'Buyer portal, ERP sync, blog & multi-product quoting.',
        description:
          'The full-stack B2B platform for scaling chemical businesses. Includes everything in Tier 2 plus a buyer-facing portal with authentication, a multi-product quote cart, ERP webhook integration, a blog/case-study CMS, and bi-lingual (EN/HI) content support.',
        features: [
          'Everything in Tier 2',
          'Buyer portal — registration, login, dashboard, quote history',
          'Multi-product quote cart (add multiple chemicals, submit in one go)',
          'ERP webhook integration (auto-sync stock & pricing)',
          'SDS versioning system with gated download log per buyer',
          'Blog & case-study CMS (Tiptap rich editor)',
          'Hindi / English bi-lingual content support',
          'Related products suggestions on product pages',
          'Admin buyer management (verify, view history)',
          'Advanced product search with Convex search index',
        ],
        tech: ['Next.js 14', 'Convex DB', 'Clerk Auth', 'TypeScript', 'Tiptap', 'ERP Webhooks'],
        videoId: null,
        demoUrl: 'https://bonus-galaxy-demo.vercel.app/',
        demoLabel: 'View Live Demo',
        accent: '#a78bfa',
      },
    ],
  },
];

/* ─────────────────────────────────────────────
   Video Player sub-component
───────────────────────────────────────────── */
const VideoPlayer: React.FC<{ videoId: string | null; accent: string; tierLabel: string }> = ({
  videoId,
  accent,
  tierLabel,
}) => {
  const [playing, setPlaying] = useState(false);

  if (!videoId) {
    return (
      <div
        className="w-full rounded-[12px] overflow-hidden flex flex-col items-center justify-center gap-4 py-14 border"
        style={{
          background: `${accent}08`,
          borderColor: `${accent}20`,
          borderStyle: 'dashed',
        }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: `${accent}18`, border: `1px solid ${accent}33` }}
        >
          <HiPlay className="text-[22px] ml-0.5" style={{ color: accent }} />
        </div>
        <div className="text-center">
          <p className="inter-regular text-[13px] text-white/60 mb-1">Video demo coming soon</p>
          <p className="inter-regular text-[11px] text-white/25 uppercase tracking-widest">
            {tierLabel}
          </p>
        </div>
      </div>
    );
  }

  const embedUrl = videoId.startsWith('http')
    ? videoId
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className="w-full aspect-video rounded-[12px] overflow-hidden relative bg-black">
      {!playing ? (
        <button
          onClick={() => setPlaying(true)}
          className="w-full h-full flex items-center justify-center group"
          style={{ background: `${accent}12` }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: accent }}
          >
            <HiPlay className="text-[26px] ml-1 text-black" />
          </div>
        </button>
      ) : (
        <iframe
          src={embedUrl}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="w-full h-full"
          title={`Demo — ${tierLabel}`}
        />
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Modal
───────────────────────────────────────────── */
interface NicheDetailModalProps {
  niche: string | null;
  onClose: () => void;
}

const NicheDetailModal: React.FC<NicheDetailModalProps> = ({ niche, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeTier, setActiveTier] = useState(0);

  const project = niche ? NICHE_PROJECTS.find((p) => p.niche === niche) : null;
  const isOpen = Boolean(niche);

  /* lock scroll + stop Lenis */
  useEffect(() => {
    const lenis = (window as any)._lenis;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Stop Lenis so the background page doesn't scroll while modal is open
      lenis?.stop?.();
      setActiveTier(0);
    } else {
      document.body.style.overflow = '';
      // Resume Lenis when modal closes
      lenis?.start?.();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start?.();
    };
  }, [isOpen]);

  /* close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!isOpen) return null;

  /* ── No project yet — show a contact prompt ── */
  if (!project) {
    return (
      <div
        ref={overlayRef}
        onClick={(e) => e.target === overlayRef.current && onClose()}
        className="fixed inset-0 z-[999] flex items-end lg:items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      >
        <div className="bg-[#111] border border-white/10 rounded-t-[20px] lg:rounded-[20px] w-full max-w-lg mx-4 p-8 lg:p-10 flex flex-col gap-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="inter-regular text-[11px] uppercase tracking-widest text-white/40 mb-1">
                Niche
              </p>
              <h2 className="inter-semibold text-[22px] text-white">{niche}</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors mt-1"
            >
              <HiXMark className="text-[22px]" />
            </button>
          </div>

          <div className="h-[1px] bg-white/8" />

          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <HiChatBubbleLeftRight className="text-[20px] text-white/30 flex-shrink-0 mt-0.5" />
              <p className="inter-regular text-[14px] text-white/60 leading-relaxed">
                I don't have a live demo for this niche yet — but I actively build custom websites for{' '}
                <span className="text-white/90">{niche}</span>. Let's talk about what you need.
              </p>
            </div>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 inter-regular text-[14px] px-6 py-3.5 rounded-full text-black font-medium transition-all duration-300 hover:opacity-90"
            style={{ background: '#34d399' }}
            onClick={onClose}
          >
            Get a Free Consultation
            <HiArrowUpRight className="text-[15px]" />
          </a>
        </div>
      </div>
    );
  }

  const currentTier = project.tiers[activeTier];

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      className="fixed inset-0 z-[999] flex items-end lg:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="bg-[#0d0d0d] border border-white/10 rounded-t-[24px] lg:rounded-[20px] w-full max-w-5xl mx-0 lg:mx-6 flex flex-col overflow-hidden"
        style={{ maxHeight: '92vh' }}
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between px-6 lg:px-10 pt-7 pb-5 border-b border-white/8 flex-shrink-0">
          <div>
            <p className="inter-regular text-[11px] uppercase tracking-widest text-white/35 mb-1">
              Service Niche
            </p>
            <h2 className="inter-semibold text-[22px] lg:text-[28px] text-white leading-tight">
              {project.headline}
            </h2>
            <p className="inter-regular text-[13px] text-white/45 mt-1.5 max-w-xl leading-relaxed">
              {project.intro}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-6 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/8 transition-all duration-200 mt-1"
          >
            <HiXMark className="text-[20px]" />
          </button>
        </div>

        {/* ── Tier tabs ── */}
        <div className="flex gap-2 px-6 lg:px-10 pt-4 pb-0 flex-shrink-0 overflow-x-auto scrollbar-none">
          {project.tiers.map((t, i) => (
            <button
              key={t.tier}
              onClick={() => setActiveTier(i)}
              className="inter-regular text-[12px] uppercase tracking-widest px-4 py-2 rounded-full border whitespace-nowrap transition-all duration-200 flex-shrink-0"
              style={{
                background: activeTier === i ? `${t.accent}22` : 'transparent',
                borderColor: activeTier === i ? t.accent : 'rgba(255,255,255,0.12)',
                color: activeTier === i ? t.accent : 'rgba(255,255,255,0.4)',
              }}
            >
              Tier {t.tier} — {t.label}
            </button>
          ))}
        </div>

        {/* ── Body (scrollable) — data-lenis-prevent tells Lenis to yield scroll here ── */}
        <div
          className="flex-1 overflow-y-auto px-6 lg:px-10 py-6"
          data-lenis-prevent
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column — details */}
            <div className="flex flex-col gap-6">
              {/* Tier tagline */}
              <div>
                <span
                  className="inter-regular text-[11px] uppercase tracking-widest"
                  style={{ color: currentTier.accent }}
                >
                  Tier {currentTier.tier}
                </span>
                <h3 className="inter-semibold text-[18px] lg:text-[22px] text-white mt-1 leading-tight">
                  {currentTier.tagline}
                </h3>
                <p className="inter-regular text-[14px] text-white/55 mt-2 leading-relaxed">
                  {currentTier.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <p
                  className="inter-regular text-[11px] uppercase tracking-widest mb-3"
                  style={{ color: currentTier.accent, opacity: 0.8 }}
                >
                  What's Included
                </p>
                <ul className="space-y-2">
                  {currentTier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <HiCheckCircle
                        className="text-[15px] flex-shrink-0 mt-0.5"
                        style={{ color: currentTier.accent }}
                      />
                      <span className="inter-regular text-[13px] text-white/65 leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div>
                <p
                  className="inter-regular text-[11px] uppercase tracking-widest mb-3"
                  style={{ color: currentTier.accent, opacity: 0.8 }}
                >
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentTier.tech.map((t) => (
                    <span
                      key={t}
                      className="inter-regular text-[12px] px-3 py-1 rounded-full"
                      style={{
                        background: `${currentTier.accent}15`,
                        color: currentTier.accent,
                        border: `1px solid ${currentTier.accent}30`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {currentTier.demoUrl && (
                  <a
                    href={currentTier.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 inter-regular text-[13px] px-5 py-3 rounded-full border transition-all duration-200"
                    style={{
                      borderColor: currentTier.accent,
                      color: currentTier.accent,
                    }}
                  >
                    {currentTier.demoLabel ?? 'View Demo'}
                    <HiArrowUpRight className="text-[14px]" />
                  </a>
                )}
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 inter-regular text-[13px] px-5 py-3 rounded-full transition-all duration-200 text-black font-medium hover:opacity-90"
                  style={{ background: currentTier.accent }}
                  onClick={onClose}
                >
                  Get This Built
                  <HiArrowUpRight className="text-[14px]" />
                </a>
              </div>
            </div>

            {/* Right column — video demo */}
            <div className="flex flex-col gap-4">
              <p
                className="inter-regular text-[11px] uppercase tracking-widest"
                style={{ color: currentTier.accent, opacity: 0.8 }}
              >
                Demo Video
              </p>
              <VideoPlayer
                videoId={currentTier.videoId}
                accent={currentTier.accent}
                tierLabel={currentTier.label}
              />
              <p className="inter-regular text-[12px] text-white/25 leading-relaxed">
                A walkthrough of the {currentTier.label.toLowerCase()} — showing key screens, admin
                flows, and user journeys.
              </p>

              {/* Tier comparison teaser */}
              {project.tiers.length > 1 && (
                <div
                  className="rounded-[12px] p-4 border mt-2"
                  style={{ background: `${currentTier.accent}08`, borderColor: `${currentTier.accent}18` }}
                >
                  <p
                    className="inter-regular text-[11px] uppercase tracking-widest mb-2"
                    style={{ color: currentTier.accent, opacity: 0.7 }}
                  >
                    Other Tiers Available
                  </p>
                  <div className="flex flex-col gap-2">
                    {project.tiers
                      .filter((_, i) => i !== activeTier)
                      .map((t) => (
                        <button
                          key={t.tier}
                          onClick={() => setActiveTier(project.tiers.indexOf(t))}
                          className="flex items-center justify-between text-left p-2.5 rounded-[8px] border transition-all duration-200 hover:opacity-80"
                          style={{
                            background: `${t.accent}10`,
                            borderColor: `${t.accent}22`,
                          }}
                        >
                          <span className="inter-regular text-[12px]" style={{ color: t.accent }}>
                            Tier {t.tier} — {t.label}
                          </span>
                          <HiArrowUpRight className="text-[13px]" style={{ color: t.accent }} />
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NicheDetailModal;
