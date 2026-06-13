"use client";

import Image from "next/image";

export default function AboutPage() {
  const companyInfo = {
    name: "ChemCorp Industries",
    tagline: "Your Trusted Partner in Quality Chemicals",
    foundedYear: 2010,
    about: {
      story: "Founded in 2010, ChemCorp Industries has grown from a small chemical distributor to a trusted supplier serving industries across India. Our journey began with a commitment to provide high-quality chemicals with reliable service and technical expertise. Over the years, we have built strong relationships with manufacturers and customers alike, earning a reputation for consistency, safety, and professionalism. Today, we serve diverse industries including pharmaceuticals, textiles, water treatment, and manufacturing, delivering chemicals that meet the highest quality standards.",
      mission: "To provide high-quality chemicals with reliable service and technical expertise, ensuring customer satisfaction and safety in every transaction.",
      values: [
        "Quality First",
        "Customer Satisfaction",
        "Safety and Compliance",
        "Environmental Responsibility",
      ],
    },
    facility: {
      description: "Our state-of-the-art facility spans 10,000 sq ft with modern storage and handling equipment designed to maintain product integrity and safety. The facility is equipped with temperature-controlled storage areas, proper ventilation systems, and safety protocols that comply with industry standards. Our warehouse management system ensures efficient inventory tracking and timely order fulfillment.",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-b-4 border-amber-500">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-4 animate-slide-up-fade">
            <p className="text-sm font-semibold tracking-widest uppercase text-amber-400">About Our Company</p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              {companyInfo.name}
            </h1>
            <p className="mt-4 text-xl text-slate-300 max-w-2xl">
              {companyInfo.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8 sm:p-12 border border-slate-100 animate-slide-up-fade delay-1 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-12 bg-amber-500 rounded-full" />
            <h2 className="text-4xl font-bold text-slate-900">Our Story</h2>
            <span className="inline-flex items-center rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700 ml-auto">
              Est. {companyInfo.foundedYear}
            </span>
          </div>
          <p className="text-lg text-slate-700 leading-relaxed font-light">
            {companyInfo.about.story}
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-lg p-8 sm:p-12 text-center border border-amber-500/30 animate-slide-up-fade delay-2">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="h-1 w-8 bg-amber-500 rounded-full" />
            Our Mission
            <span className="h-1 w-8 bg-amber-500 rounded-full" />
          </h2>
          <p className="text-xl text-slate-100 leading-relaxed max-w-4xl mx-auto font-light">
            {companyInfo.about.mission}
          </p>
        </div>
      </section>

      {/* Facility Overview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 animate-slide-up-fade delay-3 hover:shadow-lg transition-shadow">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Facility Image */}
            <div className="relative h-64 lg:h-auto overflow-hidden group">
              <Image
                src={companyInfo.facility.imageUrl}
                alt="ChemCorp Industries facility"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-transparent" />
            </div>
            
            {/* Facility Description */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-12 bg-amber-500 rounded-full" />
                <h2 className="text-3xl font-bold text-slate-900">Our Facility</h2>
              </div>
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                {companyInfo.facility.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 animate-slide-up-fade delay-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600">Why Choose Us</p>
          <h2 className="text-4xl font-bold text-slate-900">
            Our Core Values
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companyInfo.about.values.map((value, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center p-8 rounded-xl bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300 animate-slide-up-fade delay-${Math.min(index + 5, 8)} group cursor-pointer`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <h3 className="font-semibold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">
                {value}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
