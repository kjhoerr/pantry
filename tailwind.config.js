/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/*.tsx",
    "./src/components/*.tsx",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
}