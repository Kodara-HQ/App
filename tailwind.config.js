/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDFDFC',
          100: '#F5F5DC',
          200: '#F0E68C',
          300: '#DEB887',
          400: '#D2B48C',
          500: '#CD853F',
          600: '#BC8F8F',
          700: '#A0522D',
          800: '#8B4513',
          900: '#654321',
        },
        cream: {
          50: '#FDFDFC',
          100: '#F5F5DC',
          200: '#F0E68C',
          300: '#DEB887',
          400: '#D2B48C',
          500: '#CD853F',
          600: '#BC8F8F',
          700: '#A0522D',
          800: '#8B4513',
          900: '#654321',
        },
        beige: {
          50: '#FDFDFC',
          100: '#F5F5DC',
          200: '#F0E68C',
          300: '#DEB887',
          400: '#D2B48C',
          500: '#CD853F',
          600: '#BC8F8F',
          700: '#A0522D',
          800: '#8B4513',
          900: '#654321',
        },
        tan: {
          50: '#FDF5E6',
          100: '#F5E6D3',
          200: '#E6D3B8',
          300: '#D4B996',
          400: '#C19A73',
          500: '#DEB887',
          600: '#CD853F',
          700: '#A0522D',
          800: '#8B4513',
          900: '#654321',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'pulse-slow': 'pulse 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200px 0'
          },
          '100%': {
            backgroundPosition: 'calc(200px + 100%) 0'
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cream-gradient': 'linear-gradient(135deg, #F5F5DC 0%, #DEB887 100%)',
        'beige-gradient': 'linear-gradient(135deg, #FDFDFC 0%, #F5F5DC 100%)',
      }
    },
  },
  plugins: [],
} 