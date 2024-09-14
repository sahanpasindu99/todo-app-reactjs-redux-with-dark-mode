/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom-only': '0 4px 6px rgba(0, 0, 0, 0.1)', // Customize shadow as needed
      },
    },
  },
  plugins: [],
}