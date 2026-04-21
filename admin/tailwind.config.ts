import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        hebrew: ['Heebo', 'Rubik', 'Assistant', 'sans-serif'],
      },
      lineHeight: {
        hebrew: '1.7',
        'hebrew-tight': '1.4',
      },
      colors: {
        navy: '#0a1628',
        gold: '#c9a84c',
        cream: '#faf8f3',
      },
    },
  },
  plugins: [],
};

export default config;
