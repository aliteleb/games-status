/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-gray-800',
    'bg-[#27282e]',
  ],
  theme: {
    fontFamily: {
      sans: ['Readex Pro', 'sans-serif'],
    },
    extend: {
      backgroundColor: {
        'custom-black': '#161618', // Define your custom color as 'custom'
      },
    },
  },
  plugins: [],
}

