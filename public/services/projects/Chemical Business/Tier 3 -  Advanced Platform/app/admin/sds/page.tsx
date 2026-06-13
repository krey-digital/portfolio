"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FileText, Download, Calendar, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminSdsPage() {
  const sdsVersions = useQuery(api.sds.listAll, {});
  const products = useQuery(api.products.listAdmin, {});

  if (sdsVersions === undefined || products === undefined) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Loading SDS data...</p>
      </div>
    );
  }

  // Group SDS by product
  const sdsGrouped = sdsVersions.reduce((acc, sds) => {
    if (!acc[sds.productId]) {
      acc[sds.productId] = [];
    }
    acc[sds.productId].push(sds);
    return acc;
  }, {} as Record<string, typeof sdsVersions>);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          SDS Management
        </h1>
        <p className="text-slate-600 mt-2 text-lg">
          Manage Safety Data Sheets and version history
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total SDS Versions</p>
              <p className="text-2xl font-bold text-slate-900">
                {sdsVersions.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Products with SDS</p>
              <p className="text-2xl font-bold text-slate-900">
                {Object.keys(sdsGrouped).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Products without SDS</p>
              <p className="text-2xl font-bold text-slate-900">
                {products.length - Object.keys(sdsGrouped).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SDS list grouped by product */}
      <div className="space-y-6">
        {Object.entries(sdsGrouped).map(([productId, versions]) => {
          const product = products.find((p) => p._id === productId);
          if (!product) return null;

          return (
            <div
              key={productId}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100"
            >
              {/* Product header */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-5 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-lg">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  CAS: {product.casNumber} • {versions.length} version(s)
                </p>
              </div>

              {/* Versions list */}
              <div className="divide-y divide-slate-100">
                {versions
                  .sort((a, b) => b.issuedAt - a.issuedAt)
                  .map((sds) => (
                    <div
                      key={sds._id}
                      className="p-5 hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold text-slate-900">
                              Version {sds.version}
                            </span>
                            {sds.isLatest && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                Latest
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} className="text-slate-400" />
                              Issued: {new Date(sds.issuedAt).toLocaleDateString()}
                            </div>
                            {sds.revisedAt && (
                              <div className="flex items-center gap-1">
                                <Calendar size={14} className="text-slate-400" />
                                Revised:{" "}
                                {new Date(sds.revisedAt).toLocaleDateString()}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <User size={14} className="text-slate-400" />
                              {sds.uploadedBy}
                            </div>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm flex items-center gap-2">
                          <Download size={16} />
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}

        {Object.keys(sdsGrouped).length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-5xl mb-3">📄</div>
            <p className="text-slate-600 font-medium text-lg">
              No SDS documents uploaded yet
            </p>
          </div>
        )}
      </div>

      {/* Products without SDS */}
      {products.length - Object.keys(sdsGrouped).length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-5 border-b border-orange-200">
            <h3 className="font-bold text-slate-900 text-lg">
              Products Missing SDS
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              These products don't have any SDS documents uploaded
            </p>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {products
                .filter((p) => !sdsGrouped[p._id])
                .map((product) => (
                  <div
                    key={product._id}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <p className="font-medium text-slate-900 text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      CAS: {product.casNumber}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
