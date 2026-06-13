"use client";

import { Doc } from "@/convex/_generated/dataModel";

interface SpecTableProps {
  product: Doc<"products">;
}

export default function SpecTable({ product }: SpecTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody className="divide-y divide-slate-200">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">
                CAS Number
              </td>
              <td className="px-6 py-4 text-slate-700">{product.casNumber}</td>
            </tr>
            {product.unNumber && (
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">
                  UN Number
                </td>
                <td className="px-6 py-4 text-slate-700">{product.unNumber}</td>
              </tr>
            )}
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">Category</td>
              <td className="px-6 py-4 text-slate-700 capitalize">
                {product.category}
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">Grade</td>
              <td className="px-6 py-4 text-slate-700 capitalize">
                {product.grade}
              </td>
            </tr>
            {product.purityMin !== undefined && product.purityMax !== undefined && (
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">Purity</td>
                <td className="px-6 py-4 text-slate-700">
                  {product.purityMin}% - {product.purityMax}%
                </td>
              </tr>
            )}
            {product.packagingOptions.length > 0 && (
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">
                  Packaging Options
                </td>
                <td className="px-6 py-4 text-slate-700">
                  <ul className="list-disc list-inside space-y-1">
                    {product.packagingOptions.map((opt, idx) => (
                      <li key={idx}>
                        {opt.size} {opt.unit}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
            {product.applications.length > 0 && (
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">
                  Applications
                </td>
                <td className="px-6 py-4 text-slate-700">
                  <ul className="list-disc list-inside space-y-1">
                    {product.applications.map((app, idx) => (
                      <li key={idx}>{app}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
