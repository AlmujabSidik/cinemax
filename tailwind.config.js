/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0e121a",
        gold: "#FFB302",
      },
    },
  },
  plugins: [],
};
