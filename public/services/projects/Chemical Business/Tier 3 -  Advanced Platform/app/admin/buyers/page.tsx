"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Mail, Phone, MapPin, Building, FileText, CheckCircle, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminBuyersPage() {
  const [verifiedFilter, setVerifiedFilter] = useState<boolean | undefined>();
  const buyers = useQuery(api.buyers.list, { verified: verifiedFilter });
  const verifyBuyer = useMutation(api.buyers.verify);
  const unverifyBuyer = useMutation(api.buyers.unverify);

  const handleVerify = async (id: string) => {
    await verifyBuyer({ id: id as any });
  };

  const handleUnverify = async (id: string) => {
    await unverifyBuyer({ id: id as any });
  };

  const tabs = [
    { label: "All", value: undefined, icon: "👥" },
    { label: "Verified", value: true, icon: "✅" },
    { label: "Unverified", value: false, icon: "⏳" },
  ];

  if (buyers === undefined) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Loading buyers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Buyers
        </h1>
        <p className="text-slate-600 mt-2 text-lg">
          Manage registered buyer accounts
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.value?.toString() || "all"}
            onClick={() => setVerifiedFilter(tab.value)}
            className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base rounded-full transition-all duration-300 whitespace-nowrap flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-105 ${
              verifiedFilter === tab.value
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Buyers table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
        {buyers && buyers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {buyers.map((buyer) => (
                  <tr
                    key={buyer._id}
                    className="hover:bg-slate-50/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {buyer.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Joined {new Date(buyer.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-slate-400" />
                        <span className="text-sm text-slate-900 font-medium">
                          {buyer.company}
                        </span>
                      </div>
                      {buyer.gstin && (
                        <p className="text-xs text-slate-500 mt-1">
                          GSTIN: {buyer.gstin}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail size={14} className="text-slate-400" />
                          <a
                            href={`mailto:${buyer.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {buyer.email}
                          </a>
                        </div>
                        {buyer.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="text-slate-400" />
                            <a
                              href={`tel:${buyer.phone}`}
                              className="text-blue-600 hover:underline"
                            >
                              {buyer.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {buyer.city ? (
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin size={14} className="text-slate-400" />
                          {buyer.city}
                        </div>
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {buyer.isVerified ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          <CheckCircle size={14} />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                          <XCircle size={14} />
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {buyer.isVerified ? (
                        <button
                          onClick={() => handleUnverify(buyer._id)}
                          className="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors hover:underline"
                        >
                          Unverify
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerify(buyer._id)}
                          className="text-green-600 hover:text-green-700 font-semibold text-sm transition-colors hover:underline"
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-5xl mb-3">👥</div>
            <p className="text-slate-600 font-medium text-lg">No buyers yet</p>
          </div>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Buyers</p>
              <p className="text-2xl font-bold text-slate-900">
                {buyers?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Verified</p>
              <p className="text-2xl font-bold text-slate-900">
                {buyers?.filter((b) => b.isVerified).length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <XCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending Verification</p>
              <p className="text-2xl font-bold text-slate-900">
                {buyers?.filter((b) => !b.isVerified).length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
