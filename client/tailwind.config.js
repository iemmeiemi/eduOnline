/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#F48C06',
        'light-blue': '#65DAFF',
        'dark-blue': '#2F327D',
        'super-light-gray': '#FAFAFA',
        'light-orange': '#FFF2E1'

      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
