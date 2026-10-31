/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08080a',
          900: '#0c0c0f',
          850: '#121216',
          800: '#16161b',
          750: '#1c1c22',
          700: '#232329',
          600: '#2e2e36',
        },
        ember: {
          50: '#fff5ed',
          100: '#ffe8d5',
          200: '#ffcaa8',
          300: '#ffa470',
          400: '#ff7a3d',
          500: '#f95316',
          600: '#e6370a',
          700: '#bf2a09',
          800: '#98230f',
          900: '#7a2010',
        },
        blood: {
          500: '#ff3b3b',
          600: '#e11d1d',
          700: '#c01515',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(249,83,22,0.35), 0 8px 40px -8px rgba(249,83,22,0.45)',
        card: '0 20px 60px -20px rgba(0,0,0,0.7)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        checkPop: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        ringExpand: {
          '0%': { transform: 'scale(0.6)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(249,83,22,0.5)' },
          '50%': { boxShadow: '0 0 0 12px rgba(249,83,22,0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out both',
        scaleIn: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) both',
        slideUp: 'slideUp 0.4s ease-out both',
        marquee: 'marquee 26s linear infinite',
        floatY: 'floatY 5s ease-in-out infinite',
        checkPop: 'checkPop 0.5s cubic-bezier(0.16,1,0.3,1) both',
        ringExpand: 'ringExpand 1.2s ease-out infinite',
        pulseGlow: 'pulseGlow 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
