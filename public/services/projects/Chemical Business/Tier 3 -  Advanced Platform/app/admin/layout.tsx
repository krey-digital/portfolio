"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check if current path is login page
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Check if admin is authenticated
    const adminToken = localStorage.getItem("adminToken");
    const authenticated = !!adminToken;
    setIsAuthenticated(authenticated);

    // Redirect to login if not authenticated (except on login page)
    if (!authenticated && !isLoginPage) {
      router.push("/admin/login");
    }

    // Redirect to dashboard if already logged in and trying to access login
    if (authenticated && isLoginPage) {
      router.push("/admin");
    }
  }, [router, isLoginPage]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-slate-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // For login page: render without sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // For authenticated pages: render with sidebar
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <AdminNav />
      <div className="md:ml-64 min-h-screen">
        <div className="p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
