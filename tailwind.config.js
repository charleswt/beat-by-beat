/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/layouts/main.handlebars'],
  theme: {
    extend: {
      fontFamily: {
        playpen: ['Playpen Sans', 'cursive'],
      },
    },
    animation: {
      background: 'background 2s ease-in-out infinite',
      linear: 'backgroundLinear 3s linear infinite',
      slide: 'backgroundSlide 120s linear infinite alternate-reverse forwards;',
    },
    keyframes: {
      backgroundSlide: {
        '0%': { backgroundPosition: '0 0%' },
        '100%': { backgroundPosition: '100% 50%' },
      },
    },
  },
  plugins: [],
};
