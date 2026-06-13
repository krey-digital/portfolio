"use client";

import Link from "next/link";
import Image from "next/image";

export default function CertificationsPage() {
  const certifications = [
    {
      id: "iso-9001",
      name: "ISO 9001:2015",
      issuingBody: "Bureau Veritas",
      certNumber: "BV-XXXX-YYYY",
      issuedYear: 2022,
      expiryYear: 2025,
      description: "Quality Management System certification ensuring consistent product quality and customer satisfaction.",
      logoUrl: "https://img.freepik.com/premium-vector/showcase-your-commitment-quality-excellence-with-our-iso-90012015-certified-company-logo_1135235-2664.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      id: "bis",
      name: "BIS Registration",
      issuingBody: "Bureau of Indian Standards",
      certNumber: "BIS-XXXX",
      issuedYear: 2021,
      expiryYear: 2026,
      description: "Compliance with Indian Standards for chemical manufacturing and distribution.",
      logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9A1IaUKwyTl1Z-mEPA_UsOmnOJCy3W9ttJQ&s"
    },
    {
      id: "gmp",
      name: "GMP Certification",
      issuingBody: "National GMP Council",
      certNumber: "GMP-2023-XXXX",
      issuedYear: 2023,
      expiryYear: 2026,
      description: "Good Manufacturing Practice certification demonstrating adherence to quality production standards and safety protocols.",
      logoUrl: "https://static.vecteezy.com/system/resources/thumbnails/027/654/831/small/gmp-certified-badge-good-manufacturing-practice-certified-stamp-gmp-approved-label-packaging-design-elements-supplement-gmp-quality-control-medical-and-health-design-element-illustration-vector.jpg",
    },
  ];

  // Group certifications by category for better organization
  const qualityCerts = certifications.filter(c => c.name.includes("ISO"));
  const safetyCerts = certifications.filter(c => c.name.includes("GMP") || c.name.includes("BIS"));

  const categories = [
    { title: "Quality Management", certs: qualityCerts, color: "blue" },
    { title: "Environmental & Safety", certs: safetyCerts, color: "green" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-b-4 border-amber-500">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-4 animate-slide-up-fade">
            <p className="text-sm font-semibold tracking-widest uppercase text-amber-400">Trust & Compliance</p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Certifications & Standards
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              We maintain rigorous compliance with international standards to ensure the highest quality, safety, and environmental responsibility in all our operations.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-xl bg-white border border-slate-100 shadow-sm p-8 hover:shadow-lg transition-all animate-slide-up-fade delay-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-xl">
                ✓
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Certified Excellence</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              All certifications are regularly audited and renewed to maintain compliance with evolving international standards and industry best practices.
            </p>
          </div>
          <div className="rounded-xl bg-white border border-slate-100 shadow-sm p-8 hover:shadow-lg transition-all animate-slide-up-fade delay-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-xl">
                🎯
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Quality Assurance</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Our quality management system ensures consistent product excellence, reliability, and customer satisfaction across all product categories.
            </p>
          </div>
          <div className="rounded-xl bg-white border border-slate-100 shadow-sm p-8 hover:shadow-lg transition-all animate-slide-up-fade delay-3">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-xl">
                🌍
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Environmental Care</h3>
            </div>
            <p className="text-slate-600 leading-relaxed">
              We maintain strict environmental compliance and sustainability standards to minimize our ecological impact and protect natural resources.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {categories.map((category, categoryIndex) => (
            category.certs.length > 0 && (
              <div key={category.title} className="animate-slide-up-fade" style={{ animationDelay: `${(categoryIndex + 4) * 0.1}s` }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-1 w-12 bg-amber-500 rounded-full" />
                  <h2 className="text-3xl font-bold text-slate-900">{category.title}</h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.certs.map((cert, index) => (
                    <div
                      key={cert.id}
                      className={`rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:border-amber-300 transition-all duration-300 p-8 animate-slide-up-fade delay-${Math.min(index + 5, 8)} group cursor-pointer`}
                    >
                      {/* Certification Header */}
                      <div className="mb-6">
                        {cert.logoUrl ? (
                          <div className="relative h-20 w-20 flex items-center justify-center mb-4">
                            <Image
                              src={cert.logoUrl}
                              alt={`${cert.name} logo`}
                              width={80}
                              height={80}
                              className="object-contain transition-transform group-hover:scale-110 duration-300"
                            />
                          </div>
                        ) : (
                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-50 to-amber-100 mb-4 ring-2 ring-amber-200 group-hover:ring-amber-400 transition-all">
                            <span className="text-2xl font-bold text-amber-600">
                              {cert.name.charAt(0)}
                            </span>
                          </div>
                        )}

                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">
                          {cert.name}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          {cert.issuingBody}
                        </p>
                      </div>

                      {/* Certification Details */}
                      <div className="space-y-3 border-t border-slate-100 pt-6">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-slate-600 font-semibold">
                            Certificate Number
                          </p>
                          <p className="text-sm font-mono text-slate-900 mt-1">
                            {cert.certNumber}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-600 font-semibold">
                              Issued
                            </p>
                            <p className="text-sm text-slate-900 mt-1">
                              {cert.issuedYear}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-600 font-semibold">
                              Valid Until
                            </p>
                            <p className="text-sm text-slate-900 mt-1">
                              {cert.expiryYear}
                            </p>
                          </div>
                        </div>

                        {/* Validity Indicator */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          {new Date().getFullYear() <= cert.expiryYear ? (
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                              <span className="h-2 w-2 rounded-full bg-emerald-600" />
                              Active & Valid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
                              <span className="h-2 w-2 rounded-full bg-amber-600" />
                              Expired
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Compliance Information */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 border-t-4 border-amber-500">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-slide-up-fade">
            <h2 className="text-3xl font-bold text-white">
              Compliance & Regulatory Standards
            </h2>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              In addition to our formal certifications, we maintain compliance with REACH regulations, 
              adhere to GHS labeling standards, and follow all applicable chemical industry guidelines 
              and environmental protection laws. Our facilities undergo regular third-party audits to 
              ensure continued adherence to all standards.
            </p>
            <div className="pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-base font-semibold text-slate-900 shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Request Certification Details
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
