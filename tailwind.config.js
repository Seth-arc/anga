/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          // Brand colors based on Anga guidelines
          'deep-purple': '#2E294E',  // For wisdom and depth
          'teal-blue': '#1B998B',    // For growth and stability
          'sunrise-orange': '#FF9F1C', // For energy and creativity
          'cloud-white': '#F7F7FF',   // For backgrounds
          'slate-grey': '#4A4E69',    // For text and details
          'mint-green': '#A8E0CC',    // For accents and highlights
        },
        fontFamily: {
          // Brand typography
          'poppins': ['Poppins', 'sans-serif'],      // For headings
          'open-sans': ['Open Sans', 'sans-serif'],   // For body text
        },
      },
    },
    plugins: [],
  }