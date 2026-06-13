import Image from "next/image";
import type { Certification } from "@/content/certifications";

/**
 * CertBadges Component
 * 
 * Displays a horizontal strip of certification badges with logos and names.
 * Used as a trust element on the homepage to establish credibility.
 * 
 * Validates Requirements: 3.3, 10.4, 14.4
 */

interface CertBadgesProps {
  certifications: Certification[];
}

export function CertBadges({ certifications }: CertBadgesProps) {
  return (
    <section className="w-full bg-slate-50 py-24 sm:py-32 border-t border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600">Trust & Compliance</p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Certified & Compliant
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Industry-recognized certifications ensuring superior quality and rigorous safety standards
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className={`group flex flex-col items-center gap-4 p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:border-amber-300 transition-all duration-300 animate-slide-up-fade delay-${Math.min(index + 1, 8)} cursor-pointer`}
              style={{
                perspective: '1000px',
              }}
            >
              {cert.logoUrl ? (
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  <Image
                    src={cert.logoUrl}
                    alt={`${cert.name} certification logo`}
                    width={112}
                    height={112}
                    className="object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all"
                  />
                </div>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-50 to-amber-100 sm:h-28 sm:w-28 ring-2 ring-amber-200 group-hover:ring-amber-400 transition-all group-hover:scale-110 duration-300">
                  <span className="text-3xl font-bold text-amber-600 sm:text-4xl">
                    {cert.name.charAt(0)}
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-900 sm:text-base group-hover:text-amber-600 transition-colors">
                  {cert.name}
                </p>
                <p className="mt-1 text-xs text-slate-500 group-hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {cert.issuingBody}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
