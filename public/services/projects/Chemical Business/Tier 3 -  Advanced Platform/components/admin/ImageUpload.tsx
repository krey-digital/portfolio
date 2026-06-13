"use client";

import { useState, useEffect } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface ImageItem {
  fileId: Id<"_storage">;
  isPrimary: boolean;
}

interface ImageUploadProps {
  images: ImageItem[];
  onImagesChange: (images: ImageItem[]) => void;
}

export default function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getImageUrls = useAction(api.products.getImageUrls);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [isDragActive, setIsDragActive] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);

  // Fetch existing image URLs when component mounts or images change
  useEffect(() => {
    if (images.length > 0) {
      const fileIds = images.map(img => img.fileId);
      const missingUrls = fileIds.filter(id => !imageUrls[id]);
      
      if (missingUrls.length > 0) {
        setLoadingImages(true);
        getImageUrls({ fileIds: missingUrls })
          .then(urls => {
            setImageUrls(prev => ({ ...prev, ...urls }));
          })
          .catch(err => console.error("Failed to load images:", err))
          .finally(() => setLoadingImages(false));
      }
    }
  }, [images, getImageUrls]);

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit per image
      setError("File size must be less than 5MB");
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        setError("Failed to upload image");
        return;
      }

      const data = await result.json();
      const newImage: ImageItem = {
        fileId: data.storageId,
        isPrimary: images.length === 0, // First image is automatically primary
      };

      const updatedImages = [...images, newImage];
      onImagesChange(updatedImages);

      // Store preview URL
      const url = URL.createObjectURL(file);
      setImageUrls((prev) => ({
        ...prev,
        [data.storageId]: url,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSetPrimary = (fileId: Id<"_storage">) => {
    const updated = images.map((img) => ({
      ...img,
      isPrimary: img.fileId === fileId,
    }));
    onImagesChange(updated);
  };

  const handleRemoveImage = (fileId: Id<"_storage">) => {
    const updated = images.filter((img) => img.fileId !== fileId);

    // If we removed the primary, set the first one as primary
    if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
      updated[0].isPrimary = true;
    }

    onImagesChange(updated);
    setImageUrls((prev) => {
      const { [fileId]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file) => {
        handleImageUpload(file);
      });
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:bg-slate-50"
        }`}
      >
        <label className="cursor-pointer block">
          <div className="text-4xl mb-2">📸</div>
          <p className="text-sm text-slate-600 font-medium mb-1">
            {isDragActive
              ? "Drop images here"
              : isUploading
              ? "Uploading..."
              : "Click to upload or drag images here"}
          </p>
          <p className="text-xs text-slate-500">PNG, JPG, WebP up to 5MB</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                Array.from(e.target.files).forEach((file) => {
                  handleImageUpload(file);
                });
              }
            }}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Images Gallery */}
      {images.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">
            Uploaded Images ({images.length})
          </h3>
          {loadingImages && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((image) => (
              <div
                key={image.fileId}
                className={`relative group rounded-lg overflow-hidden border-2 transition ${
                  image.isPrimary
                    ? "border-amber-500 bg-amber-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                {/* Image Preview */}
                <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden">
                  {imageUrls[image.fileId] ? (
                    <img
                      src={imageUrls[image.fileId]}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="text-4xl">📦</div>
                    </div>
                  )}
                </div>

                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center gap-2">
                  {!image.isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(image.fileId)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition"
                      title="Set as primary/featured image"
                    >
                      ⭐ Primary
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image.fileId)}
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition"
                    title="Remove image"
                  >
                    🗑️ Remove
                  </button>
                </div>

                {/* Primary Badge */}
                {image.isPrimary && (
                  <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                    ⭐ Featured
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      {images.length === 0 && (
        <p className="text-xs text-slate-500 italic">
          Upload at least one product image. The first image will be used as the featured/primary image on the product catalog.
        </p>
      )}
    </div>
  );
}
