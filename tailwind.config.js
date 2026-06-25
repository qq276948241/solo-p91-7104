/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF8C42',
          50: '#FFF3E8',
          100: '#FFE4CC',
          200: '#FFC899',
          300: '#FFAD66',
          400: '#FF9142',
          500: '#FF8C42',
          600: '#E67326',
          700: '#CC5A0D',
          800: '#A64400',
          900: '#7A3200',
        },
        background: {
          DEFAULT: '#F5F5F5',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'system-ui',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 6px 20px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
}
