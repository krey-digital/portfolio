"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { ChevronDown, Mail, Phone, MapPin, Package } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminQuotesPage() {
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const quotes = useQuery(api.quotes.list, { status: statusFilter as any });
  const updateStatus = useMutation(api.quotes.updateStatus);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [quotedPricing, setQuotedPricing] = useState("");

  const handleStatusChange = async (
    id: string,
    newStatus: string,
    response?: string,
    pricing?: string
  ) => {
    await updateStatus({
      id: id as any,
      status: newStatus as any,
      adminResponse: response,
      quotedPricing: pricing,
    });
    setEditingId(null);
    setAdminResponse("");
    setQuotedPricing("");
  };

  const tabs = [
    { label: "All", value: undefined, icon: "📋", color: "slate" },
    { label: "Submitted", value: "submitted", icon: "📨", color: "blue" },
    { label: "Reviewing", value: "reviewing", icon: "👀", color: "yellow" },
    { label: "Quoted", value: "quoted", icon: "💰", color: "purple" },
    { label: "Accepted", value: "accepted", icon: "✅", color: "green" },
    { label: "Declined", value: "declined", icon: "❌", color: "red" },
  ];

  if (quotes === undefined) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Loading quote requests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Quote Requests
        </h1>
        <p className="text-slate-600 mt-2 text-lg">
          Manage multi-product quote requests from buyers
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.value || "all"}
            onClick={() => setStatusFilter(tab.value)}
            className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base rounded-full transition-all duration-300 whitespace-nowrap flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-105 ${
              statusFilter === tab.value
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quotes list */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
        {quotes.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {quotes.map((quote) => (
              <div
                key={quote._id}
                className="p-5 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent transition-colors duration-200"
              >
                {/* Summary row */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === quote._id ? null : quote._id
                          )
                        }
                        className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1.5 transition-colors group/btn"
                      >
                        <ChevronDown
                          size={20}
                          className={`transition-transform duration-300 ${
                            expandedId === quote._id ? "rotate-180" : ""
                          }`}
                        />
                        <span className="text-slate-900">{quote.name}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                      <p className="text-slate-600">
                        <span className="font-medium">{quote.company}</span>
                      </p>
                      <span className="text-slate-400">•</span>
                      <p className="text-slate-500">{quote.items.length} items</p>
                      <span className="text-slate-400">•</span>
                      <p className="text-slate-500">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        quote.status === "submitted"
                          ? "bg-blue-100 text-blue-700"
                          : quote.status === "reviewing"
                          ? "bg-yellow-100 text-yellow-700"
                          : quote.status === "quoted"
                          ? "bg-purple-100 text-purple-700"
                          : quote.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {quote.status}
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                {expandedId === quote._id && (
                  <div className="mt-4 pt-4 border-t border-slate-200 space-y-4">
                    {/* Contact info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={16} className="text-slate-400" />
                        <a
                          href={`mailto:${quote.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {quote.email}
                        </a>
                      </div>
                      {quote.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone size={16} className="text-slate-400" />
                          <a
                            href={`tel:${quote.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {quote.phone}
                          </a>
                        </div>
                      )}
                      {quote.destination && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin size={16} className="text-slate-400" />
                          <span className="text-slate-600">{quote.destination}</span>
                        </div>
                      )}
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                        <Package size={16} />
                        Requested Items
                      </h4>
                      <div className="space-y-2">
                        {quote.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-slate-900">
                                  {item.productName}
                                </p>
                                <p className="text-sm text-slate-600 mt-1">
                                  Quantity: {item.quantity} {item.unit}
                                  {item.packaging && ` • Packaging: ${item.packaging}`}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {quote.notes && (
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Additional Notes
                        </h4>
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                          {quote.notes}
                        </p>
                      </div>
                    )}

                    {/* Admin response */}
                    {quote.adminResponse && (
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Admin Response
                        </h4>
                        <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                          {quote.adminResponse}
                        </p>
                      </div>
                    )}

                    {/* Quoted pricing */}
                    {quote.quotedPricing && (
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          Quoted Pricing
                        </h4>
                        <p className="text-sm text-slate-600 bg-green-50 p-3 rounded-lg border border-green-200">
                          {quote.quotedPricing}
                        </p>
                      </div>
                    )}

                    {/* Status update form */}
                    {editingId === quote._id ? (
                      <div className="space-y-3 bg-slate-50 p-4 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Status
                          </label>
                          <select
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            defaultValue={quote.status}
                            onChange={(e) => {
                              // Store for submission
                            }}
                          >
                            <option value="submitted">Submitted</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="quoted">Quoted</option>
                            <option value="accepted">Accepted</option>
                            <option value="declined">Declined</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Admin Response
                          </label>
                          <textarea
                            value={adminResponse}
                            onChange={(e) => setAdminResponse(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            rows={3}
                            placeholder="Enter your response..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Quoted Pricing
                          </label>
                          <textarea
                            value={quotedPricing}
                            onChange={(e) => setQuotedPricing(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                            rows={2}
                            placeholder="Enter pricing details..."
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const select = document.querySelector(
                                `select`
                              ) as HTMLSelectElement;
                              handleStatusChange(
                                quote._id,
                                select.value,
                                adminResponse,
                                quotedPricing
                              );
                            }}
                            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setAdminResponse("");
                              setQuotedPricing("");
                            }}
                            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(quote._id);
                          setAdminResponse(quote.adminResponse || "");
                          setQuotedPricing(quote.quotedPricing || "");
                        }}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium"
                      >
                        Update Status
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-5xl mb-3">📭</div>
            <p className="text-slate-600 font-medium text-lg">
              No quote requests yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
