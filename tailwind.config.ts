import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#243831',
          300: '#2B5F44',
          100: '#D8E9E4',
        },
        golden: '#C5A365',
        black: '#000000',
        white: '#ffffff',
        text: '#191919',
        "post": '#101828',
        "badge": "#4A4A4A",
        gray: {
          100: '#BBC2C0',
          300: '#939494',
          badge: '#f3f3f3'
        },
        success: '#49A569',
      },
    },
  },
  plugins: [],
} satisfies Config;
