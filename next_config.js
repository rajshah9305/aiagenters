/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['three'],
  },
  
  // Performance optimizations
  swcMinify: true,
  compress: true,
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production' 
              ? 'https://your-domain.vercel.app' 
              : '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  
  // Webpack configuration for Three.js and other optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle Three.js
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    
    // Optimize bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: 'three',
          chunks: 'all',
        },
      },
    };
    
    // Add support for GLSL files (Three.js shaders)
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    
    return config;
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: 'agentforge-elite',
    VERSION: '1.0.0',
  },
  
  // Redirects and rewrites
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // API routes configuration
  async rewrites() {
    return [
      {
        source: '/api/ws',
        destination: '/api/websocket',
      },
    ];
  },
  
  // Build output configuration
  output: 'standalone',
  
  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Experimental features
  experimental: {
    appDir: true,
    serverActions: true,
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      'framer-motion',
    ],
  },
  
  // Analytics and monitoring
  analyticsId: process.env.VERCEL_ANALYTICS_ID,
  
  // Development configuration
  ...(process.env.NODE_ENV === 'development' && {
    reactStrictMode: true,
    devIndicators: {
      buildActivity: true,
      buildActivityPosition: 'bottom-right',
    },
  }),
  
  // Production optimizations
  ...(process.env.NODE_ENV === 'production' && {
    poweredByHeader: false,
    generateEtags: true,
    distDir: '.next',
  }),
};

module.exports = nextConfig;