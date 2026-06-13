'use client';

import React, { useEffect, useState } from "react";
import Navbar from "@/components/partials/Navbar2";
import Footer from "@/components/Home/Footers";
import { CiGrid41 } from "react-icons/ci";
import { BsViewList } from "react-icons/bs";
import { Transition } from "@/components/PageTransition/Transition";
import ProjectLists from "@/components/work/ProjectLists";
import LocomotiveScroll from "locomotive-scroll";

const Works = () => {
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    window.scrollTo(0, 0);
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  return (
    <Transition>
      <div className="w-full bg-[#0f0f0f] text-white">
        <Navbar />
        <div className="AllProjects flex flex-col">
          <h1 className="inter-regular text-[58px] lg:text-[120px] leading-[70px] text-left lg:text-right mt-[9.313rem] lg:mt-[11.7rem] px-[19px] md:px-[38px] lg:px-[64px] ">
            All Projects
          </h1>
          <div className="hidden px-[19px] md:px-[38px] lg:px-[64px] lg:mx-[64px] lg:flex justify-end gap-7 mt-[6.103rem]">
            <span 
              className={`List size-[3.7rem] flex justify-center items-center cursor-pointer rounded-full ${viewMode === "list" ? "bg-white" : "bg-[#222]"}`}
              onClick={() => setViewMode("list")}
            >
              <BsViewList className={`text-3xl font-light ${viewMode === "list" ? "text-black" : "text-white"}`} />
            </span>
            <span 
              className={`Grid size-[3.7rem] cursor-pointer rounded-full flex justify-center items-center ${viewMode === "grid" ? "bg-white" : "bg-[#222]"}`}
              onClick={() => setViewMode("grid")}
            >
              <CiGrid41 className={`text-3xl font-light ${viewMode === "grid" ? "text-black" : "text-white"}`} />
            </span>
          </div>
          {/* Divider */}
          <span className="inline-block w-[91%] mx-auto h-[0.1px] opacity-50 md:opacity-15 lg:opacity-50 my-5 lg:mb-[0px]  bg-white"></span>
          <ProjectLists viewMode={viewMode} />
        </div>
        <Footer />
      </div>
    </Transition>
  );
};

export default Works;
