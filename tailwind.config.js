/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0A0F24",
        midnight: "#1A2238",
      },
      gradientColorStops: {
        navy: "#0A0F24",
        midnight: "#1A2238",
      },
    },
  },
  plugins: [],
};
