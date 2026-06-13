"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface SdsUploadProps {
  fileId?: Id<"_storage">;
  onFileId: (fileId: Id<"_storage">) => void;
}

export default function SdsUpload({ fileId, onFileId }: SdsUploadProps) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      setError("File size must be less than 10MB");
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
        setError("Failed to upload file");
        return;
      }

      const data = await result.json();
      onFileId(data.storageId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {fileId ? (
        <div className="p-3 bg-green-50 border border-green-200 rounded">
          <p className="text-sm text-green-700">
            ✓ SDS file uploaded successfully
          </p>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
            disabled={isUploading}
            className="hidden"
            id="sds-upload"
          />
          <label
            htmlFor="sds-upload"
            className="cursor-pointer text-slate-600 hover:text-slate-900 text-sm"
          >
            {isUploading ? (
              <>
                <p className="text-amber-600 font-medium">Uploading...</p>
              </>
            ) : (
              <>
                <p className="font-medium">📄 Click to upload SDS PDF</p>
                <p className="text-xs text-slate-500 mt-1">
                  Maximum 10MB, PDF format only
                </p>
              </>
            )}
          </label>
        </div>
      )}
    </div>
  );
}
