/** @type {import('tailwindcss').Config} */
module.exports = { 
  content: [
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class", 
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}