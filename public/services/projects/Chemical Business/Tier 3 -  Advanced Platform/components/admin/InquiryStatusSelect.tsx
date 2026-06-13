"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface InquiryStatusSelectProps {
  value: "new" | "contacted" | "quoted" | "closed";
  onChange: (value: "new" | "contacted" | "quoted" | "closed") => void;
}

const statusLabels = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  closed: "Closed",
};

const statusColors = {
  new: {
    button: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    badge: "bg-red-50 text-red-700",
    option: "text-red-600",
  },
  contacted: {
    button: "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
    badge: "bg-yellow-50 text-yellow-700",
    option: "text-yellow-600",
  },
  quoted: {
    button: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    badge: "bg-blue-50 text-blue-700",
    option: "text-blue-600",
  },
  closed: {
    button: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    badge: "bg-green-50 text-green-700",
    option: "text-green-600",
  },
};

const statuses = ["new", "contacted", "quoted", "closed"] as const;

interface Position {
  top: number;
  left: number;
  width: number;
}

export default function InquiryStatusSelect({
  value,
  onChange,
}: InquiryStatusSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 4,
        left: rect.right - 120,
        width: 120,
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const colors = statusColors[value];

  return (
    <>
      {/* Select button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`px-3 py-1.5 bg-gradient-to-r ${colors.button} text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-between gap-1 shadow-sm hover:shadow-md text-xs whitespace-nowrap`}
      >
        <span>{statusLabels[value]}</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu - Fixed positioning to escape overflow containers */}
      {isOpen && position && (
        <div
          ref={dropdownRef}
          style={{
            position: "fixed",
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: `${position.width}px`,
            zIndex: 9999,
          }}
          className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="py-1">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => {
                  onChange(status);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left transition-all duration-150 flex items-center justify-between group text-sm font-medium ${
                  value === status
                    ? `${statusColors[status].badge} bg-opacity-100`
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{statusLabels[status]}</span>
                {value === status && (
                  <div className={`${statusColors[status].option} flex-shrink-0`}>
                    <svg
                      className="w-4 h-4"
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
    </>
  );
}
