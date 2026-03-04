// Site configuration
export const SITE = {
  title: 'Wioleta Literska - Makijaż Permanentny, powiększanie ust',
  description: 'Makijaż permanentny Kościerzyna, powiększanie ust Kościerzyna',
  url: 'https://yourdomain.com',
  author: 'Wioleta Literska',
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
  facebook: 'https://facebook.com/yourcompany',
} as const;

