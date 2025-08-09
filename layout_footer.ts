'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail, ExternalLink, Heart, Zap } from 'lucide-react'

import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { APP_CONFIG } from '@/lib/utils/constants'

const footerLinks = {
  product: [
    { name: 'Agents', href: '/agents' },
    { name: 'Workspace', href: '/workspace' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Terminal', href: '/terminal' },
    { name: 'Pricing', href: '/pricing' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api-docs' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Blog', href: '/blog' },
    { name: 'Changelog', href: '/changelog' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  community: [
    { name: 'GitHub', href: 'https://github.com/agentforge-elite', external: true },
    { name: 'Discord', href: 'https://discord.gg/agentforge', external: true },
    { name: 'Twitter', href: 'https://twitter.com/agentforge', external: true },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/agentforge', external: true },
  ],
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/agentforge-elite', icon: Github },
  { name: 'Twitter', href: 'https://twitter.com/agentforge', icon: Twitter },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/agentforge', icon: Linkedin },
  { name: 'Email', href: 'mailto:hello@agentforge-elite.com', icon: Mail },
]

export function Footer() {
  const [email, setEmail] = React.useState('')
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="relative border-t border-glass-border bg-surface-darker">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(102,126,234,0.3)_0,transparent_50%)]" />
      </div>

      <div className="container-fluid relative">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl font-black font-display text-gradient">
                    AgentForge
                  </div>
                  <div className="px-3 py-1 text-xs font-bold bg-agent-gradient text-black rounded-full">
                    ELITE
                  </div>
                </div>
                <p className="text-text-secondary text-base leading-relaxed max-w-md">
                  The world's most comprehensive AI agents orchestration platform. 
                  Deploy, manage, and monitor 50+ autonomous AI agents with revolutionary ease.
                </p>
              </div>

              {/* Newsletter Signup */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-text-primary">
                  Stay Updated
                </h3>
                <p className="text-sm text-text-tertiary">
                  Get the latest updates on new agents and features.
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    disabled={subscribed}
                  />
                  <Button
                    type="submit"
                    variant={subscribed ? 'neural' : 'outline'}
                    disabled={subscribed}
                    className="min-w-[100px]"
                  >
                    {subscribed ? (
                      <span className="flex items-center gap-2">
                        ✓ Subscribed
                      </span>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </form>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:bg-glass-secondary hover:scale-110 transition-all duration-200"
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Product */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Product
                </h3>
                <ul className="space-y-3">
                  {footerLinks.product.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Company
                </h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
                  Community
                </h3>
                <ul className="space-y-3">
                  {footerLinks.community.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm flex items-center gap-1"
                      >
                        {link.name}
                        {link.external && <ExternalLink className="h-3 w-3" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-8 border-t border-glass-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient font-display">50+</div>
              <div className="text-sm text-text-tertiary">AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient font-display">10K+</div>
              <div className="text-sm text-text-tertiary">Deployments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient font-display">99.9%</div>
              <div className="text-sm text-text-tertiary">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gradient font-display">24/7</div>
              <div className="text-sm text-text-tertiary">Support</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-glass-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-text-tertiary">
              <span>© 2024 AgentForge Elite. All rights reserved.</span>
              <span className="hidden md:inline">Version {APP_CONFIG.version}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 bg-neon-green rounded-full animate-pulse" />
                <span className="text-text-tertiary">All systems operational</span>
              </div>

              {/* Built with Love */}
              <div className="flex items-center gap-1 text-sm text-text-tertiary">
                <span>Built with</span>
                <Heart className="h-3 w-3 text-red-400 animate-pulse" />
                <span>for the AI community</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </footer>
  )
}

// Scroll to Top Button
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-40 p-3 rounded-full bg-agent-gradient text-black shadow-lg transition-all duration-300',
        'hover:shadow-quantum focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-surface-darker',
        !isVisible && 'pointer-events-none'
      )}
      aria-label="Scroll to top"
    >
      <Zap className="h-5 w-5" />
    </motion.button>
  )
}

// Feature Announcement Banner (can be used at top of page)
export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="bg-agent-gradient text-black text-center py-3 px-4 relative"
    >
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <Zap className="h-4 w-4" />
        <span>
          🎉 New: Advanced Terminal with 20+ AI commands now available! 
          <Link href="/terminal" className="underline ml-2 hover:no-underline">
            Try it now
          </Link>
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70"
          aria-label="Close announcement"
        >
          ×
        </button>
      </div>
    </motion.div>
  )
}