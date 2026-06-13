import Link from "next/link";
import Image from "next/image";
import type { ProductCategory } from "@/content/products";

/**
 * ProductCategories Component
 * 
 * Displays a responsive grid of product category cards on the homepage.
 * Each card shows category image, name, and links to the products page.
 * 
 * Validates Requirements: 3.2, 10.4, 14.4
 */

interface ProductCategoriesProps {
  categories: ProductCategory[];
  limit?: number; // Show only first N categories on homepage
}

export function ProductCategories({ categories, limit }: ProductCategoriesProps) {
  const displayCategories = limit ? categories.slice(0, limit) : categories;

  return (
    <section className="w-full bg-gradient-to-b from-white to-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600">Our Range</p>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Product Categories
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            High-quality chemicals engineered for diverse industrial applications and maximum performance
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
          {displayCategories.map((category, index) => (
            <Link
              key={category.id}
              href="/products"
              className={`group relative flex flex-col items-center rounded-xl bg-white p-8 shadow-md border border-slate-100 transition-all hover:shadow-2xl hover:border-amber-300 hover:-translate-y-2 duration-300 animate-slide-up-fade delay-${Math.min(index + 1, 8)} cursor-pointer`}
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-slate-50 to-slate-100 ring-2 ring-amber-200 group-hover:ring-amber-400 transition-all">
                <Image
                  src={category.imageUrl}
                  alt={`${category.name} category`}
                  width={96}
                  height={96}
                  className="object-cover transition-transform group-hover:scale-125 duration-300"
                />
              </div>
              
              <h3 className="mt-4 text-center text-lg font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                {category.name}
              </h3>

              {/* Hover reveal description */}
              <p className="mt-2 text-center text-sm text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                {category.description}
              </p>
            </Link>
          ))}
        </div>

        {limit && categories.length > limit && (
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-600 px-8 py-3 text-base font-semibold text-slate-900 shadow-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-white"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
