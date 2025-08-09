// src/app/page.tsx
'use client'

import * as React from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { HeroSection } from '@/components/sections/hero-section'
import { AgentsSection } from '@/components/sections/agents-section'
import { WorkspaceSection } from '@/components/sections/workspace-section'
import { TerminalSection } from '@/components/sections/terminal-section'
import { CollaborationSection } from '@/components/sections/collaboration-section'
import { AnalyticsSection } from '@/components/sections/analytics-section'

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <AgentsSection />
      <WorkspaceSection />
      <TerminalSection />
      <CollaborationSection />
      <AnalyticsSection />
    </MainLayout>
  )
}

// src/app/globals.css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800&display=swap');

/* CSS Variables */
:root {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
  --radius: 0.75rem;
}

/* Base Styles */
* {
  border-color: hsl(var(--border));
}

body {
  color: hsl(var(--foreground));
  background: hsl(var(--background));
  font-feature-settings: "rlig" 1, "calt" 1;
}

/* Custom Utilities */
@layer base {
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
  }
}

@layer components {
  .container-fluid {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-padding {
    @apply py-16 lg:py-24;
  }

  .text-gradient {
    @apply bg-gradient-to-r from-neon-cyan via-neon-green to-neon-purple bg-clip-text text-transparent;
  }

  .bg-gradient-neural {
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
  }

  .border-gradient {
    background: linear-gradient(135deg, transparent, rgba(0, 212, 255, 0.3), transparent);
    background-size: 200% 200%;
    animation: gradient-border 3s ease infinite;
  }

  .backdrop-blur-20 {
    backdrop-filter: blur(20px);
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(26, 26, 28, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 212, 255, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 212, 255, 0.5);
  }

  /* Selection Styling */
  ::selection {
    background: rgba(0, 212, 255, 0.3);
    color: white;
  }

  /* Focus Styles */
  .focus-visible:focus-visible {
    outline: 2px solid #00d4ff;
    outline-offset: 2px;
  }
}

@layer utilities {
  .animate-gradient-x {
    animation: gradient-x 15s ease infinite;
    background-size: 200% 200%;
  }

  .animate-gradient-y {
    animation: gradient-y 15s ease infinite;
    background-size: 200% 200%;
  }

  .animate-gradient-xy {
    animation: gradient-xy 15s ease infinite;
    background-size: 400% 400%;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

/* Keyframe Animations */
@keyframes gradient-x {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes gradient-y {
  0%, 100% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
}

@keyframes gradient-xy {
  0%, 100% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
}

@keyframes gradient-border {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Dark mode optimizations */
@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .text-gradient {
    @apply text-white;
    background: none;
  }
}

/* Print styles */
@media print {
  * {
    background: white !important;
    color: black !important;
  }
}

// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AgentForge Elite - Revolutionary AI Agents Platform',
  description: 'Deploy, manage, and orchestrate autonomous AI agents with unprecedented power and ease. The ultimate AI agents platform.',
  keywords: ['AI', 'agents', 'automation', 'artificial intelligence', 'orchestration'],
  authors: [{ name: 'AgentForge Elite Team' }],
  creator: 'AgentForge Elite',
  publisher: 'AgentForge Elite',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://agentforge-elite.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AgentForge Elite - Revolutionary AI Agents Platform',
    description: 'Deploy, manage, and orchestrate autonomous AI agents with unprecedented power and ease.',
    url: 'https://agentforge-elite.com',
    siteName: 'AgentForge Elite',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AgentForge Elite - AI Agents Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentForge Elite - Revolutionary AI Agents Platform',
    description: 'Deploy, manage, and orchestrate autonomous AI agents with unprecedented power and ease.',
    images: ['/twitter-image.jpg'],
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
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

// src/lib/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// src/components/sections/agents-section.tsx
'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react'
import { useAgents } from '@/lib/hooks/use-agents'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { AgentCard, CardSkeleton } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AGENT_CATEGORIES, SORT_OPTIONS } from '@/lib/utils/constants'
import { cn } from '@/lib/utils/cn'

export function AgentsSection() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('')
  const [sortBy, setSortBy] = React.useState('popularity-desc')
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')

  const debouncedSearch = useDebounce(searchTerm, 300)

  const { agents, loading, error, loadMore, hasNext } = useAgents({
    search: debouncedSearch,
    category: selectedCategory || undefined,
    sortBy: sortBy.split('-')[0] as any,
    sortOrder: sortBy.split('-')[1] as 'asc' | 'desc',
    limit: 12,
  })

  return (
    <section id="agents" className="section-padding">
      <div className="container-fluid">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black font-display text-gradient mb-6">
            AI Agents Marketplace
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Discover and deploy cutting-edge AI agents. From autonomous coding assistants to 
            research powerhouses - find the perfect agent for your needs.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row gap-4 mb-12"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <Input
              placeholder="Search agents by name, features, or use cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {Object.entries(AGENT_CATEGORIES).map(([key, category]) => (
                <SelectItem key={key} value={key}>
                  {category.icon} {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex rounded-lg border border-glass-border overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'neural' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'neural' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Agents Grid */}
        <div className={cn(
          'grid gap-6',
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        )}>
          {loading && agents.length === 0 ? (
            <CardSkeleton count={6} />
          ) : (
            agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AgentCard
                  agent={{
                    id: agent.id,
                    name: agent.name,
                    category: agent.category,
                    description: agent.description,
                    icon: agent.icon,
                    rating: agent.metadata.rating,
                    deployments: agent.metadata.totalDeployments,
                    status: agent.isActive ? 'active' : 'inactive',
                  }}
                  onDeploy={() => console.log('Deploy agent:', agent.id)}
                  onView={() => console.log('View agent:', agent.id)}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* Load More */}
        {hasNext && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              onClick={loadMore}
              disabled={loading}
              className="px-8"
            >
              {loading ? 'Loading...' : 'Load More Agents'}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">Error: {error}</div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}