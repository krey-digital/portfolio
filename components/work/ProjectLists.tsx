'use client';

import React, { useEffect } from "react";
import { HiArrowUpRight } from "react-icons/hi2";
import Link from "next/link";
import { useProjectContext } from "@/context/ProjectContext";

interface ProjectListsProps {
  viewMode: string;
}

const ProjectLists: React.FC<ProjectListsProps> = ({ viewMode }) => {
  const ProjectDetails = useProjectContext(); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="mobile lg:hidden px-[19px] md:px-[38px] lg:px-[64px]">
        {ProjectDetails.map((project, index) => (
          <Link key={index} href={project.Link}>
            <div
              className={`projects overflow-hidden relative mt-3 md:${project.marginTopMobile} mb-5`}
            >
              <div 
                className="picture cursor-pointer relative rounded-[5px] grid place-items-center w-full h-[21rem] md:h-[45rem] overflow-hidden"
                style={{
                  background: project.cardBgColor || "#1a1a1a"
                }}
              >
                <img
                  className="w-full h-auto max-h-full"
                  style={{
                    objectFit: project.img_config?.object_fit || "contain",
                    maxWidth: project.img_config?.max_width || "100%",
                    maxHeight: project.img_config?.max_height || "none",
                  }}
                  src={project.coverImage}
                  alt={project.title}
                />
              </div>
              <div className="project_details w-full absolute top-0 flex items-start justify-between py-3 px-3 md:py-7 md:px-5">
                <div className="title_desc">
                  <h1 
                    className="inter-semibold whitespace-nowrap text-[18px]"
                    style={{ color: project.cardTextColor || "#ffffff" }}
                  >
                    {project.title}
                  </h1>
                  <h3 
                    className="inter-regular text-[16px] mt-1"
                    style={{ color: project.cardTextColor || "#ffffff", opacity: 0.8 }}
                  >
                    {project.description}
                  </h3>
                </div>
                <div className="branding mt-2">
                  <h1 
                    className="whitespace-nowrap inter-regular text-[10px] md:text-[12px] uppercase"
                    style={{ color: project.cardTextColor || "#ffffff", opacity: 0.8 }}
                  >
                    {project.branding}
                  </h1>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="laptop hidden lg:flex lg:justify-center">
        <div
          className={`Grid-View ${
            viewMode === "grid" ? "grid mt-10" : "hidden"
          } grid-cols-2 gap-6 max-w-8xl w-full px-[19px] md:px-[38px] lg:px-[64px]`}
        >
          {ProjectDetails.map((project, index) => (
            <Link key={index} href={project.Link}>
              <div
                className={`projects overflow-hidden relative`}
              >
                <div 
                  className="picture cursor-pointer relative rounded-[5px] grid place-items-center w-full h-[35rem] overflow-hidden"
                  style={{
                    background: project.cardBgColor || "#1a1a1a"
                  }}
                >
                  <img
                    className="w-full h-auto max-h-full"
                    style={{
                      objectFit: project.img_config?.object_fit || "contain",
                      maxWidth: project.img_config?.max_width || "100%",
                      maxHeight: project.img_config?.max_height || "none",
                    }}
                    src={project.coverImage}
                    alt={project.title}
                  />
                </div>
                <div className="project_details w-full absolute top-0 flex items-start justify-between py-3 px-3 md:py-7 md:px-5">
                  <div className="title_desc">
                    <h1 
                      className="inter-semibold whitespace-nowrap text-[18px]"
                      style={{ color: project.cardTextColor || "#ffffff" }}
                    >
                      {project.title}
                    </h1>
                    <h3 
                      className="inter-regular text-[16px] mt-1"
                      style={{ color: project.cardTextColor || "#ffffff", opacity: 0.8 }}
                    >
                      {project.description}
                    </h3>
                  </div>
                  <div className="branding mt-2">
                    <h1 
                      className="whitespace-nowrap inter-regular text-[10px] md:text-[12px] uppercase"
                      style={{ color: project.cardTextColor || "#ffffff", opacity: 0.8 }}
                    >
                      {project.branding}
                    </h1>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div
          className={`List-View w-full ${
            viewMode === "list" ? "inline-block" : "hidden"
          }`}
        >
          {ProjectDetails.map((project, index) => (
            <Link key={index} href={project.Link}>
              <div
                className="overlay cursor-pointer relative px-16 group w-full"
              >
                <div
                  className={`flex justify-between mix-blend-difference w-full items-center border-b-[0.01px] ${project.marginTopLaptop} py-7 relative z-10`}
                >
                  <h1 className="inter-regular text-[22px] w-[30%]">{project.title}</h1>
                  <h1 className="inter-regular text-[16px] whitespace-nowrap w-[40%] text-center">
                    {project.description}
                  </h1>
                  <div className="branding flex items-center gap-2 w-[30%] justify-end">
                    <h1 className="inter-regular text-[16px] whitespace-nowrap">
                      {project.branding}
                    </h1>
                    <HiArrowUpRight className="text-[25px] hidden group-hover:block" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-0 bg-slate-50 transition-all duration-300 group-hover:h-full"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectLists;
