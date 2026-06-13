"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { parseCSVFile, parseJSONFile } from "@/lib/productExport";
import { 
  Upload, FileText, CheckCircle, XCircle, AlertCircle, 
  Eye, RefreshCw, Image as ImageIcon, Clock, ChevronDown, ChevronUp 
} from "lucide-react";

interface ParsedProduct {
  name: string;
  slug?: string;
  casNumber: string;
  unNumber?: string;
  category: string;
  grade: string;
  description: string;
  descriptionHi?: string;
  purityMin?: number;
  purityMax?: number;
  packagingOptions?: Array<{ size: string; unit: string }>;
  ghsSignalWord?: "DANGER" | "WARNING";
  ghsPictograms?: string[];
  applications?: string[];
  erpProductCode?: string;
  isPublished?: boolean;
  isDraft?: boolean;
  imageFiles?: File[]; // For bulk image upload
}

export default function ProductImportEnhanced() {
  const upsertProduct = useMutation(api.products.upsert);
  const findProduct = useQuery(api.products.findBySlugOrCas, { slug: undefined, casNumber: undefined });
  const logImport = useMutation(api.importHistory.logImport);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [updateExisting, setUpdateExisting] = useState(true);
  
  // Preview state
  const [parsedProducts, setParsedProducts] = useState<ParsedProduct[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  
  // Image upload state
  const [productImages, setProductImages] = useState<Map<string, File[]>>(new Map());
  const [imagePreviewUrls, setImagePreviewUrls] = useState<Map<string, string[]>>(new Map());
  
  // Results state
  const [importResults, setImportResults] = useState<{
    success: number;
    failed: number;
    updated: number;
    errors: string[];
    fileName: string;
  } | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    setParsedProducts([]);
    setShowPreview(false);

    try {
      let products: Partial<ParsedProduct>[] = [];

      // Parse file based on type
      if (file.name.endsWith('.csv')) {
        products = await parseCSVFile(file);
      } else if (file.name.endsWith('.json')) {
        products = await parseJSONFile(file);
      } else {
        throw new Error('Unsupported file format. Please use CSV or JSON.');
      }

      // Validate and prepare products
      const validProducts: ParsedProduct[] = [];
      const errors: string[] = [];

      for (const product of products) {
        if (!product.name || !product.casNumber || !product.category || !product.grade) {
          errors.push(`Product "${product.name || 'Unknown'}" is missing required fields`);
          continue;
        }
        
        validProducts.push({
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
          packagingOptions: product.packagingOptions && product.packagingOptions.length > 0 
            ? product.packagingOptions 
            : [{ size: "1", unit: "KG" }],
          ghsSignalWord: product.ghsSignalWord,
          ghsPictograms: product.ghsPictograms || [],
          applications: product.applications || [],
          erpProductCode: product.erpProductCode,
          isPublished: product.isPublished || false,
          isDraft: product.isDraft !== false,
        });
      }

      if (errors.length > 0) {
        alert(`Found ${errors.length} invalid records:\n${errors.slice(0, 5).join('\n')}`);
      }

      setParsedProducts(validProducts);
      setShowPreview(true);
    } catch (error) {
      alert(`Failed to parse file: ${error}`);
    } finally {
      setIsParsing(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>, productIndex: number) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const product = parsedProducts[productIndex];
    const newMap = new Map(productImages);
    newMap.set(product.casNumber, files);
    setProductImages(newMap);

    // Create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));
    const newPreviewMap = new Map(imagePreviewUrls);
    newPreviewMap.set(product.casNumber, previewUrls);
    setImagePreviewUrls(newPreviewMap);
  };

  const handleConfirmImport = async () => {
    if (parsedProducts.length === 0) return;

    setIsImporting(true);
    setShowPreview(false);

    const results = {
      success: 0,
      failed: 0,
      updated: 0,
      errors: [] as string[],
      fileName: fileInputRef.current?.files?.[0]?.name || 'unknown',
    };

    try {
      for (const product of parsedProducts) {
        try {
          // Check if product exists (by slug or CAS)
          let existingProduct = null;
          
          if (updateExisting) {
            const bySlug = await findProduct;
            // Note: In production, you'd want to make individual queries
            // For now, we'll just try to create/update
          }

          // Upload images if provided
          let imageIds: Array<{ fileId: string; isPrimary: boolean }> = [];
          const images = productImages.get(product.casNumber);
          
          if (images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
              try {
                const uploadUrl = await generateUploadUrl();
                const response = await fetch(uploadUrl, {
                  method: "POST",
                  headers: { "Content-Type": images[i].type },
                  body: images[i],
                });
                const { storageId } = await response.json();
                imageIds.push({
                  fileId: storageId,
                  isPrimary: i === 0, // First image is primary
                });
              } catch (error) {
                results.errors.push(`Failed to upload image for "${product.name}": ${error}`);
              }
            }
          }

          // Upsert product
          const result = await upsertProduct({
            existingId: existingProduct?._id,
            name: product.name,
            slug: product.slug!,
            casNumber: product.casNumber,
            unNumber: product.unNumber,
            category: product.category as any,
            grade: product.grade as any,
            description: product.description,
            descriptionHi: product.descriptionHi,
            purityMin: product.purityMin,
            purityMax: product.purityMax,
            packagingOptions: product.packagingOptions!,
            ghsSignalWord: product.ghsSignalWord,
            ghsPictograms: product.ghsPictograms!,
            images: imageIds.length > 0 ? imageIds as any : undefined,
            applications: product.applications!,
            erpProductCode: product.erpProductCode,
            isPublished: product.isPublished!,
            isDraft: product.isDraft,
          });

          if (result.action === "updated") {
            results.updated++;
          } else {
            results.success++;
          }
        } catch (error) {
          results.failed++;
          results.errors.push(`Failed to import "${product.name}": ${error}`);
        }
      }

      // Log import history
      await logImport({
        fileName: results.fileName,
        fileType: results.fileName.endsWith('.csv') ? 'csv' : 'json',
        totalRecords: parsedProducts.length,
        successCount: results.success,
        failedCount: results.failed,
        updatedCount: results.updated,
        errors: results.errors,
        importedBy: localStorage.getItem('adminEmail') || 'admin',
      });

      setImportResults(results);
    } catch (error) {
      setImportResults({
        ...results,
        errors: [`Import failed: ${error}`],
      });
    } finally {
      setIsImporting(false);
      // Reset file inputs
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (imageInputRef.current) imageInputRef.current.value = '';
      setProductImages(new Map());
    }
  };

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <>
      {/* Import Button */}
      <button
        onClick={() => setShowImportDialog(true)}
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
              onClick={() => !isImporting && !isParsing && setShowImportDialog(false)}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 rounded-t-2xl flex-shrink-0">
                <h2 className="text-2xl font-bold">Import Products</h2>
                <p className="text-blue-100 mt-1">Upload CSV/JSON file with optional bulk image upload</p>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6 overflow-y-auto flex-1">
                {/* Step 1: File Upload */}
                {!showPreview && !importResults && (
                  <div className="space-y-6">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.json"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={isParsing}
                    />
                    
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                        isParsing
                          ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
                          : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50'
                      }`}
                    >
                      {isParsing ? (
                        <div className="space-y-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
                          <p className="text-slate-600 font-medium">Parsing file...</p>
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

                    {/* Options */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={updateExisting}
                          onChange={(e) => setUpdateExisting(e.target.checked)}
                          className="w-5 h-5 text-blue-600 rounded"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">Update existing products</p>
                          <p className="text-sm text-slate-600">
                            If a product with the same slug or CAS number exists, update it instead of creating a duplicate
                          </p>
                        </div>
                      </label>
                    </div>

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
                          const sample = `Name,CAS Number,UN Number,Category,Grade,Description,Purity Min,Purity Max,Packaging Options,GHS Signal Word,GHS Pictograms,Applications,Published,Draft
Sulfuric Acid,7664-93-9,UN1830,acids,technical,High-purity sulfuric acid for industrial applications,98,99.9,1KG; 5KG; 25KG,DANGER,GHS05; GHS06,Metal processing; Fertilizer production,Yes,No
Acetone,67-64-1,UN1090,solvents,pharma,Pure acetone solvent,99.5,99.99,500ML; 1L; 5L,WARNING,GHS02; GHS07,Laboratory use; Cleaning,Yes,No`;
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
                              packagingOptions: [
                                { size: "1", unit: "KG" },
                                { size: "5", unit: "KG" },
                                { size: "25", unit: "KG" }
                              ],
                              ghsSignalWord: "DANGER",
                              ghsPictograms: ["GHS05", "GHS06"],
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
                )}

                {/* Step 2: Preview */}
                {showPreview && !importResults && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Eye className="w-6 h-6 text-blue-600" />
                          <div>
                            <h3 className="text-lg font-bold text-blue-900">
                              Preview Import Data
                            </h3>
                            <p className="text-blue-700 text-sm">
                              Found {parsedProducts.length} valid product(s). Review and add images before importing.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product List */}
                    <div className="border-2 border-slate-200 rounded-xl overflow-hidden">
                      <div className="max-h-96 overflow-y-auto">
                        {parsedProducts.map((product, index) => (
                          <div key={index} className="border-b border-slate-200 last:border-b-0">
                            <div className="p-4 bg-white hover:bg-slate-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() => toggleRow(index)}
                                      className="text-slate-400 hover:text-slate-600"
                                    >
                                      {expandedRows.has(index) ? (
                                        <ChevronUp className="w-5 h-5" />
                                      ) : (
                                        <ChevronDown className="w-5 h-5" />
                                      )}
                                    </button>
                                    <div>
                                      <p className="font-semibold text-slate-900">{product.name}</p>
                                      <p className="text-sm text-slate-600">
                                        CAS: {product.casNumber} • {product.category} • {product.grade}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Image Upload */}
                                <div className="flex items-center gap-2">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handleImageSelect(e, index)}
                                    className="hidden"
                                    id={`image-${index}`}
                                  />
                                  <label
                                    htmlFor={`image-${index}`}
                                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium cursor-pointer flex items-center gap-2"
                                  >
                                    <ImageIcon className="w-4 h-4" />
                                    {productImages.get(product.casNumber)?.length || 0} images
                                  </label>
                                </div>
                              </div>

                              {/* Expanded Details */}
                              {expandedRows.has(index) && (
                                <div className="mt-4 pl-8 space-y-4">
                                  <div className="text-sm text-slate-600 space-y-3">
                                    <p><strong>Description:</strong> {product.description}</p>
                                    {product.purityMin && (
                                      <p><strong>Purity:</strong> {product.purityMin}% - {product.purityMax}%</p>
                                    )}
                                    
                                    {/* Packaging Options */}
                                    {product.packagingOptions && product.packagingOptions.length > 0 && (
                                      <div>
                                        <p className="font-semibold text-slate-700 mb-1">Packaging Options:</p>
                                        <div className="flex flex-wrap gap-2">
                                          {product.packagingOptions.map((pkg, pkgIndex) => (
                                            <span
                                              key={pkgIndex}
                                              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium"
                                            >
                                              {pkg.size} {pkg.unit}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {/* GHS Safety */}
                                    {(product.ghsSignalWord || (product.ghsPictograms && product.ghsPictograms.length > 0)) && (
                                      <div>
                                        <p className="font-semibold text-slate-700 mb-1">Safety Information:</p>
                                        <div className="space-y-2">
                                          {product.ghsSignalWord && (
                                            <div className="flex items-center gap-2">
                                              <span className="text-xs font-semibold text-slate-600">Signal Word:</span>
                                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                product.ghsSignalWord === "DANGER" 
                                                  ? "bg-red-600 text-white" 
                                                  : "bg-orange-500 text-white"
                                              }`}>
                                                {product.ghsSignalWord}
                                              </span>
                                            </div>
                                          )}
                                          {product.ghsPictograms && product.ghsPictograms.length > 0 && (
                                            <div>
                                              <span className="text-xs font-semibold text-slate-600">Pictograms:</span>
                                              <div className="flex flex-wrap gap-2 mt-1">
                                                {product.ghsPictograms.map((ghs, ghsIndex) => (
                                                  <span
                                                    key={ghsIndex}
                                                    className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium border border-red-300"
                                                  >
                                                    {ghs}
                                                  </span>
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {product.applications && product.applications.length > 0 && (
                                      <p><strong>Applications:</strong> {product.applications.join(', ')}</p>
                                    )}
                                  </div>

                                  {/* Image Previews */}
                                  {imagePreviewUrls.get(product.casNumber) && (
                                    <div>
                                      <p className="text-sm font-semibold text-slate-700 mb-2">Uploaded Images:</p>
                                      <div className="flex gap-3 flex-wrap">
                                        {imagePreviewUrls.get(product.casNumber)!.map((url, imgIndex) => (
                                          <div key={imgIndex} className="relative group">
                                            <img
                                              src={url}
                                              alt={`Preview ${imgIndex + 1}`}
                                              className="w-24 h-24 object-cover rounded-lg border-2 border-slate-200 shadow-sm"
                                            />
                                            {imgIndex === 0 && (
                                              <span className="absolute top-1 left-1 px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded">
                                                Primary
                                              </span>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Import Results */}
                {importResults && (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                        <h3 className="text-lg font-bold text-emerald-900">
                          Import Complete
                        </h3>
                      </div>
                      <div className="space-y-1 text-emerald-700">
                        <p>✅ Created <strong>{importResults.success}</strong> new product(s)</p>
                        <p>🔄 Updated <strong>{importResults.updated}</strong> existing product(s)</p>
                        {importResults.failed > 0 && (
                          <p className="text-red-700">❌ Failed <strong>{importResults.failed}</strong> product(s)</p>
                        )}
                      </div>
                    </div>

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
              </div>

              {/* Footer */}
              <div className="bg-slate-50 px-8 py-4 rounded-b-2xl border-t border-slate-200 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4" />
                  <span>Import history is tracked automatically</span>
                </div>
                
                <div className="flex gap-3">
                  {showPreview && !isImporting && !importResults && (
                    <>
                      <button
                        onClick={() => {
                          setShowPreview(false);
                          setParsedProducts([]);
                          setProductImages(new Map());
                        }}
                        className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleConfirmImport}
                        disabled={isImporting}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {isImporting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                            Importing...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Confirm Import
                          </>
                        )}
                      </button>
                    </>
                  )}
                  
                  {importResults && (
                    <button
                      onClick={() => {
                        setImportResults(null);
                        setParsedProducts([]);
                        setShowPreview(false);
                        setShowImportDialog(false);
                        window.location.reload();
                      }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Done
                    </button>
                  )}
                  
                  {!showPreview && !importResults && !isParsing && (
                    <button
                      onClick={() => setShowImportDialog(false)}
                      className="px-6 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
