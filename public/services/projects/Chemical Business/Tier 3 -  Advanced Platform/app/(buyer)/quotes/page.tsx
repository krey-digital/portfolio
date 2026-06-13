"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function BuyerQuotesPage() {
  const quotes = useQuery(api.quotes.getBuyerQuotes, {});

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Quotes</h1>
        <p className="text-gray-600">View and manage all your quote requests</p>
      </div>

      {quotes && quotes.length > 0 ? (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div key={quote._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">Quote #{quote._id.substring(0, 8)}</h3>
                  <p className="text-gray-600 text-sm">
                    Created: {new Date(quote.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    quote.status === "quoted"
                      ? "bg-green-100 text-green-800"
                      : quote.status === "accepted"
                        ? "bg-blue-100 text-blue-800"
                        : quote.status === "declined"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                <ul className="space-y-1">
                  {quote.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700">
                      {item.productName} - {item.quantity} {item.unit}
                      {item.packaging && ` (${item.packaging})`}
                    </li>
                  ))}
                </ul>
              </div>

              {quote.adminResponse && (
                <div className="bg-blue-50 p-3 rounded mb-4">
                  <p className="font-semibold text-sm mb-1">Response from Sales:</p>
                  <p className="text-sm text-gray-700">{quote.adminResponse}</p>
                </div>
              )}

              {quote.quotedPricing && (
                <div className="bg-green-50 p-3 rounded mb-4">
                  <p className="font-semibold text-sm mb-1">Pricing:</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{quote.quotedPricing}</p>
                </div>
              )}

              <a
                href={`/en/buyer/quotes/${quote._id}`}
                className="text-blue-600 hover:underline font-medium text-sm"
              >
                View Details →
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-lg shadow text-center">
          <p className="text-gray-600 text-lg mb-4">No quotes yet</p>
          <a href="/products" className="text-blue-600 hover:underline">
            Browse our products and create your first quote
          </a>
        </div>
      )}
    </div>
  );
}
