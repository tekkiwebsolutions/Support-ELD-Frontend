// tailwind.config.js
module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: ['Mui*', 'jsx*'], // Include Material-UI and JSS classes
  },
};
