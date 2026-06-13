"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import SdsUpload from "./SdsUpload";
import ImageUpload from "./ImageUpload";
import GhsPictogramDisplay from "@/components/ghs/GhsPictogramDisplay";
import { Doc } from "@/convex/_generated/dataModel";

interface ProductFormProps {
  product?: Doc<"products">;
  mode: "create" | "edit";
}

export default function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);
  const publishProduct = useMutation(api.products.publish);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    casNumber: product?.casNumber || "",
    unNumber: product?.unNumber || "",
    category: product?.category || "acids" as const,
    grade: product?.grade || "technical" as const,
    description: product?.description || "",
    descriptionHi: product?.descriptionHi || "",
    purityMin: product?.purityMin || undefined,
    purityMax: product?.purityMax || undefined,
    packagingOptions: product?.packagingOptions || [{ size: "1", unit: "KG" as const }],
    ghsSignalWord: product?.ghsSignalWord || undefined,
    ghsPictograms: product?.ghsPictograms || [],
    images: product?.images || [],
    sdsFileId: product?.sdsFileId || undefined,
    sdsVersion: product?.sdsVersion || "",
    sdsIssuedAt: product?.sdsIssuedAt ? new Date(product.sdsIssuedAt).toISOString().split("T")[0] : "",
    applications: product?.applications || [],
    relatedProductIds: product?.relatedProductIds || [],
    erpProductCode: product?.erpProductCode || "",
    isPublished: product?.isPublished || false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showApplicationInput, setShowApplicationInput] = useState(false);
  const [newApplication, setNewApplication] = useState("");

  // Auto-generate slug from name
  useEffect(() => {
    if (mode === "create" || formData.slug === "") {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.name, mode]);

  const handleSubmit = async (action: "draft" | "publish") => {
    setError("");
    setIsSubmitting(true);

    try {
      // Validate CAS number format
      const casRegex = /^\d{2,7}-\d{2}-\d$/;
      if (!casRegex.test(formData.casNumber)) {
        setError("Invalid CAS number format (e.g., 7732-18-5)");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        name: formData.name,
        casNumber: formData.casNumber,
        unNumber: formData.unNumber || undefined,
        category: formData.category,
        grade: formData.grade,
        description: formData.description,
        descriptionHi: formData.descriptionHi || undefined,
        purityMin: formData.purityMin ? Number(formData.purityMin) : undefined,
        purityMax: formData.purityMax ? Number(formData.purityMax) : undefined,
        packagingOptions: formData.packagingOptions,
        ghsSignalWord: formData.ghsSignalWord || undefined,
        ghsPictograms: formData.ghsPictograms,
        sdsFileId: formData.sdsFileId,
        sdsVersion: formData.sdsVersion || undefined,
        sdsIssuedAt: formData.sdsIssuedAt ? new Date(formData.sdsIssuedAt).getTime() : undefined,
        applications: formData.applications,
        relatedProductIds: formData.relatedProductIds,
        erpProductCode: formData.erpProductCode || undefined,
      };

      if (mode === "create") {
        await createProduct(payload as any);
        router.push("/admin/products");
      } else if (product) {
        await updateProduct({ id: product._id, ...payload } as any);
        
        // If publishing a draft product, also call publish mutation
        if (action === "publish" && !product.isPublished) {
          await publishProduct({ id: product._id });
        }
        
        router.push("/admin/products");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save product"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddPackaging = () => {
    setFormData((prev) => ({
      ...prev,
      packagingOptions: [...prev.packagingOptions, { size: "1", unit: "kg" as const }],
    }));
  };

  const handleRemovePackaging = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      packagingOptions: prev.packagingOptions.filter((_, i) => i !== index),
    }));
  };

  const handleAddApplication = () => {
    if (newApplication.trim()) {
      setFormData((prev) => ({
        ...prev,
        applications: [...prev.applications, newApplication],
      }));
      setNewApplication("");
      setShowApplicationInput(false);
    }
  };

  const handleRemoveApplication = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      applications: prev.applications.filter((_, i) => i !== index),
    }));
  };

  const ghs_options = [
    "GHS01",
    "GHS02",
    "GHS03",
    "GHS04",
    "GHS05",
    "GHS06",
    "GHS07",
    "GHS08",
    "GHS09",
  ];

  return (
    <form className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., Sulfuric Acid"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Slug <span className="text-xs text-slate-500">(Auto-generated)</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              disabled
              placeholder="auto-generated from product name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-600 cursor-not-allowed outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category: e.target.value as any,
                }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
              required
            >
              <option value="acids">Acids</option>
              <option value="solvents">Solvents</option>
              <option value="reagents">Reagents</option>
              <option value="salts">Salts</option>
              <option value="glass-chemicals">Glass Chemicals</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Grade *
            </label>
            <select
              value={formData.grade}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, grade: e.target.value as any }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
              required
            >
              <option value="technical">Technical</option>
              <option value="commercial">Commercial</option>
              <option value="lab">Lab</option>
              <option value="pharma">Pharma</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Product description and uses"
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description (Hindi) - Optional
          </label>
          <textarea
            value={formData.descriptionHi}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, descriptionHi: e.target.value }))
            }
            placeholder="उत्पाद विवरण और उपयोग"
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
          />
        </div>
      </div>

      {/* Chemical IDs */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Chemical IDs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              CAS Number * (Format: XXXXXXX-XX-X)
            </label>
            <input
              type="text"
              value={formData.casNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  casNumber: e.target.value,
                }))
              }
              placeholder="e.g., 7732-18-5"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              UN Number (Optional, Format: UN####)
            </label>
            <input
              type="text"
              value={formData.unNumber}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, unNumber: e.target.value }))
              }
              placeholder="e.g., UN1830"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ERP Product Code (Optional)
            </label>
            <input
              type="text"
              value={formData.erpProductCode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, erpProductCode: e.target.value }))
              }
              placeholder="e.g., CHEM-001"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
            />
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Purity Min
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.purityMin || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    purityMin: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                placeholder="e.g., 95"
                className="w-full px-3 py-2 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-100 text-slate-700 font-medium text-sm rounded">%</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Purity Max
            </label>
            <div className="relative">
              <input
                type="number"
                value={formData.purityMax || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    purityMax: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                placeholder="e.g., 99.9"
                className="w-full px-3 py-2 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-100 text-slate-700 font-medium text-sm rounded">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Packaging */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Packaging Options</h2>
        <div className="space-y-3 mb-4">
          {formData.packagingOptions.map((option, index) => (
            <div key={index} className="flex gap-3 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  value={option.size}
                  onChange={(e) => {
                    const opts = [...formData.packagingOptions];
                    opts[index].size = e.target.value;
                    setFormData((prev) => ({ ...prev, packagingOptions: opts }));
                  }}
                  placeholder="Size"
                  className="w-full h-10 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
                />
              </div>
              <div className="flex-1">
                <select
                  value={option.unit}
                  onChange={(e) => {
                    const opts = [...formData.packagingOptions];
                    opts[index].unit = e.target.value as any;
                    setFormData((prev) => ({ ...prev, packagingOptions: opts }));
                  }}
                  className="w-full h-10 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
                >
                  <option value="kg">KG</option>
                  <option value="l">L</option>
                  <option value="ml">ML</option>
                  <option value="g">G</option>
                  <option value="mt">MT</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => handleRemovePackaging(index)}
                className="h-10 px-4 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddPackaging}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
        >
          + Add Packaging Option
        </button>
      </div>

      {/* Safety */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Safety & GHS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              GHS Signal Word
            </label>
            <select
              value={formData.ghsSignalWord || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  ghsSignalWord: e.target.value as any || undefined,
                }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
            >
              <option value="">None</option>
              <option value="DANGER">DANGER</option>
              <option value="WARNING">WARNING</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            GHS Pictograms - Click to Select
          </label>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {ghs_options.map((ghs) => (
              <button
                key={ghs}
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    ghsPictograms: prev.ghsPictograms.includes(ghs)
                      ? prev.ghsPictograms.filter((g) => g !== ghs)
                      : [...prev.ghsPictograms, ghs],
                  }));
                }}
                className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
                  formData.ghsPictograms.includes(ghs)
                    ? "border-amber-600 bg-amber-50 shadow-md"
                    : "border-slate-300 bg-white hover:border-amber-300"
                }`}
              >
                {/* GHS Icon */}
                <div className="w-16 h-16 bg-white border border-slate-200 rounded flex items-center justify-center overflow-hidden">
                  <img
                    src={`/ghs/${ghs}.png`}
                    alt={ghs}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Code Label */}
                <span className={`text-xs font-bold ${formData.ghsPictograms.includes(ghs) ? "text-amber-700" : "text-slate-600"}`}>
                  {ghs}
                </span>
              </button>
            ))}
          </div>
          
          {/* Selected Pictograms Preview */}
          {formData.ghsPictograms.length > 0 && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-2">Selected Pictograms:</p>
              <GhsPictogramDisplay
                pictograms={formData.ghsPictograms}
                size="sm"
                showCode={true}
                showLabel={true}
              />
            </div>
          )}
        </div>
      </div>

      {/* Product Images */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Product Images</h2>
        <ImageUpload
          images={formData.images}
          onImagesChange={(images) =>
            setFormData((prev) => ({ ...prev, images }))
          }
        />
      </div>

      {/* SDS Document */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">SDS Document</h2>
        <SdsUpload
          fileId={formData.sdsFileId}
          onFileId={(id) =>
            setFormData((prev) => ({ ...prev, sdsFileId: id }))
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              SDS Version
            </label>
            <input
              type="text"
              value={formData.sdsVersion}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sdsVersion: e.target.value }))
              }
              placeholder="e.g., 1.0"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              SDS Issued Date
            </label>
            <input
              type="date"
              value={formData.sdsIssuedAt}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, sdsIssuedAt: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
            />
          </div>
        </div>
      </div>

      {/* Applications */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Applications</h2>
        <div className="space-y-2 mb-4">
          {formData.applications.map((app, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200"
            >
              <span className="text-sm font-medium text-black">{app}</span>
              <button
                type="button"
                onClick={() => handleRemoveApplication(index)}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {showApplicationInput ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newApplication}
              onChange={(e) => setNewApplication(e.target.value)}
              placeholder="Enter application"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-black"
              onKeyPress={(e) => e.key === "Enter" && handleAddApplication()}
            />
            <button
              type="button"
              onClick={handleAddApplication}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowApplicationInput(true)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
          >
            + Add Application
          </button>
        )}
      </div>

      {/* Status */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900">
                {!formData.isPublished ? "📋 Draft" : "✅ Published"}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {!formData.isPublished 
                  ? "This product is not visible to customers yet"
                  : "This product is visible to customers"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => handleSubmit("draft")}
          disabled={isSubmitting}
          className="px-6 py-2 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save as Draft"}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit("publish")}
          disabled={isSubmitting}
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-400 text-white rounded-lg font-medium transition-colors"
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
