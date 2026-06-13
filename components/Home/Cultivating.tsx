'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

const Cultivating = () => {
  const text = useRef<HTMLParagraphElement>(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (text.current) {
      const textElements = text.current.querySelectorAll("span");

      gsap.fromTo(textElements, {
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 2,
        stagger: 0.1,
        color: '#fff',
        scrollTrigger: {
          trigger: text.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: true,
        },
      });
    }
  });

  return (
    <div className="w-full">
      <p
        ref={text}
        className="inter-medium text-[38px] text-[#333] outline-none border-none lg:text-[48px] lg:leading-[53px] tracking-normal px-5 pb-10 md:pb-28 lg:pb-32 lg:px-10 mt-[102px] md:mt-[200px] lg:mt-[228px] leading-[42px]"
      >
        {
          "Cultivating digital brilliance through creative designs and developing immersive interactive experiences that elevate brands in the era of digital design.".split("").map((char, index) => (
            <span key={index}>{char}</span>
          ))
        }
      </p>
    </div>
  );
};

export default Cultivating;
