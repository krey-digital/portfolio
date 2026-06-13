# Layout Components

## Navbar Component

**Location**: `/components/layout/Navbar.tsx`

### Features Implemented

- ✅ Responsive navigation with company logo/name
- ✅ Navigation links: Home, Products, About, Certifications, Contact
- ✅ Mobile hamburger menu with slide-out drawer
- ✅ Active link highlighting based on current route
- ✅ Sticky positioning at top of page
- ✅ Tailwind CSS with mobile-first approach (breakpoint at `md:768px`)
- ✅ Proper accessibility attributes (aria-labels, aria-expanded)

### Implementation Notes

**Client Component**: This component uses the `"use client"` directive because it requires `useState` for the mobile menu toggle functionality. While Requirement 11.2 states that only ContactForm should use client-side state, a mobile hamburger menu is a standard UX pattern that requires client-side interactivity.

**Rationale for Client Component**:
- Mobile menu toggle requires state management
- Alternative CSS-only solutions (checkbox hack) are less accessible
- Minimal client-side JS (single boolean state)
- Does not impact SEO (all links are in the HTML)
- Necessary for the required mobile menu functionality (Task 3.1)

### Usage

```tsx
import Navbar from "@/components/layout/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
```

### Styling

- Desktop: Horizontal navigation bar with logo on left, links on right
- Mobile: Hamburger icon that opens a slide-out drawer with stacked links
- Active links are highlighted in blue (`text-blue-600`)
- Hover effects on all interactive elements

### Accessibility

- Hamburger button has proper `aria-label` and `aria-expanded` attributes
- Screen reader text for "Open main menu"
- Keyboard accessible (all links and buttons are focusable)
- Focus indicators visible on all interactive elements

---

## WhatsappCta Component

**Location**: `/components/layout/WhatsappCta.tsx`

### Features Implemented

- ✅ Floating action button with fixed positioning (bottom-right corner)
- ✅ WhatsApp link formatted as `https://wa.me/{NEXT_PUBLIC_WHATSAPP_NUMBER}`
- ✅ WhatsApp icon with green background (#10B981 / green-500)
- ✅ Visible on all pages (z-index: 50)
- ✅ Hover and focus effects for better UX
- ✅ Opens in new tab with security attributes
- ✅ Fully accessible with proper aria-label

### Implementation Notes

**Server Component**: This component is a React Server Component (no `"use client"` directive) because it only renders a static link with no client-side state or interactivity beyond the browser's default link behavior.

**Environment Variable**: Uses `getEnvVar("NEXT_PUBLIC_WHATSAPP_NUMBER")` to retrieve the WhatsApp business number. The number should include the country code without the `+` prefix (e.g., `919876543210` for India).

### Usage

```tsx
import WhatsappCta from "@/components/layout/WhatsappCta";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <WhatsappCta />
    </>
  );
}
```

### Styling

- Fixed position: `bottom-6 right-6` (24px from bottom and right edges)
- Size: 56x56px circular button
- Background: Green (#10B981) with darker hover state (#059669)
- Shadow: `shadow-lg` for depth perception
- Hover effect: Scales to 110% for visual feedback
- Focus ring: Green ring for keyboard navigation

### Accessibility

- Descriptive `aria-label`: "Contact us on WhatsApp"
- SVG icon has `aria-hidden="true"` to avoid redundant screen reader announcements
- Opens in new tab with `target="_blank"` and `rel="noopener noreferrer"` for security
- Keyboard accessible with visible focus indicator

### Requirements Validated

- **Requirement 10.3**: Component created at correct location
- **Requirement 16.1**: Floating button visible on all pages
- **Requirement 16.2**: Opens WhatsApp when clicked
- **Requirement 16.3**: URL format `https://wa.me/{number}`
- **Requirement 16.4**: WhatsApp icon with green background
