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
        "spin-slow": "spin 5s linear infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        fade: "fade 2.5s ease-in-out infinite",
        "rotate-scale": "rotateScale 4s ease-in-out infinite",
      },

      keyframes: {
        fadeSlide: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fade: {
          "0%, 100%": { opacity: 0.3 },
          "50%": { opacity: 1 },
        },
        rotateScale: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
