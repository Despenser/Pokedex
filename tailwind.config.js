/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pokemon-red': '#ff0000',
        'pokemon-blue': '#3b4cca',
        'pokemon-yellow': '#ffde00',
        'pokemon-black': '#1a1a1a',
        // Цвета для типов покемонов
        'type-normal': '#A8A77A',
        'type-fire': '#EE8130',
        'type-water': '#6390F0',
        'type-electric': '#F7D02C',
        'type-grass': '#7AC74C',
        'type-ice': '#96D9D6',
        'type-fighting': '#C22E28',
        'type-poison': '#A33EA1',
        'type-ground': '#E2BF65',
        'type-flying': '#A98FF3',
        'type-psychic': '#F95587',
        'type-bug': '#A6B91A',
        'type-rock': '#B6A136',
        'type-ghost': '#735797',
        'type-dragon': '#6F35FC',
        'type-dark': '#705746',
        'type-steel': '#B7B7CE',
        'type-fairy': '#D685AD',
      },
      fontFamily: {
        'pokemon': ['Pokemon', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-25%)' },
          '50%': { transform: 'translateY(0)' }
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}