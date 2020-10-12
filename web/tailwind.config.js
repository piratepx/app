module.exports = {
  purge: ['./src/**/*.vue'],
  theme: {
    extend: {
      borderColor: (theme) => ({
        default: theme('colors.gray.400'),
      }),
      colors: {
        white: '#f1f2f4',
        gray: {
          100: '#d5d8dd',
          200: '#b9bec6',
          300: '#9da4af',
          400: '#818a98',
          500: '#67707e',
          600: '#505762',
          700: '#393e46',
          800: '#22252a',
          900: '#0b0c0e',
        },
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
