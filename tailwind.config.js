/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'sidebar-height': 'calc(100vh - 64px)',
        'minus-nav-and-bottom-bar': 'calc(100vh - 128px)',
      },
      minHeight: {
        'min-content-height': '16.666667%'
      },
      backgroundColor: {
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
      },
      minHeight: {
        '999': 'calc(100vh - 64px)',
      }
    },
    screens: {
      'xsm': { max: '400px' }, 
      'sm': {max: '640px'},
      'md': {max: '768px'},
      'lg': {max: '1024px'},
      'xl': {max: '1280px'},
      '2xl':{max: '1536px'},
    },

  },
  plugins: [],
}