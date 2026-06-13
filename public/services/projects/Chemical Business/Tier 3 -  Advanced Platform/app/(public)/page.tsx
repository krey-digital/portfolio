"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function HomePage() {
  const products = useQuery(api.products.list, { limit: 6 });

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-b-4 border-amber-500">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-slide-up-fade">
            <p className="text-sm font-semibold tracking-widest uppercase text-amber-400">
              Welcome to ChemCorp Industries
            </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Your Trusted Partner in <br />
              <span className="text-amber-400">Quality Chemicals</span>
            </h1>
            <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto">
              Leading supplier of high-quality industrial chemicals including acids, solvents, alkalis, and specialty chemicals. ISO certified with reliable delivery across India.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold rounded-lg transition-all hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Browse Products
              </Link>
              <Link
                href="/quote"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-all border-2 border-white/30 hover:border-white/50"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12 animate-slide-up-fade delay-1">
          <p className="text-sm font-semibold tracking-widest uppercase text-amber-600">Our Collection</p>
          <h2 className="text-4xl font-bold text-slate-900">
            Featured Products
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our comprehensive range of high-quality industrial chemicals
          </p>
        </div>
        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, index) => (
              <div
                key={product._id}
                className={`bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-lg hover:border-amber-200 transition-all duration-300 animate-slide-up-fade delay-${Math.min(index + 2, 8)} group`}
              >
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-500 mb-3">CAS: {product.casNumber}</p>
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex gap-3 mt-4">
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex-1 text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2 rounded-lg font-semibold transition-all hover:shadow-md"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/quote"
                    className="flex-1 text-center border-2 border-amber-500 text-amber-600 hover:bg-amber-50 py-2 rounded-lg font-semibold transition-all"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block animate-pulse">
              <div className="h-8 w-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        )}

        <div className="text-center mt-12 animate-slide-up-fade delay-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-all hover:shadow-lg"
          >
            View All Products
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 border-y-4 border-amber-500">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 animate-slide-up-fade delay-1">
            <p className="text-sm font-semibold tracking-widest uppercase text-amber-400">Why Choose Us</p>
            <h2 className="text-4xl font-bold text-white">
              Your Trusted Chemical Partner
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all animate-slide-up-fade delay-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full text-white text-3xl mb-4">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quality Assured</h3>
              <p className="text-slate-300">ISO certified products with rigorous quality control and testing</p>
            </div>
            <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all animate-slide-up-fade delay-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full text-white text-3xl mb-4">
                📦
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Fast Delivery</h3>
              <p className="text-slate-300">Reliable delivery across India within 48-72 hours</p>
            </div>
            <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all animate-slide-up-fade delay-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full text-white text-3xl mb-4">
                💬
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Expert Support</h3>
              <p className="text-slate-300">Dedicated technical team ready to assist you</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-12 text-center animate-slide-up-fade delay-5">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your chemical requirements and discover how we can support your business.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/quote"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-bold rounded-lg transition-all hover:shadow-xl hover:scale-105"
            >
              Request a Quote
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-lg transition-all border-2 border-slate-200 hover:border-slate-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
