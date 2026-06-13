'use client';

import React, { useState } from "react";
import Link from "next/link";
import { HiArrowUpRight } from "react-icons/hi2";
import { useServicesContext } from "@/context/ServicesContext";

const ServicesList = () => {
  const services = useServicesContext();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* ── Mobile layout ── */}
      <div className="lg:hidden px-[19px] md:px-[38px] space-y-4 mt-6">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`}>
            <div
              className="rounded-[8px] overflow-hidden p-6 cursor-pointer group"
              style={{
                background: service.bgColor,
                border: `1px solid ${service.accent}22`,
              }}
            >
              <p
                className="inter-regular text-[11px] uppercase tracking-widest mb-3"
                style={{ color: service.accent, opacity: 0.85 }}
              >
                {service.category}
              </p>
              <div className="flex items-center justify-between">
                <h2
                  className="inter-semibold text-[26px] md:text-[34px] leading-tight"
                  style={{ color: service.textColor }}
                >
                  {service.title}
                </h2>
                <HiArrowUpRight
                  className="text-[22px] opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ color: service.accent }}
                />
              </div>
              <p
                className="inter-regular text-[14px] leading-relaxed mt-3"
                style={{ color: service.textColor, opacity: 0.65 }}
              >
                {service.description}
              </p>
              <p
                className="inter-regular text-[12px] mt-4 uppercase tracking-widest"
                style={{ color: service.accent, opacity: 0.7 }}
              >
                {service.subServices.length} services →
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Desktop list layout ── */}
      <div className="hidden lg:block w-full">
        {services.map((service, index) => (
          <Link key={service.slug} href={`/services/${service.slug}`}>
            <div
              className="overlay cursor-pointer relative px-[64px] group w-full"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* hover bg fill */}
              <div
                className="absolute inset-x-0 bottom-0 h-0 transition-all duration-500 group-hover:h-full"
                style={{ background: service.bgColor }}
              />

              <div className="relative z-10 flex items-center justify-between border-b border-white/10 py-8 gap-10">
                {/* Left — index + title */}
                <div className="flex items-center gap-8 w-[35%]">
                  <span
                    className="inter-regular text-[13px] tabular-nums opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      color: hovered === index ? service.accent : "#fff",
                    }}
                  >
                    0{index + 1}
                  </span>
                  <h2
                    className="inter-regular text-[28px] xl:text-[34px] leading-none transition-colors duration-300"
                    style={{
                      color: hovered === index ? service.textColor : "#fff",
                    }}
                  >
                    {service.title}
                  </h2>
                </div>

                {/* Centre — category + sub-count */}
                <div className="w-[40%] space-y-1">
                  <p
                    className="inter-regular text-[11px] uppercase tracking-widest transition-colors duration-300"
                    style={{
                      color:
                        hovered === index ? service.accent : "#ffffff55",
                    }}
                  >
                    {service.category}
                  </p>
                  <p
                    className="inter-regular text-[14px] leading-snug opacity-0 group-hover:opacity-80 transition-opacity duration-300"
                    style={{ color: service.textColor }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Right — sub-service count + arrow */}
                <div className="w-[25%] flex items-center justify-end gap-4">
                  <span
                    className="inter-regular text-[12px] uppercase tracking-widest opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ color: service.accent }}
                  >
                    {service.subServices.length} services
                  </span>
                  <HiArrowUpRight
                    className="text-[22px] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      color: hovered === index ? service.accent : "#fff",
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
