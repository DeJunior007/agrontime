/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    animation: {
      'spin-slow': 'spin 20s linear infinite',
      'float-slow': 'float 3s ease-in-out infinite',
      'float-delayed': 'float 3s ease-in-out 1.5s infinite',
      'tractor-move': 'tractorMove 4s ease-in-out infinite',
      'grass-wave': 'grassWave 1.5s ease-in-out infinite',
      'dust': 'dust 2s linear infinite',
      'bounce-dots': 'bounceDots 1.4s infinite',
      'fade-in': 'fadeIn 0.5s ease-out',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      },
      tractorMove: {
        '0%, 100%': { transform: 'translateX(0) translateY(0)' },
        '50%': { transform: 'translateX(30px) translateY(-5px)' },
      },
      grassWave: {
        '0%, 100%': { transform: 'skewX(0deg)' },
        '50%': { transform: 'skewX(10deg)' },
      },
      dust: {
        '0%': { transform: 'translate(0, 0) scale(1)', opacity: '0.6' },
        '100%': { transform: 'translate(-20px, -20px) scale(0)', opacity: '0' },
      },
      bounceDots: {
        '0%, 80%, 100%': { opacity: '0' },
        '40%': { opacity: '1' },
      },
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
  },
};
export const plugins = [];
