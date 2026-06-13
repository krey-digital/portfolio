# Forms Components

This directory contains form-related components for the chemical business website.

## ContactForm

The `ContactForm` component is the **only client component** in this project that requires client-side state management. It handles lead capture through Formspree integration.

### Features

- **Client-side state management** using React hooks (useState)
- **Form validation** with inline error messages
- **Formspree integration** for backend-less form submission
- **Success/error state handling** with user-friendly messages
- **Product interest dropdown** populated from product categories
- **Form data preservation** on errors (cleared on success)

### Usage

```tsx
import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
}
```

### Environment Variables

The ContactForm requires the following environment variable:

```bash
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
```

Get your Formspree ID by:
1. Creating a free account at [formspree.io](https://formspree.io)
2. Creating a new form
3. Copying the form ID from the endpoint URL

### Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Company Name | text | Yes | Non-empty |
| Contact Name | text | Yes | Non-empty |
| Email Address | email | Yes | Valid email format |
| Phone Number | tel | Yes | Min 10 digits, accepts +, -, spaces, () |
| Product Interest | select | Yes | Must select from dropdown |
| Message | textarea | No | Optional |

### Validation Rules

- **Required fields**: All fields except "Message" are required
- **Email format**: Must match standard email pattern (user@domain.com)
- **Phone format**: Must contain at least 10 digits, accepts international formats
- **Product interest**: Must select from available product categories

### Error Handling

The component handles three types of errors:

1. **Validation Errors**
   - Displayed inline below each field
   - Cleared when user starts typing
   - Prevents form submission until resolved

2. **API Errors**
   - Displayed at top of form
   - Occurs when Formspree returns non-200 status
   - Form data is preserved for retry

3. **Network Errors**
   - Displayed at top of form
   - Occurs when fetch fails (no connection, CORS, etc.)
   - Form data is preserved for retry

### Success Flow

1. User fills out form
2. Client-side validation runs
3. Form submits to Formspree endpoint
4. Success message displays
5. Form clears automatically
6. User can submit another inquiry

### Testing

Unit tests are available in `ContactForm.test.tsx`:

```bash
npm test -- components/forms/ContactForm.test.tsx
```

Test coverage includes:
- Form rendering and field presence
- Product category dropdown population
- Client-side validation (all fields)
- Form submission success/error handling
- Form data preservation on errors
- Accessibility (labels, input types)

### Implementation Notes

- Uses `"use client"` directive (required for useState)
- Imports product categories from `/content/products.ts`
- Gracefully handles missing environment variable at build time
- Shows runtime error if NEXT_PUBLIC_FORMSPREE_ID is not configured
- Follows Tailwind CSS styling conventions
- Implements proper accessibility (labels, ARIA attributes)

### Requirements Validated

This component validates the following requirements:
- 7.1: Form field collection
- 7.2: Product interest dropdown
- 7.3: Formspree integration
- 7.4: Success state handling
- 7.5: Error state handling (API errors)
- 7.6: Error state handling (network errors)
- 7.7: Form data preservation
- 10.6: ContactForm component structure
- 11.2: Client component usage
- 11.4: React hooks for form state
- 17.4: TypeScript interfaces for form values
