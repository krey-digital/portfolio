/**
 * Certification Content Model
 * 
 * This file contains the hardcoded certification data for the chemical business website.
 * All content is static and managed through code updates and redeployment.
 * 
 * Validates Requirements: 9.2, 17.2, 17.5
 */

export interface Certification {
  id: string;                    // Unique identifier
  name: string;                  // Certification name (e.g., "ISO 9001:2015")
  issuingBody: string;           // Certifying organization (e.g., "Bureau Veritas")
  certNumber: string;            // Certificate number
  issuedYear: number;            // Year issued
  expiryYear: number;            // Year expires
  description: string;           // What this certification means
  logoUrl?: string;              // Optional: certification logo
}

export const certifications: Certification[] = [
  {
    id: "iso-9001",
    name: "ISO 9001:2015",
    issuingBody: "Bureau Veritas",
    certNumber: "BV-XXXX-YYYY",
    issuedYear: 2022,
    expiryYear: 2025,
    description: "Quality Management System certification ensuring consistent product quality and customer satisfaction.",
    logoUrl: "https://img.freepik.com/premium-vector/showcase-your-commitment-quality-excellence-with-our-iso-90012015-certified-company-logo_1135235-2664.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "bis",
    name: "BIS Registration",
    issuingBody: "Bureau of Indian Standards",
    certNumber: "BIS-XXXX",
    issuedYear: 2021,
    expiryYear: 2026,
    description: "Compliance with Indian Standards for chemical manufacturing and distribution.",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9A1IaUKwyTl1Z-mEPA_UsOmnOJCy3W9ttJQ&s"
  },
  {
    id: "gmp",
    name: "GMP Certification",
    issuingBody: "National GMP Council",
    certNumber: "GMP-2023-XXXX",
    issuedYear: 2023,
    expiryYear: 2026,
    description: "Good Manufacturing Practice certification demonstrating adherence to quality production standards and safety protocols.",
    logoUrl: "https://static.vecteezy.com/system/resources/thumbnails/027/654/831/small/gmp-certified-badge-good-manufacturing-practice-certified-stamp-gmp-approved-label-packaging-design-elements-supplement-gmp-quality-control-medical-and-health-design-element-illustration-vector.jpg",
  },
];
