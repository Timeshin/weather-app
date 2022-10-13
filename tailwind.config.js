/** @type {import('tailwindcss').Config} */

module.exports = {
  content : [
    './public/*.{html,js}',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
