"use client";

import { useState, useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";

interface ProductImageGalleryProps {
  images?: Array<{ fileId: Id<"_storage">; isPrimary: boolean }>;
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  // Image URL retrieval pending - placeholder implementation
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!images || images.length === 0) {
      setIsLoading(false);
      return;
    }

    // TODO: Implement image URL retrieval when image upload is ready
    setIsLoading(false);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="bg-slate-100 rounded-lg aspect-square flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-2">📦</div>
          <p className="text-slate-500">No images available</p>
        </div>
      </div>
    );
  }

  const primaryImage = images.find((img) => img.isPrimary) || images[0];
  const selectedImage = images[selectedIndex];

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="bg-slate-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center border border-slate-200">
        {isLoading ? (
          <div className="text-6xl animate-pulse">📦</div>
        ) : imageUrls[selectedImage.fileId] ? (
          <img
            src={imageUrls[selectedImage.fileId]}
            alt={`Product image ${selectedIndex + 1}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-5xl">📦</div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={image.fileId}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square rounded-lg border-2 transition flex items-center justify-center overflow-hidden ${
                index === selectedIndex
                  ? "border-amber-500 bg-amber-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {imageUrls[image.fileId] ? (
                <img
                  src={imageUrls[image.fileId]}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl">📦</span>
              )}
              {image.isPrimary && (
                <div className="absolute top-1 right-1 bg-amber-500 text-white rounded-full text-xs font-bold w-5 h-5 flex items-center justify-center">
                  ⭐
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <p className="text-xs text-slate-500 text-center">
          Image {selectedIndex + 1} of {images.length}
        </p>
      )}
    </div>
  );
}
