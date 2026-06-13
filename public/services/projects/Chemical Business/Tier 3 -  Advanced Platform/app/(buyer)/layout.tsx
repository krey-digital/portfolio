"use client";

import { ReactNode } from "react";
import { useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export default function BuyerLayout({ children }: Props) {
  const user = useAuthActions();
  
  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">Please log in to access your buyer dashboard</p>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h2 className="font-bold text-lg">Buyer Portal</h2>
          </div>
          <nav className="p-4 space-y-2">
            <Link
              href="/buyer/dashboard"
              className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
            >
              Dashboard
            </Link>
            <Link
              href="/buyer/quotes"
              className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
            >
              My Quotes
            </Link>
            <Link
              href="/buyer/account"
              className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
            >
              Account
            </Link>
            <Link
              href="/buyer/downloads"
              className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
            >
              Download History
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}
