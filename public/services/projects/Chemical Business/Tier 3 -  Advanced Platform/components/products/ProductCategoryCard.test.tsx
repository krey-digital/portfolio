import { render, screen } from "@testing-library/react";
import { ProductCategoryCard } from "./ProductCategoryCard";
import type { ProductCategory } from "@/content/products";

/**
 * Unit tests for ProductCategoryCard component
 * 
 * Validates Requirements: 4.2, 4.3, 10.5, 14.4
 */
describe("ProductCategoryCard", () => {
  const mockCategory: ProductCategory = {
    id: "acids",
    name: "Acids",
    slug: "acids",
    description: "High-purity acids for industrial applications including sulphuric, hydrochloric, and nitric acid.",
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
  };

  it("renders category name as h3", () => {
    render(<ProductCategoryCard category={mockCategory} />);
    
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Acids");
  });

  it("renders category description", () => {
    render(<ProductCategoryCard category={mockCategory} />);
    
    expect(screen.getByText(/High-purity acids for industrial applications/i)).toBeInTheDocument();
  });

  it("renders example products list (3-5 items)", () => {
    render(<ProductCategoryCard category={mockCategory} />);
    
    // Validates Requirement 4.2: displays 3-5 example products
    expect(screen.getByText("Sulphuric Acid (98%)")).toBeInTheDocument();
    expect(screen.getByText("Hydrochloric Acid (35%)")).toBeInTheDocument();
    expect(screen.getByText("Nitric Acid (68%)")).toBeInTheDocument();
    expect(screen.getByText("Phosphoric Acid (85%)")).toBeInTheDocument();
  });

  it("renders applications list", () => {
    render(<ProductCategoryCard category={mockCategory} />);
    
    expect(screen.getByText("Metal cleaning and pickling")).toBeInTheDocument();
    expect(screen.getByText("pH control and neutralization")).toBeInTheDocument();
    expect(screen.getByText("Chemical synthesis")).toBeInTheDocument();
    expect(screen.getByText("Battery manufacturing")).toBeInTheDocument();
  });

  it('renders CTA button "Enquire about this product" linking to /contact', () => {
    render(<ProductCategoryCard category={mockCategory} />);
    
    // Validates Requirement 4.3: CTA button with specific text linking to /contact
    const ctaLink = screen.getByRole("link", { name: /enquire about this product/i });
    expect(ctaLink).toHaveAttribute("href", "/contact");
  });

  it("renders category image with alt text", () => {
    render(<ProductCategoryCard category={mockCategory} />);
    
    const image = screen.getByAltText("Acids category");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("acids.jpg"));
  });

  it("renders as an article element", () => {
    const { container } = render(<ProductCategoryCard category={mockCategory} />);
    
    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });

  it("handles empty example products array", () => {
    const categoryWithoutProducts: ProductCategory = {
      ...mockCategory,
      exampleProducts: [],
    };
    
    render(<ProductCategoryCard category={categoryWithoutProducts} />);
    
    // Should render without crashing
    expect(screen.getByText("Acids")).toBeInTheDocument();
    // Example Products section should not be rendered
    expect(screen.queryByText("Example Products")).not.toBeInTheDocument();
  });

  it("handles empty applications array", () => {
    const categoryWithoutApplications: ProductCategory = {
      ...mockCategory,
      applications: [],
    };
    
    render(<ProductCategoryCard category={categoryWithoutApplications} />);
    
    // Should render without crashing
    expect(screen.getByText("Acids")).toBeInTheDocument();
    // Applications section should not be rendered
    expect(screen.queryByText("Applications")).not.toBeInTheDocument();
  });

  it("limits example products to 5 items", () => {
    const categoryWithManyProducts: ProductCategory = {
      ...mockCategory,
      exampleProducts: [
        "Product 1",
        "Product 2",
        "Product 3",
        "Product 4",
        "Product 5",
        "Product 6",
        "Product 7",
      ],
    };
    
    render(<ProductCategoryCard category={categoryWithManyProducts} />);
    
    // Should display only first 5 products
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 5")).toBeInTheDocument();
    expect(screen.queryByText("Product 6")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 7")).not.toBeInTheDocument();
  });

  it("implements hover effects with appropriate CSS classes", () => {
    const { container } = render(<ProductCategoryCard category={mockCategory} />);
    
    const article = container.querySelector("article");
    // Validates Requirement 14.4: card hover effects (lift/shadow)
    expect(article).toHaveClass("hover:-translate-y-1");
    expect(article).toHaveClass("hover:shadow-lg");
  });
});
