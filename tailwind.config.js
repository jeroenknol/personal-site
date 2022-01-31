module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
