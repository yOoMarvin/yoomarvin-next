module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'gray-1000': '#050505'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
