"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Mail,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Settings,
  FileText,
  Users,
  ShoppingCart,
  Award,
  BookOpen,
} from "lucide-react";

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  const isActive = (path: string) => {
    if (path === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, color: "text-blue-500" },
    { href: "/admin/products", label: "Products", icon: Package, color: "text-emerald-500" },
    { href: "/admin/inquiries", label: "Inquiries", icon: Mail, color: "text-orange-500" },
    { href: "/admin/quotes", label: "Quote Requests", icon: ShoppingCart, color: "text-purple-500" },
    { href: "/admin/buyers", label: "Buyers", icon: Users, color: "text-cyan-500" },
    { href: "/admin/blog", label: "Blog Posts", icon: BookOpen, color: "text-pink-500" },
    { href: "/admin/sds", label: "SDS Management", icon: FileText, color: "text-indigo-500" },
    { href: "/admin/certifications", label: "Certifications", icon: Award, color: "text-yellow-500" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2.5 bg-white text-slate-900 rounded-xl shadow-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <nav
        className={`${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed w-64 h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex flex-col transition-transform duration-300 z-40 shadow-2xl border-r border-slate-800`}
      >
        {/* Header - Logo Section */}
        <div className="p-6 border-b border-slate-800/50 bg-gradient-to-b from-slate-900 to-slate-950/50 backdrop-blur-sm">
          <Link href="/admin" className="block group" onClick={() => setIsMobileOpen(false)}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                <span className="text-lg font-bold text-slate-950">⚗️</span>
              </div>
              <div>
                <h1 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  ChemCorp
                </h1>
                <p className="text-xs text-slate-500">Admin Panel</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation menu - Main section */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2 mb-3">
            Menu
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  active
                    ? "bg-gradient-to-r from-amber-600/90 to-amber-700 text-white shadow-lg shadow-amber-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 transition-all duration-200 ${
                      active ? "scale-110" : "group-hover:scale-110"
                    } ${active ? "text-amber-200" : link.color}`}
                  />
                  <span className="font-medium text-sm">{link.label}</span>
                </div>
                {active && (
                  <ChevronRight className="w-4 h-4 text-amber-200 animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800/50 bg-gradient-to-b from-slate-900/50 to-slate-950 backdrop-blur-sm p-4 space-y-3">
          {/* Settings */}
          <Link
            href="#settings"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all duration-200 group"
          >
            <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Settings</span>
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600/80 to-red-700 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-medium text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-red-600/20 group"
          >
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Logout
          </button>

          {/* Version info */}
          <div className="text-center">
            <p className="text-xs text-slate-600">v1.0.0</p>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-30 transition-opacity duration-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-300" />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in scale-in-95 fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-sm">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <LogOut className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Logout?</h2>
                    <p className="text-sm text-slate-500 mt-1">You'll be signed out of your admin panel</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2.5 bg-white border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
