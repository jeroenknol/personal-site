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
      boxShadow: {
        window:
          'inset 0 1px 1px 0 rgba(255,255,255,0.3), 0 30px 100px 15px rgba(50, 50, 93, 0.25), 0 20px 60px 10px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
