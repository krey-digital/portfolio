"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface InquiryTypeSelectProps {
  value: "rfq" | "coa" | "tds";
  onChange: (value: "rfq" | "coa" | "tds") => void;
}

const typeLabels = {
  rfq: "Request for Quotation (RFQ)",
  coa: "Certificate of Analysis (COA)",
  tds: "Technical Data Sheet (TDS)",
};

const types = ["rfq", "coa", "tds"] as const;

export default function InquiryTypeSelect({
  value,
  onChange,
}: InquiryTypeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Select button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-between shadow-md hover:shadow-lg group"
      >
        <span className="block text-left overflow-hidden text-ellipsis whitespace-nowrap">
          {typeLabels[value]}
        </span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 ml-2 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } group-hover:scale-110`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {types.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  onChange(type);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left transition-all duration-150 flex items-center justify-between group ${
                  value === type
                    ? "bg-blue-50 text-blue-900 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                  {typeLabels[type]}
                </span>
                {value === type && (
                  <div className="text-blue-600 flex-shrink-0 ml-2 scale-100 animate-in fade-in duration-200">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
