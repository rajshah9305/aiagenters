'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Users, BarChart3, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MetricCard } from '@/components/ui/card'
import { useRealTimeMetrics } from '@/lib/hooks/use-analytics'
import { cn } from '@/lib/utils/cn'

export function HeroSection() {
  const metrics = useRealTimeMetrics()

  const scrollToAgents = () => {
    const agentsSection = document.getElementById('agents')
    agentsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToWorkspace = () => {
    const workspaceSection = document.getElementById('workspace')
    workspaceSection?.scrollIntoView({ behavior: 'smooth' })
  }

  const heroStats = [
    {
      icon: <Users className="h-5 w-5" />,
      value: '50+',
      label: 'AI Agents',
      color: '#3b82f6',
    },
    {
      icon: <Zap className="h-5 w-5" />,
      value: '10ms',
      label: 'Response Time',
      color: '#10b981',
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      value: '99.9%',
      label: 'Uptime',
      color: '#8b5cf6',
    },
    {
      icon: <Terminal className="h-5 w-5" />,
      value: '24/7',
      label: 'Support',
      color: '#f59e0b',
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-darker via-surface-dark to-surface-darker" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(102,126,234,0.15)_0%,transparent_50%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-cyan rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container-fluid relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-glass-primary backdrop-blur-20 border border-glass-border mb-8"
          >
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
            <span className="text-sm font-medium text-text-secondary">
              🧠 Ultimate AI Agents Orchestration Platform • 50+ Autonomous Agents
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black font-display text-gradient mb-8 leading-tight"
          >
            AgentForge
            <br />
            <span className="relative">
              Elite
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-4 left-0 right-0 h-2 bg-agent-gradient rounded-full"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-text-secondary mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            The world's most comprehensive AI agents platform. Orchestrate, deploy, and manage 
            <span className="text-gradient font-semibold"> autonomous AI agents</span> with 
            revolutionary ease and unprecedented power.
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto"
          >
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="bg-glass-primary backdrop-blur-20 border border-glass-border rounded-2xl p-6 hover:border-neon-cyan transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-center mb-3 text-neon-cyan group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient font-display mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-tertiary font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button
              size="xl"
              variant="neural"
              onClick={scrollToAgents}
              className="group text-lg px-8 py-4"
            >
              <Zap className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Explore Agents
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              size="xl"
              variant="glass"
              onClick={scrollToWorkspace}
              className="group text-lg px-8 py-4"
            >
              <Terminal className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
              Open Workspace
            </Button>
          </motion.div>

          {/* Real-time Metrics Ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="mt-16 flex items-center justify-center gap-8 text-sm text-text-tertiary"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span>Active Agents: {metrics.activeAgents.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-orange rounded-full animate-pulse" />
              <span>Running: {metrics.runningDeployments}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
              <span>Executions: {metrics.totalExecutions.toLocaleString()}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-text-tertiary cursor-pointer"
          onClick={scrollToAgents}
        >
          <span className="text-sm font-medium">Discover Agents</span>
          <div className="w-6 h-10 border-2 border-glass-border rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-neon-cyan rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}