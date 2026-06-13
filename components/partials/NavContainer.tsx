'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import Link from "next/link";

const NavContainer = () => {
  useGSAP(() => {
    gsap.to(".s_link", {
      opacity: 1,
      x: "0%",
      stagger: 0.15,
      duration: 0.3,
    });
  });

  return (
    <div className="w-full h-screen text-white fixed top-0 z-10 transition-all duration-300 overflow-hidden bg-[#1B1C1F] ">
      <div className="link h-full flex py-4 px-12 md:px-10 flex-col justify-center md:justify-start md:mt-52 items-start">
        <Link href="/" className="s_link poppins-regular opacity-0 translate-x-10 text-[52px] leading-[85px]">
          Home
        </Link>
        <Link href="/work" className="s_link poppins-regular opacity-0 translate-x-10 text-[52px] leading-[85px]">
          Work
        </Link>
        <Link href="/services" className="s_link poppins-regular opacity-0 translate-x-10 text-[52px] leading-[85px]">
          Services
        </Link>
        <Link href="/about" className="s_link poppins-regular opacity-0 translate-x-10 text-[52px] leading-[85px]">
          About
        </Link>
        <Link href="/contact" className="s_link poppins-regular opacity-0 translate-x-10 text-[52px] leading-[85px]">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default NavContainer;
