"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

/**
 * ContactForm Component
 *
 * Client-side contact form with Convex integration for lead capture.
 * Submits RFQ inquiries to the database for admin review.
 */

interface FormValues {
  company: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
}

const initialFormValues: FormValues = {
  company: "",
  name: "",
  email: "",
  phone: "",
  destination: "",
  message: "",
};

interface ValidationErrors {
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormValues>(initialFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const submitInquiry = useMutation(api.inquiries.submit);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9+\-\s()]+$/;
    return phoneRegex.test(phone) && phone.replace(/[^0-9]/g, "").length >= 10;
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    if (!formData.company.trim()) errors.company = "Company name is required";
    if (!formData.name.trim()) errors.name = "Contact name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!isValidPhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      await submitInquiry({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        message: formData.message,
        type: "general",
      });
      setIsSubmitted(true);
      setFormData(initialFormValues);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 p-8 text-center border border-emerald-200">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-green-100">
          <svg
            className="h-7 w-7 text-emerald-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <h3 className="mb-2 text-2xl font-bold text-emerald-900">
          Thank you for your inquiry!
        </h3>
        <p className="text-emerald-700 text-base mb-6">
          We have received your message and will get back to you shortly.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 px-6 py-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 animate-slide-up-fade">
          <div className="flex gap-3">
            <svg
              className="h-5 w-5 text-red-500 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Company Name */}
      <div className="animate-slide-up-fade delay-1">
        <label
          htmlFor="company"
          className="block text-sm font-semibold text-slate-700"
        >
          Company Name <span className="text-amber-500">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`mt-2 block w-full rounded-lg text-black border-2 px-4 py-3 bg-white shadow-sm hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 ${
            validationErrors.company
              ? "border-red-300 focus:border-red-500 focus:ring-red-400"
              : "border-slate-200 focus:border-amber-500 focus:ring-amber-400"
          }`}
          placeholder="Enter your company name"
        />
        {validationErrors.company && (
          <p className="mt-1 text-sm text-red-600 font-medium">
            {validationErrors.company}
          </p>
        )}
      </div>

      {/* Contact Name */}
      <div className="animate-slide-up-fade delay-2">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-700"
        >
          Contact Name <span className="text-amber-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-2 block w-full rounded-lg text-black border-2 px-4 py-3 bg-white shadow-sm hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 ${
            validationErrors.name
              ? "border-red-300 focus:border-red-500 focus:ring-red-400"
              : "border-slate-200 focus:border-amber-500 focus:ring-amber-400"
          }`}
          placeholder="Enter your full name"
        />
        {validationErrors.name && (
          <p className="mt-1 text-sm text-red-600 font-medium">
            {validationErrors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="animate-slide-up-fade delay-3">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700"
        >
          Email Address <span className="text-amber-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-2 block w-full rounded-lg text-black border-2 px-4 py-3 bg-white shadow-sm hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 ${
            validationErrors.email
              ? "border-red-300 focus:border-red-500 focus:ring-red-400"
              : "border-slate-200 focus:border-amber-500 focus:ring-amber-400"
          }`}
          placeholder="your@email.com"
        />
        {validationErrors.email && (
          <p className="mt-1 text-sm text-red-600 font-medium">
            {validationErrors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="animate-slide-up-fade delay-4">
        <label
          htmlFor="phone"
          className="block text-sm font-semibold text-slate-700"
        >
          Phone Number <span className="text-amber-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`mt-2 block w-full rounded-lg text-black border-2 px-4 py-3 bg-white shadow-sm hover:border-slate-300 transition-colors focus:outline-none focus:ring-2 ${
            validationErrors.phone
              ? "border-red-300 focus:border-red-500 focus:ring-red-400"
              : "border-slate-200 focus:border-amber-500 focus:ring-amber-400"
          }`}
          placeholder="+91-XXXXXXXXXX"
        />
        {validationErrors.phone && (
          <p className="mt-1 text-sm text-red-600 font-medium">
            {validationErrors.phone}
          </p>
        )}
      </div>

      {/* Destination */}
      <div className="animate-slide-up-fade delay-5">
        <label
          htmlFor="destination"
          className="block text-sm font-semibold text-slate-700"
        >
          Delivery Location
        </label>
        <input
          type="text"
          id="destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="mt-2 block w-full rounded-lg text-black border-2 border-slate-200 focus:border-amber-500 focus:ring-amber-400 px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 transition-colors hover:border-slate-300 text-slate-700 placeholder-slate-400"
          placeholder="City, State / Country"
        />
      </div>

      {/* Message */}
      <div className="animate-slide-up-fade delay-6">
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-slate-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="mt-2 block w-full rounded-lg border-2 border-slate-200 focus:border-amber-500 focus:ring-amber-400 px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 transition-colors hover:border-slate-300 text-slate-700 placeholder-slate-400"
          placeholder="Tell us about your requirements..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 animate-slide-up-fade delay-7"
      >
        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
