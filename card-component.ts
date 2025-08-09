import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { Button } from './button'

const cardVariants = cva(
  'rounded-lg border text-card-foreground shadow-sm transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-card border-border',
        glass: 'bg-glass-primary backdrop-blur-20 border-glass-border',
        neural: 'bg-glass-primary backdrop-blur-20 border-glass-border hover:border-neon-cyan hover:shadow-neon',
        quantum: 'bg-glass-primary backdrop-blur-20 border-glass-border hover:border-neon-green hover:shadow-quantum',
      },
      size: {
        default: 'p-6',
        sm: 'p-4',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'glass',
      size: 'default',
    },
  }
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants({ variant, size }), className)}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight text-text-primary',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

// Agent Card Component
interface AgentCardData {
  id: string
  name: string
  category: string
  description: string
  icon?: string
  rating?: number
  deployments?: string
  status?: 'active' | 'inactive' | 'deploying'
}

interface AgentCardProps {
  agent: AgentCardData
  onDeploy?: () => void
  onView?: () => void
  className?: string
}

const AgentCard = React.forwardRef<HTMLDivElement, AgentCardProps>(
  ({ agent, onDeploy, onView, className }, ref) => {
    const statusConfig = {
      active: { color: 'text-neon-green', bg: 'bg-neon-green/20', label: 'Active' },
      inactive: { color: 'text-text-tertiary', bg: 'bg-glass-border', label: 'Inactive' },
      deploying: { color: 'text-neon-orange', bg: 'bg-neon-orange/20', label: 'Deploying' },
    }

    const currentStatus = statusConfig[agent.status || 'inactive']

    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn('group cursor-pointer', className)}
      >
        <Card variant="neural" className="h-full transition-all duration-300 hover:shadow-quantum">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {agent.icon ? (
                  <div className="w-12 h-12 rounded-lg bg-agent-gradient flex items-center justify-center text-black text-xl font-bold">
                    {agent.icon}
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-agent-gradient flex items-center justify-center text-black text-xl font-bold">
                    {agent.name.charAt(0)}
                  </div>
                )}
                <div>
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 text-xs bg-neon-cyan/20 text-neon-cyan rounded-full">
                      {agent.category}
                    </span>
                    {agent.status && (
                      <div className={cn('flex items-center gap-1', currentStatus.color)}>
                        <div className={cn('w-2 h-2 rounded-full', currentStatus.bg)} />
                        <span className="text-xs">{currentStatus.label}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {agent.rating && (
                <div className="flex items-center gap-1 text-neon-orange">
                  <span>★</span>
                  <span className="text-sm font-medium">{agent.rating}</span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <CardDescription className="text-base leading-relaxed">
              {agent.description}
            </CardDescription>
            
            {agent.deployments && (
              <div className="mt-4 flex items-center gap-2 text-sm text-text-tertiary">
                <span>🚀</span>
                <span>{agent.deployments} deployments</span>
              </div>
            )}
          </CardContent>

          <CardFooter className="gap-2">
            <Button
              variant="neural"
              size="sm"
              onClick={onDeploy}
              className="flex-1"
            >
              🚀 Deploy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onView}
              className="flex-1"
            >
              📄 Details
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    )
  }
)
AgentCard.displayName = 'AgentCard'

// Card Skeleton for loading states
interface CardSkeletonProps {
  className?: string
  count?: number
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ className, count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className={cn('h-full animate-pulse', className)}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-glass-border rounded-lg" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-glass-border rounded w-3/4" />
                <div className="h-3 bg-glass-border rounded w-1/2" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-3 bg-glass-border rounded" />
              <div className="h-3 bg-glass-border rounded w-5/6" />
              <div className="h-3 bg-glass-border rounded w-4/6" />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex gap-2 w-full">
              <div className="h-8 bg-glass-border rounded flex-1" />
              <div className="h-8 bg-glass-border rounded flex-1" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  AgentCard,
  CardSkeleton,
  cardVariants,
}