/**
 * Testimonial Content Model
 * 
 * This file contains the hardcoded testimonial data for the chemical business website.
 * All content is static and managed through code updates and redeployment.
 * 
 * Validates Requirements: 9.3, 17.3, 17.5
 */

export interface Testimonial {
  id: string;                    // Unique identifier
  quote: string;                 // Testimonial text
  authorName: string;            // Person's name
  authorTitle: string;           // Job title
  companyName: string;           // Company name
  authorPhotoUrl?: string;       // Optional: author photo
  companyLogoUrl?: string;       // Optional: company logo
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    quote: "Reliable supply of high-quality chemicals with excellent technical support. They've been our trusted partner for over 5 years.",
    authorName: "Rajesh Kumar",
    authorTitle: "Procurement Manager",
    companyName: "ABC Manufacturing Ltd.",
    authorPhotoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&q=80",
  },
  {
    id: "testimonial-2",
    quote: "Fast delivery and competitive pricing. Their team is always responsive to our urgent requirements.",
    authorName: "Priya Sharma",
    authorTitle: "Operations Head",
    companyName: "XYZ Industries",
    authorPhotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80",
  },
  {
    id: "testimonial-3",
    quote: "Outstanding product quality and consistent supply chain. Their certifications and compliance standards give us complete confidence.",
    authorName: "Amit Patel",
    authorTitle: "Quality Assurance Director",
    companyName: "PQR Chemicals Pvt. Ltd.",
    authorPhotoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&q=80",
  },
];
