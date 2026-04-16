export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        background: '#F5F0E8',
        primary: {
          main: '#1C3A3A',
          dark: '#0D2626',
        },
        accent: {
          orange: '#E8900A',
          teal: '#2A7A6F',
        },
        surface: '#FFFFFF',
        textPrimary: '#1A1A1A',
        status: {
          verified: '#3DAA5C',
          pending: '#E8900A',
          transferred: '#7B5EA7',
        }
      }
    },
  },
  plugins: [],
}
