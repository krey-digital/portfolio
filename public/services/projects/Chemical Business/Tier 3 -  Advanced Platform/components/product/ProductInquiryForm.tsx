"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import InquiryTypeSelect from "./InquiryTypeSelect";

interface ProductInquiryFormProps {
  product: Doc<"products">;
}

export default function ProductInquiryForm({ product }: ProductInquiryFormProps) {
  const [inquiryType, setInquiryType] = useState<"rfq" | "coa" | "tds">("rfq");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    destination: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submitInquiry = useMutation(api.inquiries.submit);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await submitInquiry({
        productId: product._id,
        productName: product.name,
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        quantity: formData.quantity,
        destination: formData.destination,
        message: formData.message,
        type: inquiryType,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        quantity: "",
        destination: "",
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to submit inquiry"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const typeLabels = {
    rfq: "Request for Quotation (RFQ)",
    coa: "Certificate of Analysis (COA)",
    tds: "Technical Data Sheet (TDS)",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-900">Product Inquiry</h3>

      {submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          ✓ Your inquiry has been received. We'll contact you soon!
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Inquiry type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Inquiry Type
          </label>
          <InquiryTypeSelect value={inquiryType} onChange={setInquiryType} />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            required
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Company Name *
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
            placeholder="Your Company"
            className="w-full px-3 py-2 border text-black border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="your@email.com"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Quantity Required
          </label>
          <input
            type="text"
            value={formData.quantity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, quantity: e.target.value }))
            }
            placeholder="e.g., 100 Kg, 50 L"
            className="w-full px-3 py-2 border text-black border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Destination / Delivery Location
          </label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                destination: e.target.value,
              }))
            }
            placeholder="City, State / Country"
            className="w-full px-3 py-2 border text-black border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Additional Details
          </label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            placeholder="Any special requirements or questions..."
            rows={4}
            className="w-full px-3 py-2 border text-black border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
        >
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </div>
  );
}
