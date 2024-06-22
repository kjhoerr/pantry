const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./src/*.tsx",
    "./src/pages/*.tsx",
    "./src/components/*.tsx",
    flowbite.content()
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
}
