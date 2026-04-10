/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },
      colors: {
        base: {
          primaria: 'rgb(var(--color-base-primaria) / <alpha-value>)',
          secundaria: 'rgb(var(--color-base-secundaria) / <alpha-value>)',
          terciaria: 'rgb(var(--color-base-terciaria) / <alpha-value>)',
          quaternaria: 'rgb(var(--color-base-quaternaria) / <alpha-value>)',
        },

        contraste: {
          primaria: 'rgb(var(--color-contraste-primaria) / <alpha-value>)',
          secundaria: 'rgb(var(--color-contraste-secundaria) / <alpha-value>)',
          terciaria: 'rgb(var(--color-contraste-terciaria) / <alpha-value>)',
        },

        t: {
          primaria: 'rgb(var(--color-t-primaria) / <alpha-value>)',
          secundaria: 'rgb(var(--color-t-secundaria) / <alpha-value>)',
          terciaria: 'rgb(var(--color-t-terciaria) / <alpha-value>)',
        },

        destaque: {
          p: {
            claro: 'rgb(var(--color-destaque-p-claro) / <alpha-value>)',
            medio: 'rgb(var(--color-destaque-p-medio) / <alpha-value>)',
            escuro: 'rgb(var(--color-destaque-p-escuro) / <alpha-value>)',
          },
          s: {
            claro: 'rgb(var(--color-destaque-s-claro) / <alpha-value>)',
            medio: 'rgb(var(--color-destaque-s-medio) / <alpha-value>)',
            escuro: 'rgb(var(--color-destaque-s-escuro) / <alpha-value>)',
          },
        },
      }
    },
  },
  plugins: [],
}