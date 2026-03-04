/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', '1rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.75rem'],
      xl: ['1.25rem', '1.75rem'],
      '2xl': ['1.5rem', '2rem'],
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      heading: ['Playfair Display', 'serif'],
      playfair: ['Playfair Display', 'serif'],
      notoDisplay: ['Noto Serif Display', 'serif'],
      sans: ['Poppins', 'sans-serif'],
    },
    colors: {
      white: '#ffffff',
      black: '#000000',
      navyblue: {
        700: '#42656e',
        800: '#3b5b63',
        900: '#335057',
      },
      primary: {
        50: '#f8f9fa',
        100: '#f1f3f5',
        200: '#e9ecef',
        600: '#495057',
        700: '#343a40',
        800: '#212529',
        900: '#0d0e11',
      },
      secondary: {
        100: '#ffe0e6',
        200: '#ffc2d1',
        300: '#ffa3bc',
        600: '#d63384',
        700: '#b81371',
        900: '#7a0654',
      },
    },
    extend: {
      backgroundColor: {
        'white/10': 'rgba(255, 255, 255, 0.1)',
        'white/20': 'rgba(255, 255, 255, 0.2)',
        'black/40': 'rgba(0, 0, 0, 0.4)',
      },
      textColor: {
        'white/90': 'rgba(255, 255, 255, 0.9)',
        'white/60': 'rgba(255, 255, 255, 0.6)',
      },
    },
  },
  safelist: [
    { pattern: /^(bg|text|border|ring|hover:bg|hover:text)-(navyblue|primary|secondary)-(50|100|200|300|600|700|800|900)$/ },
    { pattern: /^(bg|text)-white\/(10|20|60|90)$/ },
    { pattern: /^bg-black\/40$/ },
  ],
  plugins: [],
}
