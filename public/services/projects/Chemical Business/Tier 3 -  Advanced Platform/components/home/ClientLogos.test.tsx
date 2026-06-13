import { render, screen } from "@testing-library/react";
import { ClientLogos } from "./ClientLogos";
import type { Client } from "@/content/clients";

describe("ClientLogos", () => {
  const mockClients: Client[] = [
    {
      id: "client-1",
      name: "ABC Manufacturing",
      logoUrl: "https://logo.clearbit.com/basf.com",
    },
    {
      id: "client-2",
      name: "XYZ Industries",
      logoUrl: "https://logo.clearbit.com/dow.com",
    },
    {
      id: "client-3",
      name: "PQR Chemicals",
      logoUrl: "https://logo.clearbit.com/dupont.com",
    },
  ];

  it("renders the section heading", () => {
    render(<ClientLogos clients={mockClients} />);
    
    expect(screen.getByText("Trusted By Industry Leaders")).toBeInTheDocument();
    expect(screen.getByText("Serving quality chemicals to businesses across industries")).toBeInTheDocument();
  });

  it("renders all client logos with correct alt text", () => {
    render(<ClientLogos clients={mockClients} />);
    
    const abcLogo = screen.getByAltText("ABC Manufacturing logo");
    const xyzLogo = screen.getByAltText("XYZ Industries logo");
    const pqrLogo = screen.getByAltText("PQR Chemicals logo");
    
    expect(abcLogo).toBeInTheDocument();
    expect(xyzLogo).toBeInTheDocument();
    expect(pqrLogo).toBeInTheDocument();
  });

  it("renders logos with correct image sources", () => {
    render(<ClientLogos clients={mockClients} />);
    
    const abcLogo = screen.getByAltText("ABC Manufacturing logo");
    expect(abcLogo).toHaveAttribute("src", expect.stringContaining("abc-manufacturing.png"));
  });

  it("handles empty clients array without crashing", () => {
    render(<ClientLogos clients={[]} />);
    
    expect(screen.getByText("Trusted By Industry Leaders")).toBeInTheDocument();
  });

  it("applies grayscale effect class to logo containers", () => {
    const { container } = render(<ClientLogos clients={mockClients} />);
    
    const logoContainers = container.querySelectorAll(".grayscale");
    expect(logoContainers.length).toBe(mockClients.length);
  });

  it("renders correct number of client logos", () => {
    render(<ClientLogos clients={mockClients} />);
    
    const logos = screen.getAllByRole("img");
    expect(logos).toHaveLength(mockClients.length);
  });

  it("renders with single client", () => {
    const singleClient: Client[] = [
      {
        id: "client-1",
        name: "Solo Company",
        logoUrl: "https://logo.clearbit.com/example.com",
      },
    ];
    
    render(<ClientLogos clients={singleClient} />);
    
    expect(screen.getByAltText("Solo Company logo")).toBeInTheDocument();
  });
});
