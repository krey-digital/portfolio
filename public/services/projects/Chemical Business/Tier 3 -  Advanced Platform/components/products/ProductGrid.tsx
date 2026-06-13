"use client";

import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import ProductGridSkeleton from "./ProductGridSkeleton";

export default function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const products = useQuery(api.products.list, {
    category: selectedCategory || undefined,
    grade: selectedGrade || undefined,
  });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  // Show skeleton while products are loading
  if (products === undefined) {
    return <ProductGridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Left Sidebar - Filters */}
      <div className="lg:col-span-1">
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedGrade={selectedGrade}
          onGradeChange={setSelectedGrade}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {/* Right Content - Products */}
      <div className="lg:col-span-3">
        {filteredProducts && filteredProducts.length > 0 ? (
          <div>
            <p className="text-sm text-slate-600 mb-6 font-medium">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-lg">
            <p className="text-slate-600 mb-6 font-medium">No products found</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedGrade(null);
                setSearchTerm("");
              }}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
