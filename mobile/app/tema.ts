const temas = {
  light: {
    /* base */
    '--color-base-primaria': '203 213 225',      /* slate-300 */
    '--color-base-secundaria': '226 232 240',    /* slate-200 */
    '--color-base-terciaria': '241 245 249',     /* slate-100 */
    '--color-base-quaternaria': '203 213 225',   /* slate-300 */

    '--color-contraste-primaria': '161 161 170', /* zinc-400 */
    '--color-contraste-secundaria': '113 113 122', /* zinc-500 */
    '--color-contraste-terciaria': '82 82 91',   /* zinc-600 */

    /* textos */
    '--color-t-primaria': '15 23 42',    /* slate-900 */
    '--color-t-secundaria': '30 41 59',  /* slate-800 */
    '--color-t-terciaria': '51 65 85',   /* slate-700 */

    /* destaque primário */
    '--color-destaque-p-claro': '250 204 21',  /* yellow-400 */
    '--color-destaque-p-medio': '245 158 11',  /* amber-500 */
    '--color-destaque-p-escuro': '217 119 6',  /* amber-600 */

    /* destaque secundário */
    '--color-destaque-s-claro': '99 102 241',  /* indigo-500 */
    '--color-destaque-s-medio': '37 99 235',   /* blue-600 */
    '--color-destaque-s-escuro': '30 64 175',  /* blue-800 */
  },
  dark: {
    '--color-base-primaria': '3 7 18',        /* gray-950 */
    '--color-base-secundaria': '31 41 55',    /* gray-800 */
    '--color-base-terciaria': '55 65 81',     /* gray-700 */
    '--color-base-quaternaria': '75 85 99',   /* gray-600 */

    '--color-contraste-primaria': '161 161 170', /* zinc-400 */
    '--color-contraste-secundaria': '212 212 216', /* zinc-300 */
    '--color-contraste-terciaria': '228 228 231',  /* zinc-200 */

    /* textos */
    '--color-t-primaria': '241 245 249',  /* slate-100 */
    '--color-t-secundaria': '226 232 240',/* slate-200 */
    '--color-t-terciaria': '203 213 225', /* slate-300 */

    /* destaque primário */
    '--color-destaque-p-claro': '245 158 11',  /* amber-500 */
    '--color-destaque-p-medio': '250 204 21',  /* yellow-400 */
    '--color-destaque-p-escuro': '253 224 71', /* yellow-300 */

    /* destaque secundário */
    '--color-destaque-s-claro': '55 48 163',  /* indigo-800 */
    '--color-destaque-s-medio': '37 99 235',  /* blue-600 */
    '--color-destaque-s-escuro': '59 130 246' /* blue-500 */
  }
} as const

export default temas