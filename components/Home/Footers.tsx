'use client';

import React, { useEffect } from "react";
import { BsArrowUpRight } from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
  function hoverAndUp() {
    const lets_go = document.querySelector(".lets_go");
    const UpArrow = document.querySelector(".up_icon");

    if (lets_go && UpArrow) {
      lets_go.addEventListener("mouseenter", () => {
        (UpArrow as HTMLElement).style.transform = "translateY(0)";
      });

      lets_go.addEventListener("mouseleave", () => {
        (UpArrow as HTMLElement).style.transform = "translateY(40px)";
      });
    }
  }

  useEffect(() => {
    hoverAndUp();
  });

  return (
    <div className="w-full text-white bg-[#1B1C1F]">
      <div className="pt-20">
        <div className="drop_to_socialLinks flex-col lg:flex-row flex">
          <div className="mobile lg:hidden flex items-end">
            <h1 className="text-[42px] leading-[46px] px-5 md:px-10 w-2/3 md:w-2/4 opacity-75 inter-regular">
              Let's work together
            </h1>
            <BsArrowUpRight className="text-[42px] leading-none -ml-14 md:-ml-32 opacity-75 inter-regular" />
          </div>
          <div className="lets_go lg:flex hidden items-end overflow-hidden">
            <h1 className="text-[50px] leading-[56px] px-16 tracking-tight opacity-75 inter-regular">
              Drop a line <br /> if you want to collab.
            </h1>
            <BsArrowUpRight className="up_icon text-[42px] leading-none translate-y-10 duration-500 -ml-7 opacity-75 inter-regular" />
          </div>
          <div className="both_socials flex justify-between md:justify-start md:gap-20 px-5 md:px-10 lg:gap-40 mt-20 lg:-ml-6 ">
            <div className="useful inter-light">
              <h1 className="text-[#8a8a8e]">USEFUL</h1>
              <div className="home_about mt-5 flex gap-6 lg:gap-20">
                <ul>
                  <li className="content__item">
                    <Link
                      href="/"
                      className="link link--leda text-[18px] tracking-tight poppins-regular leading-none"
                      data-text="Home"
                    >
                      <span>Home</span>
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li className="content__item">
                    <Link
                      href="/about"
                      className="link link--leda text-[18px] tracking-tight poppins-regular leading-none"
                      data-text="About"
                    >
                      <span>About</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="work_contact flex gap-6 lg:gap-20">
                <ul>
                  <li className="content__item">
                    <Link
                      href="/work"
                      className="link link--leda text-[18px] tracking-tight poppins-regular leading-none"
                      data-text="Works"
                    >
                      <span>Works</span>
                    </Link>
                  </li>
                </ul>
                <ul>
                  <li className="content__item">
                    <Link
                      href="/contact"
                      className="link link--leda text-[18px] tracking-tight poppins-regular leading-none"
                      data-text="Contact"
                    >
                      <span>Contact</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="socials inter-light">
              <h1 className="inter-light text-[#8a8a8e]">SOCIAL</h1>
              <div className="home_about mt-5 flex gap-6 lg:gap-20">
                <ul>
                  <li className="content__item">
                    <a
                      href="#"
                      className="link link--leda text-[18px] tracking-tight poppins-regular leading-none"
                      data-text="Behance"
                    >
                      <span>Behance</span>
                    </a>
                  </li>
                </ul>
                <ul>
                  <li className="content__item">
                    <a
                      href="#"
                      className="link link--leda text-[18px] tracking-tight poppins-regular leading-none"
                      data-text="LinkedIn"
                    >
                      <span>LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="work_contact flex gap-6 lg:gap-20">
                <ul>
                  <li className="content__item">
                    <a
                      href="#"
                      className="link link--leda text-[18px] tracking-tight poppins-regular leading-none"
                      data-text="Dribble"
                    >
                      <span>Dribble</span>
                    </a>
                  </li>
                </ul>
                <ul>
                  <li className="content__item">
                    <a
                      href="#"
                      className="link link--leda text-[18px] tracking-tight poppins-regular leading-none"
                      data-text="Twitter"
                    >
                      <span>Twitter</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <span className="w-[90%] text-center h-[.06px] mt-20 bg-[#8a8a8e]"></span>
          <h1 className="text-[#949494] px-5 opacity-50 tracking-tighter leading-none poppins-medium text-[102px] md:text-[200px] lg:text-[350px] lg:leading-none">
            KREY DIGITAL
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
