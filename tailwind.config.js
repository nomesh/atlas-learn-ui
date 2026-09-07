/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          navy: '#0B192C',
          deep: '#1E3E62',
          blue: '#0284c7',
          cyan: '#0ea5e9',
          teal: '#0d9488',
          light: '#f0f9ff',
          muted: '#64748b'
        },
        learn: {
          amber: '#f59e0b',
          emerald: '#10b981',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          rose: '#f43f5e',
          sky: '#38bdf8',
          surface: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'elevated': '0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
        'teal-glow': '0 0 35px -5px rgba(14, 165, 233, 0.25)',
        'avatar-glow': '0 0 45px -8px rgba(13, 148, 136, 0.35)',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'float-slow': 'floatSlow 5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
