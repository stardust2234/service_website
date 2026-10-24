const env = import.meta.env

export const siteConfig = {
  businessEmail: env.VITE_BUSINESS_EMAIL || env.BUSINESS_EMAIL || 'contact@propelup.co.uk',
  businessName: env.VITE_BUSINESS_NAME || env.BUSINESS_NAME || 'Propel Up',
  websiteUrl: env.VITE_WEBSITE_URL || env.WEBSITE_URL || 'https://propelup.co.uk',
  ownerName: env.VITE_OWNER_NAME || env.OWNER_NAME || 'Brune Kicheta',
  location: env.VITE_LOCATION || env.LOCATION || 'United Kingdom',
}
