module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        stone: {
          350: '#BFBBB8',
        },
      },
      fontFamily: {
        sans: ['Montserrat'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
