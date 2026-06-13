/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'typing': 'typing 4s steps(40, end) infinite',
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '55%, 95%': { width: '100%' },
          '100%': { width: '0' },
        },
      },
    },
  },
  plugins: [],
}
