'use client';

import React, { useState, useEffect } from "react";
import Cultivating from "@/components/Home/Cultivating";
import CraftMarquee from "@/components/Home/CraftMarquee";
import Work from "@/components/Home/Work";
import Footer from "@/components/Home/Footers";
import Navbar from "@/components/partials/Navbar";
import { Transition } from "@/components/PageTransition/Transition";
import LocomotiveScroll from "locomotive-scroll";

const words = ["Websites", "Experiences", "Applications"];

const Home = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const locomotiveScroll = new LocomotiveScroll();
    
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsVisible(true);
      }, 500); 
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Transition>
      <Navbar />
      <div className="w-full relative text-white bg-[#0f0f0f]">
        <div className="title">
          <div className="text pl-2 sticky top-16 py-7 pb-24 lg:py-[42.5px] lg:pb-32">
            <h1 className="inter-medium text-[55px] outline-none border-none lg:text-[80px] lg:leading-[96px] tracking-tight pl-11 lg:pl-[99px] leading-[66px]">
              Designing
            </h1>
            <div className="skills flex items-center gap-5">
              <span className="inline-block size-[21.5px] lg:w-[50px] lg:h-[50px] ml-1 lg:ml-8 rounded-full bg-white"></span>
              <div className="relative h-[100px] overflow-hidden">
                {words.map((word, index) => (
                  <h1
                    key={index}
                    className={`inter-medium outline-none border-none lg:text-[80px] lg:leading-[96px] text-[55px] tracking-tight leading-[66px] skill-word ${
                      currentWordIndex === index ? "visible" : "hidden"
                    }`}
                    style={{
                      transitionDelay: `${index * 1.3}s`,
                    }}
                  >
                    {word}
                  </h1>
                ))}
              </div>
            </div>
          </div>
          <div className="video w-full h-screen md:h-[80vh] lg:h-[165vh]">
            <video
              className="w-full h-full object-cover object-center mix-blend-difference"
              autoPlay
              loop
              muted
              src="https://framerusercontent.com/assets/qmR33GZwjSNwzCZTSTU1Fu2mZBk.mp4"
            ></video>
          </div>
        </div>
        <Cultivating />
        <CraftMarquee />
        <Work />
        <Footer />
      </div>
    </Transition>
  );
};

export default Home;
