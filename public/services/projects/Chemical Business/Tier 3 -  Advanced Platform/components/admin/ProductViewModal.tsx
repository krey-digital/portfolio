"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { X } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

interface ProductViewModalProps {
  product: Doc<"products">;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductViewModal({ product, isOpen, onClose }: ProductViewModalProps) {
  const getImageUrls = useAction(api.products.getImageUrls);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  useEffect(() => {
    if (isOpen && product.images && product.images.length > 0) {
      setLoadingImages(true);
      const fileIds = product.images.map(img => img.fileId);
      getImageUrls({ fileIds })
        .then(urls => {
          // Convert object to array in the same order as fileIds
          const urlArray = fileIds.map(id => urls[id]).filter(Boolean);
          setImageUrls(urlArray);
        })
        .catch(err => console.error("Failed to load images:", err))
        .finally(() => setLoadingImages(false));
    } else {
      setImageUrls([]);
    }
  }, [isOpen, product.images, getImageUrls]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-6 rounded-t-2xl flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="text-slate-300 mt-1">Product Details</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Product Images */}
            {product.images && product.images.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Product Images</h3>
                {loadingImages ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                  </div>
                ) : imageUrls.length > 0 ? (
                  <div className="grid grid-cols-4 gap-4">
                    {imageUrls.map((url, index) => {
                      const isPrimary = product.images![index]?.isPrimary;
                      return (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`${product.name} - Image ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg border-2 border-slate-200 shadow-sm hover:shadow-lg transition-shadow"
                          />
                          {isPrimary && (
                            <span className="absolute top-2 left-2 px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg shadow-md">
                              ⭐ Primary
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-8">No images available</p>
                )}
              </div>
            )}

            {/* Status Badge */}
            <div className="flex gap-3">
              {product.isPublished ? (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-700">
                  <span className="mr-2">✓</span> Published
                </span>
              ) : (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-slate-100 text-slate-700">
                  <span className="mr-2">📋</span> Draft
                </span>
              )}
              {product.isDraft && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-amber-100 text-amber-700">
                  Unpublished Changes
                </span>
              )}
            </div>

            {/* Basic Information */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">Product Name</p>
                  <p className="text-slate-900 font-medium">{product.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">Slug</p>
                  <p className="text-slate-900 font-mono text-sm">{product.slug}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">Category</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-200 text-slate-700">
                    {product.category}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">Grade</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    {product.grade}
                  </span>
                </div>
              </div>
            </div>

            {/* Chemical IDs */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Chemical Identifiers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-slate-600 mb-1">CAS Number</p>
                  <p className="text-slate-900 font-mono font-medium">{product.casNumber}</p>
                </div>
                {product.unNumber && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">UN Number</p>
                    <p className="text-slate-900 font-mono font-medium">{product.unNumber}</p>
                  </div>
                )}
                {product.erpProductCode && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 mb-1">ERP Code</p>
                    <p className="text-slate-900 font-mono font-medium">{product.erpProductCode}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Description</h3>
              <p className="text-slate-700 leading-relaxed">{product.description}</p>
              {product.descriptionHi && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm font-semibold text-slate-600 mb-2">Hindi Description</p>
                  <p className="text-slate-700 leading-relaxed">{product.descriptionHi}</p>
                </div>
              )}
            </div>

            {/* Specifications */}
            {(product.purityMin || product.purityMax) && (
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-6">
                  {product.purityMin && (
                    <div>
                      <p className="text-sm font-semibold text-slate-600 mb-1">Purity Range</p>
                      <p className="text-slate-900 font-medium">
                        {product.purityMin}% - {product.purityMax}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Safety Information */}
            {(product.ghsSignalWord || product.ghsPictograms.length > 0) && (
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-900 mb-4">Safety Information</h3>
                <div className="space-y-4">
                  {product.ghsSignalWord && (
                    <div>
                      <p className="text-sm font-semibold text-red-700 mb-1">GHS Signal Word</p>
                      <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold ${
                        product.ghsSignalWord === "DANGER" 
                          ? "bg-red-600 text-white" 
                          : "bg-orange-500 text-white"
                      }`}>
                        {product.ghsSignalWord}
                      </span>
                    </div>
                  )}
                  {product.ghsPictograms.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-red-700 mb-2">GHS Pictograms</p>
                      <div className="flex flex-wrap gap-2">
                        {product.ghsPictograms.map((pictogram, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700 border border-red-300"
                          >
                            {pictogram}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Packaging Options */}
            {product.packagingOptions && product.packagingOptions.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Packaging Options</h3>
                <div className="grid grid-cols-3 gap-4">
                  {product.packagingOptions.map((pkg, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-slate-200">
                      <p className="text-2xl font-bold text-slate-900">{pkg.size}</p>
                      <p className="text-sm text-slate-600 font-medium">{pkg.unit}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Applications</h3>
                <ul className="space-y-2">
                  {product.applications.map((app, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-amber-600 mt-1">•</span>
                      <span className="text-slate-700">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Metadata */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Metadata</h3>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-slate-600 font-semibold mb-1">Created</p>
                  <p className="text-slate-900">{new Date(product.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-600 font-semibold mb-1">Last Updated</p>
                  <p className="text-slate-900">{new Date(product.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-slate-50 px-8 py-4 rounded-b-2xl border-t border-slate-200 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
