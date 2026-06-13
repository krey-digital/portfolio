"use client";

import ProductCardSkeleton from "./ProductCardSkeleton";
import FilterBarSkeleton from "./FilterBarSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductGridSkeleton() {
  // Show 8 skeleton cards
  const skeletonCount = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Sidebar - Filters */}
      <div className="lg:col-span-1">
        <FilterBarSkeleton />
      </div>

      {/* Right Content - Products */}
      <div className="lg:col-span-3">
        <Skeleton className="h-5 w-32 rounded mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skeletonCount.map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
