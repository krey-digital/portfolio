"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Disable static generation for this dynamic page
export const dynamic = "force-dynamic";

export default function BuyerDashboard() {
  const buyer = useQuery(api.buyers.getCurrentBuyer, {});
  const quotes = useQuery(api.quotes.getBuyerQuotes, {});
  const inquiries = useQuery(api.inquiries.getBuyerInquiries, {});

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back{buyer ? `, ${buyer.name}` : ""}!</h1>
        <p className="text-gray-600">Manage your accounts, quotes, and inquiries</p>
      </div>

      {/* Verification Status */}
      {buyer && !buyer.isVerified && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-yellow-800 font-semibold">⚠ Account Pending Verification</p>
          <p className="text-yellow-700 text-sm">
            Your account is being reviewed by our sales team. You'll be able to download SDS documents once verified.
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Account Status</h3>
          <p className="text-2xl font-bold">
            {buyer?.isVerified ? "✓ Verified" : "Pending"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Active Inquiries</h3>
          <p className="text-2xl font-bold">{inquiries?.length || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Quote Requests</h3>
          <p className="text-2xl font-bold">{quotes?.length || 0}</p>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Inquiries</h2>
        {inquiries && inquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3">Product</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((inq: any) => (
                  <tr key={inq._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{inq.productName || "General"}</td>
                    <td className="p-3 capitalize">{inq.type}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800">
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No inquiries yet</p>
        )}
      </div>

      {/* Recent Quotes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Quote Requests</h2>
        {quotes && quotes.length > 0 ? (
          <div className="space-y-3">
            {quotes.slice(0, 5).map((quote: any) => (
              <div key={quote._id} className="p-4 border rounded hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{quote.items.length} items</p>
                    <p className="text-sm text-gray-600">
                      Submitted {new Date(quote.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                    {quote.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No quote requests yet</p>
        )}
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Your Information</h2>
        {buyer && (
          <div className="space-y-3">
            <p>
              <span className="font-semibold">Name:</span> {buyer.name}
            </p>
            <p>
              <span className="font-semibold">Company:</span> {buyer.company}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {buyer.email}
            </p>
            {buyer.phone && (
              <p>
                <span className="font-semibold">Phone:</span> {buyer.phone}
              </p>
            )}
            {buyer.gstin && (
              <p>
                <span className="font-semibold">GSTIN:</span> {buyer.gstin}
              </p>
            )}
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className={buyer.isVerified ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>
                {buyer.isVerified ? "Verified" : "Pending Verification"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
