// src/components/layout/header.tsx
'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu, X, Zap, Users, BarChart3, Terminal, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

interface NavigationItem {
  label: string
  href: string
  icon?: React.ReactNode
  badge?: string
}

const navigationItems: NavigationItem[] = [
  { label: 'Agents', href: '#agents', icon: <Zap className="h-4 w-4" /> },
  { label: 'Workspace', href: '#workspace', icon: <Terminal className="h-4 w-4" /> },
  { label: 'Collaboration', href: '#collaboration', icon: <Users className="h-4 w-4" /> },
  { label: 'Analytics', href: '#analytics', icon: <BarChart3 className="h-4 w-4" /> },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-surface-dark/80 backdrop-blur-20 border-b border-glass-border shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-agent-gradient flex items-center justify-center">
              <Zap className="h-5 w-5 text-black" />
            </div>
            <div className="font-display font-black text-xl text-gradient">
              AgentForge Elite
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-neon-cyan/20 text-neon-cyan rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </motion.div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="neural" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-glass-border bg-surface-dark/95 backdrop-blur-20"
          >
            <div className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className="w-full justify-start text-text-secondary hover:text-text-primary"
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 text-xs bg-neon-cyan/20 text-neon-cyan rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Button>
              ))}
              <div className="pt-4 border-t border-glass-border">
                <Button variant="neural" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

// src/components/layout/footer.tsx
export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'AI Agents', href: '#agents' },
        { label: 'Workspace', href: '#workspace' },
        { label: 'Analytics', href: '#analytics' },
        { label: 'API Docs', href: '/api/docs' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Community', href: '/community' },
        { label: 'Support', href: '/support' },
        { label: 'Status', href: '/status' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Security', href: '/security' },
        { label: 'Cookies', href: '/cookies' },
      ]
    }
  ]

  return (
    <footer className="bg-surface-darker border-t border-glass-border">
      <div className="container-fluid py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-agent-gradient flex items-center justify-center">
                <Zap className="h-5 w-5 text-black" />
              </div>
              <div className="font-display font-black text-xl text-gradient">
                AgentForge Elite
              </div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              The ultimate AI agents orchestration platform. Deploy, manage, and scale 
              autonomous AI agents with revolutionary ease.
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="neural">
                Get Started
              </Button>
              <Button size="sm" variant="outline">
                View Demo
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-text-primary mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-glass-border">
          <div className="text-text-tertiary text-sm">
            © {currentYear} AgentForge Elite. All rights reserved.
          </div>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="flex items-center gap-2 text-sm text-text-tertiary">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// src/components/layout/main-layout.tsx
import * as React from 'react'
import { Header } from './header'
import { Footer } from './footer'
import { cn } from '@/lib/utils/cn'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-darker text-text-primary">
      <Header />
      <main className={cn('pt-16', className)}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

// src/components/layout/container.tsx
interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({ children, className, size = 'xl' }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  }

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  )
}

// src/components/layout/section.tsx
interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Section({ children, className, id, padding = 'lg' }: SectionProps) {
  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  }

  return (
    <section 
      id={id}
      className={cn('relative', paddingClasses[padding], className)}
    >
      {children}
    </section>
  )
}