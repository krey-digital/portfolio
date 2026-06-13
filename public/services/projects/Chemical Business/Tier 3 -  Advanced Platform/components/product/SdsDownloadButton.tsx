"use client";

import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

interface SdsDownloadButtonProps {
  fileId?: Id<"_storage">;
  version?: string;
  issuedAt?: number;
}

export default function SdsDownloadButton({
  fileId,
  version,
  issuedAt,
}: SdsDownloadButtonProps) {
  const getUrl = useAction(api.sds.getDownloadUrl);
  const [isLoading, setIsLoading] = useState(false);

  if (!fileId) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
        <p className="text-slate-600 text-sm">
          SDS document is not currently available
        </p>
      </div>
    );
  }

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const url = await getUrl({ fileId });
      if (typeof url === "string") {
        window.open(url, "_blank");
      } else {
        alert("Failed to get download URL");
      }
    } catch (error) {
      console.error("Failed to download SDS:", error);
      alert("Failed to download SDS. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-900">Safety Data Sheet (SDS)</h3>

      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="w-full px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <span>Preparing...</span>
          </>
        ) : (
          <>
            <span>📥</span>
            <span>Download SDS (PDF)</span>
          </>
        )}
      </button>

      <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-200">
        {version && <p><span className="font-medium">Version:</span> {version}</p>}
        {issuedAt && (
          <p>
            <span className="font-medium">Issued:</span>{" "}
            {new Intl.DateTimeFormat("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(issuedAt))}
          </p>
        )}
      </div>

      <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
        <strong>For industrial and laboratory use only.</strong> Always refer to
        the SDS before handling this product.
      </div>
    </div>
  );
}
