/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Honey / organic storefront palette from the reference
        text: {
          heading: '#173d3a',
          body: '#355a59',
          muted: '#6a7f7d',
          disabled: '#b8c3bf',
        },
        bg: {
          main: '#f5f3ea',
          section: '#eae7d1',
          card: '#fffdf9',
          soft: '#f1ecdb',
        },
        highlight: {
          soft: '#efe7c3',
          gold: '#f0be54',
          honey: '#f7c664',
        },
        brand: {
          teal: '#114f4d',
          tealDark: '#0d3c3a',
          olive: '#dfe8b4',
          gold: '#e8b85b',
          amber: '#f5d58a',
          cream: '#f3efe1',
        },
        border: {
          DEFAULT: '#e4ddc8',
          light: '#e9e2cc',
        },
        input: '#f7f4ee',
        ring: '#e9b85d',
        background: '#f5f3ea',
        foreground: '#173d3a',
        primary: {
          DEFAULT: '#114f4d',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#e9b85d',
          foreground: '#173d3a',
        },
        destructive: {
          DEFAULT: '#d65b47',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#6a7f7d',
          foreground: '#355a59',
        },
        accent: {
          DEFAULT: '#e9b85d',
          foreground: '#173d3a',
          gold: '#e9b85d',
        },
        popover: {
          DEFAULT: '#ffffff',
          foreground: '#173d3a',
        },
        card: {
          DEFAULT: '#ffffff',
          foreground: '#173d3a',
        },
        shadow: {
          soft: 'rgba(17, 79, 77, 0.12)',
          hover: 'rgba(17, 79, 77, 0.18)',
        }
      },
      fontFamily: {
        sans: ['Arimo', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 22px rgba(17, 79, 77, 0.12)',
        hover: '0 14px 28px rgba(17, 79, 77, 0.18)',
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
