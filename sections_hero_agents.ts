// ===== hero-section.tsx =====
'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap, Users, BarChart3, Terminal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/ui/card'
import { useRealTimeMetrics } from '@/lib/hooks/use-analytics'
import { cn } from '@/lib/utils/cn'

const heroStats = [
  {
    icon: '🤖',
    value: '50+',
    label: 'AI Agents',
    color: 'text-neon-cyan',
  },
  {
    icon: '⚡',
    value: '10ms',
    label: 'Response Time',
    color: 'text-neon-green',
  },
  {
    icon: '🌐',
    value: '24/7',
    label: 'Uptime',
    color: 'text-neon-purple',
  },
  {
    icon: '🚀',
    value: '99.9%',
    label: 'Success Rate',
    color: 'text-neon-orange',
  },
]

const ctaButtons = [
  {
    primary: true,
    icon: <Zap className="h-5 w-5" />,
    text: 'Explore Agents',
    href: '#agents',
  },
  {
    primary: false,
    icon: <Play className="h-5 w-5" />,
    text: 'Watch Demo',
    href: '#demo',
  },
]

export function HeroSection() {
  const metrics = useRealTimeMetrics()

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-dark via-surface-darker to-surface-dark" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-agent-gradient rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neural-gradient rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-quantum-gradient rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-fluid relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {/* Pre-loader Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-glass-primary backdrop-blur-20 border border-glass-border"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span className="text-sm font-medium text-text-primary">
                🧠 Ultimate AI Agents Platform • Live: {metrics.activeAgents.toLocaleString()}+ Agents
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-display text-gradient leading-none">
              AgentForge
              <span className="block text-4xl md:text-6xl lg:text-7xl mt-2">
                Elite
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
              The world's most comprehensive AI agents orchestration platform. 
              <span className="text-gradient font-semibold"> Deploy, manage, and monitor</span> 50+ 
              autonomous AI agents with revolutionary ease.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {heroStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <StatCard
                  icon={<span className="text-4xl">{stat.icon}</span>}
                  value={stat.value}
                  label={stat.label}
                  className="text-center hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            {ctaButtons.map((cta, index) => (
              <Button
                key={cta.text}
                variant={cta.primary ? 'neural' : 'outline'}
                size="xl"
                onClick={() => scrollToSection(cta.href)}
                className={cn(
                  'group transition-all duration-300',
                  cta.primary && 'shadow-quantum hover:shadow-neon-lg'
                )}
              >
                {cta.icon}
                {cta.text}
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            ))}
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-16"
          >
            {[
              { icon: Users, text: 'Multi-Agent Orchestration' },
              { icon: BarChart3, text: 'Real-time Analytics' },
              { icon: Terminal, text: 'Advanced Terminal' },
              { icon: Zap, text: 'Instant Deployment' },
            ].map((feature, index) => (
              <div
                key={feature.text}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-glass-secondary/50 backdrop-blur-10 border border-glass-border hover:bg-glass-secondary transition-all duration-300 group"
              >
                <feature.icon className="h-6 w-6 text-neon-cyan group-hover:scale-110 transition-transform" />
                <span className="text-xs text-text-tertiary text-center leading-tight">
                  {feature.text}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-text-tertiary">
              <span className="text-sm font-medium">Discover AI Agents</span>
              <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
                <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ===== agents-section.tsx =====
'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Plus, Filter, Grid, List } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AgentGrid } from '@/components/agents/agent-grid'
import { AgentFilters, AgentSort } from '@/components/agents/agent-filter'
import { AgentDetailModal } from '@/components/ui/modal'
import { useAgents, useAgentFilters } from '@/lib/hooks/use-agents'
import { Agent, AgentSearchParams } from '@/types/agent'
import { cn } from '@/lib/utils/cn'

type ViewMode = 'grid' | 'list'

export function AgentsSection() {
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid')
  const [selectedAgent, setSelectedAgent] = React.useState<Agent | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [searchParams, setSearchParams] = React.useState<AgentSearchParams>({
    limit: 12,
    offset: 0,
    sortBy: 'popularity',
    sortOrder: 'desc',
  })

  const [agentsState, agentsActions] = useAgents(searchParams)
  const { filters, updateFilters } = useAgentFilters()

  const handleFiltersChange = React.useCallback((newFilters: any) => {
    updateFilters(newFilters)
    const newSearchParams = {
      ...searchParams,
      offset: 0, // Reset to first page when filters change
      category: newFilters.category,
      search: newFilters.search,
    }
    setSearchParams(newSearchParams)
    agentsActions.searchAgents(newSearchParams)
  }, [searchParams, updateFilters, agentsActions])

  const handleSearch = React.useCallback((query: string) => {
    const newSearchParams = {
      ...searchParams,
      offset: 0,
      search: query,
    }
    setSearchParams(newSearchParams)
    agentsActions.searchAgents(newSearchParams)
  }, [searchParams, agentsActions])

  const handleSortChange = React.useCallback((sortBy: string, sortOrder: 'asc' | 'desc') => {
    const newSearchParams = {
      ...searchParams,
      sortBy: sortBy as any,
      sortOrder,
    }
    setSearchParams(newSearchParams)
    agentsActions.searchAgents(newSearchParams)
  }, [searchParams, agentsActions])

  const handleAgentView = React.useCallback((agent: Agent) => {
    setSelectedAgent(agent)
    setIsModalOpen(true)
  }, [])

  const handleAgentDeploy = React.useCallback(async (agent: Agent) => {
    const success = await agentsActions.deployAgent(agent.id)
    if (success) {
      // Show success notification
      console.log(`Successfully deployed ${agent.name}`)
    }
  }, [agentsActions])

  const handleLoadMore = React.useCallback(() => {
    if (!agentsState.loading && agentsState.hasNext) {
      const newSearchParams = {
        ...searchParams,
        offset: agentsState.agents.length,
      }
      setSearchParams(newSearchParams)
      agentsActions.searchAgents(newSearchParams)
    }
  }, [agentsState.loading, agentsState.hasNext, agentsState.agents.length, searchParams, agentsActions])

  return (
    <section id="agents" className="section-padding bg-gradient-to-br from-surface-dark/50 to-surface-darker/50">
      <div className="container-fluid">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-12"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black font-display text-gradient">
            AI Agents Arsenal
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Discover and deploy the world's most powerful autonomous AI agents. 
            From coding wizards to research specialists, unleash AI's full potential.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-text-tertiary">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
              <span>{agentsState.total} agents available</span>
            </div>
            <div className="w-1 h-4 bg-glass-border" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
              <span>Real-time updates</span>
            </div>
          </div>
        </motion.div>

        {/* Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Browse Agents
            </h3>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'neural' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'neural' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <AgentSort
              sortBy={searchParams.sortBy || 'popularity'}
              sortOrder={searchParams.sortOrder || 'desc'}
              onSortChange={handleSortChange}
            />
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Agent
            </Button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <AgentFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearch={handleSearch}
            agentCount={agentsState.total}
            loading={agentsState.loading}
          />
        </motion.div>

        {/* Error State */}
        {agentsState.error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-center"
          >
            <p className="font-medium">Error loading agents</p>
            <p className="text-sm opacity-80">{agentsState.error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={agentsActions.refreshAgents}
              className="mt-2"
            >
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Agents Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <AgentGrid
            agents={agentsState.agents}
            loading={agentsState.loading}
            error={agentsState.error}
            onAgentView={handleAgentView}
            onAgentDeploy={handleAgentDeploy}
            columns={viewMode === 'grid' ? 3 : 1}
            showLoadMore={true}
            onLoadMore={handleLoadMore}
            hasMore={agentsState.hasNext}
            emptyMessage="No agents found matching your criteria. Try adjusting your filters or search terms."
          />
        </motion.div>

        {/* Agent Detail Modal */}
        <AgentDetailModal
          agent={selectedAgent}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedAgent(null)
          }}
          onDeploy={() => {
            if (selectedAgent) {
              handleAgentDeploy(selectedAgent)
              setIsModalOpen(false)
              setSelectedAgent(null)
            }
          }}
        />
      </div>
    </section>
  )
}