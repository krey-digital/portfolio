"use client";

import { useState, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { parseCSVFile, parseJSONFile } from "@/lib/productExport";
import { Upload, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ProductImport() {
  const createProduct = useMutation(api.products.create);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const [showImportDialog, setShowImportDialog] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportResults(null);

    try {
      let products: Partial<any>[] = [];

      // Parse file based on type
      if (file.name.endsWith('.csv')) {
        products = await parseCSVFile(file);
      } else if (file.name.endsWith('.json')) {
        products = await parseJSONFile(file);
      } else {
        throw new Error('Unsupported file format. Please use CSV or JSON.');
      }

      // Import products
      const results = {
        success: 0,
        failed: 0,
        errors: [] as string[],
      };

      for (const product of products) {
        try {
          // Validate required fields
          if (!product.name || !product.casNumber || !product.category || !product.grade) {
            results.failed++;
            results.errors.push(`Product "${product.name || 'Unknown'}" is missing required fields`);
            continue;
          }

          // Create product
          await createProduct({
            name: product.name,
            slug: product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            casNumber: product.casNumber,
            unNumber: product.unNumber,
            category: product.category,
            grade: product.grade,
            description: product.description || '',
            descriptionHi: product.descriptionHi,
            purityMin: product.purityMin,
            purityMax: product.purityMax,
            packagingOptions: product.packagingOptions || [{ size: "1", unit: "KG" }],
            ghsSignalWord: product.ghsSignalWord,
            ghsPictograms: product.ghsPictograms || [],
            applications: product.applications || [],
            relatedProductIds: product.relatedProductIds || [],
            erpProductCode: product.erpProductCode,
            isPublished: product.isPublished || false,
            isDraft: product.isDraft !== false,
          } as any);

          results.success++;
        } catch (error) {
          results.failed++;
          results.errors.push(`Failed to import "${product.name}": ${error}`);
        }
      }

      setImportResults(results);
    } catch (error) {
      setImportResults({
        success: 0,
        failed: 0,
        errors: [`Failed to parse file: ${error}`],
      });
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImportClick = () => {
    setShowImportDialog(true);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      {/* Import Button */}
      <button
        onClick={handleImportClick}
        className="px-6 py-3 bg-white border-2 border-blue-200 hover:border-blue-300 text-blue-700 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap flex items-center gap-2"
      >
        <Upload className="w-5 h-5" />
        Import Products
      </button>

      {/* Import Dialog */}
      {showImportDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 transition-opacity"
              onClick={() => !isImporting && setShowImportDialog(false)}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-t-2xl">
                <h2 className="text-2xl font-bold">Import Products</h2>
                <p className="text-blue-100 mt-1">Upload a CSV or JSON file to import multiple products</p>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* File Upload Area */}
                {!importResults && (
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.json"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={isImporting}
                    />
                    
                    <div
                      onClick={handleFileButtonClick}
                      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                        isImporting
                          ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
                          : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      {isImporting ? (
                        <div className="space-y-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
                          <p className="text-slate-600 font-medium">Importing products...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-16 h-16 text-blue-600 mx-auto" />
                          <div>
                            <p className="text-lg font-semibold text-slate-900 mb-1">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-slate-600">
                              CSV or JSON files only
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Import Results */}
                {importResults && (
                  <div className="space-y-4">
                    {/* Success Summary */}
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <h3 className="text-lg font-bold text-emerald-900">
                          Import Complete
                        </h3>
                      </div>
                      <p className="text-emerald-700">
                        Successfully imported <strong>{importResults.success}</strong> product(s)
                      </p>
                      {importResults.failed > 0 && (
                        <p className="text-red-700 mt-1">
                          Failed to import <strong>{importResults.failed}</strong> product(s)
                        </p>
                      )}
                    </div>

                    {/* Errors */}
                    {importResults.errors.length > 0 && (
                      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <AlertCircle className="w-6 h-6 text-red-600" />
                          <h3 className="text-lg font-bold text-red-900">Errors</h3>
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {importResults.errors.map((error, index) => (
                            <p key={index} className="text-sm text-red-700 flex items-start gap-2">
                              <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{error}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Instructions */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    File Format Requirements
                  </h3>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p><strong>CSV Format:</strong> Must include headers: Name, CAS Number, Category, Grade, Description</p>
                    <p><strong>JSON Format:</strong> Array of product objects with required fields</p>
                    <p className="text-xs text-slate-600 mt-3">
                      <strong>Required fields:</strong> name, casNumber, category, grade, description
                    </p>
                  </div>
                </div>

                {/* Sample Download */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const sample = `Name,CAS Number,UN Number,Category,Grade,Description,Purity Min,Purity Max,GHS Signal Word,Applications,Published,Draft
Sulfuric Acid,7664-93-9,UN1830,acids,technical,High-purity sulfuric acid for industrial applications,98,99.9,DANGER,Metal processing; Fertilizer production,Yes,No
Acetone,67-64-1,UN1090,solvents,pharma,Pure acetone solvent,99.5,99.99,WARNING,Laboratory use; Cleaning,Yes,No`;
                      const blob = new Blob([sample], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'sample-products.csv';
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm"
                  >
                    📄 Download CSV Sample
                  </button>
                  <button
                    onClick={() => {
                      const sample = JSON.stringify([
                        {
                          name: "Sulfuric Acid",
                          casNumber: "7664-93-9",
                          unNumber: "UN1830",
                          category: "acids",
                          grade: "technical",
                          description: "High-purity sulfuric acid for industrial applications",
                          purityMin: 98,
                          purityMax: 99.9,
                          ghsSignalWord: "DANGER",
                          applications: ["Metal processing", "Fertilizer production"],
                          isPublished: true,
                          isDraft: false
                        }
                      ], null, 2);
                      const blob = new Blob([sample], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'sample-products.json';
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm"
                  >
                    🔧 Download JSON Sample
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-slate-50 px-8 py-4 rounded-b-2xl border-t border-slate-200 flex justify-end gap-3">
                {importResults ? (
                  <>
                    <button
                      onClick={() => {
                        setImportResults(null);
                        setShowImportDialog(false);
                        window.location.reload();
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Done
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowImportDialog(false)}
                    disabled={isImporting}
                    className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
