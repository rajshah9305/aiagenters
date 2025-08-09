// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Neural theme colors
        'surface': {
          darker: '#0a0a0b',
          dark: '#111113',
          DEFAULT: '#1a1a1c',
          light: '#2a2a2c',
        },
        'text': {
          primary: '#ffffff',
          secondary: '#b4b4b8',
          tertiary: '#8a8a8e',
        },
        'glass': {
          primary: 'rgba(26, 26, 28, 0.8)',
          secondary: 'rgba(42, 42, 44, 0.6)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        'neon': {
          cyan: '#00d4ff',
          green: '#00ff88',
          purple: '#8b5cf6',
          orange: '#ff6b35',
          pink: '#ff006e',
        },
        border: "hsl(var(--border))",
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
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 212, 255, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.953rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.441rem', { lineHeight: '2.75rem' }],
        '5xl': ['3.052rem', { lineHeight: '3.25rem' }],
        '6xl': ['3.815rem', { lineHeight: '4rem' }],
        '7xl': ['4.768rem', { lineHeight: '5rem' }],
        '8xl': ['5.96rem', { lineHeight: '6rem' }],
        '9xl': ['7.45rem', { lineHeight: '7rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      backdropBlur: {
        '20': '20px',
      },
      backgroundImage: {
        'agent-gradient': 'linear-gradient(135deg, #00d4ff 0%, #00ff88 50%, #8b5cf6 100%)',
        'neural-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'quantum-gradient': 'linear-gradient(135deg, #ff006e 0%, #8b5cf6 50%, #00d4ff 100%)',
      },
      boxShadow: {
        'quantum': '0 25px 50px -12px rgba(0, 212, 255, 0.25)',
        'neural': '0 20px 40px -12px rgba(139, 92, 246, 0.25)',
        'agent': '0 15px 30px -8px rgba(0, 255, 136, 0.25)',
      },
      blur: {
        '4xl': '80px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

// .env.local (template)
// Copy this to .env.local and fill in your values

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="AgentForge Elite"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Environment
NODE_ENV=development

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_RATE_LIMIT_POINTS=60
API_RATE_LIMIT_DURATION=60000

# Authentication (if implemented)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Database (if using external database)
DATABASE_URL=postgresql://username:password@localhost:5432/agentforge
REDIS_URL=redis://localhost:6379

# External APIs
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key

# Monitoring & Analytics
SENTRY_DSN=your-sentry-dsn
GOOGLE_ANALYTICS_ID=your-ga-id

# Feature Flags
NEXT_PUBLIC_FEATURE_AGENTS=true
NEXT_PUBLIC_FEATURE_COLLABORATION=true
NEXT_PUBLIC_FEATURE_ANALYTICS=true
NEXT_PUBLIC_FEATURE_TERMINAL=true

# Deployment
VERCEL_URL=your-vercel-url
DEPLOYMENT_ENVIRONMENT=development

# Valid API Keys (comma-separated)
VALID_API_KEYS=demo-key-123,test-key-456

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      'avatars.githubusercontent.com',
    ],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*',
        destination: '/api/docs/:path*',
      },
    ]
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack config if needed
    return config
  },
}

module.exports = nextConfig

// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"],
      "@/app/*": ["./src/app/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error"
  }
}