/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        textGH: "#00A572",
        verdeFooter: "#295943",
        verdeFooterHover: "#1e4735",
        customGray: "#FBFBFB",
        paypalBlue: "#003087",
        focusColor: "#00aaff",
        paypalYellow: "#FFC439",
        paypalBlue: "#003087",
        295943: {
          DEFAULT: "#295943",
          light: "#62bd8b", // Puedes ajustar este valor según tu preferencia
          dark: "#1e4735", // Puedes ajustar este valor según tu preferencia
        },
      },
      fontSize: {
        "2xs": "0.625rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"),
    require("@tailwindcss/forms"),
    require("tailwindcss-animated"),
  ],
  content: [
    // ...
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
};
