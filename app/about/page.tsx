'use client';

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/partials/Navbar2";
import Footer from "@/components/Home/Footers";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Transition } from "@/components/PageTransition/Transition";
import LocomotiveScroll from "locomotive-scroll";

const About = () => {
  const details = [
    {
      id: 1,
      number: "01",
      title: "Design",
      paragraph:
        "I excel in crafting fluid user experiences and captivating interfaces for both apps and websites. My expertise spans from initial prototypes to robust UX strategies, encompassing design systems and detailed guidelines to ensure seamless execution.",
      bgImage:
        "https://framerusercontent.com/images/ihViULUC02T3r7LRbAuZAXNjg.jpg?scale-down-to=1024",
    },
    {
      id: 2,
      number: "02",
      title: "Build",
      paragraph:
        "I specialize in crafting unique promotional websites and custom online stores for ambitious brands worldwide. From initial concept to final development, I create extraordinary digital experiences tailored to your brand's vision and goals.",
      bgImage:
        "https://framerusercontent.com/images/tpsWxhziXci4pdkLRkPYLYTR4jk.jpg?scale-down-to=1024",
    },
    {
      id: 3,
      number: "03",
      title: "Grow",
      paragraph:
        "I collaborate closely with startups and SMEs, guiding them from logo creation to comprehensive brand strategy implementation. My goal is to elevate your brand identity across every interaction point, ensuring designs that not only meet industry standards but also pave the way for your company's sustained growth.",
      bgImage:
        "https://framerusercontent.com/images/CdyCcVPNhWICowWzZp4SMceTLs.jpg?scale-down-to=1024",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  const text = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (text.current) {
      const textElements = text.current.querySelectorAll("span");

      gsap.fromTo(
        textElements,
        {
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 2,
          stagger: 0.1,
          color: "#fff",
          scrollTrigger: {
            trigger: text.current,
            start: "top 80%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    }
  });

  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Transition>
      <div className="text-white w-full">
        <Navbar />
        <div className="about-contents mt-24">
          <h1 className=" inter-medium text-[40px] leading-[44px] lg:text-[44px] lg:leading-[48px] lg:w-[92%]  px-5">
            Empowering ambitious brands to thrive with innovative, creative-led
            designs and a human-centric approach that drives lasting impact.
          </h1>
          <p className="inter-regular text-[18px] leading-[23px] lg:w-[62%] px-5 mt-10 lg:mt-16">
            Greetings, I'm Hetrajsinh Raj, a solo designer and developer
            excelling in a wide array of ventures, from promotional sites,
            landing pages, ecommerce stores, to member portals. Moreover, I
            partner with clients on all-encompassing branding endeavors,
            spanning logo and identity creation to crafting complete brand
            guidelines and strategies.
          </p>
          <h3 className="inter-medium text-[32px] leading-[38px] lg:text-[35px] lg:leading-[42px] px-5 mt-16 lg:mt-20">
            <span className="inline-block whitespace-nowrap overflow-hidden border-r-4 border-black animate-typing">
              I can help you with...
            </span>
          </h3>
          <span className="inline-block w-full mx-auto h-[0.1px] opacity-15 md:opacity-15 my-5 lg:my-[30px] bg-white"></span>
          {details.map((det, index) => (
            <div key={index} className="boxes-skill mt-20">
              <h5 className="inter-regular text-[12px] px-10 text-[#808080] leading-[14px]">
                {det.number}
              </h5>
              <picture
                style={{
                  backgroundImage: `url('${det.bgImage}')`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundPosition: "center",
                }}
                className="relative mt-7 inline-block w-[70%] h-[100px]"
              >
                <h1 className="inter-bold px-10 text-[48px] tracking-tight">
                  {det.title}
                </h1>
              </picture>
              <p className="inter-regular opacity-75 px-10 text-left text-[18px] leading-[28px]">
                {det.paragraph}
              </p>
              <span className="inline-block w-full mx-auto h-[0.1px] opacity-15 md:opacity-15 mt-20 lg:mt-24 lg:my-[30px] bg-white"></span>
            </div>
          ))}
        </div>
        <p
          data-scroll
          data-scroll-speed=".1"
          ref={text}
          className="inter-medium text-[38px] text-[#333] outline-none border-none lg:text-[48px] lg:leading-[53px] tracking-normal px-5 pb-10 md:pb-28 lg:pb-32 lg:px-10 mt-[102px] md:mt-[200px] lg:mt-[228px] leading-[42px]"
        >
          {"Collaborating with passionate individuals and ambitious brands to craft memorable, captivating digital experiences, always striving for a best possible solution.   "
            .split("")
            .map((char, index) => (
              <span key={index}>{char}</span>
            ))}
        </p>
      </div>
      <Footer />
    </Transition>
  );
};

export default About;
