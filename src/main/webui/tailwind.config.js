import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media",
  content: [
    "./src/*.tsx",
    "./src/pages/*.tsx",
    "./src/components/*.tsx",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
