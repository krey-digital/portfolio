import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "./ContactForm";
import { productCategories } from "@/content/products";

/**
 * Unit tests for ContactForm component
 * 
 * Validates Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 11.2, 11.4
 */

// Mock the env module
jest.mock("@/lib/env", () => ({
  getEnvVar: jest.fn((key: string) => {
    if (key === "NEXT_PUBLIC_FORMSPREE_ID") {
      return "test-formspree-id";
    }
    return "";
  }),
}));

// Mock fetch
global.fetch = jest.fn();

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  describe("Form Rendering", () => {
    it("renders all required form fields", () => {
      render(<ContactForm />);

      expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contact name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/product interest/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it("renders submit button", () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      expect(submitButton).toBeInTheDocument();
    });

    it("populates product interest dropdown from product categories", () => {
      render(<ContactForm />);

      const dropdown = screen.getByLabelText(/product interest/i);
      const options = (dropdown as HTMLSelectElement).options;

      // First option is placeholder
      expect(options[0].value).toBe("");
      expect(options[0].text).toBe("Select a product category");

      // Remaining options match product categories
      productCategories.forEach((category, index) => {
        expect(options[index + 1].value).toBe(category.name);
        expect(options[index + 1].text).toBe(category.name);
      });
    });

    it("marks required fields with asterisk", () => {
      const { container } = render(<ContactForm />);

      const requiredLabels = container.querySelectorAll(
        'label:has(span.text-red-500)'
      );
      expect(requiredLabels.length).toBeGreaterThanOrEqual(5); // All fields except message
    });
  });

  describe("Form Validation", () => {
    it("displays validation error for empty company name", async () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/company name is required/i)
        ).toBeInTheDocument();
      });
    });

    it("displays validation error for empty contact name", async () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/contact name is required/i)
        ).toBeInTheDocument();
      });
    });

    it("displays validation error for empty email", async () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
    });

    it("displays validation error for invalid email format", async () => {
      render(<ContactForm />);

      const emailInput = screen.getByLabelText(/email address/i);
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please enter a valid email address/i)
        ).toBeInTheDocument();
      });
    });

    it("displays validation error for empty phone", async () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/phone number is required/i)
        ).toBeInTheDocument();
      });
    });

    it("displays validation error for invalid phone format", async () => {
      render(<ContactForm />);

      const phoneInput = screen.getByLabelText(/phone number/i);
      fireEvent.change(phoneInput, { target: { value: "123" } });

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please enter a valid phone number/i)
        ).toBeInTheDocument();
      });
    });

    it("displays validation error for empty product interest", async () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please select a product interest/i)
        ).toBeInTheDocument();
      });
    });

    it("accepts valid phone number with country code", async () => {
      render(<ContactForm />);

      const phoneInput = screen.getByLabelText(/phone number/i);
      fireEvent.change(phoneInput, { target: { value: "+91 9876543210" } });

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.queryByText(/please enter a valid phone number/i)
        ).not.toBeInTheDocument();
      });
    });

    it("clears validation errors when user starts typing", async () => {
      render(<ContactForm />);

      // Trigger validation
      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/company name is required/i)
        ).toBeInTheDocument();
      });

      // Start typing
      const companyInput = screen.getByLabelText(/company name/i);
      fireEvent.change(companyInput, { target: { value: "Test Company" } });

      // Error should be cleared
      expect(
        screen.queryByText(/company name is required/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    const fillValidForm = () => {
      fireEvent.change(screen.getByLabelText(/company name/i), {
        target: { value: "Test Company" },
      });
      fireEvent.change(screen.getByLabelText(/contact name/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText(/email address/i), {
        target: { value: "john@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/phone number/i), {
        target: { value: "+91 9876543210" },
      });
      fireEvent.change(screen.getByLabelText(/product interest/i), {
        target: { value: productCategories[0].name },
      });
      fireEvent.change(screen.getByLabelText(/message/i), {
        target: { value: "Test message" },
      });
    };

    it("submits form data to Formspree endpoint on success", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      render(<ContactForm />);
      fillValidForm();

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          "https://formspree.io/f/test-formspree-id",
          expect.objectContaining({
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: expect.stringContaining("Test Company"),
          })
        );
      });
    });

    it("displays success message on successful submission", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      render(<ContactForm />);
      fillValidForm();

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/thank you for your inquiry/i)
        ).toBeInTheDocument();
      });
    });

    it("clears form data after successful submission", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      render(<ContactForm />);
      fillValidForm();

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/thank you for your inquiry/i)
        ).toBeInTheDocument();
      });

      // Click "Submit another inquiry" to return to form
      const anotherInquiryButton = screen.getByText(/submit another inquiry/i);
      fireEvent.click(anotherInquiryButton);

      // Form should be cleared
      expect(
        (screen.getByLabelText(/company name/i) as HTMLInputElement).value
      ).toBe("");
      expect(
        (screen.getByLabelText(/contact name/i) as HTMLInputElement).value
      ).toBe("");
    });

    it("displays error message on API error", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
      });

      render(<ContactForm />);
      fillValidForm();

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/failed to submit form/i)
        ).toBeInTheDocument();
      });
    });

    it("displays error message on network error", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      render(<ContactForm />);
      fillValidForm();

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });
    });

    it("preserves form data on submission error", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      render(<ContactForm />);
      fillValidForm();

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });

      // Form data should be preserved
      expect(
        (screen.getByLabelText(/company name/i) as HTMLInputElement).value
      ).toBe("Test Company");
      expect(
        (screen.getByLabelText(/contact name/i) as HTMLInputElement).value
      ).toBe("John Doe");
    });

    it("disables submit button while submitting", async () => {
      (global.fetch as jest.Mock).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100)
          )
      );

      render(<ContactForm />);
      fillValidForm();

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      // Button should be disabled and show "Submitting..."
      await waitFor(() => {
        expect(submitButton).toBeDisabled();
        expect(submitButton).toHaveTextContent(/submitting/i);
      });
    });

    it("clears error message when user starts typing after error", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error("Network error")
      );

      render(<ContactForm />);
      fillValidForm();

      const submitButton = screen.getByRole("button", {
        name: /submit inquiry/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/network error/i)).toBeInTheDocument();
      });

      // Start typing in a field
      const companyInput = screen.getByLabelText(/company name/i);
      fireEvent.change(companyInput, {
        target: { value: "Updated Company" },
      });

      // Error should be cleared
      expect(screen.queryByText(/network error/i)).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("associates labels with form inputs", () => {
      render(<ContactForm />);

      const companyInput = screen.getByLabelText(/company name/i);
      expect(companyInput).toHaveAttribute("id", "companyName");

      const contactInput = screen.getByLabelText(/contact name/i);
      expect(contactInput).toHaveAttribute("id", "contactName");

      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute("id", "email");

      const phoneInput = screen.getByLabelText(/phone number/i);
      expect(phoneInput).toHaveAttribute("id", "phone");

      const productInput = screen.getByLabelText(/product interest/i);
      expect(productInput).toHaveAttribute("id", "productInterest");

      const messageInput = screen.getByLabelText(/message/i);
      expect(messageInput).toHaveAttribute("id", "message");
    });

    it("uses appropriate input types", () => {
      render(<ContactForm />);

      const emailInput = screen.getByLabelText(/email address/i);
      expect(emailInput).toHaveAttribute("type", "email");

      const phoneInput = screen.getByLabelText(/phone number/i);
      expect(phoneInput).toHaveAttribute("type", "tel");
    });
  });
});
