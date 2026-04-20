import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a1628',
        'navy-mid': '#152236',
        'navy-light': '#1e3a5f',
        gold: '#c9a84c',
        'gold-light': '#e8c96a',
        'gold-pale': '#f5e6b8',
        cream: '#faf7f2',
        'gray-luxury': '#9ca3af',
      },
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
      },
      letterSpacing: {
        'ultra': '0.2em',
        'wide-luxury': '0.15em',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c, #e8c96a, #c9a84c)',
        'navy-gradient': 'linear-gradient(135deg, #0a1628, #152236)',
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(201, 168, 76, 0.25)',
        'gold-lg': '0 8px 40px rgba(201, 168, 76, 0.35)',
        'luxury': '0 20px 60px rgba(10, 22, 40, 0.15)',
        'luxury-lg': '0 40px 80px rgba(10, 22, 40, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
