// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  redirects: {
    '/capabilities': '/oferta',
    '/facilities': '/cennik',
    '/rfq': '/kontakt',
    '/use-cases': '/galeria',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});