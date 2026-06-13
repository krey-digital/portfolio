'use client';

import React from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import { ServiceCategory } from "@/context/ServicesContext";

interface ServiceDetailProps {
  service: ServiceCategory;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service }) => {
  return (
    <div className="w-full">
      {/* ── Mobile ── */}
      <div className="lg:hidden px-[19px] md:px-[38px] space-y-6 mt-6">
        {service.subServices.map((sub) => (
          <div
            key={sub.id}
            className="rounded-[10px] overflow-hidden"
            style={{
              background: service.bgColor,
              border: `1px solid ${sub.accent}30`,
            }}
          >
            {/* Preview image */}
            <div className="w-full h-[220px] overflow-hidden">
              <img
                src={sub.previewImage}
                alt={sub.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <p
                className="inter-regular text-[11px] uppercase tracking-widest mb-2"
                style={{ color: sub.accent, opacity: 0.85 }}
              >
                {sub.tags.slice(0, 2).join(' • ')}
              </p>
              <h2
                className="inter-semibold text-[24px] leading-tight mb-3"
                style={{ color: service.textColor }}
              >
                {sub.title}
              </h2>
              <p
                className="inter-regular text-[14px] leading-relaxed mb-5"
                style={{ color: service.textColor, opacity: 0.7 }}
              >
                {sub.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {sub.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inter-regular text-[11px] px-3 py-1 rounded-full"
                    style={{
                      background: `${sub.accent}18`,
                      color: sub.accent,
                      border: `1px solid ${sub.accent}33`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Demo link */}
              <a
                href={sub.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 inter-regular text-[14px] group"
                style={{ color: sub.accent }}
              >
                <span className="border-b border-current pb-[1px]">
                  {sub.demoLabel}
                </span>
                <HiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* ── Desktop grid ── */}
      <div
        className="hidden lg:grid px-[64px] mt-10 pb-20 gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        }}
      >
        {service.subServices.map((sub) => (
          <div
            key={sub.id}
            className="group rounded-[10px] overflow-hidden flex flex-col"
            style={{
              background: service.bgColor,
              border: `1px solid ${sub.accent}25`,
            }}
          >
            {/* Preview image with overlay */}
            <div className="relative w-full h-[260px] overflow-hidden">
              <img
                src={sub.previewImage}
                alt={sub.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background: `linear-gradient(to top, ${service.bgColor}, transparent)`,
                }}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-7">
              <p
                className="inter-regular text-[11px] uppercase tracking-widest mb-2"
                style={{ color: sub.accent, opacity: 0.85 }}
              >
                {sub.tags.slice(0, 2).join(' • ')}
              </p>
              <h2
                className="inter-semibold text-[22px] xl:text-[26px] leading-tight mb-3"
                style={{ color: service.textColor }}
              >
                {sub.title}
              </h2>
              <p
                className="inter-regular text-[14px] leading-relaxed flex-1"
                style={{ color: service.textColor, opacity: 0.65 }}
              >
                {sub.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5 mb-6">
                {sub.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inter-regular text-[11px] px-3 py-1 rounded-full"
                    style={{
                      background: `${sub.accent}18`,
                      color: sub.accent,
                      border: `1px solid ${sub.accent}33`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Demo link */}
              <a
                href={sub.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 inter-regular text-[14px] group/link mt-auto"
                style={{ color: sub.accent }}
              >
                <span className="border-b border-current pb-[1px] transition-opacity group-hover/link:opacity-80">
                  {sub.demoLabel}
                </span>
                <HiArrowUpRight className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetail;
