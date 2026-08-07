/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F19',
          card: '#111827',
          border: '#1F2937',
          hover: '#1E293B'
        },
        brand: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          pink: '#EC4899',
          violet: '#7C3AED'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-pink': '0 0 25px -5px rgba(236, 72, 153, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0F172A 0%, #0B0F19 100%)',
      }
    },
  },
  plugins: [],
}
