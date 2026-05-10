/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#0a0f0a',
          surface: '#0f1a0f',
          primary: '#00ff88',
          secondary: '#00d4ff',
          'text-primary': '#c8ffc8',
          'text-secondary': '#7aab7a',
          border: '#1a2f1a',
          error: '#ff5555',
        },
        light: {
          background: '#f0f4f0',
          surface: '#e4ece4',
          primary: '#006633',
          secondary: '#0077aa',
          'text-primary': '#0a1a0a',
          'text-secondary': '#2d5a2d',
          border: '#b0ccb0',
          error: '#cc0000',
        },
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        4: '1rem',
        8: '2rem',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        md: '4px',
                lg: '8px',
      },
      borderWidth: {
        terminal: '1px',
        'terminal-accent': '2px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 255, 136, 0.05)',
        md: '0 4px 6px -1px rgba(0, 255, 136, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 255, 136, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 255, 136, 0.1)',
        glow: '0 0 15px rgba(0, 255, 136, 0.5)',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'crt-flicker': {
          '0%': { opacity: '0.9' },
          '5%': { opacity: '0.8' },
          '10%': { opacity: '0.95' },
          '15%': { opacity: '0.9' },
          '20%': { opacity: '0.8' },
          '25%': { opacity: '0.9' },
          '30%': { opacity: '0.95' },
          '100%': { opacity: '0.9' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'matrix-column': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        scanline: 'scanline 8s linear infinite',
        'cursor-blink': 'blink 1s step-end infinite',
        pulse: 'pulse-glow 2s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        flicker: 'crt-flicker 0.15s infinite',
        glitch: 'glitch 0.5s infinite',
        matrix: 'matrix-column 20s linear infinite',
        'slow-pan': 'scanline 20s linear infinite',
      },
      screens: {
        'terminal-sm': '480px',
      },
    },
  },
  plugins: [],
};

export default config;

