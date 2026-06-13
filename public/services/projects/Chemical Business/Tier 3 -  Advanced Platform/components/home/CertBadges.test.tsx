import { render, screen } from "@testing-library/react";
import { CertBadges } from "./CertBadges";
import type { Certification } from "@/content/certifications";

describe("CertBadges", () => {
  const mockCertifications: Certification[] = [
    {
      id: "iso-9001",
      name: "ISO 9001:2015",
      issuingBody: "Bureau Veritas",
      certNumber: "BV-XXXX-YYYY",
      issuedYear: 2022,
      expiryYear: 2025,
      description: "Quality Management System certification",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/ISO_9001_logo.svg/200px-ISO_9001_logo.svg.png",
    },
    {
      id: "bis",
      name: "BIS Registration",
      issuingBody: "Bureau of Indian Standards",
      certNumber: "BIS-XXXX",
      issuedYear: 2021,
      expiryYear: 2026,
      description: "Compliance with Indian Standards",
    },
    {
      id: "gmp",
      name: "GMP Certification",
      issuingBody: "National GMP Council",
      certNumber: "GMP-2023-XXXX",
      issuedYear: 2023,
      expiryYear: 2026,
      description: "Good Manufacturing Practice certification",
      logoUrl: "https://www.nsf.org/images/default-source/gmp-registration/gmp-logo.png",
    },
  ];

  it("renders section heading", () => {
    render(<CertBadges certifications={mockCertifications} />);
    
    expect(screen.getByText("Certified & Compliant")).toBeInTheDocument();
    expect(screen.getByText(/Trusted certifications ensuring quality/i)).toBeInTheDocument();
  });

  it("renders all certification names", () => {
    render(<CertBadges certifications={mockCertifications} />);
    
    expect(screen.getByText("ISO 9001:2015")).toBeInTheDocument();
    expect(screen.getByText("BIS Registration")).toBeInTheDocument();
    expect(screen.getByText("GMP Certification")).toBeInTheDocument();
  });

  it("renders certification logos with proper alt text when logoUrl is provided", () => {
    render(<CertBadges certifications={mockCertifications} />);
    
    const isoLogo = screen.getByAltText("ISO 9001:2015 certification logo");
    expect(isoLogo).toBeInTheDocument();
    expect(isoLogo).toHaveAttribute("src", expect.stringContaining("iso-9001.png"));
    
    const gmpLogo = screen.getByAltText("GMP Certification certification logo");
    expect(gmpLogo).toBeInTheDocument();
    expect(gmpLogo).toHaveAttribute("src", expect.stringContaining("gmp.png"));
  });

  it("renders fallback icon when logoUrl is not provided", () => {
    render(<CertBadges certifications={mockCertifications} />);
    
    // BIS certification has no logoUrl, should show first letter "B"
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("handles empty certifications array", () => {
    render(<CertBadges certifications={[]} />);
    
    expect(screen.getByText("Certified & Compliant")).toBeInTheDocument();
    // Should render without crashing, just no badges
  });

  it("renders single certification correctly", () => {
    const singleCert: Certification[] = [mockCertifications[0]];
    render(<CertBadges certifications={singleCert} />);
    
    expect(screen.getByText("ISO 9001:2015")).toBeInTheDocument();
    expect(screen.queryByText("BIS Registration")).not.toBeInTheDocument();
  });

  it("applies correct layout classes for horizontal strip", () => {
    const { container } = render(<CertBadges certifications={mockCertifications} />);
    
    // Check for flex layout with wrapping and centering
    const badgesContainer = container.querySelector(".flex.flex-wrap.items-center.justify-center");
    expect(badgesContainer).toBeInTheDocument();
  });
});
