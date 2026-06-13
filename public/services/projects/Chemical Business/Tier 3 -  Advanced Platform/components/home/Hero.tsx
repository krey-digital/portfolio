"use client";

import Link from "next/link";
import { companyInfo } from "@/content/company";

/**
 * Hero Component
 * 
 * Full-width hero section with professional background image and premium styling.
 * Validates Requirements: 3.1, 10.4, 14.4, 18.3
 */
export function Hero() {
  return (
    <section className="relative w-full text-white overflow-hidden min-h-screen lg:h-screen flex items-center justify-center">
      {/* Premium industrial background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `
            linear-gradient(rgba(51, 65, 85, 0.5), rgba(51, 65, 85, 0.5)),
            url("https://viptradingchemical.com/wp-content/uploads/2023/12/lab-technician-dressed-protective-suit-as-safety-precaution-looking-test-tube-scaled-900x600.jpg")
          `,
          width: '100%',
          height: '100%'
        }}
      />

      {/* Content Container - Centered */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-32 lg:py-40">
        {/* Welcome Label */}
        <div className="mb-6 sm:mb-8">
          <p className="text-sm sm:text-base font-semibold tracking-widest uppercase text-slate-50 drop-shadow-lg">
            Welcome to our website
          </p>
        </div>

        {/* Main Heading */}
        <div className="mb-10 sm:mb-12">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight drop-shadow-lg max-w-3xl mx-auto">
            Your Trusted Chemical Manufacturing Partner
          </h1>
        </div>

        {/* Subheading */}
        <div className="mb-12 sm:mb-16 max-w-2xl mx-auto">
          <p className="text-base sm:text-lg lg:text-xl font-light text-slate-50 leading-relaxed drop-shadow-md">
            We are pleased to introduce ourselves as a manufacturer of chemicals with over 25 years of industry expertise and commitment to excellence.
          </p>
        </div>

        {/* CTA Button */}
        <div>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-white text-slate-900 font-bold text-base sm:text-lg hover:bg-slate-50 hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 drop-shadow-lg"
          >
            Our Products
          </Link>
        </div>
      </div>
    </section>
  );
}
