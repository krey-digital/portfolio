"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import AdminProductsTableSkeleton from "@/components/admin/AdminProductsTableSkeleton";
import DeleteConfirmationDialog from "@/components/admin/DeleteConfirmationDialog";
import ProductViewModal from "@/components/admin/ProductViewModal";
import Link from "next/link";
import { useState } from "react";
import { exportToCSV, exportToJSON, exportToExcel } from "@/lib/productExport";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = useQuery(api.products.listAdmin, {});
  const updateProduct = useMutation(api.products.update);
  const deleteProduct = useMutation(api.products.deleteProduct);
  const publishProduct = useMutation(api.products.publish);
  const unpublishProduct = useMutation(api.products.unpublish);
  
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProductName, setSelectedProductName] = useState<string>("");
  const [viewProductId, setViewProductId] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handlePublish = async (id: string) => {
    await publishProduct({ id: id as any });
  };

  const handleUnpublish = async (id: string) => {
    await unpublishProduct({ id: id as any });
  };

  const handleDeleteClick = (id: string, name: string) => {
    setSelectedProductId(id);
    setSelectedProductName(name);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      setDeletingId(selectedProductId);
      try {
        await deleteProduct({ id: selectedProductId as any });
      } finally {
        setDeletingId(null);
        setDeleteDialogOpen(false);
        setSelectedProductId(null);
        setSelectedProductName("");
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedProductId(null);
    setSelectedProductName("");
  };

  const handleViewProduct = (id: string) => {
    setViewProductId(id);
  };

  const handleExport = (format: 'csv' | 'json' | 'excel') => {
    if (!products) return;
    
    switch (format) {
      case 'csv':
        exportToCSV(products);
        break;
      case 'json':
        exportToJSON(products);
        break;
      case 'excel':
        exportToExcel(products);
        break;
    }
    setShowExportMenu(false);
  };

  // Show skeleton while loading
  if (products === undefined) {
    return <AdminProductsTableSkeleton />;
  }

  const viewProduct = viewProductId ? products.find(p => p._id === viewProductId) : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Products
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Manage your chemical product catalog</p>
        </div>
        <div className="flex gap-3">
          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-6 py-3 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
            >
              📥 Export
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-10">
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
                >
                  📄 Export as CSV
                </button>
                <button
                  onClick={() => handleExport('excel')}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
                >
                  📊 Export as Excel
                </button>
                <button
                  onClick={() => handleExport('json')}
                  className="w-full px-4 py-2 text-left hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
                >
                  🔧 Export as JSON
                </button>
              </div>
            )}
          </div>
          
          {/* Add Product Button */}
          <Link
            href="/admin/products/new"
            className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            ➕ Add Product
          </Link>
        </div>
      </div>

      {/* Products table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
        {products && products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    CAS #
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {product.grade}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                      {product.casNumber}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {!product.isPublished ? (
                        <button
                          onClick={() => handlePublish(product._id)}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all duration-200"
                        >
                          <span className="mr-1">📋</span> Draft
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnpublish(product._id)}
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-all duration-200"
                        >
                          <span className="mr-1">✓</span> Published
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-3 flex">
                      <button
                        onClick={() => handleViewProduct(product._id)}
                        className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-150 hover:underline"
                      >
                        View
                      </button>
                      <span className="text-slate-300">·</span>
                      <Link
                        href={`/admin/products/${product._id}/edit`}
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-150 hover:underline"
                      >
                        Edit
                      </Link>
                      <span className="text-slate-300">·</span>
                      <button
                        onClick={() => handleDeleteClick(product._id, product.name)}
                        disabled={deletingId === product._id}
                        className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-150 disabled:text-slate-400 hover:underline"
                      >
                        {deletingId === product._id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-slate-600 font-medium text-lg mb-4">
              No products yet
            </p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
            >
              Create your first product →
            </Link>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        productName={selectedProductName}
        isDeleting={deletingId !== null}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Product View Modal */}
      {viewProduct && (
        <ProductViewModal
          product={viewProduct}
          isOpen={viewProductId !== null}
          onClose={() => setViewProductId(null)}
        />
      )}
    </div>
  );
}
