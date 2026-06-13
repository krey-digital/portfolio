"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="mb-8">
        <Skeleton className="h-12 w-72 mb-2 rounded-lg" />
        <Skeleton className="h-6 w-80 rounded-lg" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 md:p-8 border border-slate-100"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between mb-6">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-10 w-16 rounded" />
              </div>
              <Skeleton className="h-3 w-20 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom section - Quick actions + Recent inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-200 space-y-6 h-full">
            <Skeleton className="h-6 w-32 rounded" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl" />
              ))}
            </div>
            <div className="pt-6 border-t border-slate-300 space-y-4">
              <Skeleton className="h-4 w-20 rounded" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="h-3 w-8 rounded" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent inquiries */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 flex flex-col">
            {/* Header */}
            <div className="px-6 md:px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 flex items-center justify-between">
              <Skeleton className="h-6 w-48 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>

            {/* Table skeleton */}
            <div className="overflow-x-auto flex-1">
              {/* Table header */}
              <div className="bg-slate-50 border-b border-slate-200 sticky top-0">
                <div className="flex">
                  <div className="px-6 py-4 flex-1">
                    <Skeleton className="h-3 w-16 rounded" />
                  </div>
                  <div className="px-6 py-4 flex-1">
                    <Skeleton className="h-3 w-12 rounded" />
                  </div>
                  <div className="px-6 py-4 flex-1">
                    <Skeleton className="h-3 w-12 rounded" />
                  </div>
                  <div className="px-6 py-4 flex-1 text-center">
                    <Skeleton className="h-3 w-8 rounded mx-auto" />
                  </div>
                </div>
              </div>

              {/* Table body - 5 skeleton rows */}
              <div className="divide-y divide-slate-200">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="hover:bg-slate-50/50 transition-colors">
                    <div className="flex">
                      <div className="px-6 py-4 flex-1 space-y-2">
                        <Skeleton className="h-4 w-28 rounded" />
                        <Skeleton className="h-3 w-24 rounded" />
                      </div>
                      <div className="px-6 py-4 flex-1">
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                      <div className="px-6 py-4 flex-1">
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                      <div className="px-6 py-4 flex-1 text-center">
                        <Skeleton className="h-4 w-4 rounded mx-auto" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
