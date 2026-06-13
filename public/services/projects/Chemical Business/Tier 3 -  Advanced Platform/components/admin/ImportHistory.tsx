"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Clock, CheckCircle, XCircle, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ImportHistory() {
  const history = useQuery(api.importHistory.list, { limit: 20 });
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  if (history === undefined) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-600">No import history yet</p>
        <p className="text-sm text-slate-500 mt-1">
          Import history will appear here after your first product import
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-6 py-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Import History
        </h2>
        <p className="text-slate-300 text-sm mt-1">
          Track all product import operations
        </p>
      </div>

      <div className="divide-y divide-slate-200">
        {history.map((item) => {
          const isExpanded = expandedItems.has(item._id);
          const totalRecords = item.totalRecords;
          const successRate = totalRecords > 0 
            ? Math.round(((item.successCount + item.updatedCount) / totalRecords) * 100)
            : 0;

          return (
            <div key={item._id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <h3 className="font-semibold text-slate-900">{item.fileName}</h3>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded uppercase font-medium">
                      {item.fileType}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-slate-600 mb-3">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      {item.successCount} created
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      {item.updatedCount} updated
                    </span>
                    {item.failedCount > 0 && (
                      <span className="flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-red-600" />
                        {item.failedCount} failed
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                      <span>Success Rate</span>
                      <span className="font-semibold">{successRate}%</span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
                        style={{ width: `${successRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>Imported by: {item.importedBy}</span>
                    <span>•</span>
                    <span>{new Date(item.createdAt).toLocaleString()}</span>
                  </div>

                  {/* Errors */}
                  {item.errors.length > 0 && (
                    <div className="mt-3">
                      <button
                        onClick={() => toggleItem(item._id)}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        {item.errors.length} error(s)
                      </button>

                      {isExpanded && (
                        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-4 space-y-2">
                          {item.errors.map((error, index) => (
                            <p key={index} className="text-sm text-red-700 flex items-start gap-2">
                              <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{error}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
