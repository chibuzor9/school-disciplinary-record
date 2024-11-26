/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customWhite: '#f3f4f6',
        customPurple: '#6c63ff',
        customBlue: '#2f2e41'
      },
      fontFamily: {
        custom: ["Fira Code", 'monospace']
      }
    },
  },
  plugins: [],
}