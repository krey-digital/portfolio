'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';

const CraftMarquee = () => {
  const left = useRef<HTMLHeadingElement>(null);
  const right = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (left.current) {
      gsap.fromTo(left.current, {
        x: '-100%'
      }, {
        x: '0%',
        duration: 1,
        delay: 2,
        scrollTrigger: {
          trigger: left.current,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
        }
      });
    }

    if (right.current) {
      gsap.fromTo(right.current, {
        x: '100%'
      }, {
        x: '-70%',
        scrollTrigger: {
          trigger: right.current,
          start: "top 60%",
          end: "top 20%",
          scrub: true,
        }
      });
    }
  });

  return (
    <div className='w-full py-20 lg:py-0 md:py-28 overflow-hidden'>
      <h1 ref={left} className='inter-regular text-[105px] md:text-[220px] md:leading-[260px] lg:text-[305px] lg:leading-[350px] leading-[140px] tracking-tight'>
        Crafting
      </h1>
      <h1 ref={right} className='inter-regular text-[105px] md:text-[220px] md:leading-[260px] lg:text-[305px] lg:leading-[350px] whitespace-nowrap leading-[140px] tracking-tight'>
        Digital Beauty
      </h1>
    </div>
  );
};

export default CraftMarquee;
