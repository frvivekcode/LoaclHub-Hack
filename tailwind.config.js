/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { navy: '#14213D', gold: '#FCA311', mist: '#E5E5E5', ink: '#000000' },
      fontFamily: { sans: ['Archivo', 'Inter', 'system-ui', 'sans-serif'] },
      keyframes: { marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } } },
      animation: { marquee: 'marquee 22s linear infinite' },
    },
  },
  plugins: [],
}
