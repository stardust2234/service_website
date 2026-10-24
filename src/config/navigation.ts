/**
 * Navigation Configuration
 * 
 * Single source of truth for all navigation links.
 * Used by Navbar and Footer to ensure consistency.
 */

export interface NavLink {
  label: string;
  href: string;
  isRoute?: boolean;
}

/**
 * Primary navigation links - hash-based sections on homepage
 * Order matters: this is the canonical order for navbar and footer
 */
export const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Why us", href: "#why-us" },
  { label: "FAQs", href: "#faqs" },
];

/**
 * Footer-only links that appear after primary navigation
 */
export const footerExtraLinks: NavLink[] = [
  { label: "Tools", href: "/tools", isRoute: true },
  { label: "Blog", href: "/articles", isRoute: true },
  { label: "Career", href: "/career", isRoute: true },
];

/**
 * Legal/utility links for footer bottom
 */
export const legalLinks: NavLink[] = [
  { label: "Terms & Conditions", href: "/terms", isRoute: true },
  { label: "Privacy Policy", href: "/privacy-policy", isRoute: true },
  { label: "Cookie Policy", href: "/cookie-policy", isRoute: true },
];

/**
 * Social media links
 */
export const socialLinks = [
  { label: "Twitter / X", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
];
