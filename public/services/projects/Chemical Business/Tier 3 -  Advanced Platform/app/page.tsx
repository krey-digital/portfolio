import { Hero } from "@/components/home/Hero";
import { ProductCategories } from "@/components/home/ProductCategories";
import { CertBadges } from "@/components/home/CertBadges";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Testimonials } from "@/components/home/Testimonials";
import { productCategories } from "@/content/products";
import { certifications } from "@/content/certifications";
import { clients } from "@/content/clients";
import { testimonials } from "@/content/testimonials";
import type { Metadata } from "next";

/**
 * Homepage
 * 
 * Main landing page that composes all homepage components:
 * - Hero section with company name and CTA
 * - Product categories overview (limited to 6 on homepage)
 * - Certification badges for trust
 * - Client logos strip
 * - Customer testimonials
 * 
 * Validates Requirements: 2.1, 3.1, 3.2, 3.3, 3.4, 3.5, 11.1, 18.1, 18.2
 */

export const metadata: Metadata = {
  title: "ChemCorp Industries - Your Trusted Partner in Quality Chemicals",
  description: "Leading supplier of high-quality industrial chemicals including acids, solvents, alkalis, and specialty chemicals. ISO certified with reliable delivery across India.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCategories categories={productCategories} limit={6} />
      <CertBadges certifications={certifications} />
      <ClientLogos clients={clients} />
      <Testimonials testimonials={testimonials} />
    </main>
  );
}
