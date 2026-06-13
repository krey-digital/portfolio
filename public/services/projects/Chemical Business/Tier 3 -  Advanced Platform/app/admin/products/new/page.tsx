"use client";

import ProductForm from "@/components/admin/ProductForm";
import ProductImportEnhanced from "@/components/admin/ProductImportEnhanced";

export default function NewProductPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>
          <p className="text-slate-600 mt-1">Create a new product in your catalog</p>
        </div>
        <ProductImportEnhanced />
      </div>
      <ProductForm mode="create" />
    </div>
  );
}
