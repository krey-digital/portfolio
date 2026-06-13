"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

interface ProductCardProps {
  product: Doc<"products">;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const getImageUrls = useAction(api.products.getImageUrls);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Get featured image URL if product has images
    if (product.images && product.images.length > 0) {
      const featuredImage =
        product.images.find((img) => img.isPrimary) || product.images[0];
      if (featuredImage) {
        getImageUrls({ fileIds: [featuredImage.fileId] }).then((urls) => {
          const url = urls[featuredImage.fileId];
          if (url) {
            setImageUrl(url);
          }
        });
      }
    }
  }, [product.images, getImageUrls]);

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg hover:border-amber-200 transition-all duration-300 animate-slide-up-fade delay-${Math.min(index % 6 + 2, 8)} group`}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="text-center p-6">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <p className="text-xs text-slate-500 font-semibold">{product.category.toUpperCase()}</p>
            </div>
          )}
        </div>
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 text-white backdrop-blur-sm">
            {product.category.toUpperCase()}
          </span>
        </div>
        {/* GHS Signal Word Badge */}
        {product.ghsSignalWord && (
          <div className="absolute top-3 right-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
              product.ghsSignalWord === "DANGER" 
                ? "bg-red-600 text-white" 
                : "bg-orange-500 text-white"
            }`}>
              {product.ghsSignalWord}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-slate-500 mb-3 font-mono">CAS: {product.casNumber}</p>
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mb-4 space-y-2 pb-4 border-b border-slate-100">
          <p className="text-xs">
            <span className="font-semibold text-slate-700">Category:</span>{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              {product.category}
            </span>
          </p>
          <p className="text-xs">
            <span className="font-semibold text-slate-700">Grade:</span>{" "}
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
              {product.grade}
            </span>
          </p>
          {product.purityMin && (
            <p className="text-xs">
              <span className="font-semibold text-slate-700">Purity:</span> {product.purityMin}-{product.purityMax}%
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-md"
          >
            View Details
          </Link>
          <Link
            href="/quote"
            className="flex-1 text-center border-2 border-amber-500 text-amber-600 hover:bg-amber-50 py-2.5 rounded-lg text-sm font-semibold transition-all"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
