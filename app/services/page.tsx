'use client';

import React, { useEffect } from "react";
import Navbar from "@/components/partials/Navbar2";
import Footer from "@/components/Home/Footers";
import { Transition } from "@/components/PageTransition/Transition";
import ServicesList from "@/components/services/ServicesList";
import LocomotiveScroll from "locomotive-scroll";

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <Transition>
      <div className="w-full bg-[#0f0f0f] text-white">
        <Navbar />
        <div className="AllServices flex flex-col">
            <h1 className="inter-regular text-[58px] lg:text-[120px] leading-[70px] text-left lg:text-right mt-[9.313rem] lg:mt-[11.7rem] px-[19px] md:px-[38px] lg:px-[64px]">
              Services
            </h1>

            {/* Subtitle */}
            <p className="inter-regular text-[14px] lg:text-[16px] text-white opacity-40 text-left lg:text-right mt-4 px-[19px] md:px-[38px] lg:px-[64px]">
              What I design &amp; build
            </p>

            {/* Divider */}
            <span className="inline-block w-[91%] mx-auto h-[0.1px] opacity-50 md:opacity-15 lg:opacity-50 my-5 lg:mb-[0px] bg-white" />

            <ServicesList />
          </div>
        <Footer />
      </div>
    </Transition>
  );
};

export default ServicesPage;
