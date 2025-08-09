import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const loadingVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      default: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    variant: {
      default: 'border-2 border-current border-t-transparent rounded-full',
      dots: 'flex space-x-1',
      pulse: 'bg-current rounded-full animate-pulse',
      neural: 'border-2 border-neon-cyan border-t-transparent rounded-full shadow-neon',
      quantum: 'border-2 border-agent-gradient border-t-transparent rounded-full shadow-quantum',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'neural',
  },
})

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  text?: string
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, variant, text, ...props }, ref) => {
    if (variant === 'dots') {
      return (
        <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'bg-current rounded-full animate-pulse',
                  size === 'sm' && 'h-2 w-2',
                  size === 'default' && 'h-3 w-3',
                  size === 'lg' && 'h-4 w-4',
                  size === 'xl' && 'h-6 w-6'
                )}
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.4s',
                }}
              />
            ))}
          </div>
          {text && <span className="text-text-secondary">{text}</span>}
        </div>
      )
    }

    if (variant === 'pulse') {
      return (
        <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
          <div className={cn(loadingVariants({ size, variant }))} />
          {text && <span className="text-text-secondary">{text}</span>}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
        <div className={cn(loadingVariants({ size, variant }))} />
        {text && <span className="text-text-secondary">{text}</span>}
      </div>
    )
  }
)
LoadingSpinner.displayName = 'LoadingSpinner'

// Neural Network Loading Animation
export const NeuralLoader: React.FC<{
  className?: string
  size?: 'sm' | 'md' | 'lg'
}> = ({ className, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      {/* Neural nodes */}
      <div className="absolute top-2 left-2 w-3 h-3 bg-neon-cyan rounded-full animate-neural-pulse shadow-neon" />
      <div className="absolute top-2 right-2 w-3 h-3 bg-neon-purple rounded-full animate-neural-pulse shadow-neon" style={{ animationDelay: '0.3s' }} />
      <div className="absolute bottom-2 left-2 w-3 h-3 bg-neon-green rounded-full animate-neural-pulse shadow-neon" style={{ animationDelay: '0.6s' }} />
      <div className="absolute bottom-2 right-2 w-3 h-3 bg-neon-pink rounded-full animate-neural-pulse shadow-neon" style={{ animationDelay: '0.9s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-neon-orange rounded-full animate-neural-pulse shadow-neon" style={{ animationDelay: '1.2s' }} />
      
      {/* Neural connections */}
      <div className="absolute top-4 left-5 w-8 h-0.5 bg-gradient-to-r from-neon-cyan to-transparent animate-neural-flow" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-4 left-5 w-0.5 h-8 bg-gradient-to-b from-neon-cyan to-transparent animate-neural-flow" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-4 left-5 w-8 h-0.5 bg-gradient-to-r from-neon-green to-transparent animate-neural-flow" style={{ animationDelay: '1.5s' }} />
    </div>
  )
}

// Full Screen Loading Screen
export const LoadingScreen: React.FC<{
  message?: string
  progress?: number
}> = ({ message = 'Initializing AgentForge Elite...', progress }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-darker">
      <div className="text-center space-y-8">
        <NeuralLoader size="lg" />
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gradient font-display">
            {message}
          </h2>
          
          {progress !== undefined && (
            <div className="w-64 mx-auto">
              <div className="flex justify-between text-sm text-text-tertiary mb-2">
                <span>Loading</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-glass-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-agent-gradient transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Card Loading Skeleton
export const CardSkeleton: React.FC<{
  className?: string
  count?: number
}> = ({ className, count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'bg-glass-primary border border-glass-border rounded-lg p-6 animate-pulse',
            className
          )}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-glass-border rounded-lg" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-glass-border rounded w-3/4" />
                <div className="h-3 bg-glass-border rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-glass-border rounded" />
              <div className="h-3 bg-glass-border rounded w-5/6" />
              <div className="h-3 bg-glass-border rounded w-4/6" />
            </div>
            <div className="flex space-x-2">
              <div className="h-8 bg-glass-border rounded w-20" />
              <div className="h-8 bg-glass-border rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

// Table Loading Skeleton
export const TableSkeleton: React.FC<{
  rows?: number
  columns?: number
}> = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className="h-4 bg-glass-border rounded w-3/4" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid gap-4 animate-pulse"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="h-6 bg-glass-border rounded" />
          ))}
        </div>
      ))}
    </div>
  )
}

// Chart Loading Placeholder
export const ChartSkeleton: React.FC<{
  height?: number
  className?: string
}> = ({ height = 300, className }) => {
  return (
    <div className={cn('relative animate-pulse', className)} style={{ height }}>
      <div className="absolute inset-0 bg-glass-secondary rounded-lg flex items-end justify-center space-x-2 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-glass-border rounded-t"
            style={{
              width: '20px',
              height: `${Math.random() * 80 + 20}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export {
  LoadingSpinner,
  loadingVariants,
}