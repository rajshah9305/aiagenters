import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'react-hot-toast'

import { cn } from '@/lib/utils'
import { ErrorBoundary } from '@/components/common/error-boundary'
import { LoadingScreen } from '@/components/common/loading-screen'
import { WebSocketProvider } from '@/lib/websocket/client'
import { AuthProvider } from '@/lib/auth/provider'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AgentForge Elite - Revolutionary AI Agents Platform',
    template: '%s | AgentForge Elite'
  },
  description: 'The world\'s most comprehensive AI agents orchestration platform. Deploy, manage, and monitor 50+ autonomous AI agents with revolutionary ease and unprecedented power.',
  keywords: [
    'AI agents',
    'autonomous AI',
    'automation',
    'machine learning',
    'artificial intelligence',
    'agent orchestration',
    'AI platform',
    'AutoGPT',
    'BabyAGI',
    'GPT Engineer',
    'ChatDev',
    'SWE-Agent',
    'AI deployment',
    'real-time AI',
    'neural networks'
  ],
  authors: [{ name: 'AgentForge Team' }],
  creator: 'AgentForge Elite',
  publisher: 'AgentForge Elite',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: 'AgentForge Elite - Revolutionary AI Agents Platform',
    description: 'The world\'s most comprehensive AI agents orchestration platform. Deploy, manage, and monitor 50+ autonomous AI agents.',
    siteName: 'AgentForge Elite',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AgentForge Elite - AI Agents Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentForge Elite - Revolutionary AI Agents Platform',
    description: 'Deploy, manage, and monitor 50+ autonomous AI agents with revolutionary ease.',
    images: ['/images/twitter-image.png'],
    creator: '@agentforge',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  category: 'technology',
  applicationName: 'AgentForge Elite',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AgentForge Elite',
    startupImage: [
      '/images/apple-touch-startup-image-768x1004.png',
      '/images/apple-touch-startup-image-1536x2008.png',
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'AgentForge Elite',
    'application-name': 'AgentForge Elite',
    'msapplication-TileColor': '#0f172a',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#0f172a',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        jetbrainsMono.variable,
        spaceGrotesk.variable,
        'dark antialiased'
      )}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/jetbrains-mono-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/space-grotesk-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//vercel.live" />
        <link rel="dns-prefetch" href="//vitals.vercel-analytics.com" />
        
        {/* Preconnect for critical third-party origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Security headers */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* Performance hints */}
        <meta name="resource-type" content="document" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'AgentForge Elite',
              description: 'Revolutionary AI Agents Orchestration Platform',
              url: process.env.NEXT_PUBLIC_APP_URL,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Any',
              author: {
                '@type': 'Organization',
                name: 'AgentForge Team',
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '1247',
                bestRating: '5',
                worstRating: '1',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-surface-darker via-surface-dark to-surface-darker text-text-primary overflow-x-hidden">
        <ErrorBoundary>
          <AuthProvider>
            <WebSocketProvider>
              <LoadingScreen />
              <div className="relative">
                {children}
              </div>
              
              {/* Toast notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'rgba(15, 23, 42, 0.95)',
                    color: '#f8fafc',
                    border: '1px solid rgba(148, 163, 184, 0.1)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(20px)',
                    fontSize: '14px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#f8fafc',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#f8fafc',
                    },
                  },
                }}
              />
              
              {/* Analytics and monitoring */}
              {process.env.NODE_ENV === 'production' && (
                <>
                  <Analytics />
                  <SpeedInsights />
                </>
              )}
            </WebSocketProvider>
          </AuthProvider>
        </ErrorBoundary>
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}