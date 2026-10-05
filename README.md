# The Salon Dubai — Minimal Monochrome Landing Page

A pixel-faithful recreation and rebranding of the minimal, monochrome salon landing page design for **The Salon Dubai** ("Where Dubai Gets Ready").

## Tech Stack
- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Typography**: `next/font/google` with Inter (weights 400, 500, 600)
- **Icons**: `lucide-react` (Check, Star, Clock, Phone, MapPin, ArrowRight) + Custom SVG Instagram icon
- **Images**: `next/image` with local high-resolution assets stored in `/public/images/`

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## Design System & Tokens
- **Backgrounds**: Alternating `#FFFFFF` (white) and `#F8FAFC` (`slate-50`) across sections.
- **Headings & Primary Actions**: `#0F172A` (`slate-900`)
- **Body Text**: `#475569` (`slate-600`)
- **Eyebrows & Muted Text**: `#94A3B8` (`slate-400`), 11px uppercase with `tracking-[0.15em]`
- **Borders & Dividers**: 1px `#E2E8F0` (`slate-200`)
- **Numerals**: Large light numerals in `#E2E8F0` (40px)
- **Geometry**: Sharp 90° corners (`rounded-none`) across all buttons, images, cards, and badges. No gradients, no drop shadows. Flat editorial aesthetics.
- **Container**: `max-w-6xl` (1152px), centered, with `px-6` and `py-24` section vertical spacing.

---

## Architecture & Code Structure

```
├── app/
│   ├── globals.css      # Tailwind v4 import & theme variables
│   ├── layout.tsx       # Root layout with Inter font and metadata
│   └── page.tsx         # Single-page layout assembling all 11 components
├── components/
│   ├── Navbar.tsx       # Sticky monochrome navbar with mobile drawer
│   ├── Hero.tsx         # 2-col hero with 3-line headline, CTAs, stats & wash basin image
│   ├── Services.tsx     # 4 edge-to-edge cards with light numerals and active bottom bar
│   ├── Work.tsx         # 3-col grid with editorial text box and 2x2 photo collage
│   ├── Team.tsx         # 3 portrait columns showcasing stylists
│   ├── WhyUs.tsx        # 2-col layout with salon interior and checklist
│   ├── Packages.tsx     # 3 pricing tiers with popular tab badge and exact button styles
│   ├── Reviews.tsx      # 2x2 grid with 5-star ratings and placeholder quotes
│   ├── Gallery.tsx      # 4x2 grid of recent transformations with hover effects
│   ├── CTA.tsx          # Centered section with contact detail badges and WhatsApp CTA
│   └── Footer.tsx       # 3-column footer with social icon buttons and legal links
├── lib/
│   └── data.ts          # Central source of truth for all copy, prices, links & configuration
└── public/
    └── images/          # Curated salon imagery matching reference crops
```

---

## Content Customization
All site copy, prices, contact details, and stylist information can be easily updated in:
[`lib/data.ts`](file:///c:/Users/athar/Desktop/salon/lib/data.ts)

- **WhatsApp Booking Link**: Pre-configured to `https://wa.me/971544452502`
- **Reviews**: Replace the marked `[PLACEHOLDER]` quotes with verified Google or Fresha reviews
- **Packages**: Modify prices, names, features, or mark a different package as `popular: true`
