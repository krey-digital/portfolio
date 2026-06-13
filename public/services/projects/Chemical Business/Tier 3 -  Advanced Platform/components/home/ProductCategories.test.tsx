import { render, screen } from "@testing-library/react";
import { ProductCategories } from "./ProductCategories";
import type { ProductCategory } from "@/content/products";

/**
 * Unit tests for ProductCategories component
 * 
 * Validates Requirements: 3.2, 10.4, 14.4
 */

const mockCategories: ProductCategory[] = [
  {
    id: "acids",
    name: "Acids",
    slug: "acids",
    description: "High-purity acids for industrial applications",
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
    exampleProducts: ["Sulphuric Acid", "Hydrochloric Acid"],
    applications: ["Metal cleaning", "pH control"],
    ghsPictograms: ["GHS05"],
  },
  {
    id: "solvents",
    name: "Solvents",
    slug: "solvents",
    description: "Industrial-grade solvents",
    imageUrl: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&q=80",
    exampleProducts: ["Acetone", "IPA"],
    applications: ["Cleaning", "Extraction"],
  },
  {
    id: "alkalis",
    name: "Alkalis",
    slug: "alkalis",
    description: "Strong alkaline solutions",
    imageUrl: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80",
    exampleProducts: ["Caustic Soda"],
    applications: ["Water treatment"],
  },
  {
    id: "salts",
    name: "Salts",
    slug: "salts",
    description: "Industrial salts",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    exampleProducts: ["Sodium Chloride"],
    applications: ["Water softening"],
  },
];

describe("ProductCategories", () => {
  it("renders section heading", () => {
    render(<ProductCategories categories={mockCategories} />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Our Product Categories");
  });

  it("renders all categories when no limit is provided", () => {
    render(<ProductCategories categories={mockCategories} />);
    
    expect(screen.getByText("Acids")).toBeInTheDocument();
    expect(screen.getByText("Solvents")).toBeInTheDocument();
    expect(screen.getByText("Alkalis")).toBeInTheDocument();
    expect(screen.getByText("Salts")).toBeInTheDocument();
  });

  it("renders limited number of categories when limit is provided", () => {
    render(<ProductCategories categories={mockCategories} limit={2} />);
    
    expect(screen.getByText("Acids")).toBeInTheDocument();
    expect(screen.getByText("Solvents")).toBeInTheDocument();
    expect(screen.queryByText("Alkalis")).not.toBeInTheDocument();
    expect(screen.queryByText("Salts")).not.toBeInTheDocument();
  });

  it("renders category cards as links to /products", () => {
    render(<ProductCategories categories={mockCategories} />);
    
    const links = screen.getAllByRole("link");
    const categoryLinks = links.filter(link => 
      link.getAttribute("href") === "/products"
    );
    
    expect(categoryLinks.length).toBeGreaterThanOrEqual(mockCategories.length);
  });

  it("renders category images with proper alt text", () => {
    render(<ProductCategories categories={mockCategories} />);
    
    const acidsImage = screen.getByAltText("Acids category");
    expect(acidsImage).toBeInTheDocument();
    expect(acidsImage).toHaveAttribute("src");
  });

  it("shows 'View All Products' button when limit is applied and more categories exist", () => {
    render(<ProductCategories categories={mockCategories} limit={2} />);
    
    const viewAllButton = screen.getByRole("link", { name: /view all products/i });
    expect(viewAllButton).toBeInTheDocument();
    expect(viewAllButton).toHaveAttribute("href", "/products");
  });

  it("does not show 'View All Products' button when no limit is applied", () => {
    render(<ProductCategories categories={mockCategories} />);
    
    const viewAllButton = screen.queryByRole("link", { name: /view all products/i });
    expect(viewAllButton).not.toBeInTheDocument();
  });

  it("does not show 'View All Products' button when limit equals or exceeds category count", () => {
    render(<ProductCategories categories={mockCategories} limit={4} />);
    
    const viewAllButton = screen.queryByRole("link", { name: /view all products/i });
    expect(viewAllButton).not.toBeInTheDocument();
  });

  it("handles empty categories array", () => {
    render(<ProductCategories categories={[]} />);
    
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    
    // Should not crash, just render empty grid
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(0);
  });

  it("renders as a section element", () => {
    const { container } = render(<ProductCategories categories={mockCategories} />);
    
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("uses semantic HTML with proper heading hierarchy", () => {
    const { container } = render(<ProductCategories categories={mockCategories} />);
    
    // Verify h2 is present (validates Requirement 18.3)
    const h2 = container.querySelector("h2");
    expect(h2).toBeInTheDocument();
    
    // Verify h3 for category names
    const h3Elements = container.querySelectorAll("h3");
    expect(h3Elements.length).toBe(mockCategories.length);
  });
});
