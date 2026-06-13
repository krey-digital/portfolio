"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Award, Calendar, Building, FileText, CheckCircle, XCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminCertificationsPage() {
  const [activeFilter, setActiveFilter] = useState<boolean | undefined>();
  const certifications = useQuery(api.certifications.listAll, {
    active: activeFilter,
  });
  const activateCert = useMutation(api.certifications.activate);
  const deactivateCert = useMutation(api.certifications.deactivate);
  const deleteCert = useMutation(api.certifications.deleteCertification);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleActivate = async (id: string) => {
    await activateCert({ id: id as any });
  };

  const handleDeactivate = async (id: string) => {
    await deactivateCert({ id: id as any });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      setDeletingId(id);
      try {
        await deleteCert({ id: id as any });
      } finally {
        setDeletingId(null);
      }
    }
  };

  const tabs = [
    { label: "All", value: undefined, icon: "🏆" },
    { label: "Active", value: true, icon: "✅" },
    { label: "Inactive", value: false, icon: "⏸️" },
  ];

  if (certifications === undefined) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Loading certifications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Certifications
          </h1>
          <p className="text-slate-600 mt-2 text-lg">
            Manage company certifications and accreditations
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap">
          ➕ Add Certification
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-3 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.value?.toString() || "all"}
            onClick={() => setActiveFilter(tab.value)}
            className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base rounded-full transition-all duration-300 whitespace-nowrap flex items-center gap-2 shadow-sm hover:shadow-md transform hover:scale-105 ${
              activeFilter === tab.value
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md scale-105"
                : "bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Certifications grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications && certifications.length > 0 ? (
          certifications.map((cert) => {
            const isExpired =
              cert.expiresAt && cert.expiresAt < Date.now();
            const isExpiringSoon =
              cert.expiresAt &&
              cert.expiresAt > Date.now() &&
              cert.expiresAt < Date.now() + 30 * 24 * 60 * 60 * 1000;

            return (
              <div
                key={cert._id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-xl ${
                  isExpired
                    ? "border-red-200"
                    : isExpiringSoon
                    ? "border-yellow-200"
                    : "border-slate-100"
                }`}
              >
                {/* Header */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 flex items-center justify-center">
                  <Award className="w-16 h-16 text-amber-600" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-slate-900 text-lg flex-1">
                      {cert.name}
                    </h3>
                    {cert.isActive ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1">
                        <CheckCircle size={12} />
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 flex items-center gap-1">
                        <XCircle size={12} />
                        Inactive
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Building size={14} className="text-slate-400" />
                      <span>{cert.issuingBody}</span>
                    </div>
                    {cert.certNumber && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <FileText size={14} className="text-slate-400" />
                        <span>Cert #: {cert.certNumber}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      <span>
                        Issued: {new Date(cert.issuedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {cert.expiresAt && (
                      <div
                        className={`flex items-center gap-2 text-sm ${
                          isExpired
                            ? "text-red-600 font-semibold"
                            : isExpiringSoon
                            ? "text-yellow-600 font-semibold"
                            : "text-slate-600"
                        }`}
                      >
                        <Calendar size={14} className="text-slate-400" />
                        <span>
                          Expires:{" "}
                          {new Date(cert.expiresAt).toLocaleDateString()}
                          {isExpired && " (Expired)"}
                          {isExpiringSoon && " (Expiring Soon)"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {cert.isActive ? (
                      <button
                        onClick={() => handleDeactivate(cert._id)}
                        className="flex-1 px-3 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium text-sm"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivate(cert._id)}
                        className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(cert._id)}
                      disabled={deletingId === cert._id}
                      className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium text-sm disabled:opacity-50"
                    >
                      {deletingId === cert._id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full p-12 text-center bg-white rounded-xl shadow-lg">
            <div className="text-5xl mb-3">🏆</div>
            <p className="text-slate-600 font-medium text-lg mb-4">
              No certifications yet
            </p>
            <button className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors">
              Add your first certification →
            </button>
          </div>
        )}
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-2xl font-bold text-slate-900">
                {certifications.length}
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
              <p className="text-sm text-slate-600">Active</p>
              <p className="text-2xl font-bold text-slate-900">
                {certifications.filter((c) => c.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-slate-900">
                {
                  certifications.filter(
                    (c) =>
                      c.expiresAt &&
                      c.expiresAt > Date.now() &&
                      c.expiresAt < Date.now() + 30 * 24 * 60 * 60 * 1000
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Expired</p>
              <p className="text-2xl font-bold text-slate-900">
                {
                  certifications.filter(
                    (c) => c.expiresAt && c.expiresAt < Date.now()
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
