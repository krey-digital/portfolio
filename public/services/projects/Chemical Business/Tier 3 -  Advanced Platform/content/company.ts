/**
 * Company Information Content Model
 * 
 * This file contains the hardcoded company information for the chemical business website.
 * All content is static and managed through code updates and redeployment.
 * 
 * Validates Requirements: 9.3, 17.5
 */

export interface CompanyInfo {
  name: string;
  tagline: string;
  foundedYear: number;
  gstNumber: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  about: {
    story: string;              // Founding story (2-3 paragraphs)
    mission: string;            // Mission statement
    values: string[];           // Core values
  };
  facility: {
    description: string;        // Facility overview
    imageUrl: string;           // Facility photo
  };
}

export const companyInfo: CompanyInfo = {
  name: "ChemCorp Industries",
  tagline: "Your Trusted Partner in Quality Chemicals",
  foundedYear: 2010,
  gstNumber: "27XXXXX1234X1ZX",
  phone: "+91-XXXXXXXXXX",
  email: "info@chemcorp.com",
  address: {
    street: "Plot No. 123, Industrial Area",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    country: "India",
  },
  about: {
    story: "Founded in 2010, ChemCorp Industries has grown from a small chemical distributor to a trusted supplier serving industries across India. Our journey began with a commitment to provide high-quality chemicals with reliable service and technical expertise. Over the years, we have built strong relationships with manufacturers and customers alike, earning a reputation for consistency, safety, and professionalism. Today, we serve diverse industries including pharmaceuticals, textiles, water treatment, and manufacturing, delivering chemicals that meet the highest quality standards.",
    mission: "To provide high-quality chemicals with reliable service and technical expertise, ensuring customer satisfaction and safety in every transaction.",
    values: [
      "Quality First",
      "Customer Satisfaction",
      "Safety and Compliance",
      "Environmental Responsibility",
    ],
  },
  facility: {
    description: "Our state-of-the-art facility spans 10,000 sq ft with modern storage and handling equipment designed to maintain product integrity and safety. The facility is equipped with temperature-controlled storage areas, proper ventilation systems, and safety protocols that comply with industry standards. Our warehouse management system ensures efficient inventory tracking and timely order fulfillment.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80",
  },
};
