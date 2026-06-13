"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ProductCard from "@/components/products/ProductCard";

// Disable static generation for this dynamic page
export const dynamic = "force-dynamic";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | undefined>();
  const [grade, setGrade] = useState<string | undefined>();

  const products = useQuery(api.products.list, { category, grade });
  const searchResults = search ? useQuery(api.products.search, { query: search }) : null;

  const displayProducts = search && searchResults ? searchResults : products;

  const categories = [
    { value: "acids", label: "Acids" },
    { value: "solvents", label: "Solvents" },
    { value: "reagents", label: "Reagents" },
    { value: "salts", label: "Salts" },
    { value: "glass-chemicals", label: "Glass Chemicals" },
    { value: "other", label: "Other" },
  ];

  const grades = [
    { value: "technical", label: "Technical" },
    { value: "commercial", label: "Commercial" },
    { value: "lab", label: "Lab" },
    { value: "pharma", label: "Pharma" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Page Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-b-4 border-amber-500">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-4 animate-slide-up-fade">
            <p className="text-sm font-semibold tracking-widest uppercase text-amber-400">
              Our Collection
            </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Our Products
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-slate-300">
              We supply a comprehensive range of high-quality industrial chemicals and
              laboratory reagents. All products are available in various grades and
              quantities to meet your specific requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 animate-slide-up-fade delay-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-slate-700 mb-2">Search Products</label>
              <input
                type="text"
                id="search"
                placeholder="Search by name or CAS number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select
                id="category"
                value={category || ""}
                onChange={(e) => setCategory(e.target.value || undefined)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Grade Filter */}
            <div>
              <label htmlFor="grade" className="block text-sm font-semibold text-slate-700 mb-2">Grade</label>
              <select
                id="grade"
                value={grade || ""}
                onChange={(e) => setGrade(e.target.value || undefined)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
              >
                <option value="">All Grades</option>
                {grades.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts && displayProducts.length > 0 ? (
            displayProducts.map((product: any, index: number) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))
          ) : displayProducts === undefined ? (
            <div className="col-span-full text-center py-16">
              <div className="inline-block animate-pulse">
                <div className="h-8 w-32 bg-slate-200 rounded mb-2"></div>
                <div className="h-4 w-48 bg-slate-100 rounded mx-auto"></div>
              </div>
            </div>
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="space-y-4">
                <div className="text-5xl mb-3">📭</div>
                <p className="text-slate-600 font-medium text-lg">No products found</p>
                <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Compliance Notice */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 rounded-lg animate-slide-up-fade delay-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-amber-900 mb-1">Safety Notice</p>
              <p className="text-sm text-amber-800">
                For industrial and laboratory use only. Please refer to the Safety Data Sheet (SDS) before handling any chemical products.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
