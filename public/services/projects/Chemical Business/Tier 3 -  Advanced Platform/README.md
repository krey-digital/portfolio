# ChemCorp Industries - Tier 1 Informative Website

A professional, static brochure website for a chemical business built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

This is a **Tier 1 Informative Website** - a static, brochure-style website designed to establish trust, present the company's product range, and capture leads. No backend, no database, no authentication required.

### Key Features

- ✅ Static site generation (SSG) for optimal performance
- ✅ Fully responsive design (mobile-first approach)
- ✅ SEO optimized with proper meta tags
- ✅ Professional UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Contact form integration with Formspree
- ✅ WhatsApp integration for instant messaging
- ✅ Google Maps embed for location
- ✅ ISO/GMP certification showcase
- ✅ Product category overview
- ✅ Client testimonials
- ✅ Accessibility compliant

## 📁 Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── page.tsx             # Homepage
│   ├── about/               # About page
│   ├── products/            # Products overview
│   ├── certifications/      # Certifications page
│   ├── contact/             # Contact page
│   ├── privacy-policy/      # Privacy Policy
│   └── terms/               # Terms of Service
├── components/              # React components
│   ├── home/               # Homepage components
│   ├── layout/             # Layout components (Navbar, Footer)
│   ├── products/           # Product components
│   └── forms/              # Form components
├── content/                # Static content data
│   ├── products.ts         # Product categories
│   ├── certifications.ts   # Certifications data
│   ├── clients.ts          # Client logos
│   ├── testimonials.ts     # Customer testimonials
│   └── company.ts          # Company information
├── lib/                    # Utility functions
└── public/                 # Static assets

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Tier 1 - Informative Website"
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id
NEXT_PUBLIC_WHATSAPP_NUMBER=919999999999
NEXT_PUBLIC_MAPS_EMBED_URL=your-maps-url
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

The static site will be generated in the `out/` directory.

### Preview Production Build

```bash
npm run start
# or
yarn start
```

## 📄 Pages

### Public Pages

- **/** - Homepage with hero, product categories, certifications, testimonials
- **/about** - Company story, mission, facility, values
- **/products** - Product category overview with details
- **/certifications** - ISO/GMP certifications and compliance
- **/contact** - Contact form, business hours, location map
- **/privacy-policy** - Privacy policy and data protection
- **/terms** - Terms of service and usage conditions

## 🎨 Design System

### Colors

- **Primary:** Slate (900, 800, 700, 600, 50)
- **Accent:** Amber (600, 500, 400)
- **Background:** White, Slate-50
- **Text:** Slate-900 (headings), Slate-700 (body)

### Typography

- **Font Family:** System fonts (optimized for performance)
- **Headings:** Bold, tracking-tight
- **Body:** Regular, leading-relaxed

### Components

- Cards with subtle shadows and hover effects
- Gradient backgrounds for headers and CTAs
- Rounded corners (xl) for modern look
- Smooth transitions and animations

## 🔧 Configuration

### Formspree Setup

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the form ID
4. Add to `.env.local` as `NEXT_PUBLIC_FORMSPREE_ID`

### Google Analytics Setup

1. Create a GA4 property
2. Copy the Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local` as `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### WhatsApp Integration

1. Get your WhatsApp Business number
2. Format: Country code + number (e.g., 919876543210)
3. Add to `.env.local` as `NEXT_PUBLIC_WHATSAPP_NUMBER`

### Google Maps Embed

1. Go to Google Maps
2. Search for your location
3. Click Share > Embed a map
4. Copy the iframe src URL
5. Add to `.env.local` as `NEXT_PUBLIC_MAPS_EMBED_URL`

## 📝 Content Management

All content is managed through TypeScript files in the `/content` directory:

- **products.ts** - Product categories, descriptions, applications
- **certifications.ts** - Certification details
- **clients.ts** - Client logos
- **testimonials.ts** - Customer testimonials
- **company.ts** - Company information

To update content:
1. Edit the relevant file in `/content`
2. Rebuild the site: `npm run build`
3. Deploy the updated `out/` directory

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `out`
5. Configure environment variables

### Static Hosting (Any Provider)

1. Run `npm run build`
2. Upload contents of `out/` directory
3. Configure environment variables (if supported)

## 🧪 Testing

Run tests:
```bash
npm test
# or
yarn test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Total Bundle Size:** < 200KB (gzipped)

## 🔒 Security

- No sensitive data stored client-side
- Environment variables for API keys
- HTTPS enforced in production
- Content Security Policy headers
- XSS protection enabled

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Screen reader friendly

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

This is a client project. For internal team contributions:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit for review
5. Merge after approval

## 📞 Support

For technical support or questions:
- Email: dev@chemcorp.com
- Documentation: See `/docs` folder
- Issues: Contact project lead

## 📜 License

Proprietary - All rights reserved by ChemCorp Industries

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Homepage with hero and product categories
- About page with company information
- Products page with category cards
- Certifications page
- Contact page with form and map
- Privacy Policy and Terms of Service
- Responsive design
- SEO optimization

## 🎯 Roadmap

### Future Enhancements (Tier 2)
- Individual product detail pages
- Product catalog filtering
- SDS document downloads
- Admin panel for content management
- Inquiry tracking system
- Multi-language support

## 📚 Documentation

- [AGENTS.md](./AGENTS.md) - Development guidelines
- [IMAGE_URLS_REFERENCE.md](./IMAGE_URLS_REFERENCE.md) - Image sources
- [CONTACT_PAGE_UPDATE_SUMMARY.md](./CONTACT_PAGE_UPDATE_SUMMARY.md) - Design updates

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Unsplash for high-quality stock photos
- Formspree for form handling

---

**Built with ❤️ for ChemCorp Industries**
