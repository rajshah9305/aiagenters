'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Search, Bell, User, Settings, LogOut } from 'lucide-react'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FEATURE_FLAGS } from '@/lib/utils/constants'

const navigation = [
  { name: 'Agents', href: '/agents', icon: '🤖', enabled: FEATURE_FLAGS.AGENTS },
  { name: 'Workspace', href: '/workspace', icon: '🛠️', enabled: FEATURE_FLAGS.COLLABORATION },
  { name: 'Analytics', href: '/analytics', icon: '📊', enabled: FEATURE_FLAGS.ANALYTICS },
  { name: 'Terminal', href: '/terminal', icon: '💻', enabled: FEATURE_FLAGS.TERMINAL },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'bg-glass-primary backdrop-blur-20 border-b border-glass-border',
          isScrolled && 'shadow-lg bg-glass-primary/95'
        )}
      >
        {/* Gradient overlay */}
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-1 bg-agent-gradient transition-opacity duration-300',
            isScrolled ? 'opacity-100' : 'opacity-0'
          )}
        />

        <div className="container-fluid">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
              >
                <div className="relative">
                  <div className="text-2xl font-black font-display text-gradient">
                    AgentForge
                  </div>
                  <div className="absolute -top-1 -right-6 px-2 py-0.5 text-xs font-bold bg-agent-gradient text-black rounded-full animate-badge-glow">
                    ELITE
                  </div>
                </div>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1 ml-8">
                {navigation.filter(item => item.enabled).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      'hover:bg-glass-secondary hover:text-text-primary',
                      pathname === item.href
                        ? 'bg-glass-secondary text-text-primary border border-glass-border'
                        : 'text-text-secondary'
                    )}
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="relative hidden sm:flex"
              >
                <Search className="h-4 w-4" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-neon-green rounded-full animate-pulse" />
              </Button>

              {/* User Menu */}
              <div className="relative group">
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-glass-primary backdrop-blur-20 border border-glass-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-2 space-y-1">
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-glass-secondary rounded-md transition-colors">
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-glass-secondary rounded-md transition-colors">
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <div className="border-t border-glass-border my-1" />
                    <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-glass-secondary rounded-md transition-colors">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-glass-border bg-glass-secondary/50"
            >
              <div className="container-fluid py-4">
                <div className="max-w-2xl mx-auto">
                  <Input
                    placeholder="Search agents, features, or categories..."
                    className="w-full"
                    icon={<Search className="h-4 w-4" />}
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-glass-border bg-glass-primary/95 backdrop-blur-20"
            >
              <div className="container-fluid py-4 space-y-2">
                {navigation.filter(item => item.enabled).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                      'hover:bg-glass-secondary',
                      pathname === item.href
                        ? 'bg-glass-secondary text-text-primary'
                        : 'text-text-secondary'
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
                
                <div className="border-t border-glass-border my-4" />
                
                {/* Mobile Search */}
                <div className="px-4">
                  <Input
                    placeholder="Search agents..."
                    icon={<Search className="h-4 w-4" />}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16" />
    </>
  )
}

// System Status Indicator
export function SystemStatus() {
  const [status, setStatus] = React.useState<'healthy' | 'degraded' | 'down'>('healthy')
  const [stats, setStats] = React.useState({
    agents: 847,
    deployments: 12,
    uptime: '99.9%'
  })

  React.useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        agents: prev.agents + Math.floor(Math.random() * 3 - 1),
        deployments: Math.max(0, prev.deployments + Math.floor(Math.random() * 5 - 2))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const statusConfig = {
    healthy: { color: 'text-neon-green', bg: 'bg-neon-green/20', icon: '🟢' },
    degraded: { color: 'text-yellow-400', bg: 'bg-yellow-400/20', icon: '🟡' },
    down: { color: 'text-red-400', bg: 'bg-red-400/20', icon: '🔴' }
  }

  return (
    <div className="hidden lg:flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <span className={statusConfig[status].icon} />
        <span className={cn('font-medium', statusConfig[status].color)}>
          System {status}
        </span>
      </div>
      
      <div className="flex items-center gap-4 text-text-tertiary">
        <span>Agents: {stats.agents}</span>
        <span>Active: {stats.deployments}</span>
        <span>Uptime: {stats.uptime}</span>
      </div>
    </div>
  )
}

// Navigation breadcrumbs for sub-pages
export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length <= 1) return null

  return (
    <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
      <Link href="/" className="hover:text-text-primary transition-colors">
        Home
      </Link>
      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/')
        const isLast = index === segments.length - 1
        const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')

        return (
          <React.Fragment key={href}>
            <span>/</span>
            {isLast ? (
              <span className="text-text-primary font-medium">{name}</span>
            ) : (
              <Link href={href} className="hover:text-text-primary transition-colors">
                {name}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}