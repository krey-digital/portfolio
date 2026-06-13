"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function AdminProductsTableSkeleton() {
  const rows = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-12 w-64 mb-2 rounded-lg" />
          <Skeleton className="h-6 w-80 rounded-lg" />
        </div>
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">
                  <Skeleton className="h-4 w-32" />
                </th>
                <th className="px-6 py-4">
                  <Skeleton className="h-4 w-24" />
                </th>
                <th className="px-6 py-4">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="px-6 py-4">
                  <Skeleton className="h-4 w-20" />
                </th>
                <th className="px-6 py-4">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </th>
                <th className="px-6 py-4">
                  <Skeleton className="h-4 w-20" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-40" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 justify-center">
                      <Skeleton className="h-6 w-16 rounded" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-16 rounded" />
                      <Skeleton className="h-8 w-16 rounded" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
