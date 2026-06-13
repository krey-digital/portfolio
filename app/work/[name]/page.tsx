'use client';

import React, { useEffect } from "react";
import { Transition } from "@/components/PageTransition/Transition";
import Navbar from "@/components/partials/Navbar2";
import { useProjectContext } from "@/context/ProjectContext";
import { FaUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";
import { useParams } from "next/navigation";
import LocomotiveScroll from "locomotive-scroll";

const Projects = () => {
  const params = useParams();
  const name = params.name as string;
  const ProjectDetails = useProjectContext();

  const Project = ProjectDetails.find((project) => project.name === name);

  useEffect(() => {
    window.scrollTo(0, 0);
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  if (!Project) {
    return <div>Project not found</div>;
  }

  return (
    <Transition>
      <Navbar />
      <div className="top mt-[100px] text-white px-5">
        <div className="large-flex lg:flex justify-between">
          <div className="flex-text">
            <h1 className="inter-medium text-[40px] leading-[48px] lg:text-[72px] lg:leading-[86px]">
              {Project.title}
            </h1>
            <h2 className="inter-regular mt-2 text-[18px] leading-[22px] lg:text-[32px] lg:leading-[38px] opacity-65">
              {Project.description}
            </h2>
          </div>
          <div className="flex lg:flex-col-reverse mt-10 justify-between items-center lg:items-end">
            <div className="brands flex gap-3">
              <h1 className="inter-regular text-[14px] leading-[17px] lg:text-[22px] lg:leading-[28px] border-[1px] border-[#777] py-2.5 px-5 rounded-full">
                {Project.Brand1}
              </h1>
              <h1 className="inter-regular text-[14px] leading-[17px] lg:text-[22px] lg:leading-[28px] border-[1px] border-[#777] py-2.5 px-5 rounded-full">
                {Project.Brand2}
              </h1>
            </div>
            <Link href={Project.SiteLink}>
              <FaUpRightFromSquare className="text-[24px] lg:text-[28px]" />
            </Link>
          </div>
        </div>
      </div>
      <div className="bottom text-white pb-5">
        <picture className="mt-5 inline-block overflow-hidden w-full h-[650px]">
          <img
            data-scroll
            data-scroll-speed="-.2"
            className="w-full h-full object-cover object-left"
            src={Project.bgImage}
            alt=""
          />
        </picture>
        <div className="large-right-side lg:flex flex-col justify-center items-end">
          <h4 className="inter-medium mt-16 text-[32px] leading-[35px] lg:text-[48px] lg:leading-[53px] lg:w-[70%] px-5">
            {Project.desc1}
          </h4>
          <h4 className="inter-light opacity-60 mt-7 lg:mt-10 text-[18px] leading-[22px] lg:text-[20px] lg:leading-[24px] lg:w-[70%] lg:pr-72 px-5">
            {Project.desc2}
          </h4>
          <div className="2-button px-5 lg:flex items-center justify-start gap-4 mt-16 lg:w-[70%]">
            <Link href={Project.SiteLink}>
              <h1 className="inter-regular text-[18px] border-[1px] rounded-[10px] border-[#777] py-5 lg:py-7 lg:px-9 text-center leading-[22px]">
                View Live Site
              </h1>
            </Link>
            {Project.DesignSystem && (
              <Link href={`/work/${name}/design-system`}>
                <h1 className="inter-regular mt-5 lg:mt-0 text-[18px] border-[1px] rounded-[10px] border-[#777] py-5 lg:py-7 lg:px-9 text-center leading-[22px]">
                  Design System
                </h1>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Projects;
