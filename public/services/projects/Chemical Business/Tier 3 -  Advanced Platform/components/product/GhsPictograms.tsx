"use client";

import { Doc } from "@/convex/_generated/dataModel";
import GhsPictogramDisplay from "@/components/ghs/GhsPictogramDisplay";

interface GhsPictogramsProps {
  product: Doc<"products">;
}

export default function GhsPictograms({ product }: GhsPictogramsProps) {
  if (product.ghsPictograms.length === 0 && !product.ghsSignalWord) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-900">Safety Information</h3>

      {/* Signal Word */}
      {product.ghsSignalWord && (
        <div
          className={`p-4 rounded-lg border-2 text-center font-bold text-2xl ${
            product.ghsSignalWord === "DANGER"
              ? "bg-red-100 border-red-600 text-red-700"
              : "bg-amber-100 border-amber-600 text-amber-700"
          }`}
        >
          ⚠️ {product.ghsSignalWord}
        </div>
      )}

      {/* GHS Pictograms */}
      {product.ghsPictograms.length > 0 && (
        <div>
          <p className="text-sm font-medium text-slate-600 mb-4">GHS Hazard Pictograms:</p>
          <div className="flex justify-center">
            <GhsPictogramDisplay
              pictograms={product.ghsPictograms}
              size="md"
              showCode={true}
              showLabel={true}
            />
          </div>
        </div>
      )}

      {/* Safety disclaimer */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
        <strong>Important:</strong> For complete safety information, hazard
        classification, and handling procedures, refer to the Safety Data Sheet
        (SDS) below.
      </div>
    </div>
  );
}
