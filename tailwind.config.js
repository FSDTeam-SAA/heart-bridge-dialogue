/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.DEFAULT'),
              '&:hover': {
                color: theme('colors.secondary.DEFAULT'),
              },
            },
            code: {
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2rem 0.4rem',
              borderRadius: '0.25rem',
              color: theme('colors.pink.600'),
            },
            pre: {
              backgroundColor: theme('colors.gray.50'),
              borderRadius: '0.5rem',
              padding: '1rem',
              overflowX: 'auto',
              color: theme('colors.gray.800'),
            },
            'h1, h2, h3, h4': {
              color: theme('colors.gray.900'),
            },
          },
        },
      }),
      container: {
        center: true,
        padding: {
          DEFAULT: '14px',
          lg: '20px',
        },
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1170px',
        },
      },
      colors: {
        primary: {
          DEFAULT: '#f43f5e',
        },
        secondary: {
          DEFAULT: '#c02351',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
