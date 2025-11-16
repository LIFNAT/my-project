/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <-- ต้องมี path นี้
  ],
  theme: {
    extend: {
      fontFamily: {

        sans: ['Prompt', 'sans-serif'], 

      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // <-- ต้องมีบรรทัดนี้!!
  ],
}