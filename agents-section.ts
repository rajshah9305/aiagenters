'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AgentCard, CardSkeleton } from '@/components/ui/card'
import { AgentDetailModal } from '@/components/ui/modal'
import { useAgents, useAgentFilters } from '@/lib/hooks/use-agents'
import { AgentFilters, AgentSort } from '@/components/agents/agent-filter'
import { MOCK_AGENTS, AGENT_CATEGORIES } from '@/lib/utils/constants'
import { cn } from '@/lib/utils/cn'
import { Agent, AgentFilter } from '@/types/agent'
import toast from 'react-hot-toast'

export function AgentsSection() {
  const [selectedAgent, setSelectedAgent] = React.useState<Agent | null>(null)
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = React.useState('popularity')
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc')

  // Use mock data for now - replace with real hook when backend is ready
  const [agents, setAgents] = React.useState(MOCK_AGENTS)
  const [loading, setLoading] = React.useState(false)
  const [filteredAgents, setFilteredAgents] = React.useState(MOCK_AGENTS)

  const {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  } = useAgentFilters()

  // Filter agents based on current filters
  React.useEffect(() => {
    let filtered = [...agents]

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(agent => agent.category === filters.category)
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase()
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm) ||
        agent.description.toLowerCase().includes(searchTerm)
      )
    }

    // Sort agents
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'popularity':
          const aDeployments = parseInt(a.deployments.replace(/,/g, ''))
          const bDeployments = parseInt(b.deployments.replace(/,/g, ''))
          comparison = aDeployments - bDeployments
          break
        case 'rating':
          comparison = a.rating - b.rating
          break
        default:
          comparison = 0
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    setFilteredAgents(filtered)
  }, [agents, filters, sortBy, sortOrder])

  const handleAgentDeploy = async (agent: any) => {
    try {
      setLoading(true)
      // Simulate deployment
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success(`🚀 ${agent.name} deployed successfully!`, {
        duration: 4000,
        style: {
          background: 'rgba(15, 23, 42, 0.95)',
          color: '#f8fafc',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        },
      })
    } catch (error) {
      toast.error('Deployment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query: string) => {
    updateFilters({ ...filters, search: query })
  }

  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }

  return (
    <section className="section-padding">
      <div className="container-fluid">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black font-display text-gradient mb-6">
            AI Agents Arsenal
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Discover and deploy the world's most powerful autonomous AI agents. 
            From coding wizards to research specialists, unleash AI's full potential.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <AgentFilters
            filters={filters}
            onFiltersChange={updateFilters}
            onSearch={handleSearch}
            agentCount={filteredAgents.length}
            loading={loading}
          />

          {/* View Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="flex items-center gap-4">
              <AgentSort
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
              
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-text-tertiary hover:text-text-primary"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'neural' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'neural' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Agents Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {loading && filteredAgents.length === 0 ? (
            <div className={cn(
              'grid gap-6',
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            )}>
              <CardSkeleton count={6} />
            </div>
          ) : filteredAgents.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6 opacity-50">🔍</div>
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                No agents found
              </h3>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                No agents match your current filters. Try adjusting your search criteria or browse all categories.
              </p>
              <Button variant="neural" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className={cn(
              'grid gap-6',
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            )}>
              {filteredAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AgentCard
                    agent={agent}
                    onDeploy={() => handleAgentDeploy(agent)}
                    onView={() => setSelectedAgent(agent as any)}
                    className={viewMode === 'list' ? 'flex-row' : ''}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Categories Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-text-primary mb-8">
            Explore by Category
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(AGENT_CATEGORIES).map(([key, category]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateFilters({ category: key as any })}
                className="p-4 bg-glass-secondary hover:bg-glass-primary border border-glass-border hover:border-neon-cyan rounded-lg transition-all duration-300 group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <div className="font-medium text-text-primary group-hover:text-neon-cyan transition-colors">
                  {category.label}
                </div>
                <div className="text-sm text-text-tertiary">
                  {category.count} agents
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Agent Detail Modal */}
        {selectedAgent && (
          <AgentDetailModal
            agent={selectedAgent}
            isOpen={!!selectedAgent}
            onClose={() => setSelectedAgent(null)}
            onDeploy={() => {
              handleAgentDeploy(selectedAgent)
              setSelectedAgent(null)
            }}
          />
        )}
      </div>
    </section>
  )
}