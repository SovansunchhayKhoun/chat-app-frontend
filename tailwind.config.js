/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custLightNavy: "#083f54",
        custDarkNavy: "#05232f",
        custWhite: "#EEEEEE",
        custNavy: "#053B50",
        custBlue: "#176B87",
        custTeal: "#64CCC5"
      },
    },
  },
  plugins: [],
};
