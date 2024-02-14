/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/layouts/main.handlebars'],
  theme: {
    extend: {
      fontFamily: {
        playpen: ['Playpen Sans', 'cursive'],
      },
    },
  },
  plugins: [],
};
