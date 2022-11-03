/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/*.html","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      transitionProperty: {
        'max-height': 'max-height'
      }
    },
    fontFamily: {
      'primary':['Volkhov', 'serif'],
      'secondary':['Poppins', 'sans-serif'],
      'tertiary':['Open Sans', 'sans-serif']
    },
    container: {
      center:true
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],

}
