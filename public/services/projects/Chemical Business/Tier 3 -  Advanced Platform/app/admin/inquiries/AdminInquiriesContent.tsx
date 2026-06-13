"use client";

import { useSearchParams } from "next/navigation";
import InquiryTable from "@/components/admin/InquiryTable";
import AdminInquiriesTableSkeleton from "@/components/admin/AdminInquiriesTableSkeleton";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminInquiriesContent() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status") as
    | "new"
    | "contacted"
    | "quoted"
    | "closed"
    | null;

  const inquiries = useQuery(api.inquiries.list, {
    status: statusFilter || undefined,
  });

  const tabs = [
    { label: "All", value: null, icon: "📋" },
    { label: "New", value: "new", icon: "🆕" },
    { label: "Contacted", value: "contacted", icon: "📞" },
    { label: "Quoted", value: "quoted", icon: "💰" },
    { label: "Closed", value: "closed", icon: "✓" },
  ];

  if (inquiries === undefined) {
    return <AdminInquiriesTableSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Inquiries
        </h1>
        <p className="text-slate-600 mt-2 text-lg">Manage customer inquiries and RFQs</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 flex-wrap">
        {tabs.map((tab) => (
          <a
            key={tab.value}
            href={`/admin/inquiries${tab.value ? `?status=${tab.value}` : ""}`}
            className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base rounded-full transition-all duration-300 whitespace-nowrap flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-105 ${
              statusFilter === tab.value
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
            {tab.value === "new" && statusFilter === tab.value && (
              <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs font-bold">
                Active
              </span>
            )}
          </a>
        ))}
      </div>

      {/* Inquiries table */}
      <InquiryTable status={statusFilter || undefined} />
    </div>
  );
}
