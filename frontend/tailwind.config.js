/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#12203B',
        paper: '#FAF7F1',
        paper2: '#F1ECE1',
        teal: {
          50: '#E7F3F1',
          100: '#C7E4DF',
          400: '#2E8F84',
          600: '#0F6E66',
          700: '#0B4F49',
        },
        gold: '#B8862E',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}