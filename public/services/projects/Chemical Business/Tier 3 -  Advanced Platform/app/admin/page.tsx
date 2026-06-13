"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import AdminDashboardSkeleton from "@/components/admin/AdminDashboardSkeleton";
import {
  Package,
  TrendingUp,
  Clock,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const products = useQuery(api.products.listAdmin, {});
  const inquiries = useQuery(api.inquiries.list, {});

  if (products === undefined || inquiries === undefined) {
    return <AdminDashboardSkeleton />;
  }

  const publishedCount = products?.filter((p) => p.isPublished).length || 0;
  const totalProducts = products?.length || 0;
  const newInquiries =
    inquiries?.filter((i) => i.status === "new").length || 0;
  const recentInquiries = inquiries?.slice(0, 5) || [];

  const StatCard = ({
    label,
    value,
    Icon,
    trend,
    action,
    iconBg,
  }: {
    label: string;
    value: number;
    Icon: React.ReactNode;
    trend?: number;
    action?: { href: string; text: string };
    iconBg: string;
  }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-slate-100">
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div className={`${iconBg} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
            {Icon}
          </div>
          {trend !== undefined && (
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold bg-green-50 px-2.5 py-1 rounded-full">
              <ArrowUpRight size={14} />
              {trend}%
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
          <p className="text-3xl md:text-4xl font-bold text-slate-900 group-hover:scale-105 transition-transform origin-left">
            {value}
          </p>
        </div>
        {action && (
          <Link
            href={action.href}
            className="mt-4 inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-semibold text-sm transition-all group/link"
          >
            {action.text}
            <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-600 mt-2 text-lg">Welcome back to your admin panel</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          label="Total Products"
          value={totalProducts}
          Icon={<Package className="w-6 h-6 text-blue-600" />}
          iconBg="bg-blue-100"
          action={{ href: "/admin/products", text: "Manage Products" }}
        />
        <StatCard
          label="Published Products"
          value={publishedCount}
          Icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
          trend={12}
          iconBg="bg-emerald-100"
        />
        <StatCard
          label="New Inquiries"
          value={newInquiries}
          Icon={<Clock className="w-6 h-6 text-orange-600" />}
          iconBg="bg-orange-100"
          action={{ href: "/admin/inquiries", text: "View Inquiries" }}
        />
      </div>

      {/* Recent inquiries */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Recent Inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-amber-600 hover:text-amber-700 font-semibold text-sm flex items-center gap-1 transition-colors group"
            >
              View All
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {recentInquiries.length > 0 ? (
            recentInquiries.map((inquiry) => (
              <div
                key={inquiry._id}
                className="p-5 hover:bg-slate-50/50 transition-colors duration-150"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">{inquiry.name}</p>
                    <p className="text-sm text-slate-600 mt-1">{inquiry.company}</p>
                    <p className="text-sm text-slate-500 mt-2 line-clamp-2">
                      {inquiry.message}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        inquiry.status === "new"
                          ? "bg-blue-100 text-blue-700"
                          : inquiry.status === "contacted"
                          ? "bg-yellow-100 text-yellow-700"
                          : inquiry.status === "quoted"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-500">No inquiries yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
