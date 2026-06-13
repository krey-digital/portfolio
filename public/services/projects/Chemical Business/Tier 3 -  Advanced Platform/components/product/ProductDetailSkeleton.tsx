"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Breadcrumb Skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <span>›</span>
          <Skeleton className="h-4 w-16" />
          <span>›</span>
          <Skeleton className="h-4 w-24" />
        </div>
      </section>

      {/* Product Content Skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Category */}
            <div>
              <Skeleton className="h-8 w-24 rounded-full mb-4" />
              <Skeleton className="h-10 w-64 mb-2" />
              <Skeleton className="h-6 w-48" />
            </div>

            {/* Description Box */}
            <div className="bg-white rounded-lg shadow p-6 space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Specifications */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </div>

            {/* GHS Pictograms */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <div className="flex gap-3">
                <Skeleton className="h-20 w-20 rounded-lg" />
                <Skeleton className="h-20 w-20 rounded-lg" />
                <Skeleton className="h-20 w-20 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Gallery Skeleton */}
            <div>
              <Skeleton className="aspect-square w-full rounded-lg mb-3" />
              <div className="grid grid-cols-4 gap-2">
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
                <Skeleton className="aspect-square rounded-lg" />
              </div>
            </div>

            {/* Inquiry Form Skeleton */}
            <div className="bg-white rounded-lg shadow p-6 space-y-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="h-9 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-9 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
