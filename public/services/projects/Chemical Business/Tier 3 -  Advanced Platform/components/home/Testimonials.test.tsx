import { render, screen } from "@testing-library/react";
import { Testimonials } from "./Testimonials";
import type { Testimonial } from "@/content/testimonials";

describe("Testimonials", () => {
  const mockTestimonials: Testimonial[] = [
    {
      id: "test-1",
      quote: "Excellent service and quality products.",
      authorName: "John Doe",
      authorTitle: "Procurement Manager",
      companyName: "Test Company Ltd.",
    },
    {
      id: "test-2",
      quote: "Reliable partner for our chemical needs.",
      authorName: "Jane Smith",
      authorTitle: "Operations Head",
      companyName: "ABC Industries",
      authorPhotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=80",
    },
    {
      id: "test-3",
      quote: "Outstanding quality and fast delivery.",
      authorName: "Bob Johnson",
      authorTitle: "Quality Manager",
      companyName: "XYZ Corp",
      companyLogoUrl: "https://logo.clearbit.com/example.com",
    },
  ];

  it("renders section heading", () => {
    render(<Testimonials testimonials={mockTestimonials} />);
    
    expect(screen.getByText("What Our Clients Say")).toBeInTheDocument();
    expect(screen.getByText("Trusted partnerships built on quality and reliability")).toBeInTheDocument();
  });

  it("renders all testimonial quotes", () => {
    render(<Testimonials testimonials={mockTestimonials} />);
    
    expect(screen.getByText("Excellent service and quality products.")).toBeInTheDocument();
    expect(screen.getByText("Reliable partner for our chemical needs.")).toBeInTheDocument();
    expect(screen.getByText("Outstanding quality and fast delivery.")).toBeInTheDocument();
  });

  it("renders author information for each testimonial", () => {
    render(<Testimonials testimonials={mockTestimonials} />);
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Procurement Manager")).toBeInTheDocument();
    expect(screen.getByText("Test Company Ltd.")).toBeInTheDocument();
    
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Operations Head")).toBeInTheDocument();
    expect(screen.getByText("ABC Industries")).toBeInTheDocument();
  });

  it("renders author photo when provided", () => {
    render(<Testimonials testimonials={mockTestimonials} />);
    
    const authorPhoto = screen.getByAltText("Jane Smith photo");
    expect(authorPhoto).toBeInTheDocument();
    expect(authorPhoto).toHaveAttribute("src", expect.stringContaining("unsplash.com"));
  });

  it("renders fallback initial when no author photo provided", () => {
    render(<Testimonials testimonials={mockTestimonials} />);
    
    // John Doe has no photo, should show initial "J"
    const initials = screen.getAllByText(/^[A-Z]$/);
    expect(initials.length).toBeGreaterThan(0);
  });

  it("renders company logo when provided", () => {
    render(<Testimonials testimonials={mockTestimonials} />);
    
    const companyLogo = screen.getByAltText("XYZ Corp logo");
    expect(companyLogo).toBeInTheDocument();
    expect(companyLogo).toHaveAttribute("src", expect.stringContaining("clearbit.com"));
  });

  it("renders quote icon for each testimonial", () => {
    const { container } = render(<Testimonials testimonials={mockTestimonials} />);
    
    const quoteIcons = container.querySelectorAll("svg");
    expect(quoteIcons.length).toBe(mockTestimonials.length);
  });

  it("handles empty testimonials array", () => {
    render(<Testimonials testimonials={[]} />);
    
    expect(screen.getByText("What Our Clients Say")).toBeInTheDocument();
    // Should render without crashing
  });

  it("renders testimonials in a grid layout", () => {
    const { container } = render(<Testimonials testimonials={mockTestimonials} />);
    
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass("sm:grid-cols-2", "lg:grid-cols-3");
  });

  it("applies hover effect classes to testimonial cards", () => {
    const { container } = render(<Testimonials testimonials={mockTestimonials} />);
    
    const cards = container.querySelectorAll(".hover\\:shadow-md");
    expect(cards.length).toBe(mockTestimonials.length);
  });
});
