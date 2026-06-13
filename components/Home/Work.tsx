'use client';

import React, { useState } from "react";
import Link from "next/link";

interface WorkDetail {
  id: number;
  title: string;
  tags: string;
  img: string;
  bg_color: string;
  text_color: string;
  size: string;
  link: string;
  cursor_effect: string;
  img_config?: {
    object_fit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    max_width?: string;
    max_height?: string;
    aspect_ratio?: string;
  };
}

const Work = () => {
  const [details] = useState<WorkDetail[]>([
    {
      id: 0, 
      title: "BONUS GALAXY", 
      tags: "WEB DESIGN • DEVELOPMENT", 
      img: "https://bonus-galaxy-demo.vercel.app/images/bonus-galaxy-logo.png", 
      bg_color: "bg-[#0a0e27]", 
      text_color: "text-[#fff]", 
      size: "top-[40px]", 
      link: "/work/bonusgalaxy", 
      cursor_effect: "cursor-pointer",
      img_config: {
        object_fit: "contain",
        max_width: "700px",
        max_height: "600px",
      }
    },
    {
      id: 1, 
      title: "UNLIMITED PERFECT DEALS", 
      tags: "WEB DESIGN • DEVELOPMENT", 
      img: "https://demo-upd-123.vercel.app/logo.svg", 
      bg_color: "bg-[#f8f9fa]", 
      text_color: "text-[#1b1c1f]", 
      size: "top-[80px]", 
      link: "/work/upd", 
      cursor_effect: "cursor-pointer",
      img_config: {
        object_fit: "contain",
        max_width: "500px",
        max_height: "450px",
      }
    },
    {
      id: 2, 
      title: "LAIT911", 
      tags: "MOBILE APP • EMERGENCY TECH", 
      img: "/images/work/LAIT911.webp", 
      bg_color: "bg-[#d32f2f]", 
      text_color: "text-[#fff]", 
      size: "top-[120px]", 
      link: "/work/lait911", 
      cursor_effect: "cursor-pointer",
      img_config: {
        object_fit: "contain",
        max_width: "400px",
        max_height: "400px",
      }
    },
    {
      id: 3, 
      title: "HEATBUBBLE", 
      tags: "MOBILE APP • UTILITY", 
      img: "/images/work/heatbubble.webp", 
      bg_color: "bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4]", 
      text_color: "text-[#fff]", 
      size: "top-[160px]", 
      link: "/work/heatbubble", 
      cursor_effect: "cursor-pointer",
      img_config: {
        object_fit: "contain",
        max_width: "400px",
        max_height: "400px",
      }
    },
  ]);

  return (
    <div data-scroll data-scroll-speed=".1" className="w-full mt-20 shadow-2xl lg:mt-10">
      <h1
        data-scroll
        data-scroll-speed=".1"
        className="poppins-regular sticky top-10 text-[#949494] opacity-50 text-[120px] md:text-[230px] lg:text-[350px] text-center uppercase"
      >
        work
      </h1>
      <div className="works_list mt-40 md:mt-72 lg:mt-96 px-3 lg:px-10">
        {details.map((elem, index) => (
          <Link key={index} href={elem.link}>
            <div
              data-scroll
              data-scroll-speed=".01"
              className={`card's sticky ${elem.size} ${elem.text_color} ${elem.cursor_effect} rounded-md w-full h-[60vh] lg:h-[90vh] ${elem.bg_color}`}
            >
              <div className="h-full flex flex-col">
                <h1 className="text-center poppins-semibold text-[36px] lg:text-[76px] lg:leading-[79px] tracking-wider pt-5 pb-2 lg:pt-10 lg:pb-3 leading-[43px]">
                  {elem.title}
                </h1>
                <h3 className="text-center poppins-light text-[14px] lg:pb-5 tracking-wider leading-[17px] lg:text-[18px] lg:leading-[22px] whitespace-nowrap">
                  {elem.tags}
                </h3>
                <div className="picture flex-1 mt-3 rounded-3xl overflow-hidden px-2 lg:px-32 flex items-center justify-center pb-5">
                  <img
                    className="w-full h-auto max-h-full"
                    style={{
                      objectFit: elem.img_config?.object_fit || "contain",
                      maxWidth: elem.img_config?.max_width || "100%",
                    }}
                    src={elem.img}
                    alt={elem.title}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/work">
        <div className="btn flex justify-center items-center">
          <h1 className="card's mt-9 mb-10 md:mb-16 lg:mb-10 text-center sticky rounded-full w-fit px-5 py-3 text-base lg:text-2xl border-[1.5px] border-slate-300">
            All Projects
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Work;
