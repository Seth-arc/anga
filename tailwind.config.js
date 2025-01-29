/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#2E294E',
        'teal-blue': '#1B998B',
        'sunrise-orange': '#FF9F1C',
        'cloud-white': '#F7F7FF',
        'slate-grey': '#4A4E69',
        'mint-green': '#A8E0CC',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}