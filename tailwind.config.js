/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom Premium Theme Colors
        text: {
          heading: '#2A1416', // Deep Wine Brown
          body: '#4A2A2C',    // Soft Maroon Brown
          muted: '#7B5A5C',   // Muted Rose Brown
          disabled: '#B9A3A5', // Soft Dusty Rose
        },
        bg: {
          main: '#FFF8F2',    // Warm Cream
          section: '#FAEFE6', // Section Divider
          card: '#FFFFFF',    // Product Cards
        },
        highlight: {
          soft: '#F1E0D2',    // Hover BG
        },

        // Shadcn UI Colors (Merged)
        border: {
          DEFAULT: "hsl(var(--border))",
          light: '#E6D3C5',   // Custom: Soft Gold Tint
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          gold: '#C9A06C',    // Custom: Focus Ring / Button Secondary
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        shadow: {
          soft: 'rgba(75, 30, 30, 0.15)',
          hover: 'rgba(75, 30, 30, 0.22)',
        }
      },
      fontFamily: {
        sans: ['Arimo', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 6px 18px rgba(75, 30, 30, 0.15)',
        'hover': '0 10px 28px rgba(75, 30, 30, 0.22)',
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
