import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: "body",
  theme: {
    colors: {
      'text': '#e9e9e9',
      'background': '#060109',
      'primary': '#8a1c8d',
      'secondary': '#270a38',
      'accent': '#9e33db',
     },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        '65/100-screen': '65vh',
        '7/10-screen': '70vh',
        '4/5-screen': '80vh'
      }
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', // For IE and Edge
          'scrollbar-width': 'none',   // For Firefox
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', // For Webkit-based browsers (Chrome, Safari, and Opera)
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
}

export default config
