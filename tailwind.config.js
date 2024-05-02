/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto Mono, SF pro display"],
      },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
