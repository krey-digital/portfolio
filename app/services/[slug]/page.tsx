'use client';

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/partials/Navbar2";
import Footer from "@/components/Home/Footers";
import { Transition } from "@/components/PageTransition/Transition";
import MicroNichesSection from "@/components/services/MicroNichesSection";
import { useServicesContext } from "@/context/ServicesContext";
import Link from "next/link";
import LocomotiveScroll from "locomotive-scroll";

const ServiceCategoryPage = () => {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const services = useServicesContext();
  const service = services.find((s) => s.slug === slug) ?? null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const locomotiveScroll = new LocomotiveScroll();
    // Expose the Lenis instance globally so modals can stop/start it
    (window as any)._lenis = (locomotiveScroll as any).lenisInstance ?? locomotiveScroll;
    return () => {
      locomotiveScroll.destroy();
      delete (window as any)._lenis;
    };
  }, []);

  if (!service) {
    return (
      <div className="w-full h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center gap-4">
        <p className="inter-regular text-[18px] opacity-60">Service not found.</p>
        <Link href="/services" className="inter-regular text-[14px] underline opacity-40 hover:opacity-80">
          ← Back to Services
        </Link>
      </div>
    );
  }

  return (
    <Transition>
      <div className="w-full bg-[#0f0f0f] text-white">
        <Navbar />

        <div className="flex flex-col">
          {/* Breadcrumb */}
          <div className="mt-[9.313rem] lg:mt-[11.7rem] px-[19px] md:px-[38px] lg:px-[64px]">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 inter-regular text-[13px] text-white/40 hover:text-white/80 transition-colors uppercase tracking-widest"
            >
              ← Services
            </Link>
          </div>

          {/* Hero heading */}
          <h1 className="inter-regular text-[48px] lg:text-[110px] leading-[1] text-left lg:text-right mt-4 px-[19px] md:px-[38px] lg:px-[64px]">
            {service.title}
          </h1>

          {/* Category + tagline */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2 mt-4 px-[19px] md:px-[38px] lg:px-[64px]">
            <p
              className="inter-regular text-[11px] uppercase tracking-widest"
              style={{ color: service.accent, opacity: 0.85 }}
            >
              {service.category}
            </p>
            <p className="inter-regular text-[14px] lg:text-[16px] text-white/40 text-left lg:text-right max-w-xl">
              {service.tagline}
            </p>
          </div>

          {/* Divider */}
          <span className="inline-block w-[91%] mx-auto h-[0.1px] opacity-50 md:opacity-15 lg:opacity-50 my-5 bg-white" />

          {/* Micro-niches with search */}
          <MicroNichesSection accent={service.accent} />
        </div>

        <Footer />
      </div>
    </Transition>
  );
};

export default ServiceCategoryPage;
