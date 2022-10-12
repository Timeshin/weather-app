/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'media',
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
