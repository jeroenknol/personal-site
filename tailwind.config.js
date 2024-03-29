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
        taskbar:
          'inset 0 1px 1px 0 rgba(255,255,255,0.5), 0 20px 100px 10px rgba(50, 50, 93, 0.0), 0 10px 30px 5px rgba(0, 0, 0, 0.05)',
        taskbarDark:
          'inset 0 1px 1px 0 rgba(255,255,255,0.15), 0 20px 100px 10px rgba(50, 50, 93, 0.0), 0 10px 30px 5px rgba(0, 0, 0, 0.05)',
        inner:
          '0 1px 10px 5px rgba(50, 50, 93, 0.08), 0 1px 20px 15px rgba(0, 0, 0, 0.05)',
        appIcon:
          'inset 0 1px 1px 0px rgba(255,255,255,0.5), 0 3px 3px 3px rgba(200, 200, 200, 0.08), 0 3px 10px 10px rgba(80, 80, 80, 0.05)',
        appIconDark:
          'inset 0 1px 1px 0px rgba(255,255,255,0.15), 0 3px 3px 3px rgba(200, 200, 200, 0.08), 0 3px 10px 10px rgba(80, 80, 80, 0.05)',
        // 'inset 0 1px 1px 0 rgba(255,255,255,0.5), 0 3px 3px 3px rgba(50, 50, 93, 0.08), 0 3px 10px 10px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
