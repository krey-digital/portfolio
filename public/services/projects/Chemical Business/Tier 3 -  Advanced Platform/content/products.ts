/**
 * Product Category Content Model
 * 
 * This file contains the hardcoded product category data for the chemical business website.
 * All content is static and managed through code updates and redeployment.
 * 
 * Validates Requirements: 9.1, 17.1, 17.5
 */

export interface ProductCategory {
  id: string;                    // Unique identifier (e.g., "acids")
  name: string;                  // Display name (e.g., "Acids")
  slug: string;                  // URL-friendly slug (e.g., "acids")
  description: string;           // Brief description (1-2 sentences)
  imageUrl: string;              // Path to category image (e.g., "/images/categories/acids.jpg")
  exampleProducts: string[];     // List of 3-5 example product names
  applications: string[];        // List of common applications
  ghsPictograms?: string[];      // Optional: GHS pictogram codes (e.g., ["GHS05", "GHS07"])
}

export const productCategories: ProductCategory[] = [
  {
    id: "acids",
    name: "Acids",
    slug: "acids",
    description: "High-purity acids for industrial applications including sulphuric, hydrochloric, and nitric acid in technical and commercial grades.",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    exampleProducts: [
      "Sulphuric Acid (98%)",
      "Hydrochloric Acid (35%)",
      "Nitric Acid (68%)",
      "Phosphoric Acid (85%)",
    ],
    applications: [
      "Metal cleaning and pickling",
      "pH control and neutralization",
      "Chemical synthesis",
      "Battery manufacturing",
    ],
    ghsPictograms: ["GHS05", "GHS07"],
  },
  {
    id: "solvents",
    name: "Solvents",
    slug: "solvents",
    description: "Industrial-grade solvents for cleaning, extraction, and chemical processing applications. Available in bulk quantities.",
    imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&q=80",
    exampleProducts: [
      "Acetone (99.5%)",
      "Isopropyl Alcohol (IPA)",
      "Ethyl Acetate",
      "Toluene",
      "Methanol",
    ],
    applications: [
      "Degreasing and cleaning",
      "Paint and coating formulation",
      "Pharmaceutical extraction",
      "Laboratory use",
    ],
    ghsPictograms: ["GHS02", "GHS07"],
  },
  {
    id: "alkalis",
    name: "Alkalis",
    slug: "alkalis",
    description: "Strong alkaline solutions for neutralization, cleaning, and industrial processing. Includes caustic soda and potassium hydroxide.",
    imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
    exampleProducts: [
      "Caustic Soda (Sodium Hydroxide 50%)",
      "Caustic Potash (Potassium Hydroxide)",
      "Sodium Carbonate (Soda Ash)",
    ],
    applications: [
      "Water treatment",
      "Soap and detergent manufacturing",
      "pH adjustment",
      "Chemical neutralization",
    ],
    ghsPictograms: ["GHS05"],
  },
  {
    id: "salts",
    name: "Salts",
    slug: "salts",
    description: "Industrial salts and mineral compounds for various manufacturing and processing applications. High purity grades available.",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    exampleProducts: [
      "Sodium Chloride (Industrial Salt)",
      "Calcium Chloride",
      "Magnesium Sulphate",
      "Potassium Chloride",
    ],
    applications: [
      "Water softening",
      "De-icing and road safety",
      "Food processing",
      "Chemical manufacturing",
    ],
  },
  {
    id: "specialty-chemicals",
    name: "Specialty Chemicals",
    slug: "specialty-chemicals",
    description: "Specialized chemical compounds for specific industrial applications including catalysts, additives, and processing aids.",
    imageUrl: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800&q=80",
    exampleProducts: [
      "Hydrogen Peroxide (35%)",
      "Activated Carbon",
      "Silica Gel",
      "Sodium Hypochlorite",
    ],
    applications: [
      "Water purification",
      "Bleaching and oxidation",
      "Desiccation and drying",
      "Disinfection",
    ],
    ghsPictograms: ["GHS05", "GHS07"],
  },
  {
    id: "laboratory-reagents",
    name: "Laboratory Reagents",
    slug: "laboratory-reagents",
    description: "Analytical grade chemicals and reagents for laboratory research, testing, and quality control applications.",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9d42e1d6b4f4?w=800&q=80",
    exampleProducts: [
      "Distilled Water",
      "Buffer Solutions",
      "Indicator Solutions",
      "Standard Solutions",
    ],
    applications: [
      "Analytical testing",
      "Quality control",
      "Research and development",
      "Educational laboratories",
    ],
  },
];
