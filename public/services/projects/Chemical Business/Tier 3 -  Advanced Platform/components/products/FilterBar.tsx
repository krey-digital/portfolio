"use client";

import CustomSelect from "./CustomSelect";

interface FilterBarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  selectedGrade: string | null;
  onGradeChange: (grade: string | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const CATEGORIES = [
  { value: "acids", label: "Acids" },
  { value: "solvents", label: "Solvents" },
  { value: "reagents", label: "Reagents" },
  { value: "salts", label: "Salts" },
  { value: "glass-chemicals", label: "Glass Chemicals" },
  { value: "other", label: "Other" },
];

const GRADES = [
  { value: "technical", label: "Technical" },
  { value: "commercial", label: "Commercial" },
  { value: "lab", label: "Lab" },
  { value: "pharma", label: "Pharma" },
];

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
  selectedGrade,
  onGradeChange,
  searchTerm,
  onSearchChange,
}: FilterBarProps) {
  return (
    <aside className="bg-white rounded-lg shadow p-6 h-fit sticky top-24 space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Search
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or description..."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none text-sm text-slate-900 placeholder-slate-500 font-medium"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Category
        </label>
        <CustomSelect
          value={selectedCategory || ""}
          onChange={(val) => onCategoryChange(val ? val : null)}
          options={[
            { value: "", label: "All Categories" },
            ...CATEGORIES,
          ]}
          placeholder="All Categories"
        />
      </div>

      {/* Grade */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Grade
        </label>
        <CustomSelect
          value={selectedGrade || ""}
          onChange={(val) => onGradeChange(val ? val : null)}
          options={[
            { value: "", label: "All Grades" },
            ...GRADES,
          ]}
          placeholder="All Grades"
        />
      </div>

      {/* Clear All Filters Button */}
      {(selectedCategory || selectedGrade || searchTerm) && (
        <button
          onClick={() => {
            onCategoryChange(null);
            onGradeChange(null);
            onSearchChange("");
          }}
          className="w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-sm transition-colors"
        >
          Clear All Filters
        </button>
      )}

      {/* Active Filters Display */}
      {(selectedCategory || selectedGrade || searchTerm) && (
        <div className="pt-4 border-t border-slate-200 space-y-2">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Active Filters
          </p>
          <div className="space-y-2">
            {selectedCategory && (
              <button
                onClick={() => onCategoryChange(null)}
                className="w-full px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Category: {selectedCategory}</span>
                <span>✕</span>
              </button>
            )}
            {selectedGrade && (
              <button
                onClick={() => onGradeChange(null)}
                className="w-full px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span>Grade: {selectedGrade}</span>
                <span>✕</span>
              </button>
            )}
            {searchTerm && (
              <button
                onClick={() => onSearchChange("")}
                className="w-full px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-xs font-medium transition-colors flex items-center justify-between"
              >
                <span className="truncate">Search: "{searchTerm}"</span>
                <span>✕</span>
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
