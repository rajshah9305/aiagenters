/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // AgentForge Elite Custom Colors
        agent: {
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
          neural: 'linear-gradient(45deg, #00d4ff 0%, #090979 35%, #ff006e 70%, #8338ec 100%)',
          cyan: '#00d4ff',
          purple: '#8b5cf6',
          green: '#10b981',
          pink: '#f472b6',
          orange: '#f97316',
        },
        glass: {
          primary: 'rgba(15, 23, 42, 0.85)',
          secondary: 'rgba(30, 41, 59, 0.7)',
          border: 'rgba(148, 163, 184, 0.1)',
          'border-hover': 'rgba(34, 197, 94, 0.3)',
        },
        surface: {
          dark: '#0f172a',
          darker: '#020617',
        },
        text: {
          primary: '#f8fafc',
          secondary: 'rgba(248, 250, 252, 0.8)',
          tertiary: 'rgba(148, 163, 184, 0.9)',
        },
        neon: {
          cyan: '#00d4ff',
          purple: '#8b5cf6',
          green: '#10b981',
          pink: '#f472b6',
          orange: '#f97316',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        // Loading animations
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        
        // Custom AgentForge animations
        'neural-pulse': 'neural-pulse 2s ease-in-out infinite',
        'neural-flow': 'neural-flow 3s ease-in-out infinite',
        'quantum-spin': 'quantum-spin 2s linear infinite',
        'network-pulse': 'network-pulse 2s ease-out forwards',
        'badge-glow': 'badge-glow 3s ease-in-out infinite',
        'hero-fade-in': 'hero-fade-in 1.5s ease-out',
        'modal-fade-in': 'modal-fade-in 0.4s ease-out',
        'modal-slide-in': 'modal-slide-in 0.4s ease-out',
        'icon-float': 'icon-float 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'sparkle': 'sparkle 3s ease-in-out infinite',
        'preloader-shine': 'preloader-shine 3s ease-in-out infinite',
        'chart-shimmer': 'chart-shimmer 3s ease-in-out infinite',
        'expand-line': 'expand-line 1.5s ease-out 1.8s both',
        'terminal-fade-in': 'terminal-fade-in 0.4s ease-out',
        'tier-pulse': 'tier-pulse 3s ease-in-out infinite',
        
        // Interaction animations
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-in',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
      },
      keyframes: {
        // Neural network animations
        'neural-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.3)', opacity: '1' },
        },
        'neural-flow': {
          '0%': { opacity: '0', transform: 'scaleX(0)' },
          '50%': { opacity: '1', transform: 'scaleX(1)' },
          '100%': { opacity: '0', transform: 'scaleX(0)' },
        },
        'quantum-spin': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'network-pulse': {
          '0%': { 
            transform: 'scale(1)', 
            opacity: '1', 
            'box-shadow': '0 0 0 0 rgb(0 212 255)' 
          },
          '50%': { 
            transform: 'scale(1.5)', 
            opacity: '0.7', 
            'box-shadow': '0 0 20px 10px rgba(0, 212, 255, 0.3)' 
          },
          '100%': { 
            transform: 'scale(2)', 
            opacity: '0', 
            'box-shadow': '0 0 40px 20px rgba(0, 212, 255, 0)' 
          },
        },
        
        // UI element animations
        'badge-glow': {
          '0%, 100%': { 
            'box-shadow': '0 0 15px rgba(102, 126, 234, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            'box-shadow': '0 0 30px rgba(102, 126, 234, 0.8)',
            transform: 'scale(1.05)'
          },
        },
        'hero-fade-in': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'modal-fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'modal-slide-in': {
          from: { transform: 'translateY(-50px) scale(0.9)', opacity: '0' },
          to: { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        'icon-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'sparkle': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.2) rotate(180deg)' },
        },
        'preloader-shine': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'chart-shimmer': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'expand-line': {
          from: { width: '0' },
          to: { width: '120px' },
        },
        'terminal-fade-in': {
          from: { opacity: '0', transform: 'translateX(-15px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'tier-pulse': {
          '0%, 100%': { 
            'box-shadow': '0 0 10px rgba(102, 126, 234, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            'box-shadow': '0 0 25px rgba(102, 126, 234, 0.7)',
            transform: 'scale(1.05)'
          },
        },
        
        // Interaction animations
        'scale-in': {
          from: { transform: 'scale(0.9)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        'scale-out': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.9)', opacity: '0' },
        },
        'slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in-up': {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in-down': {
          from: { transform: 'translateY(-20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'agent-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
        'neural-gradient': 'linear-gradient(45deg, #00d4ff 0%, #090979 35%, #ff006e 70%, #8338ec 100%)',
        'quantum-gradient': 'linear-gradient(135deg, #00ff88 0%, #0066ff 25%, #8b5cf6 50%, #ff6b00 75%, #ec4899 100%)',
        'hero-gradient': 'radial-gradient(ellipse at top, #0f172a 0%, #020617 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.7))',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glass-lg': '0 20px 60px rgba(0, 0, 0, 0.15)',
        'neon': '0 0 20px currentColor',
        'neon-lg': '0 0 40px currentColor',
        'quantum': '0 25px 80px rgba(102, 126, 234, 0.15)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
  darkMode: ['class'],
};