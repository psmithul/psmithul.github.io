/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0fa',
          100: '#bfd9f1',
          500: '#4A90E2',
          600: '#3a7bc8',
          700: '#2a5f9e',
          900: '#1a3f6e',
        },
        accent: {
          50: '#e6fdf9',
          100: '#bffbef',
          500: '#50E3C2',
          600: '#40d4b0',
          700: '#30b89e',
        },
        gray: {
          50: '#f4f6fa',
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#374151',
          600: '#1f2937',
          700: '#111827',
          800: '#0f172a',
          900: '#0c1016',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'form': '0 12px 24px rgba(0,0,0,0.08)',
        'card': '0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'slide': 'slide 4s infinite',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideUp': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        slide: {
          '0%, 100%': { transform: 'translateX(-50%)' },
          '50%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
} 