/**
 * Product Export Utilities
 * Export products in multiple formats: CSV, Excel, JSON, PDF
 */

import { Doc } from "@/convex/_generated/dataModel";

type Product = Doc<"products">;

/**
 * Export products to CSV format
 */
export function exportToCSV(products: Product[]): void {
  const headers = [
    "Name",
    "CAS Number",
    "UN Number",
    "Category",
    "Grade",
    "Description",
    "Purity Min",
    "Purity Max",
    "Packaging Options",
    "GHS Signal Word",
    "GHS Pictograms",
    "Applications",
    "Published",
    "Draft",
  ];

  const rows = products.map((p) => [
    p.name,
    p.casNumber,
    p.unNumber || "",
    p.category,
    p.grade,
    p.description.replace(/,/g, ";"), // Replace commas to avoid CSV issues
    p.purityMin || "",
    p.purityMax || "",
    p.packagingOptions.map(pkg => `${pkg.size}${pkg.unit}`).join("; "),
    p.ghsSignalWord || "",
    p.ghsPictograms.join("; "),
    p.applications.join("; "),
    p.isPublished ? "Yes" : "No",
    p.isDraft ? "Yes" : "No",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  downloadFile(csvContent, "products.csv", "text/csv");
}

/**
 * Export products to JSON format
 */
export function exportToJSON(products: Product[]): void {
  const jsonContent = JSON.stringify(products, null, 2);
  downloadFile(jsonContent, "products.json", "application/json");
}

/**
 * Export products to Excel-compatible format (TSV)
 */
export function exportToExcel(products: Product[]): void {
  const headers = [
    "Name",
    "CAS Number",
    "UN Number",
    "Category",
    "Grade",
    "Description",
    "Purity Min",
    "Purity Max",
    "Packaging Options",
    "GHS Signal Word",
    "GHS Pictograms",
    "Applications",
    "Published",
    "Draft",
  ];

  const rows = products.map((p) => [
    p.name,
    p.casNumber,
    p.unNumber || "",
    p.category,
    p.grade,
    p.description,
    p.purityMin || "",
    p.purityMax || "",
    p.packagingOptions.map(pkg => `${pkg.size}${pkg.unit}`).join("; "),
    p.ghsSignalWord || "",
    p.ghsPictograms.join("; "),
    p.applications.join("; "),
    p.isPublished ? "Yes" : "No",
    p.isDraft ? "Yes" : "No",
  ]);

  const tsvContent = [headers.join("\t"), ...rows.map((row) => row.join("\t"))].join(
    "\n"
  );

  downloadFile(tsvContent, "products.xlsx", "application/vnd.ms-excel");
}

/**
 * Helper function to trigger file download
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parse CSV file and return product data
 */
export async function parseCSVFile(file: File): Promise<Partial<Product>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split("\n");
        const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));

        const products: Partial<Product>[] = [];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""));
          const product: any = {};

          headers.forEach((header, index) => {
            const value = values[index];
            switch (header) {
              case "Name":
                product.name = value;
                break;
              case "CAS Number":
                product.casNumber = value;
                break;
              case "UN Number":
                product.unNumber = value || undefined;
                break;
              case "Category":
                product.category = value;
                break;
              case "Grade":
                product.grade = value;
                break;
              case "Description":
                product.description = value.replace(/;/g, ",");
                break;
              case "Purity Min":
                product.purityMin = value ? parseFloat(value) : undefined;
                break;
              case "Purity Max":
                product.purityMax = value ? parseFloat(value) : undefined;
                break;
              case "Packaging Options":
                if (value) {
                  // Parse "1KG; 5KG; 25KG" format
                  product.packagingOptions = value.split(";").map((pkg: string) => {
                    const trimmed = pkg.trim();
                    const match = trimmed.match(/^(\d+(?:\.\d+)?)\s*([A-Z]+)$/i);
                    if (match) {
                      return { size: match[1], unit: match[2].toUpperCase() };
                    }
                    return { size: "1", unit: "KG" };
                  });
                } else {
                  product.packagingOptions = [{ size: "1", unit: "KG" }];
                }
                break;
              case "GHS Signal Word":
                product.ghsSignalWord = value || undefined;
                break;
              case "GHS Pictograms":
                product.ghsPictograms = value
                  ? value.split(";").map((g: string) => g.trim()).filter(Boolean)
                  : [];
                break;
              case "Applications":
                product.applications = value
                  ? value.split(";").map((a: string) => a.trim())
                  : [];
                break;
              case "Published":
                product.isPublished = value.toLowerCase() === "yes";
                break;
              case "Draft":
                product.isDraft = value.toLowerCase() === "yes";
                break;
            }
          });

          // Generate slug from name
          if (product.name) {
            product.slug = product.name
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "");
          }

          products.push(product);
        }

        resolve(products);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

/**
 * Parse JSON file and return product data
 */
export async function parseJSONFile(file: File): Promise<Partial<Product>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const data = JSON.parse(text);
        resolve(Array.isArray(data) ? data : [data]);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
