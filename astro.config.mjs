// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  redirects: {
    '/capabilities': '/uslugi',
    '/facilities': '/cennik',
    '/rfq': '/kontakt',
    '/use-cases': '/galeria',
    '/documentation': '/faq',
    '/faq': '/kontakt',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});