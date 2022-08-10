const plugin = require('tailwindcss/plugin');

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
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant, e }) {
      addVariant('watch', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`watch`)} .${e(`watch${separator}${className}`)}`;
        });
      });
    }),
  ],
};
