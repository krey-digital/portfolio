'use client';

import React, { useState, useEffect, useRef } from "react";
import "remixicon/fonts/remixicon.css";
import gsap from "gsap";
import NavContainer from "./NavContainer";
import Link from "next/link";

const Navbar2 = () => {
  const [links] = useState([
    { value: "Work", link: "/work" },
    { value: "Services", link: "/services" },
    { value: "About", link: "/about" },
    { value: "Contact", link: "/contact" },
  ]);

  const [menuState, setMenuState] = useState({
    id: 0,
    value: "• menu",
    isActive: false,
  });

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLUListElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY === 0) {
        setIsVisible(true);
        if (navbarRef.current) {
          gsap.to(navbarRef.current, { y: "0%", opacity: 1, duration: 0.1 });
        }
        const validLinks = linksRef.current.filter(link => link !== null);
        if (validLinks.length > 0) {
          gsap.to(validLinks, {
            opacity: 1,
            y: "0%",
            stagger: 0.05,
            duration: 0.2,
          });
        }
      } else {
        setIsVisible(false);
        if (navbarRef.current) {
          gsap.to(navbarRef.current, { y: "0%", opacity: 0, duration: 0.1 });
        }
        const validLinks = linksRef.current.filter(link => link !== null);
        if (validLinks.length > 0) {
          gsap.to(validLinks, {
            opacity: 0,
            y: "-10%",
            stagger: 0.05,
            duration: 0.1,
          });
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setMenuState((prevState) => ({
      ...prevState,
      value: prevState.value === "• menu" ? "• close" : "• menu",
      isActive: !prevState.isActive,
    }));
  };

  return (
    <>
      <div
        ref={navbarRef}
        className="w-full flex items-center fixed top-0 z-20 lg:z-0 justify-between text-white py-2 px-5 lg:py-[18px] lg:px-7 transition-transform duration-300"
      >
        <div className="logo_text w-full">
          <ul>
            <li className="content__item">
              <Link
                href="/"
                className="link link--leda outline-none text-[18px] tracking-tight poppins-regular leading-none"
                data-text="Krey Digital"
              >
                <span>Krey</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="links">
          <div className="mobile lg:hidden" onClick={toggleMenu}>
            <h1 className="text-[16px] whitespace-nowrap poppins-medium tracking-tight leading-none">
              {menuState.value}
            </h1>
          </div>
          <div className="pc hidden lg:flex items-center gap-5">
            {links.map((link, index) => (
              <ul key={index} ref={(el) => { linksRef.current[index] = el; }}>
                <li className="content__item">
                  <Link
                    href={link.link}
                    className="link link--leda text-[18px] tracking-tight poppins-regular capitalize leading-none"
                    data-text={link.value}
                  >
                    <span>{link.value}</span>
                  </Link>
                </li>
              </ul>
            ))}
            <i className="hidden ri-sun-line text-xl"></i>
          </div>
        </div>
      </div>
      {menuState.isActive && <NavContainer />}
    </>
  );
};

export default Navbar2;
