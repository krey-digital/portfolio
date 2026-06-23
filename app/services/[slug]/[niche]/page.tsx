'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/partials/Navbar2';
import Footer from '@/components/Home/Footers';
import { Transition } from '@/components/PageTransition/Transition';
import LocomotiveScroll from 'locomotive-scroll';
import { getNicheProject, ProjectTier } from '@/data/nicheProjects';
import {
  HiArrowUpRight,
  HiCheckCircle,
  HiPlay,
  HiArrowDownTray,
  HiDocumentText,
  HiCpuChip,
  HiRectangleStack,
  HiSparkles,
  HiClock,
  HiChatBubbleLeftRight,
} from 'react-icons/hi2';

/* ─── Video Player ─── */
const VideoPlayer: React.FC<{ videoId: string | null; accent: string; tierLabel: string }> = ({
  videoId, accent, tierLabel,
}) => {
  const [playing, setPlaying] = useState(false);
  if (!videoId) {
    return (
      <div
        className="w-full rounded-[16px] flex flex-col items-center justify-center gap-4 py-20 border"
        style={{ background: `${accent}08`, borderColor: `${accent}22`, borderStyle: 'dashed' }}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: `${accent}18`, border: `1.5px solid ${accent}44` }}>
          <HiPlay className="text-[24px] ml-0.5" style={{ color: accent }} />
        </div>
        <div className="text-center">
          <p className="inter-semibold text-[15px] text-white/70 mb-1">Demo video coming soon</p>
          <p className="inter-regular text-[12px] text-white/25 uppercase tracking-widest">{tierLabel}</p>
        </div>
      </div>
    );
  }
  const embedUrl = videoId.startsWith('http')
    ? videoId
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  return (
    <div className="w-full aspect-video rounded-[16px] overflow-hidden relative bg-black">
      {!playing ? (
        <button onClick={() => setPlaying(true)}
          className="w-full h-full flex items-center justify-center group"
          style={{ background: `${accent}15` }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ background: accent }}>
            <HiPlay className="text-[30px] ml-1 text-black" />
          </div>
        </button>
      ) : (
        <iframe src={embedUrl} allow="autoplay; fullscreen" allowFullScreen className="w-full h-full" title={`Demo — ${tierLabel}`} />
      )}
    </div>
  );
};

/* ─── Section Header ─── */
const SectionHeader: React.FC<{ icon: React.ReactNode; label: string; accent: string }> = ({ icon, label, accent }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-[18px]" style={{ color: accent }}>{icon}</span>
    <p className="inter-regular text-[11px] uppercase tracking-[0.15em]" style={{ color: accent, opacity: 0.85 }}>{label}</p>
    <span className="flex-1 h-[0.5px] bg-white/8" />
  </div>
);

/* ─── Main Page ─── */
const NicheDetailPage = () => {
  const params = useParams();
  const nicheSlug = typeof params?.niche === 'string' ? params.niche : '';
  const serviceSlug = typeof params?.slug === 'string' ? params.slug : '';
  const project = getNicheProject(nicheSlug);
  const [activeTier, setActiveTier] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ls = new LocomotiveScroll();
    (window as any)._lenis = (ls as any).lenisInstance ?? ls;
    return () => { ls.destroy(); delete (window as any)._lenis; };
  }, []);

  // Reset to top when tier changes
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeTier]);

  if (!project) {
    return (
      <div className="w-full h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center gap-4">
        <p className="inter-regular text-[18px] opacity-60">Service not found.</p>
        <Link href={`/services/${serviceSlug}`} className="inter-regular text-[14px] underline opacity-40 hover:opacity-80">
          ← Back to Services
        </Link>
      </div>
    );
  }

  const tier = project.tiers[activeTier];

  return (
    <Transition>
      <div className="w-full bg-[#0f0f0f] text-white min-h-screen">
        <Navbar />

        {/* ── Hero ── */}
        <div className="relative w-full overflow-hidden">
          {/* Background accent glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 40% at 70% 30%, ${tier.accent}12 0%, transparent 70%)` }} />

          <div className="px-[19px] md:px-[38px] lg:px-[64px] pt-[9.313rem] lg:pt-[11.7rem] pb-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/35 inter-regular text-[12px] uppercase tracking-widest mb-6 flex-wrap">
              <Link href="/services" className="hover:text-white/70 transition-colors">Services</Link>
              <span>/</span>
              <Link href={`/services/${serviceSlug}`} className="hover:text-white/70 transition-colors">Web Development</Link>
              <span>/</span>
              <span style={{ color: tier.accent }}>{project.niche}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-3xl">
                <p className="inter-regular text-[11px] uppercase tracking-[0.15em] mb-3" style={{ color: tier.accent, opacity: 0.85 }}>
                  {project.niche}
                </p>
                <h1 className="inter-regular text-[36px] lg:text-[64px] leading-[1.05] text-white mb-4">
                  {project.headline}
                </h1>
                <p className="inter-regular text-[15px] text-white/45 leading-relaxed max-w-2xl">
                  {project.intro}
                </p>
              </div>

              {/* Price card */}
              <div className="flex-shrink-0 rounded-[16px] p-6 border min-w-[220px]"
                style={{ background: `${tier.accent}10`, borderColor: `${tier.accent}30` }}>
                <p className="inter-regular text-[11px] uppercase tracking-widest mb-1" style={{ color: tier.accent, opacity: 0.7 }}>
                  Starting from
                </p>
                <p className="inter-semibold text-[36px] leading-none text-white mb-1">{tier.price}</p>
                <p className="inter-regular text-[12px] text-white/35 leading-snug">{tier.priceNote}</p>
                <div className="flex items-center gap-1.5 mt-3 text-white/40">
                  <HiClock className="text-[14px]" />
                  <span className="inter-regular text-[12px]">{tier.deliveryTime}</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <span className="inline-block w-full h-[0.5px] bg-white/8 mt-8" />
          </div>
        </div>

        {/* ── Tier Selector ── */}
        <div className="px-[19px] md:px-[38px] lg:px-[64px] py-4 sticky top-0 z-40 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-white/6">
          <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
            {project.tiers.map((t, i) => (
              <button
                key={t.tier}
                onClick={() => setActiveTier(i)}
                className="inter-regular text-[12px] uppercase tracking-widest px-5 py-2.5 rounded-full border whitespace-nowrap transition-all duration-200 flex-shrink-0"
                style={{
                  background: activeTier === i ? `${t.accent}20` : 'transparent',
                  borderColor: activeTier === i ? t.accent : 'rgba(255,255,255,0.12)',
                  color: activeTier === i ? t.accent : 'rgba(255,255,255,0.40)',
                }}
              >
                Tier {t.tier} — {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tier Content ── */}
        <div className="px-[19px] md:px-[38px] lg:px-[64px] py-12">

          {/* ── Overview + Video ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Left — overview */}
            <div>
              <span className="inter-regular text-[11px] uppercase tracking-[0.15em]" style={{ color: tier.accent }}>
                Tier {tier.tier}
              </span>
              <h2 className="inter-semibold text-[26px] lg:text-[34px] text-white mt-2 leading-tight mb-4">{tier.tagline}</h2>
              <p className="inter-regular text-[15px] text-white/55 leading-relaxed mb-8">{tier.description}</p>

              {/* Highlights */}
              <div className="space-y-3 mb-8">
                {tier.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3">
                    <HiSparkles className="text-[14px] flex-shrink-0" style={{ color: tier.accent }} />
                    <span className="inter-regular text-[14px] text-white/75">{h}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 inter-regular text-[14px] px-6 py-3.5 rounded-full text-black font-medium transition-all duration-200 hover:opacity-90"
                  style={{ background: tier.accent }}
                >
                  Get This Built <HiArrowUpRight className="text-[15px]" />
                </a>
                {tier.demoUrl && (
                  <a
                    href={tier.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 inter-regular text-[14px] px-6 py-3.5 rounded-full border transition-all duration-200 hover:opacity-80"
                    style={{ borderColor: `${tier.accent}60`, color: tier.accent }}
                  >
                    {tier.demoLabel ?? 'Live Demo'} <HiArrowUpRight className="text-[14px]" />
                  </a>
                )}
                {tier.brochurePdf && (
                  <a
                    href={tier.brochurePdf}
                    download
                    className="inline-flex items-center gap-2 inter-regular text-[14px] px-6 py-3.5 rounded-full border border-white/15 text-white/55 hover:text-white/90 hover:border-white/30 transition-all duration-200"
                  >
                    <HiArrowDownTray className="text-[15px]" /> Download Brochure
                  </a>
                )}
              </div>
            </div>

            {/* Right — video */}
            <div className="flex flex-col gap-4">
              <SectionHeader icon={<HiPlay />} label="Demo Video" accent={tier.accent} />
              <VideoPlayer videoId={tier.videoId} accent={tier.accent} tierLabel={tier.label} />
              <p className="inter-regular text-[13px] text-white/25 leading-relaxed">
                A full walkthrough of the {tier.label.toLowerCase()} — covering key pages, admin flows, and user journeys specific to chemical businesses.
              </p>
            </div>
          </div>

          {/* ── Key Capabilities ── */}
          <div className="mb-16">
            <SectionHeader icon={<HiSparkles />} label="Key Capabilities" accent={tier.accent} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {tier.keyCapabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-[12px] p-5 border flex flex-col gap-3 group hover:scale-[1.01] transition-transform duration-200"
                  style={{ background: `${tier.accent}07`, borderColor: `${tier.accent}20` }}
                >
                  <HiCheckCircle className="text-[18px]" style={{ color: tier.accent }} />
                  <h3 className="inter-semibold text-[14px] text-white leading-snug">{cap.title}</h3>
                  <p className="inter-regular text-[13px] text-white/50 leading-relaxed flex-1">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Pages / Site Architecture ── */}
          <div className="mb-16">
            <SectionHeader icon={<HiRectangleStack />} label={`Site Architecture — ${tier.pages.length} Pages`} accent={tier.accent} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {tier.pages.map((page, idx) => (
                <div
                  key={page.name}
                  className="flex items-start gap-4 rounded-[10px] px-5 py-4 border"
                  style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
                >
                  <span className="inter-regular text-[11px] tabular-nums text-white/20 mt-0.5 flex-shrink-0 w-5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="inter-semibold text-[13px] text-white/85 mb-1">{page.name}</p>
                    <p className="inter-regular text-[12px] text-white/38 leading-relaxed">{page.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Support Functions ── */}
          <div className="mb-16">
            <SectionHeader icon={<HiChatBubbleLeftRight />} label="What's Included in Delivery" accent={tier.accent} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tier.supportFunctions.map((fn) => (
                <div key={fn} className="flex items-start gap-3 py-3 border-b border-white/5">
                  <HiCheckCircle className="text-[15px] flex-shrink-0 mt-0.5" style={{ color: tier.accent }} />
                  <span className="inter-regular text-[14px] text-white/60 leading-snug">{fn}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Tech Stack ── */}
          <div className="mb-16">
            <SectionHeader icon={<HiCpuChip />} label="Tech Stack" accent={tier.accent} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tier.techStack.map((t) => (
                <div
                  key={t.name}
                  className="flex items-start gap-4 rounded-[12px] px-5 py-4 border"
                  style={{ background: `${tier.accent}08`, borderColor: `${tier.accent}22` }}
                >
                  <div>
                    <p className="inter-semibold text-[14px] mb-1" style={{ color: tier.accent }}>{t.name}</p>
                    <p className="inter-regular text-[13px] text-white/45 leading-snug">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Brochure Download ── */}
          {tier.brochurePdf && (
            <div className="mb-16">
              <SectionHeader icon={<HiDocumentText />} label="Project Brochure" accent={tier.accent} />
              <div
                className="rounded-[16px] p-6 lg:p-8 border flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
                style={{ background: `${tier.accent}08`, borderColor: `${tier.accent}25` }}
              >
                <div>
                  <h3 className="inter-semibold text-[18px] text-white mb-2">
                    Download the Tier {tier.tier} Brochure
                  </h3>
                  <p className="inter-regular text-[14px] text-white/45 max-w-xl leading-relaxed">
                    Get the full project brochure as a PDF — includes detailed feature breakdown, site architecture, tech stack, delivery timeline, and pricing. Share it with your team or decision makers.
                  </p>
                </div>
                <a
                  href={tier.brochurePdf}
                  download
                  className="inline-flex items-center gap-2.5 inter-semibold text-[14px] px-8 py-4 rounded-full flex-shrink-0 transition-all duration-200 hover:opacity-90 text-black"
                  style={{ background: tier.accent }}
                >
                  <HiArrowDownTray className="text-[18px]" />
                  Download PDF
                </a>
              </div>
            </div>
          )}

          {/* ── Other Tiers ── */}
          {project.tiers.length > 1 && (
            <div className="mb-16">
              <SectionHeader icon={<HiRectangleStack />} label="Compare All Tiers" accent={tier.accent} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.tiers.map((t, i) => (
                  <button
                    key={t.tier}
                    onClick={() => { setActiveTier(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-left rounded-[14px] p-6 border transition-all duration-200 hover:scale-[1.02] group"
                    style={{
                      background: activeTier === i ? `${t.accent}15` : `${t.accent}07`,
                      borderColor: activeTier === i ? t.accent : `${t.accent}30`,
                    }}
                  >
                    <span className="inter-regular text-[11px] uppercase tracking-widest" style={{ color: t.accent }}>
                      Tier {t.tier}
                    </span>
                    <h3 className="inter-semibold text-[16px] text-white mt-1.5 mb-2 leading-tight">{t.label}</h3>
                    <p className="inter-semibold text-[22px] mb-1" style={{ color: t.accent }}>{t.price}</p>
                    <p className="inter-regular text-[12px] text-white/30 mb-4">{t.deliveryTime}</p>
                    <div className="flex items-center gap-2 inter-regular text-[12px]" style={{ color: t.accent, opacity: activeTier === i ? 1 : 0.6 }}>
                      {activeTier === i ? 'Currently viewing' : 'View details'} <HiArrowUpRight className="text-[13px]" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── CTA strip ── */}
          <div className="rounded-[20px] p-8 lg:p-12 border text-center"
            style={{ background: `${tier.accent}10`, borderColor: `${tier.accent}25` }}>
            <p className="inter-regular text-[11px] uppercase tracking-widest mb-3" style={{ color: tier.accent, opacity: 0.7 }}>
              Ready to start?
            </p>
            <h3 className="inter-semibold text-[24px] lg:text-[34px] text-white mb-3 leading-tight">
              Let's build your chemical business website.
            </h3>
            <p className="inter-regular text-[15px] text-white/40 mb-8 max-w-xl mx-auto">
              Get in touch and I'll walk you through the process, answer any questions, and provide a detailed quote within 24 hours.
            </p>
            <a href="/contact"
              className="inline-flex items-center gap-2 inter-semibold text-[15px] px-8 py-4 rounded-full text-black transition-all duration-200 hover:opacity-90"
              style={{ background: tier.accent }}>
              Get a Free Consultation <HiArrowUpRight className="text-[16px]" />
            </a>
          </div>
        </div>

        <Footer />
      </div>
    </Transition>
  );
};

export default NicheDetailPage;
