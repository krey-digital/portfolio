import Link from "next/link";
import Image from "next/image";
import type { ProductCategory } from "@/content/products";

/**
 * ProductCategoryCard Component
 * 
 * Displays a detailed product category card with image, name, description,
 * example products, applications, and a CTA button linking to the contact page.
 * Implements card hover effects (lift/shadow).
 * 
 * Validates Requirements: 4.2, 4.3, 10.5, 14.4
 */

interface ProductCategoryCardProps {
  category: ProductCategory;
  containerClassName?: string;
}

export function ProductCategoryCard({ category, containerClassName = "" }: ProductCategoryCardProps) {
  return (
    <article className={`group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-amber-300 ${containerClassName}`}>
      {/* Category Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <Image
          src={category.imageUrl}
          alt={`${category.name} category`}
          width={400}
          height={192}
          className="object-cover transition-transform group-hover:scale-110 duration-300"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {/* Category Name */}
        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
          {category.name}
        </h3>

        {/* Description */}
        <p className="mt-3 text-base text-slate-700">
          {category.description}
        </p>

        {/* Example Products */}
        {category.exampleProducts && category.exampleProducts.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
              Example Products
            </h4>
            <ul className="mt-2 space-y-1">
              {category.exampleProducts.slice(0, 5).map((product, index) => (
                <li key={index} className="flex items-start text-sm text-slate-600">
                  <span className="mr-2 text-amber-500 font-bold">✓</span>
                  <span>{product}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Applications */}
        {category.applications && category.applications.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
              Applications
            </h4>
            <ul className="mt-2 space-y-1">
              {category.applications.map((application, index) => (
                <li key={index} className="flex items-start text-sm text-slate-600">
                  <span className="mr-2 text-amber-500 font-bold">→</span>
                  <span>{application}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button - Pushed to bottom */}
        <div className="mt-auto pt-6">
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-6 py-3 text-base font-semibold text-slate-900 shadow-md transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
          >
            Enquire about this product
          </Link>
        </div>
      </div>
    </article>
  );
}
