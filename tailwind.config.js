/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/*.ejs`],
  theme: {
    extend: ["light"],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake",],
  },
}

