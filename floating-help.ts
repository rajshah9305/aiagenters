'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, Keyboard, X, ChevronRight, Zap, Search, Terminal, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils/cn'

interface FloatingHelpProps {
  className?: string
}

export function FloatingHelp({ className }: FloatingHelpProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'shortcuts' | 'guide' | 'features'>('shortcuts')

  // Keyboard shortcut to open help
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === '/') {
        event.preventDefault()
        setIsOpen(true)
      }
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <>
      {/* Floating Help Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn('fixed bottom-6 right-6 z-40', className)}
      >
        <Button
          onClick={() => setIsOpen(true)}
          variant="neural"
          size="icon"
          className="w-14 h-14 rounded-full shadow-quantum hover:shadow-neon-lg"
          aria-label="Open help"
        >
          <HelpCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Help Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-surface-darker/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl text-gradient font-display">
                    AgentForge Elite Help
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-4 h-[600px]">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 border-r border-glass-border p-4 space-y-2">
                      <HelpTab
                        active={activeTab === 'shortcuts'}
                        onClick={() => setActiveTab('shortcuts')}
                        icon={<Keyboard className="h-4 w-4" />}
                        title="Keyboard Shortcuts"
                      />
                      <HelpTab
                        active={activeTab === 'guide'}
                        onClick={() => setActiveTab('guide')}
                        icon={<Zap className="h-4 w-4" />}
                        title="Quick Start Guide"
                      />
                      <HelpTab
                        active={activeTab === 'features'}
                        onClick={() => setActiveTab('features')}
                        icon={<Users className="h-4 w-4" />}
                        title="Features Overview"
                      />
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 p-6 overflow-y-auto">
                      <AnimatePresence mode="wait">
                        {activeTab === 'shortcuts' && (
                          <motion.div
                            key="shortcuts"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <KeyboardShortcuts />
                          </motion.div>
                        )}
                        {activeTab === 'guide' && (
                          <motion.div
                            key="guide"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <QuickStartGuide />
                          </motion.div>
                        )}
                        {activeTab === 'features' && (
                          <motion.div
                            key="features"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <FeaturesOverview />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Help Tab Component
interface HelpTabProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  title: string
}

function HelpTab({ active, onClick, icon, title }: HelpTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200',
        active
          ? 'bg-agent-gradient text-black shadow-lg'
          : 'text-text-secondary hover:text-text-primary hover:bg-glass-secondary'
      )}
    >
      {icon}
      <span className="font-medium">{title}</span>
      {active && <ChevronRight className="h-4 w-4 ml-auto" />}
    </button>
  )
}

// Keyboard Shortcuts Component
function KeyboardShortcuts() {
  const shortcuts = [
    {
      category: 'General',
      items: [
        { keys: ['Ctrl', '/'], description: 'Open help panel' },
        { keys: ['Esc'], description: 'Close modals and overlays' },
        { keys: ['Ctrl', 'K'], description: 'Quick search agents' },
        { keys: ['?'], description: 'Show keyboard shortcuts' },
      ],
    },
    {
      category: 'Navigation',
      items: [
        { keys: ['G', 'H'], description: 'Go to home page' },
        { keys: ['G', 'A'], description: 'Go to agents page' },
        { keys: ['G', 'W'], description: 'Go to workspace' },
        { keys: ['G', 'T'], description: 'Go to terminal' },
      ],
    },
    {
      category: 'Terminal',
      items: [
        { keys: ['Ctrl', '`'], description: 'Focus terminal input' },
        { keys: ['↑'], description: 'Previous command' },
        { keys: ['↓'], description: 'Next command' },
        { keys: ['Tab'], description: 'Auto-complete command' },
      ],
    },
    {
      category: 'Agents',
      items: [
        { keys: ['Space'], description: 'Deploy selected agent' },
        { keys: ['Enter'], description: 'View agent details' },
        { keys: ['D'], description: 'Quick deploy agent' },
        { keys: ['S'], description: 'Stop agent execution' },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">Keyboard Shortcuts</h3>
        <p className="text-text-secondary">
          Master AgentForge Elite with these powerful keyboard shortcuts.
        </p>
      </div>

      {shortcuts.map((category) => (
        <div key={category.category} className="space-y-3">
          <h4 className="text-lg font-medium text-neon-cyan">{category.category}</h4>
          <div className="grid gap-2">
            {category.items.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-glass-secondary">
                <span className="text-text-primary">{shortcut.description}</span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, keyIndex) => (
                    <kbd
                      key={keyIndex}
                      className="px-2 py-1 text-xs font-mono bg-glass-border rounded border border-glass-border text-text-primary"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// Quick Start Guide Component
function QuickStartGuide() {
  const steps = [
    {
      title: '1. Explore the Agent Library',
      description: 'Browse 50+ AI agents organized by category. Use filters and search to find the perfect agent for your needs.',
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: '2. Deploy Your First Agent',
      description: 'Click "Deploy" on any agent card. Choose your environment (development, staging, or production) and customize configuration.',
      icon: <Zap className="h-5 w-5" />,
    },
    {
      title: '3. Monitor in Workspace',
      description: 'Watch your agents work in real-time through the workspace. Track progress, view logs, and manage multiple agents simultaneously.',
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: '4. Use the Terminal',
      description: 'Access advanced features through our AI-powered terminal. Type "help" to see available commands and start orchestrating agents.',
      icon: <Terminal className="h-5 w-5" />,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">Quick Start Guide</h3>
        <p className="text-text-secondary">
          Get started with AgentForge Elite in just a few minutes.
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4 p-4 rounded-lg bg-glass-secondary">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-agent-gradient flex items-center justify-center text-black">
              {step.icon}
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-1">{step.title}</h4>
              <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-neon-green/10 border border-neon-green/20">
        <h4 className="font-medium text-neon-green mb-2">💡 Pro Tip</h4>
        <p className="text-text-secondary text-sm">
          Use Ctrl+/ anytime to open this help panel, or type "help" in the terminal for command-specific guidance.
        </p>
      </div>
    </div>
  )
}

// Features Overview Component
function FeaturesOverview() {
  const features = [
    {
      title: 'AI Agent Library',
      description: '50+ curated AI agents for coding, research, automation, and more.',
      icon: '🤖',
    },
    {
      title: 'Real-time Workspace',
      description: 'Monitor and manage multiple agents simultaneously with live updates.',
      icon: '🛠️',
    },
    {
      title: 'Advanced Terminal',
      description: 'AI-powered command interface with 20+ specialized commands.',
      icon: '💻',
    },
    {
      title: 'Team Collaboration',
      description: 'Share workspaces and collaborate on agent deployments in real-time.',
      icon: '👥',
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive insights into agent performance and usage metrics.',
      icon: '📊',
    },
    {
      title: 'Enterprise Ready',
      description: 'Secure, scalable, and designed for production environments.',
      icon: '🏢',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">Features Overview</h3>
        <p className="text-text-secondary">
          Discover the powerful features that make AgentForge Elite the ultimate AI agents platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="p-4 rounded-lg bg-glass-secondary hover:bg-glass-primary transition-colors">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{feature.icon}</span>
              <div>
                <h4 className="font-medium text-text-primary mb-1">{feature.title}</h4>
                <p className="text-text-secondary text-sm">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-agent-gradient text-black">
        <h4 className="font-medium mb-2">🚀 What's Next?</h4>
        <p className="text-sm opacity-90">
          We're constantly adding new agents and features. Follow our roadmap and join our community to stay updated on the latest developments.
        </p>
      </div>
    </div>
  )
}