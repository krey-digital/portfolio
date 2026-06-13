"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AdminEditProductSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Skeleton className="h-12 w-80 mb-2 rounded-lg" />
        <Skeleton className="h-6 w-96 rounded-lg" />
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Basic Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* CAS Number */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* UN Number */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>

          {/* Grade */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>

        {/* Purity Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-12 w-32 rounded-lg" />
          <Skeleton className="h-12 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
