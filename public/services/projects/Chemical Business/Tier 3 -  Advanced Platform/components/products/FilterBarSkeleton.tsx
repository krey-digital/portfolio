"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function FilterBarSkeleton() {
  return (
    <aside className="bg-white rounded-lg shadow p-6 h-fit sticky top-24 space-y-6">
      {/* Search Skeleton */}
      <div>
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="w-full h-9 rounded-lg" />
      </div>

      {/* Category Skeleton */}
      <div>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="w-full h-9 rounded-lg" />
      </div>

      {/* Grade Skeleton */}
      <div>
        <Skeleton className="h-4 w-14 mb-2" />
        <Skeleton className="w-full h-9 rounded-lg" />
      </div>

      {/* Clear button Skeleton */}
      <Skeleton className="w-full h-9 rounded-lg" />
    </aside>
  );
}
