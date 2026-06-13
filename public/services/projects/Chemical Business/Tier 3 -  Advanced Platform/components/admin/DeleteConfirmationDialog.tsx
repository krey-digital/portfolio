"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  productName: string;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmationDialog({
  isOpen,
  productName,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-300"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in scale-in-95 duration-300">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md mx-4">
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Delete Product?</h2>
                <p className="text-sm text-slate-500 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <p className="text-slate-600 mb-4">
              You are about to permanently delete:
            </p>
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
              <p className="font-semibold text-slate-900 text-center break-words">
                {productName}
              </p>
            </div>
            <p className="text-sm text-slate-500 mt-4 text-center">
              All associated data including images, documents, and inquiry history will be removed.
            </p>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl flex gap-3">
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 bg-white border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <AlertTriangle size={16} />
                  Delete Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
