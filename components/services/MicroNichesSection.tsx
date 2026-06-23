'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { HiMagnifyingGlass, HiXMark, HiArrowUpRight } from 'react-icons/hi2';
import { NICHE_SLUG_MAP } from '@/data/nicheProjects';

/* ── All micro-niches extracted from micro-niches.md ── */
const NICHE_DATA: { category: string; items: string[] }[] = [
  {
    category: 'Health, Medical & Wellness',
    items: [
      'Dentists',
      'Orthodontists',
      'Chiropractors',
      'Physical Therapists',
      'Dermatologists',
      'Pediatricians',
      'Optometrists / Eye Clinics',
      'Mental Health Counselors / Therapists',
      'Veterinary Clinics',
      'Medical Spas',
      'Acupuncture Clinics',
    ],
  },
  {
    category: 'Professional Services',
    items: [
      'Law Firms (Personal Injury, Family, Corporate)',
      'Accountants & CPAs',
      'Bookkeepers',
      'Insurance Agencies',
      'Financial Advisors',
      'Real Estate Agencies',
      'Property Management Companies',
      'Business Consultants',
      'Recruitment / Staffing Agencies',
      'Notary Services',
    ],
  },
  {
    category: 'Home Services & Trades',
    items: [
      'Plumbers',
      'Electricians',
      'HVAC / AC Repair Companies',
      'Roofers',
      'Landscapers & Lawn Care',
      'House Cleaning Services',
      'Pest Control Companies',
      'Handyman Services',
      'Painters (Interior/Exterior)',
      'Pool Maintenance Companies',
      'Carpet & Upholstery Cleaning',
      'Locksmiths',
      'Tree Removal Services',
      'General Contractors / Remodelers',
      'Solar Panel Installers',
    ],
  },
  {
    category: 'Automotive Services',
    items: [
      'Auto Repair Shops',
      'Car Detailing Services',
      'Towing Companies',
      'Car Dealerships (Used/Independent)',
      'Auto Body & Paint Shops',
      'Window Tinting Services',
    ],
  },
  {
    category: 'Personal Care & Beauty',
    items: [
      'Hair Salons',
      'Barbershops',
      'Nail Salons',
      'Tattoo & Piercing Studios',
      'Estheticians / Skincare Clinics',
      'Massage Therapists',
      'Tanning Salons',
    ],
  },
  {
    category: 'Fitness & Recreation',
    items: [
      'Gyms & Crossfit Boxes',
      'Yoga / Pilates Studios',
      'Martial Arts Schools',
      'Personal Trainers',
      'Dance Studios',
      'Golf Courses / Country Clubs',
    ],
  },
  {
    category: 'Food & Hospitality',
    items: [
      'Restaurants (Fine Dining, Casual)',
      'Cafes & Coffee Shops',
      'Bakeries',
      'Food Trucks',
      'Catering Services',
      'Boutique Hotels / B&Bs',
      'Breweries & Wineries',
    ],
  },
  {
    category: 'Education & Childcare',
    items: [
      'Daycare Centers / Preschools',
      'Private Tutoring Services',
      'Music Teachers / Schools',
      'Driving Schools',
      'Test Prep Centers',
    ],
  },
  {
    category: 'Pet Services',
    items: [
      'Dog Groomers',
      'Pet Boarding / Kennels',
      'Dog Walkers / Pet Sitters',
      'Pet Training Schools',
    ],
  },
  {
    category: 'Events & Entertainment',
    items: [
      'Wedding Planners',
      'Event Venues',
      'DJs & Event Musicians',
      'Photographers / Videographers',
      'Photo Booth Rentals',
    ],
  },
  {
    category: 'Industrial & B2B',
    items: [
      'Chemical Manufacturers',
      'Commercial Printers',
      'Logistics & Trucking Companies',
      'Wholesale Distributors',
      'Scrap Metal / Recycling Centers',
    ],
  },
];

const CATEGORY_ACCENTS: Record<string, string> = {
  'Health, Medical & Wellness': '#34d399',
  'Professional Services': '#60a5fa',
  'Home Services & Trades': '#fb923c',
  'Automotive Services': '#a78bfa',
  'Personal Care & Beauty': '#f472b6',
  'Fitness & Recreation': '#facc15',
  'Food & Hospitality': '#f87171',
  'Education & Childcare': '#38bdf8',
  'Pet Services': '#4ade80',
  'Events & Entertainment': '#c084fc',
  'Industrial & B2B': '#94a3b8',
};

interface MicroNichesSectionProps {
  /** accent colour from the parent ServiceCategory, used for the search bar focus ring */
  accent?: string;
}

const MicroNichesSection: React.FC<MicroNichesSectionProps> = ({
  accent = '#34d399',
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  /* Set of niches that have full detail pages */
  const nichesWithProjects = useMemo(
    () => new Set(Object.keys(NICHE_SLUG_MAP)),
    []
  );

  /* ── Flatten all niches for search ── */
  const allNiches = useMemo(
    () =>
      NICHE_DATA.flatMap((cat) =>
        cat.items.map((item) => ({ category: cat.category, item }))
      ),
    []
  );

  /* ── Filter logic ── */
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return NICHE_DATA.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => {
        const matchesSearch =
          !q ||
          item.toLowerCase().includes(q) ||
          cat.category.toLowerCase().includes(q) ||
          // word-prefix match: "dental" → "Dentists", "plumb" → "Plumbers"
          item.toLowerCase().split(/[\s/(&,]+/).some((word) => word.startsWith(q));
        const matchesCategory =
          !activeCategory || cat.category === activeCategory;
        return matchesSearch && matchesCategory;
      }),
    })).filter((cat) => cat.items.length > 0);
  }, [query, activeCategory]);

  const totalVisible = filtered.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="w-full px-[19px] md:px-[38px] lg:px-[64px] pb-24">

      {/* ── Intro text ── */}
      <p className="inter-regular text-[14px] text-white/40 mt-2 mb-8 max-w-2xl">
        I build industry-specific websites for local businesses. Search your niche below to see if I've built for your sector.
      </p>

      {/* ── Search bar ── */}
      <div className="relative w-full max-w-2xl mb-6">
        <HiMagnifyingGlass
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[18px] pointer-events-none"
          style={{ color: accent, opacity: 0.7 }}
        />
        <input
          id="niche-search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search niche or industry…"
          className="w-full bg-white/5 border border-white/10 rounded-[10px] py-4 pl-12 pr-12 inter-regular text-[15px] text-white placeholder-white/30 outline-none transition-all duration-300"
          style={{
            boxShadow: query ? `0 0 0 1.5px ${accent}55` : undefined,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = `${accent}55`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
          >
            <HiXMark className="text-[18px]" />
          </button>
        )}
      </div>

      {/* ── Category filter pills ── */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory(null)}
          className="inter-regular text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-200"
          style={{
            background: !activeCategory ? `${accent}22` : 'transparent',
            borderColor: !activeCategory ? accent : 'rgba(255,255,255,0.15)',
            color: !activeCategory ? accent : 'rgba(255,255,255,0.45)',
          }}
        >
          All
        </button>
        {NICHE_DATA.map((cat) => {
          const catAccent = CATEGORY_ACCENTS[cat.category] ?? accent;
          const isActive = activeCategory === cat.category;
          return (
            <button
              key={cat.category}
              onClick={() =>
                setActiveCategory(isActive ? null : cat.category)
              }
              className="inter-regular text-[11px] uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all duration-200"
              style={{
                background: isActive ? `${catAccent}22` : 'transparent',
                borderColor: isActive
                  ? catAccent
                  : 'rgba(255,255,255,0.15)',
                color: isActive ? catAccent : 'rgba(255,255,255,0.45)',
              }}
            >
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* ── Result count ── */}
      {(query || activeCategory) && (
        <p className="inter-regular text-[12px] text-white/30 mb-6 uppercase tracking-widest">
          {totalVisible} {totalVisible === 1 ? 'niche' : 'niches'} found
        </p>
      )}

      {/* ── Niche list by category ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
          <p className="inter-regular text-[18px] text-white/20">No niches match your search.</p>
          <button
            onClick={() => { setQuery(''); setActiveCategory(null); }}
            className="inter-regular text-[13px] underline text-white/30 hover:text-white/60 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {filtered.map((cat) => {
            const catAccent = CATEGORY_ACCENTS[cat.category] ?? accent;
            return (
              <div key={cat.category}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-1.5 h-4 rounded-full flex-shrink-0"
                    style={{ background: catAccent }}
                  />
                  <p
                    className="inter-regular text-[11px] uppercase tracking-widest"
                    style={{ color: catAccent, opacity: 0.85 }}
                  >
                    {cat.category}
                  </p>
                  <span className="inter-regular text-[11px] text-white/20">
                    ({cat.items.length})
                  </span>
                </div>

                {/* Niche pills */}
                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map((item) => {
                    const q = query.toLowerCase().trim();
                    const isMatch = q && item.toLowerCase().includes(q);
                    const hasProject = nichesWithProjects.has(item);
                    const slugInfo = NICHE_SLUG_MAP[item];

                    const pillContent = (
                      <>
                        {item}
                        {hasProject && (
                          <span
                            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                            style={{ background: catAccent }}
                            title="Full case study available"
                          />
                        )}
                        {hasProject && (
                          <HiArrowUpRight
                            className="ml-1 text-[11px] opacity-0 group-hover:opacity-70 transition-opacity inline-block"
                            style={{ color: catAccent }}
                          />
                        )}
                      </>
                    );

                    const pillStyle = {
                      background: isMatch ? `${catAccent}22` : hasProject ? `${catAccent}10` : 'rgba(255,255,255,0.04)',
                      borderColor: isMatch ? `${catAccent}66` : hasProject ? `${catAccent}40` : 'rgba(255,255,255,0.08)',
                      color: isMatch ? catAccent : hasProject ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.65)',
                      boxShadow: isMatch ? `0 0 12px ${catAccent}22` : hasProject ? `0 0 8px ${catAccent}18` : undefined,
                    };

                    const pillClass = `relative inter-regular text-[13px] px-4 py-2 rounded-full border transition-all duration-200 text-left group ${
                      hasProject ? 'cursor-pointer hover:scale-[1.03] active:scale-[0.98]' : 'cursor-default'
                    }`;

                    if (hasProject && slugInfo) {
                      return (
                        <Link
                          key={item}
                          href={`/services/${slugInfo.serviceSlug}/${slugInfo.nicheSlug}`}
                          className={pillClass}
                          style={pillStyle}
                        >
                          {pillContent}
                        </Link>
                      );
                    }

                    return (
                      <span key={item} className={pillClass} style={pillStyle}>
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Legend ── */}
      <div className="flex items-center gap-2 mt-8 mb-2">
        <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
        <p className="inter-regular text-[11px] text-white/30 uppercase tracking-widest">
          Dot + arrow = full case study page available — click to explore
        </p>
      </div>

      {/* ── CTA ── */}
      {!query && !activeCategory && (
        <div className="mt-12 pt-10 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="inter-regular text-[16px] text-white/80 mb-1">
              Don't see your niche?
            </p>
            <p className="inter-regular text-[13px] text-white/35">
              I work with all local business types — if you have a business, I can build your site.
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 inter-regular text-[14px] px-6 py-3 rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition-all duration-300 whitespace-nowrap flex-shrink-0"
          >
            Let's Talk
          </a>
        </div>
      )}
    </div>
  );
};

export default MicroNichesSection;
