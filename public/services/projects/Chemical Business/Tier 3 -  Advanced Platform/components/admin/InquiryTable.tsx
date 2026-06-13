"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import InquiryStatusSelect from "./InquiryStatusSelect";
import { ChevronDown } from "lucide-react";

interface InquiryTableProps {
  status?: "new" | "contacted" | "quoted" | "closed";
}

export default function InquiryTable({ status }: InquiryTableProps) {
  const inquiries = useQuery(api.inquiries.list, {
    status: status,
  });
  const updateStatus = useMutation(api.inquiries.updateStatus);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");

  const handleStatusChange = async (
    id: string,
    newStatus: string,
    notes?: string
  ) => {
    await updateStatus({
      id: id as any,
      status: newStatus as any,
      adminNotes: notes,
    });
    setEditingId(null);
  };

  if (!inquiries) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Loading inquiries...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
      {inquiries.length > 0 ? (
        <div className="divide-y divide-slate-100">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="p-5 hover:bg-gradient-to-r hover:from-slate-50 hover:to-transparent transition-colors duration-200 group"
            >
              {/* Summary row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setExpandedId(
                          expandedId === inquiry._id ? null : inquiry._id
                        )
                      }
                      className="text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1.5 transition-colors group/btn"
                    >
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-300 group-hover/btn:scale-110 ${
                          expandedId === inquiry._id ? "rotate-180" : ""
                        }`}
                      />
                      <span className="text-slate-900">{inquiry.name}</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <p className="text-slate-600">
                      <span className="font-medium">{inquiry.company}</span>
                    </p>
                    <span className="text-slate-400">•</span>
                    <p className="text-slate-500">
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="hover:text-amber-600 transition-colors"
                      >
                        {inquiry.email}
                      </a>
                    </p>
                    <span className="text-slate-400">•</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {inquiry.type}
                    </span>
                  </div>
                  {inquiry.productName && (
                    <p className="text-xs text-slate-500 mt-2 pl-8">
                      📦 <span className="font-medium">{inquiry.productName}</span>
                    </p>
                  )}
                </div>

                {/* Status dropdown */}
                <InquiryStatusSelect
                  value={inquiry.status as any}
                  onChange={(newStatus) =>
                    handleStatusChange(inquiry._id, newStatus)
                  }
                />
              </div>

              {/* Expanded details */}
              {expandedId === inquiry._id && (
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  {/* Message section */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
                      📝 Message
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {inquiry.message || (
                        <span className="text-slate-400 italic">No message provided</span>
                      )}
                    </p>
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inquiry.quantity && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
                          📦 Quantity
                        </p>
                        <p className="text-sm text-slate-700 font-medium">
                          {inquiry.quantity}
                        </p>
                      </div>
                    )}

                    {inquiry.destination && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">
                          📍 Destination
                        </p>
                        <p className="text-sm text-slate-700 font-medium">
                          {inquiry.destination}
                        </p>
                      </div>
                    )}

                    {inquiry.phone && (
                      <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                        <p className="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2">
                          📞 Phone
                        </p>
                        <p className="text-sm text-slate-700 font-medium">
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="hover:text-amber-600 transition-colors"
                          >
                            {inquiry.phone}
                          </a>
                        </p>
                      </div>
                    )}

                    {inquiry.createdAt && (
                      <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                        <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">
                          🕐 Received
                        </p>
                        <p className="text-sm text-slate-700 font-medium">
                          {new Date(inquiry.createdAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Admin notes section */}
                  <div>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-3">
                      ✏️ Admin Notes
                    </p>
                    {editingId === inquiry._id ? (
                      <div className="mt-2 space-y-3">
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Add or edit notes..."
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-amber-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-slate-900 placeholder-slate-400"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleStatusChange(
                                inquiry._id,
                                inquiry.status,
                                editNotes
                              )
                            }
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm"
                          >
                            Save Notes
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditNotes("");
                            }}
                            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-medium transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setEditingId(inquiry._id);
                          setEditNotes(inquiry.adminNotes || "");
                        }}
                        className="p-4 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors border-2 border-dashed border-slate-200 hover:border-amber-300 min-h-20 flex items-center"
                      >
                        <p className="text-sm text-slate-700">
                          {inquiry.adminNotes ? (
                            <span>{inquiry.adminNotes}</span>
                          ) : (
                            <span className="text-slate-400 italic">
                              💭 Click to add notes...
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-slate-600 font-medium text-lg">No inquiries found</p>
          <p className="text-slate-500 text-sm mt-1">
            New inquiries will appear here when customers submit forms
          </p>
        </div>
      )}
    </div>
  );
}
