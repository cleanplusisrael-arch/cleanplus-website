import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // hebrew-tailwind-preset skill: enable RTL variant
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        navy: '#0a1628',
        'navy-mid': '#112240',
        'navy-light': '#1e3a5f',
        gold: '#c9a84c',
        'gold-light': '#e8c96a',
        cream: '#faf8f3',
      },
      fontFamily: {
        // hebrew-tailwind-preset: Hebrew font stack
        heebo:  ['Heebo', 'Assistant', 'Noto Sans Hebrew', 'sans-serif'],
        rubik:  ['Rubik', 'Heebo', 'sans-serif'],
        hebrew: ['Heebo', 'Assistant', 'Rubik', 'Noto Sans Hebrew', 'sans-serif'],
      },
      lineHeight: {
        // hebrew-ui-design-system: Hebrew needs taller line height
        'hebrew':         '1.7',
        'hebrew-tight':   '1.4',
        'hebrew-relaxed': '1.9',
      },
    },
  },
  plugins: [],
};

export default config;
