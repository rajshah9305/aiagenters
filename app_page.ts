'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

import { Navbar } from '@/components/layout/navbar'
import { HeroSection } from '@/components/sections/hero-section'
import { AgentsSection } from '@/components/sections/agents-section'
import { WorkspaceSection } from '@/components/sections/workspace-section'
import { TerminalSection } from '@/components/sections/terminal-section'
import { CollaborationSection } from '@/components/sections/collaboration-section'
import { AnalyticsSection } from '@/components/sections/analytics-section'
import { Footer } from '@/components/layout/footer'
import { LoadingSpinner } from '@/components/ui/loading'
import { FloatingHelp } from '@/components/common/floating-help'

// Dynamic imports for performance optimization
const ParticleSystem = dynamic(
  () => import('@/components/background/particle-system'),
  {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-gradient-to-br from-surface-darker via-surface-dark to-surface-darker" />
  }
)

const NeuralNetwork = dynamic(
  () => import('@/components/background/neural-network'),
  { ssr: false }
)

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Background Systems */}
      <Suspense fallback={null}>
        <ParticleSystem />
        <NeuralNetwork />
      </Suspense>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Page Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative"
        >
          <HeroSection />
        </motion.section>
        
        {/* Agents Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-100px' }}
          id="agents"
          className="relative"
        >
          <Suspense fallback={<LoadingSpinner className="mx-auto my-20" />}>
            <AgentsSection />
          </Suspense>
        </motion.section>
        
        {/* Workspace Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
          id="workspace"
          className="relative"
        >
          <Suspense fallback={<LoadingSpinner className="mx-auto my-20" />}>
            <WorkspaceSection />
          </Suspense>
        </motion.section>
        
        {/* Terminal Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
          id="terminal"
          className="relative"
        >
          <Suspense fallback={<LoadingSpinner className="mx-auto my-20" />}>
            <TerminalSection />
          </Suspense>
        </motion.section>
        
        {/* Collaboration Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          id="collaboration"
          className="relative"
        >
          <Suspense fallback={<LoadingSpinner className="mx-auto my-20" />}>
            <CollaborationSection />
          </Suspense>
        </motion.section>
        
        {/* Analytics Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          id="analytics"
          className="relative"
        >
          <Suspense fallback={<LoadingSpinner className="mx-auto my-20" />}>
            <AnalyticsSection />
          </Suspense>
        </motion.section>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Elements */}
      <FloatingHelp />
      
      {/* Scroll to top functionality */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-agent-gradient text-black shadow-lg transition-all duration-300 hover:shadow-quantum focus:outline-none focus:ring-2 focus:ring-agent-cyan focus:ring-offset-2 focus:ring-offset-surface-darker"
        aria-label="Scroll to top"
      >
        <svg
          className="h-6 w-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-agent-gradient origin-left z-50"
        initial={{ scaleX: 0 }}
        style={{
          scaleX: typeof window !== 'undefined' ? 
            window.pageYOffset / (document.body.scrollHeight - window.innerHeight) : 0
        }}
      />
      
      {/* Keyboard shortcuts */}
      <div className="hidden">
        <div className="sr-only">
          <p>Keyboard shortcuts:</p>
          <ul>
            <li>Press Ctrl + / to open help</li>
            <li>Press Escape to close modals</li>
            <li>Press Tab to navigate between elements</li>
          </ul>
        </div>
      </div>
    </main>
  )
}