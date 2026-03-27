/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        card: 'var(--bg-card)',
        elevated: 'var(--bg-elevated)',
        gold: {
          DEFAULT: 'var(--gold)',
          light: 'var(--gold-light)',
          muted: 'var(--gold-muted)',
        },
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
        accent: {
          rose: 'var(--accent-rose)',
          mint: 'var(--accent-mint)',
        },
        border: 'var(--border)',
        'border-hover': 'var(--border-hover)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        ui: ['var(--font-ui)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px var(--border), 0 8px 32px rgba(0,0,0,0.4)',
      },
      borderRadius: {
        card: '2px',
        pill: '999px',
      }
    },
  },
  plugins: [],
}
