'use client';

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjectContext } from "@/context/ProjectContext";
import Navbar from "@/components/partials/Navbar2";
import { Transition } from "@/components/PageTransition/Transition";
import LocomotiveScroll from "locomotive-scroll";

const DesignSystemPage = () => {
  const params = useParams();
  const router = useRouter();
  const name = params.name as string;
  const ProjectDetails = useProjectContext();

  const Project = ProjectDetails.find((project) => project.name === name);

  useEffect(() => {
    window.scrollTo(0, 0);
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  if (!Project || !Project.DesignSystem) {
    return (
      <Transition>
        <Navbar />
        <div className="text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="inter-bold text-4xl mb-4">Design System Not Found</h1>
            <button
              onClick={() => router.back()}
              className="inter-regular text-lg border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </Transition>
    );
  }

  const { DesignSystem } = Project;

  return (
    <Transition>
      <Navbar />
      <div className="min-h-screen bg-[#0f0f0f] text-white px-5 lg:px-20 py-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className="inter-regular text-gray-400 hover:text-white mb-8 flex items-center gap-2 transition-colors"
          >
            ← Back to Project
          </button>

          <h1 className="inter-bold text-5xl lg:text-7xl mb-4">{Project.title}</h1>
          <h2 className="inter-medium text-2xl lg:text-3xl text-gray-400 mb-16">
            Design System
          </h2>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
            
            {/* Colors Section - Large */}
            <div className="lg:col-span-8 bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800">
              <h3 className="inter-semibold text-3xl mb-6">Color Palette</h3>
              
              {/* Primary Colors */}
              <div className="mb-6">
                <h4 className="inter-medium text-lg mb-4 text-gray-300">Primary</h4>
                <div className="flex flex-wrap gap-4">
                  {DesignSystem.colors.primary.map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-20 h-20 rounded-xl border-2 border-gray-700 shadow-lg hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="inter-regular text-xs mt-2 text-gray-400">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Colors */}
              <div className="mb-6">
                <h4 className="inter-medium text-lg mb-4 text-gray-300">Secondary</h4>
                <div className="flex flex-wrap gap-4">
                  {DesignSystem.colors.secondary.map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-20 h-20 rounded-xl border-2 border-gray-700 shadow-lg hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="inter-regular text-xs mt-2 text-gray-400">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Neutral Colors */}
              <div>
                <h4 className="inter-medium text-lg mb-4 text-gray-300">Neutral</h4>
                <div className="flex flex-wrap gap-4">
                  {DesignSystem.colors.neutral.map((color, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="w-20 h-20 rounded-xl border-2 border-gray-700 shadow-lg hover:scale-105 transition-transform"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="inter-regular text-xs mt-2 text-gray-400">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Typography Section - Medium */}
            <div className="lg:col-span-4 bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800">
              <h3 className="inter-semibold text-3xl mb-6">Typography</h3>
              <div className="space-y-6">
                <div>
                  <span className="inter-medium text-gray-400 text-xs uppercase tracking-wider">Heading Font</span>
                  <p className="inter-regular text-white text-lg mt-2">{DesignSystem.typography.headingFont}</p>
                </div>
                <div>
                  <span className="inter-medium text-gray-400 text-xs uppercase tracking-wider">Body Font</span>
                  <p className="inter-regular text-white text-lg mt-2">{DesignSystem.typography.bodyFont}</p>
                </div>
                <div>
                  <span className="inter-medium text-gray-400 text-xs uppercase tracking-wider mb-3 block">Font Sizes</span>
                  <div className="flex flex-wrap gap-2">
                    {DesignSystem.typography.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="inter-regular text-white bg-[#2a2a2a] px-3 py-2 rounded-lg text-sm border border-gray-700"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing Section - Medium */}
            <div className="lg:col-span-5 bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800">
              <h3 className="inter-semibold text-3xl mb-6">Spacing</h3>
              <div className="space-y-3">
                {DesignSystem.spacing.map((space, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="inter-regular text-gray-400 w-12 text-sm">{space}</span>
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-6 rounded"
                      style={{ width: space }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Border Radius Section - Medium */}
            <div className="lg:col-span-4 bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800">
              <h3 className="inter-semibold text-3xl mb-6">Radius</h3>
              <div className="grid grid-cols-2 gap-4">
                {DesignSystem.borderRadius.map((radius, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-gray-700"
                      style={{ borderRadius: radius }}
                    ></div>
                    <span className="inter-regular text-xs mt-2 text-gray-400">{radius}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shadows Section - Small */}
            <div className="lg:col-span-3 bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800">
              <h3 className="inter-semibold text-3xl mb-6">Shadows</h3>
              <div className="space-y-4">
                {DesignSystem.shadows.map((shadow, index) => (
                  <div key={index}>
                    <div
                      className="bg-[#2a2a2a] rounded-lg p-4 mb-2"
                      style={{ boxShadow: shadow.value }}
                    >
                      <p className="inter-medium text-white text-sm">{shadow.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Breakpoints Section - Medium */}
            <div className="lg:col-span-4 bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800">
              <h3 className="inter-semibold text-3xl mb-6">Breakpoints</h3>
              <div className="space-y-4">
                {DesignSystem.breakpoints.map((breakpoint, index) => (
                  <div key={index}>
                    <span className="inter-medium text-white text-lg block mb-1">{breakpoint.name}</span>
                    <span className="inter-regular text-gray-400 text-sm">{breakpoint.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Components Section - Large */}
            <div className="lg:col-span-8 bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800">
              <h3 className="inter-semibold text-3xl mb-6">Components</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {DesignSystem.components.map((component, index) => (
                  <div
                    key={index}
                    className="bg-[#2a2a2a] rounded-lg p-4 border border-gray-700 hover:border-gray-500 transition-all text-center"
                  >
                    <p className="inter-regular text-white text-sm">{component}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Principles Section - Full Width */}
            {DesignSystem.designPrinciples && (
              <div className="lg:col-span-12 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-8 border border-gray-800">
                <h3 className="inter-semibold text-3xl mb-6">Design Principles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DesignSystem.designPrinciples.map((principle, index) => (
                    <div
                      key={index}
                      className="bg-[#1a1a1a] rounded-xl p-5 border border-gray-700"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inter-bold text-blue-500 text-xl">{index + 1}</span>
                        <p className="inter-regular text-white">{principle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pages & Screens Section */}
          {DesignSystem.pages && (
            <div className="mb-20">
              <h3 className="inter-semibold text-3xl lg:text-4xl mb-8">Pages & Screens</h3>
              <div className="space-y-12">
                {DesignSystem.pages.map((page, index) => (
                  <div
                    key={index}
                    className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800"
                  >
                    {/* Page Image */}
                    <div className="w-full h-64 lg:h-96 overflow-hidden">
                      <img
                        src={page.image}
                        alt={page.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Page Content */}
                    <div className="p-6 lg:p-8">
                      <h4 className="inter-bold text-2xl lg:text-3xl text-white mb-3">
                        {page.name}
                      </h4>
                      <p className="inter-regular text-gray-300 text-lg mb-6">
                        {page.description}
                      </p>

                      {/* Features List */}
                      <div>
                        <h5 className="inter-semibold text-xl text-white mb-4">Key Features:</h5>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {page.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-start gap-3 text-gray-300"
                            >
                              <span className="text-blue-500 mt-1">✓</span>
                              <span className="inter-regular text-base">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Transition>
  );
};

export default DesignSystemPage;
