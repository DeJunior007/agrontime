/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warning: '#F25746',
        primary: '#053027',
        brown: {
          100: '#F5E6DB',
          500: '#8B4513',
        },
      },
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
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
