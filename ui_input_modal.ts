// ===== input.tsx =====
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const inputVariants = cva(
  'flex w-full rounded-md border bg-background px-3 py-2 text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input bg-background',
        glass: 'border-glass-border bg-glass-secondary backdrop-blur-20 text-text-primary placeholder:text-text-tertiary focus:border-neon-cyan focus:shadow-neon',
        neural: 'border-glass-border bg-glass-primary backdrop-blur-20 text-text-primary focus:border-neon-green focus:shadow-neon-lg',
      },
      size: {
        default: 'h-10',
        sm: 'h-9',
        lg: 'h-11',
        xl: 'h-12',
      },
    },
    defaultVariants: {
      variant: 'glass',
      size: 'default',
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
  error?: string
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, icon, error, label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size }),
              icon && 'pl-10',
              error && 'border-red-500 focus:border-red-500',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// Search Input Component
export interface SearchInputProps extends Omit<InputProps, 'icon' | 'type'> {
  onSearch?: (value: string) => void
  debounceMs?: number
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, debounceMs = 300, placeholder = 'Search...', ...props }, ref) => {
    const [value, setValue] = React.useState('')
    const timeoutRef = React.useRef<NodeJS.Timeout>()

    React.useEffect(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      
      timeoutRef.current = setTimeout(() => {
        onSearch?.(value)
      }, debounceMs)

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [value, onSearch, debounceMs])

    return (
      <Input
        ref={ref}
        type="text"
        icon="🔍"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      />
    )
  }
)
SearchInput.displayName = 'SearchInput'

// ===== modal.tsx =====
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const Modal = DialogPrimitive.Root

const ModalTrigger = DialogPrimitive.Trigger

const ModalPortal = DialogPrimitive.Portal

const ModalClose = DialogPrimitive.Close

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  }
>(({ className, size = 'md', children, ...props }, ref) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]',
  }

  return (
    <ModalPortal>
      <ModalOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border border-glass-border bg-glass-primary backdrop-blur-20 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </ModalPortal>
  )
})
ModalContent.displayName = DialogPrimitive.Content.displayName

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
ModalHeader.displayName = 'ModalHeader'

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
ModalFooter.displayName = 'ModalFooter'

const ModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight text-text-primary',
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = DialogPrimitive.Title.displayName

const ModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-text-secondary', className)}
    {...props}
  />
))
ModalDescription.displayName = DialogPrimitive.Description.displayName

// Agent Detail Modal Component
export interface AgentDetailModalProps {
  agent: any
  isOpen: boolean
  onClose: () => void
  onDeploy?: () => void
}

const AgentDetailModal: React.FC<AgentDetailModalProps> = ({
  agent,
  isOpen,
  onClose,
  onDeploy,
}) => {
  if (!agent) return null

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <ModalContent size="xl">
        <ModalHeader>
          <div className="flex items-center gap-4 mb-4">
            {agent.icon && (
              <div className="text-4xl p-3 rounded-xl bg-agent-gradient text-black">
                {agent.icon}
              </div>
            )}
            <div>
              <ModalTitle className="text-2xl text-gradient font-display">
                {agent.name}
              </ModalTitle>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-neon-cyan/20 text-neon-cyan text-sm">
                  {agent.category}
                </span>
                <span className="text-sm text-text-tertiary">
                  Version {agent.version}
                </span>
                {agent.metadata?.rating && (
                  <div className="flex items-center gap-1 text-neon-orange">
                    <span>★</span>
                    <span className="text-sm">{agent.metadata.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ModalHeader>

        <div className="space-y-6">
          <ModalDescription className="text-base">
            {agent.description}
          </ModalDescription>

          <div>
            <h3 className="text-lg font-semibold text-neon-cyan mb-3">
              🚀 Capabilities
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {agent.capabilities}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-neon-cyan mb-3">
              ⚡ Key Features
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {agent.features?.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="px-3 py-2 rounded-lg bg-glass-secondary border border-glass-border text-sm text-text-primary"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-neon-cyan mb-3">
              🎯 Use Cases
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {agent.useCases?.map((useCase: string, index: number) => (
                <div
                  key={index}
                  className="px-3 py-2 rounded-lg bg-glass-secondary border border-glass-border text-sm text-text-primary"
                >
                  {useCase}
                </div>
              ))}
            </div>
          </div>

          {agent.performance && (
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-glass-secondary border border-glass-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">
                  {agent.performance.successRate}
                </div>
                <div className="text-sm text-text-tertiary">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">
                  {agent.performance.averageSpeed}
                </div>
                <div className="text-sm text-text-tertiary">Avg Speed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">
                  {agent.performance.uptime}
                </div>
                <div className="text-sm text-text-tertiary">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient">
                  {agent.metadata?.totalDeployments || '0'}
                </div>
                <div className="text-sm text-text-tertiary">Deployments</div>
              </div>
            </div>
          )}
        </div>

        <ModalFooter className="gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="neural" onClick={onDeploy}>
            🚀 Deploy Agent
          </Button>
          {agent.repositoryUrl && (
            <Button 
              variant="ghost" 
              onClick={() => window.open(agent.repositoryUrl, '_blank')}
            >
              📚 Documentation
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  AgentDetailModal,
  Input,
  SearchInput,
  inputVariants,
}