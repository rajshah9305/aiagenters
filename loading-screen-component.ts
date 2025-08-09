'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface LoadingScreenProps {
  isLoading?: boolean
  message?: string
  progress?: number
  onComplete?: () => void
  duration?: number
}

export function LoadingScreen({ 
  isLoading = true, 
  message = 'Initializing AgentForge Elite Neural Network...', 
  progress,
  onComplete,
  duration = 2500 
}: LoadingScreenProps) {
  const [showLoading, setShowLoading] = React.useState(isLoading)
  const [currentProgress, setCurrentProgress] = React.useState(0)

  React.useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false)
        onComplete?.()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading, onComplete])

  // Simulate progress if not provided
  React.useEffect(() => {
    if (progress === undefined && showLoading) {
      const interval = setInterval(() => {
        setCurrentProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 200)
      return () => clearInterval(interval)
    } else if (progress !== undefined) {
      setCurrentProgress(progress)
    }
  }, [progress, showLoading])

  if (!showLoading) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-surface-darker"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(102,126,234,0.3)_0,transparent_50%)]" />
        </div>

        <div className="text-center space-y-8 relative z-10">
          {/* Neural Loader */}
          <motion.div 
            className="neural-loader mx-auto"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <NeuralLoader />
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="text-2xl font-bold text-gradient font-display max-w-md">
              {message}
            </div>

            {/* Progress Bar */}
            {(progress !== undefined || currentProgress > 0) && (
              <div className="w-80 mx-auto">
                <div className="flex justify-between text-sm text-text-tertiary mb-2">
                  <span>Loading</span>
                  <span>{Math.round(progress ?? currentProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-glass-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-agent-gradient"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress ?? currentProgress}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* Status Messages */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sm text-text-tertiary"
            >
              <StatusMessages />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Neural Loader Component
function NeuralLoader() {
  return (
    <div className="relative w-32 h-32">
      {/* Neural Nodes */}
      <div className="absolute top-4 left-4 w-3 h-3 bg-neon-cyan rounded-full animate-neural-pulse shadow-neon" />
      <div 
        className="absolute top-4 right-4 w-3 h-3 bg-neon-purple rounded-full animate-neural-pulse shadow-neon" 
        style={{ animationDelay: '0.3s' }} 
      />
      <div 
        className="absolute bottom-4 left-4 w-3 h-3 bg-neon-green rounded-full animate-neural-pulse shadow-neon" 
        style={{ animationDelay: '0.6s' }} 
      />
      <div 
        className="absolute bottom-4 right-4 w-3 h-3 bg-neon-pink rounded-full animate-neural-pulse shadow-neon" 
        style={{ animationDelay: '0.9s' }} 
      />
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-neon-orange rounded-full animate-neural-pulse shadow-neon" 
        style={{ animationDelay: '1.2s' }} 
      />

      {/* Neural Connections */}
      <div 
        className="absolute top-6 left-7 w-14 h-0.5 bg-gradient-to-r from-neon-cyan to-transparent animate-neural-flow" 
        style={{ animationDelay: '0.5s' }} 
      />
      <div 
        className="absolute top-7 left-6 w-0.5 h-14 bg-gradient-to-b from-neon-cyan to-transparent animate-neural-flow" 
        style={{ animationDelay: '1s' }} 
      />
      <div 
        className="absolute bottom-6 left-7 w-14 h-0.5 bg-gradient-to-r from-neon-green to-transparent animate-neural-flow" 
        style={{ animationDelay: '1.5s' }} 
      />
    </div>
  )
}

// Status Messages Component
function StatusMessages() {
  const messages = [
    'Loading neural pathways...',
    'Initializing agent registry...',
    'Connecting to quantum servers...',
    'Preparing workspace environment...',
    'Almost ready...'
  ]

  const [currentMessage, setCurrentMessage] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length)
    }, 800)
    return () => clearInterval(interval)
  }, [messages.length])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMessage}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="h-6 flex items-center justify-center"
      >
        {messages[currentMessage]}
      </motion.div>
    </AnimatePresence>
  )
}

// Minimal Loading Spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'neural' | 'quantum'
  className?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'neural', 
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const variantClasses = {
    default: 'border-current border-t-transparent',
    neural: 'border-neon-cyan border-t-transparent',
    quantum: 'border-neon-green border-t-transparent'
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  )
}

// Page Loading Overlay
interface PageLoadingProps {
  isLoading: boolean
  message?: string
}

export function PageLoading({ isLoading, message = 'Loading...' }: PageLoadingProps) {
  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-surface-darker/80 backdrop-blur-sm"
    >
      <div className="bg-glass-primary backdrop-blur-20 border border-glass-border rounded-lg p-8 text-center space-y-4">
        <LoadingSpinner size="lg" variant="neural" className="mx-auto" />
        <div className="text-lg font-medium text-text-primary">{message}</div>
      </div>
    </motion.div>
  )
}

// Component Loading Skeleton
interface ComponentLoadingProps {
  className?: string
  height?: string
  lines?: number
}

export function ComponentLoading({ 
  className, 
  height = 'h-32', 
  lines = 3 
}: ComponentLoadingProps) {
  return (
    <div className={cn('animate-pulse space-y-4', className)}>
      <div className={cn('bg-glass-border rounded-lg', height)} />
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-3 bg-glass-border rounded',
              i === lines - 1 ? 'w-3/4' : 'w-full'
            )}
          />
        ))}
      </div>
    </div>
  )
}