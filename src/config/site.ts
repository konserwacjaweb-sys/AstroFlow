// Site configuration
export const SITE = {
  title: 'AstroFlow',
  description: 'Leading provider of optimized logistics and manufacturing solutions with state-of-the-art facilities and industry expertise.',
  url: 'https://yourdomain.com',
  author: 'AstroFlow',
} as const;

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'O mnie', href: '/o-mnie' },
  { name: 'Oferta', href: '/oferta' },
  { name: 'Galeria', href: '/galeria' },
  { name: 'Cennik', href: '/cennik' },
  { name: 'Kontakt', href: '/kontakt' },
  { name: 'FAQ', href: '/faq' },
] as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/yourcompany',
  twitter: 'https://twitter.com/yourcompany',
  facebook: 'https://facebook.com/yourcompany',
} as const;

