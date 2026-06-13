import Link from "next/link";
import { companyInfo } from "@/content/company";

/**
 * Footer Component
 * 
 * Displays company information, quick links, and legal links in a three-column layout.
 * Includes copyright notice and GST number display.
 * 
 * Validates Requirements: 10.2, 14.1, 14.4
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Four-column layout inspired by Goldstab */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">
              {companyInfo.name}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">{companyInfo.tagline}</p>
            <div className="pt-2 space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Company Details</p>
              <p className="text-sm">
                <span className="font-semibold text-slate-300">GST:</span> {companyInfo.gstNumber}
              </p>
            </div>
          </div>

          {/* Column 2: Products & Services */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
                >
                  Browse Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/certifications"
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
                >
                  Certifications
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200 flex items-center gap-2"
                >
                  📞 {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200 flex items-center gap-2"
                >
                  ✉️ {companyInfo.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-400 hover:text-amber-400 transition-colors duration-200"
                >
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700" />

      {/* Bottom Section: Copyright & Legal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-sm text-slate-400">
            <p>&copy; {currentYear} {companyInfo.name}. All rights reserved.</p>
            <p className="mt-2 text-xs text-slate-500">Designed for excellence. Engineered for quality.</p>
          </div>
          <div className="flex flex-wrap gap-4 md:justify-end">
            <Link href="/privacy-policy" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-600">•</span>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-600">•</span>
            <a href="#contact" className="text-xs text-slate-400 hover:text-amber-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
