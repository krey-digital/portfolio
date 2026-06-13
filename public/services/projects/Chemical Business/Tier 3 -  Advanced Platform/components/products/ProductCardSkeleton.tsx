"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden h-full flex flex-col">
      {/* Image Skeleton */}
      <Skeleton className="w-full h-[180px]" />

      {/* Content Skeleton */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Category Badge Skeleton */}
        <Skeleton className="h-5 w-20 rounded mb-2" />

        {/* Title Skeleton */}
        <div className="space-y-1.5 mb-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Specs Skeleton */}
        <div className="space-y-1.5 mb-3">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>

        {/* Grade & Signal Skeleton */}
        <div className="flex items-center gap-1 mb-3">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-20 rounded" />
        </div>

        {/* Button Skeleton */}
        <div className="mt-auto">
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
