"use client";

import { Suspense } from "react";
import AdminInquiriesContent from "./AdminInquiriesContent";
import AdminInquiriesTableSkeleton from "@/components/admin/AdminInquiriesTableSkeleton";

export default function AdminInquiriesPage() {
  return (
    <Suspense fallback={<AdminInquiriesTableSkeleton />}>
      <AdminInquiriesContent />
    </Suspense>
  );
}
