import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { companyInfo } from "@/content/company";

/**
 * Unit tests for Hero component
 * 
 * Validates Requirements: 3.1, 10.4, 18.3
 */
describe("Hero", () => {
  it("renders company name as h1", () => {
    render(<Hero />);
    
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(companyInfo.name);
  });

  it("renders company tagline", () => {
    render(<Hero />);
    
    expect(screen.getByText(companyInfo.tagline)).toBeInTheDocument();
  });

  it("renders CTA button linking to contact page", () => {
    render(<Hero />);
    
    const ctaLink = screen.getByRole("link", { name: /get in touch/i });
    expect(ctaLink).toHaveAttribute("href", "/contact");
  });

  it("uses semantic HTML with proper heading hierarchy", () => {
    const { container } = render(<Hero />);
    
    // Verify h1 is present (validates Requirement 18.3)
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent(companyInfo.name);
  });

  it("renders as a section element", () => {
    const { container } = render(<Hero />);
    
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
