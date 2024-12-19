/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary, #FFE600)',
        surface: 'var(--surface, #E7E7E7)',
        succes: 'var(--succes, #00A650)',
        info: 'var(--info, #3483FA)'
      }
    },
  },
  plugins: [],
}

