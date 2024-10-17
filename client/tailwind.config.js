/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#214c70",
        secondary: "#f7f3f3",
      },
      colors: {
        primary: "#214c70",
      },
    },
  },
  plugins: [],
};
