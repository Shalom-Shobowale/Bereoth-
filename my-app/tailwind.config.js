/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001d3d',
        secondary: '#d90429',
        accent: '#ffffff',
      }
    },
  },
  plugins: [],
}