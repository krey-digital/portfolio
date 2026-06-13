"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import AdminEditProductSkeleton from "@/components/admin/AdminEditProductSkeleton";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = useQuery(api.products.getById, {
    id: productId as any,
  });

  if (product === undefined) {
    return <AdminEditProductSkeleton />;
  }

  if (product === null) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Edit Product</h1>
        <p className="text-slate-600 mt-1">Update product details</p>
      </div>
      <ProductForm product={product} mode="edit" />
    </div>
  );
}
