'use client';

import React, { useState, useEffect } from "react";
import { Transition } from "@/components/PageTransition/Transition";
import Navbar from "@/components/partials/Navbar2";
import Footer from "@/components/Home/Footers";
import LocomotiveScroll from "locomotive-scroll";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xrbzgwdp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again later.');
    }
    setIsSubmitting(false);
  };

  return (
    <Transition>
      <Navbar />
      <div className="contact-title mt-32 text-white px-5">
        <h1 className="text-left text-[93px] leading-[96px] lg:text-[270px] lg:leading-[180px] inter-regular">Contact</h1>
        <span className="flex flex-col justify-center items-end">
          <h1 className="text-left text-[93px] mt-4 lg:mt-40 leading-[96px] lg:text-[270px] lg:leading-[180px] inter-regular">me</h1>
        </span>
      </div>
      <div className="contact-form mt-10 lg:mt-32 text-white px-5 py-10 lg:px-40">
        <form onSubmit={handleSubmit}>
          <input 
            className="outline-none py-3 px-5 bg-[#333] w-full poppins-regular" 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input 
            className="outline-none py-3 px-5 bg-[#333] mt-5 w-full poppins-regular" 
            type="email" 
            name="email" 
            placeholder="E-Mail" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea 
            name="message" 
            placeholder="Message" 
            className="outline-none pt-3 resize-none pb-10 lg:pb-40 px-5 bg-[#333] mt-5 w-full poppins-regular"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <input 
            className="py-3 px-5 bg-[#fff] text-black mt-4 w-full poppins-regular cursor-pointer" 
            type="submit" 
            value={isSubmitting ? "Sending..." : "Send"} 
            disabled={isSubmitting}
          />
        </form>
        {submitMessage && <p className="mt-4 text-center">{submitMessage}</p>}
      </div>
      <Footer />
    </Transition>
  );
};

export default Contact;
