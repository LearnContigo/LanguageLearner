/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      fontFamily: {
        'logo': ['Righteous', 'Arial'],
        'dosis': ['Dosis', 'Arial']
      },

      colors: {
        'light-blue': '#8489A5',
        'blue': '#003049',
        'shell': '#F0F0F0'
      }

    },
  },
  plugins: [],
};
