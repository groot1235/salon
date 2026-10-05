export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  price: string;
  isActive?: boolean;
}

export interface WorkImage {
  src: string;
  alt: string;
}

export interface TeamMember {
  name: string;
  role: string;
  branch: string;
  image: string;
}

export interface WhyUsItem {
  title: string;
  subtitle: string;
}

export interface PackageItem {
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
}

export interface ReviewItem {
  rating: number;
  quote: string;
  author: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
}

export interface BranchItem {
  id: string;
  name: string;
  neighborhood: string;
}

export interface BookingServiceItem {
  id: string;
  category: "Hair" | "Nails" | "Lashes & Brows" | "Facials" | "Packages";
  name: string;
  duration: string;
  price: number;
  description: string;
}

export interface BookingStylistItem {
  id: string;
  name: string;
  role: string;
  branch: string;
}

export const SITE_CONFIG = {
  brandName: "The Salon Dubai",
  whatsappUrl: "https://wa.me/971544452502",
  phone: "+971 54 445 2502",
  phoneClean: "+971544452502",
  hours: "Sun–Sat 9AM–9PM",
  hoursShort: "Daily 9AM – 9PM",
  locationsSummary: "13 Branches Across Dubai",
  locationsDetail: "Palm Jumeirah · JBR · Marina · JVC · Al Furjan · Al Wasl",
  instagramHandle: "@thesalon.dubai",
  instagramUrl: "https://instagram.com/thesalon.dubai",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const HERO_DATA = {
  eyebrow: "DUBAI HAIR, NAILS & BEAUTY",
  heading: "Where Dubai\nGets Ready.",
  description:
    "Experience Dubai's premier hair, nail, and beauty salon across 13 prime locations. World-class stylists, luxury treatments, and transparent pricing tailored for you.",
  primaryCta: {
    label: "Book Now",
    href: SITE_CONFIG.whatsappUrl,
  },
  secondaryLink: {
    label: "View Services",
    href: "#services",
  },
  stats: [
    { value: "13", label: "Branches" },
    { value: "9–9", label: "Open Daily" },
    { value: "189 AED", label: "Gel Mani Pedi" },
  ] as StatItem[],
  image: {
    src: "/images/hero-wash-basin.jpg",
    alt: "Client enjoying a relaxing hair wash and treatment at The Salon Dubai basin",
  },
};

export const SERVICES_DATA = {
  eyebrow: "OUR SERVICES",
  heading: "What We Offer",
  services: [
    {
      id: "01",
      number: "01",
      title: "Hair",
      description: "Balayage + free cut & blowdry",
      price: "From AED 650",
    },
    {
      id: "02",
      number: "02",
      title: "Nails",
      description: "Gel mani pedi with flawless finish",
      price: "From AED 189",
    },
    {
      id: "03",
      number: "03",
      title: "Lashes & Brows",
      description: "Brow lamination & lash lift styling",
      price: "From AED 149",
    },
    {
      id: "04",
      number: "04",
      title: "Facials",
      description: "Deep cleansing & hydration treatment",
      price: "From AED 115",
      isActive: true, // Matches the reference design showing active bottom bar on 04
    },
  ] as ServiceItem[],
};

export const WORK_DATA = {
  eyebrow: "OUR WORK",
  heading: "Creating Beautiful Transformations",
  description:
    "From bespoke color corrections to signature blowdries and precision haircuts, explore the everyday craftsmanship of our master stylists.",
  linkText: "View Gallery",
  linkHref: "#gallery",
  images: [
    {
      src: "/images/work-curling.jpg",
      alt: "Stylist curling blonde waves with precision styling tool",
    },
    {
      src: "/images/work-salon.jpg",
      alt: "Interior of modern The Salon Dubai styling stations with round mirrors",
    },
    {
      src: "/images/work-cut.jpg",
      alt: "Precision hair trim and texturizing with professional shears",
    },
    {
      src: "/images/work-dry.jpg",
      alt: "Master blow dry and voluminous blowout session",
    },
  ] as WorkImage[],
};

export const TEAM_DATA = {
  eyebrow: "EXPERT TEAM",
  heading: "Our Stylists",
  members: [
    {
      name: "Hannah",
      role: "Blonde Specialist",
      branch: "FIVE JVC",
      image: "/images/team-hannah.jpg",
    },
    {
      name: "Victoria",
      role: "Hair Stylist",
      branch: "Sadaf JBR",
      image: "/images/team-victoria.jpg",
    },
    {
      name: "Rechelle",
      role: "Colour Specialist",
      branch: "Sadaf JBR",
      image: "/images/team-rechelle.jpg",
    },
  ] as TeamMember[],
};

export const WHY_US_DATA = {
  eyebrow: "WHY US",
  heading: "What Makes Us Different",
  image: {
    src: "/images/why-us-chic.jpg",
    alt: "Spacious luxury salon interior with styling chairs and natural lighting",
  },
  features: [
    {
      title: "Expert Stylists",
      subtitle: "Internationally trained hair & beauty professionals with years of editorial and salon experience.",
    },
    {
      title: "Free Parking at Every Branch",
      subtitle: "Hassle-free valet and dedicated customer parking available at all 13 locations.",
    },
    {
      title: "Best-Value Prices",
      subtitle: "Premium salon experience at transparent, honest rates with zero hidden fees.",
    },
    {
      title: "The Salon 360",
      subtitle: "Enjoy 3 services simultaneously from one comfortable chair to save your valuable time.",
    },
  ] as WhyUsItem[],
};

export const PACKAGES_DATA = {
  eyebrow: "PACKAGES",
  heading: "Service Packages",
  packages: [
    {
      name: "Essential",
      price: "AED 189",
      popular: false,
      features: [
        "Gel Mani + Pedi",
        "French tip add-on available",
        "Free parking",
      ],
    },
    {
      name: "Signature",
      price: "AED 399",
      popular: true,
      features: [
        "Brow Lamination",
        "Lash Lift",
        "Expert brow shaping",
      ],
    },
    {
      name: "Ultimate",
      price: "AED 650",
      popular: false,
      features: [
        "Balayage or highlights",
        "Free cut & blowdry",
        "Free colour consultation",
      ],
    },
  ] as PackageItem[],
};

export const REVIEWS_DATA = {
  eyebrow: "TESTIMONIALS",
  heading: "Client Reviews",
  reviews: [
    {
      rating: 5,
      quote:
        "[PLACEHOLDER] Hannah at FIVE JVC completely transformed my blonde balayage. The tone is perfection and my hair feels healthier than ever.",
      author: "Sarah M. — FIVE JVC",
    },
    {
      rating: 5,
      quote:
        "[PLACEHOLDER] The Salon 360 experience is a game-changer. Nails, hair treatment, and lashes all done together in under two hours.",
      author: "Elena R. — Dubai Marina",
    },
    {
      rating: 5,
      quote:
        "[PLACEHOLDER] Best gel mani-pedi in Dubai. The attention to detail is unmatched and the team is so welcoming every visit.",
      author: "Noura K. — Palm Jumeirah",
    },
    {
      rating: 5,
      quote:
        "[PLACEHOLDER] Victoria did an incredible job with my haircut and blowdry. Sharp, effortless, and easy to style at home.",
      author: "Chloe B. — Sadaf JBR",
    },
  ] as ReviewItem[],
};

export const GALLERY_DATA = {
  eyebrow: "GALLERY",
  heading: "Recent Work",
  images: [
    {
      src: "/images/gallery-1.jpg",
      alt: "Relaxing shampoo and hair treatment at the basin",
    },
    {
      src: "/images/gallery-2.jpg",
      alt: "Intricate occasion updo and styling",
    },
    {
      src: "/images/gallery-3.jpg",
      alt: "Precision hair trimming and sculpting",
    },
    {
      src: "/images/gallery-4.jpg",
      alt: "Silk press and voluminous blow dry finish",
    },
    {
      src: "/images/gallery-5.jpg",
      alt: "Glossy brunette waves with natural highlights",
    },
    {
      src: "/images/gallery-6.jpg",
      alt: "Professional styling station and extensions setup",
    },
    {
      src: "/images/gallery-7.jpg",
      alt: "Scalp massage and deep nourishing treatment",
    },
    {
      src: "/images/gallery-8.jpg",
      alt: "Custom balayage highlights application",
    },
  ] as GalleryItem[],
};

export const CTA_DATA = {
  heading: "Ready for Your Salon Reset?",
  description: "Book your next transformation today and experience Dubai's premier salon destination.",
  items: [
    { type: "clock", text: SITE_CONFIG.hoursShort },
    { type: "phone", text: SITE_CONFIG.phone },
    { type: "mapPin", text: SITE_CONFIG.locationsSummary },
  ],
  buttonText: "Book Appointment",
  buttonHref: SITE_CONFIG.whatsappUrl,
};

export const FOOTER_DATA = {
  brandName: SITE_CONFIG.brandName,
  description:
    "Dubai's premier hair, nail, and beauty salon. Delivering effortless elegance across 13 prime locations.",
  instagramUrl: SITE_CONFIG.instagramUrl,
  whatsappUrl: SITE_CONFIG.whatsappUrl,
  links: NAV_LINKS,
  contact: {
    branches: SITE_CONFIG.locationsDetail,
    phone: SITE_CONFIG.phone,
    hours: SITE_CONFIG.hours,
  },
  copyright: `© ${new Date().getFullYear()} The Salon Dubai. All rights reserved.`,
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export const BOOKING_CONFIG = {
  eyebrow: "APPOINTMENT RESERVATIONS",
  heading: "Book Your Appointment",
  description:
    "Experience Dubai's premier hair, nail, and beauty salon. Select your preferred branch, service, stylist, and time.",
  branches: [
    { id: "palm-jumeirah", name: "Palm Jumeirah", neighborhood: "The Pointe & Nakheel Mall Area" },
    { id: "sadaf-jbr", name: "Sadaf JBR", neighborhood: "The Walk, Jumeirah Beach Residence" },
    { id: "dubai-marina", name: "Dubai Marina", neighborhood: "Marina Walk & Promenade" },
    { id: "five-jvc", name: "FIVE JVC", neighborhood: "Jumeirah Village Circle" },
    { id: "al-furjan", name: "Al Furjan", neighborhood: "Pavilion & Club House" },
    { id: "al-wasl", name: "Al Wasl", neighborhood: "City Walk & Boxpark District" },
  ] as BranchItem[],
  categories: ["All", "Hair", "Nails", "Lashes & Brows", "Facials", "Packages"] as const,
  services: [
    // Hair
    {
      id: "hair-balayage",
      category: "Hair",
      name: "Balayage + Free Cut & Blowdry",
      duration: "120 mins",
      price: 650,
      description: "Custom hand-painted dimensional highlights, toner, luxury wash, precision cut, and blowout.",
    },
    {
      id: "hair-cut",
      category: "Hair",
      name: "Precision Haircut & Style",
      duration: "60 mins",
      price: 250,
      description: "Personal consultation, scalp massage, tailored cutting technique, and finished blowout.",
    },
    {
      id: "hair-blowout",
      category: "Hair",
      name: "Signature Voluminous Blowout",
      duration: "45 mins",
      price: 160,
      description: "Wash, treatment rinse, and blow dry styling (smooth sleek, glamorous bounce, or beach waves).",
    },
    // Nails
    {
      id: "nails-gel-mani-pedi",
      category: "Nails",
      name: "Gel Mani + Pedi",
      duration: "60 mins",
      price: 189,
      description: "Complete cuticle shaping, scrub, massage, and long-lasting gel polish with zero chipping.",
    },
    {
      id: "nails-spa-mani-pedi",
      category: "Nails",
      name: "Classic Spa Mani + Pedi",
      duration: "50 mins",
      price: 140,
      description: "Gentle exfoliation, nail sculpting, cuticle conditioning, and high-gloss regular lacquer.",
    },
    // Lashes & Brows
    {
      id: "lashes-brow-lamination",
      category: "Lashes & Brows",
      name: "Brow Lamination & Shaping",
      duration: "45 mins",
      price: 149,
      description: "Brow perm lift, custom tint, and thread shaping for a feathery, groomed arch.",
    },
    {
      id: "lashes-lift-tint",
      category: "Lashes & Brows",
      name: "Lash Lift & Deep Tint",
      duration: "45 mins",
      price: 169,
      description: "Lash elevation and semi-permanent conditioning tint that opens and accentuates eyes.",
    },
    // Facials
    {
      id: "facial-deep-cleansing",
      category: "Facials",
      name: "Deep Cleansing & Hydration",
      duration: "45 mins",
      price: 115,
      description: "Steam, pore extractions, ultrasonic exfoliation, and cooling intensive hydration mask.",
    },
    {
      id: "facial-hydra-glow",
      category: "Facials",
      name: "The Salon 360 HydraGlow",
      duration: "60 mins",
      price: 299,
      description: "Multi-step vortex deep cleanse, antioxidant infusion, and lymphatic drainage glow treatment.",
    },
    // Packages
    {
      id: "pkg-essential",
      category: "Packages",
      name: "Essential Package",
      duration: "60 mins",
      price: 189,
      description: "Gel Mani + Pedi, French tip add-on available, and complimentary valet parking.",
    },
    {
      id: "pkg-signature",
      category: "Packages",
      name: "Signature Package (Popular)",
      duration: "90 mins",
      price: 399,
      description: "Brow Lamination + Lash Lift + Expert brow shaping combination session.",
    },
    {
      id: "pkg-ultimate",
      category: "Packages",
      name: "Ultimate Transformation Package",
      duration: "150 mins",
      price: 650,
      description: "Balayage or highlights + free haircut & blowdry + master colour consultation.",
    },
  ] as BookingServiceItem[],
  stylists: [
    {
      id: "any",
      name: "Any Available Master Stylist",
      role: "Earliest appointment availability",
      branch: "All Branches",
    },
    {
      id: "hannah",
      name: "Hannah",
      role: "Blonde Specialist",
      branch: "FIVE JVC",
    },
    {
      id: "victoria",
      name: "Victoria",
      role: "Hair Stylist",
      branch: "Sadaf JBR",
    },
    {
      id: "rechelle",
      name: "Rechelle",
      role: "Colour Specialist",
      branch: "Sadaf JBR",
    },
  ] as BookingStylistItem[],
  timeSlots: [
    "09:30 AM",
    "11:00 AM",
    "12:30 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
    "08:00 PM",
  ],
};

