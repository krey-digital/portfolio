"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useParams } from "next/navigation";

// Disable static generation for this dynamic page
export const dynamic = "force-dynamic";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = useQuery(api.products.getBySlug, { slug });
  const [addedToCart, setAddedToCart] = useState(false);

  // Always call useQuery, but pass undefined productId if product doesn't exist yet
  const sdsVersions = useQuery(
    api.sds.getSdsVersions,
    product ? { productId: product._id } : "skip"
  );

  const handleAddToCart = () => {
    // TODO: Implement quote cart logic
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (product === undefined) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p>Page not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600">CAS Number: {product.casNumber}</p>
          {product.unNumber && <p className="text-gray-600">UN Number: {product.unNumber}</p>}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Product Specifications</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </section>

            {/* Specifications */}
            <section className="mb-8">
              <h3 className="text-xl font-bold mb-4">Specifications</h3>
              <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="font-semibold">Category:</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Grade:</span>
                  <span>{product.grade}</span>
                </div>
                {product.purityMin && (
                  <div className="flex justify-between">
                    <span className="font-semibold">Purity:</span>
                    <span>
                      {product.purityMin}-{product.purityMax}%
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Packaging */}
            {product.packagingOptions && product.packagingOptions.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold mb-4">Packaging Options</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Size</th>
                        <th className="text-left p-3">Unit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.packagingOptions.map((opt: any, idx: number) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="p-3">{opt.size}</td>
                          <td className="p-3">{opt.unit.toUpperCase()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold mb-4">Applications</h3>
                <ul className="space-y-2">
                  {product.applications.map((app: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* SDS */}
            {sdsVersions && sdsVersions.length > 0 && (
              <section className="mb-8">
                <h3 className="text-xl font-bold mb-4">SDS Version History</h3>
                <div className="space-y-2">
                  {sdsVersions.map((sds: any) => (
                    <div key={sds._id} className="flex justify-between items-center p-3 border rounded hover:bg-gray-50">
                      <div>
                        <p className="font-semibold">Version {sds.version}</p>
                        <p className="text-sm text-gray-600">
                          Issued: {new Date(sds.issuedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
                        Download SDS
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar */}
          <div>
            {/* Action Card */}
            <div className="bg-gray-50 p-6 rounded-lg sticky top-8 space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
              >
                {addedToCart ? "✓ Added to Cart" : "Add to Quote"}
              </button>

              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 font-semibold transition">
                Request Information
              </button>

              {/* GHS Hazard */}
              {product.ghsSignalWord && (
                <div className="mt-6 p-4 rounded-lg border-2 border-red-500">
                  <p className="text-sm font-bold text-red-600 mb-2">GHS Signal Word</p>
                  <p className="text-lg font-bold text-red-600">{product.ghsSignalWord}</p>
                </div>
              )}

              {/* Compliance Warning */}
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-xs text-gray-700">
                For industrial and laboratory use only. Refer to SDS before handling.
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {product.related && product.related.length > 0 && (
          <section className="py-12 border-t">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.related.map((relatedProduct: any) => (
                <div key={relatedProduct._id} className="border rounded-lg p-4 hover:shadow-lg transition">
                  <h3 className="font-semibold text-lg mb-2">{relatedProduct.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {relatedProduct.description.substring(0, 60)}...
                  </p>
                  <button className="w-full text-sm bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Add to Quote
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
