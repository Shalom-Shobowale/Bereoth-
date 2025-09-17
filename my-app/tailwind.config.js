/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001d3d",
        secondary: "#d90429",
        accent: "#ffffff",
      },
      animation: {
        "fade-slide": "fadeSlide 0.4s ease-out",
      },

      keyframes: {
        fadeSlide: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
