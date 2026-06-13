"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AdminInquiriesTableSkeleton() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <Skeleton className="h-12 w-64 mb-2 rounded-lg" />
        <Skeleton className="h-6 w-80 rounded-lg" />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 border-b-2 border-slate-200 pb-4">
        <Skeleton className="h-12 w-24 rounded-lg" />
        <Skeleton className="h-12 w-24 rounded-lg" />
        <Skeleton className="h-12 w-28 rounded-lg" />
        <Skeleton className="h-12 w-24 rounded-lg" />
        <Skeleton className="h-12 w-24 rounded-lg" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-slate-200">
          {/* Skeleton rows */}
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 hover:bg-slate-50">
              {/* Summary row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Name row */}
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-5 w-48 rounded" />
                  </div>
                  {/* Company, email, type row */}
                  <Skeleton className="h-4 w-96 rounded" />
                  {/* Product row */}
                  <Skeleton className="h-4 w-72 rounded" />
                </div>

                {/* Status dropdown */}
                <Skeleton className="h-8 w-28 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
