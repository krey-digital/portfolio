"use client";

import ImportHistory from "@/components/admin/ImportHistory";

export default function ImportHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Import History</h1>
        <p className="text-slate-600 mt-1">
          View all product import operations and their results
        </p>
      </div>
      
      <ImportHistory />
    </div>
  );
}
