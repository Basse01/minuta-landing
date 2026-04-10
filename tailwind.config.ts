import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primärpalett
        'minuta-900': '#0F2217',
        'minuta-800': '#1A3828',
        'minuta-700': '#2A5040',
        'minuta-600': '#3A6B56',
        'minuta-500': '#4E8A72',
        'minuta-400': '#6FC9A8',
        'minuta-300': '#96D9BE',
        'minuta-200': '#B8E0D0',
        'minuta-100': '#D6EDE4',
        'minuta-50':  '#EDF5F0',
        // Bakgrunder
        'parchment':      '#F6F3EE',
        'parchment-dark': '#E8E0D0',
        // Semantiska
        'brand-primary':  '#1A3828',
        'brand-secondary':'#2A5040',
        'brand-accent':   '#6FC9A8',
        'brand-bg':       '#F6F3EE',
        'brand-border':   '#E8E0D0',
        // Text
        'text-brand': '#1A3828',
        'text-mid':   '#4A6355',
        'text-muted': '#7A9285',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['DM Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display': ['3.5rem',    { lineHeight: '1.1',  letterSpacing: '-0.03em' }],
        'h1':      ['2rem',      { lineHeight: '1.2',  letterSpacing: '-0.02em' }],
        'h2':      ['1.375rem',  { lineHeight: '1.3',  letterSpacing: '-0.01em' }],
        'h3':      ['1.0625rem', { lineHeight: '1.4',  letterSpacing: '0' }],
        'body':    ['0.9375rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'small':   ['0.8125rem', { lineHeight: '1.6',  letterSpacing: '0' }],
        'label':   ['0.6875rem', { lineHeight: '1.4',  letterSpacing: '0.06em' }],
      },
      borderRadius: {
        'sm':   '4px',
        'md':   '8px',
        'lg':   '12px',
        'xl':   '16px',
        'full': '9999px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        'focus': '0 0 0 3px rgba(111, 201, 168, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
