// ===== agent-grid.tsx =====
'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from 'react-intersection-observer'

import { Agent } from '@/types/agent'
import { AgentCard, CardSkeleton } from '@/components/ui/card'
import { cn } from '@/lib/utils/cn'

interface AgentGridProps {
  agents: Agent[]
  loading?: boolean
  error?: string
  onAgentDeploy?: (agent: Agent) => void
  onAgentView?: (agent: Agent) => void
  className?: string
  emptyMessage?: string
  columns?: 1 | 2 | 3 | 4
  showLoadMore?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
}

export function AgentGrid({
  agents,
  loading,
  error,
  onAgentDeploy,
  onAgentView,
  className,
  emptyMessage = 'No agents found matching your criteria.',
  columns = 3,
  showLoadMore,
  onLoadMore,
  hasMore,
}: AgentGridProps) {
  const { ref: loadMoreRef, inView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: false,
  })

  React.useEffect(() => {
    if (inView && showLoadMore && hasMore && onLoadMore && !loading) {
      onLoadMore()
    }
  }, [inView, showLoadMore, hasMore, onLoadMore, loading])

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-400 text-lg font-medium mb-2">
          Error loading agents
        </div>
        <div className="text-text-tertiary text-sm">{error}</div>
      </div>
    )
  }

  if (loading && agents.length === 0) {
    return (
      <div className={cn('grid gap-6', gridClasses[columns], className)}>
        <CardSkeleton count={6} />
      </div>
    )
  }

  if (agents.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-6xl opacity-50">🤖</div>
        <div className="text-xl font-medium text-text-primary">
          No agents found
        </div>
        <div className="text-text-tertiary max-w-md mx-auto">
          {emptyMessage}
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn('grid gap-6', gridClasses[columns])}
      >
        <AnimatePresence>
          {agents.map((agent) => (
            <motion.div
              key={agent.id}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <AgentCard
                agent={{
                  id: agent.id,
                  name: agent.name,
                  category: agent.category,
                  description: agent.description,
                  icon: agent.icon,
                  rating: agent.metadata.rating,
                  deployments: agent.metadata.totalDeployments,
                  status: agent.isActive ? 'active' : 'inactive',
                }}
                onDeploy={() => onAgentDeploy?.(agent)}
                onView={() => onAgentView?.(agent)}
                className="h-full"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Load More Trigger */}
      {showLoadMore && (
        <div ref={loadMoreRef} className="mt-8 flex justify-center">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              <CardSkeleton count={3} />
            </div>
          ) : hasMore ? (
            <div className="text-text-tertiary text-sm">
              Scroll to load more agents...
            </div>
          ) : (
            agents.length > 0 && (
              <div className="text-text-tertiary text-sm">
                You've reached the end! 🎉
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

// ===== agent-filter.tsx =====
'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'

import { AgentCategory, AgentFilter } from '@/types/agent'
import { Button } from '@/components/ui/button'
import { Input, SearchInput } from '@/components/ui/input'
import { AGENT_CATEGORIES } from '@/lib/utils/constants'
import { cn } from '@/lib/utils/cn'

interface AgentFilterProps {
  filters: AgentFilter
  onFiltersChange: (filters: AgentFilter) => void
  onSearch: (query: string) => void
  agentCount?: number
  loading?: boolean
  className?: string
}

export function AgentFilters({
  filters,
  onFiltersChange,
  onSearch,
  agentCount,
  loading,
  className,
}: AgentFilterProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState(filters.search || '')

  const categories = Object.entries(AGENT_CATEGORIES) as [AgentCategory, typeof AGENT_CATEGORIES[AgentCategory]][]

  const handleCategoryChange = (category: AgentCategory) => {
    const newCategory = filters.category === category ? undefined : category
    onFiltersChange({ ...filters, category: newCategory })
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
    onFiltersChange({ ...filters, search: query })
  }

  const handleClearFilters = () => {
    const clearedFilters: AgentFilter = {}
    setSearchQuery('')
    onFiltersChange(clearedFilters)
    onSearch('')
  }

  const hasActiveFilters = Boolean(
    filters.category || filters.search || filters.isOpenSource !== undefined
  )

  const activeFilterCount = [
    filters.category,
    filters.search,
    filters.isOpenSource !== undefined,
  ].filter(Boolean).length

  return (
    <div className={cn('space-y-6', className)}>
      {/* Search Bar */}
      <div className="relative">
        <SearchInput
          placeholder="Search agents by name, category, or capability..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearchChange}
          className="w-full"
        />
        {loading && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-neon-cyan border-t-transparent" />
          </div>
        )}
      </div>

      {/* Category Pills */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-text-primary">Categories</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-text-tertiary hover:text-text-primary"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            {isExpanded ? 'Less' : 'More'} Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-neon-cyan/20 text-neon-cyan rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={!filters.category ? 'neural' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange(undefined as any)}
            className="transition-all duration-200"
          >
            All Categories
          </Button>
          {categories.map(([key, category]) => (
            <Button
              key={key}
              variant={filters.category === key ? 'neural' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(key)}
              className="transition-all duration-200"
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
              {category.count && (
                <span className="ml-2 text-xs opacity-70">
                  {category.count}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-glass-secondary border border-glass-border">
              {/* Open Source Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  License Type
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={filters.isOpenSource === undefined ? 'neural' : 'outline'}
                    size="sm"
                    onClick={() => onFiltersChange({ ...filters, isOpenSource: undefined })}
                  >
                    All
                  </Button>
                  <Button
                    variant={filters.isOpenSource === true ? 'neural' : 'outline'}
                    size="sm"
                    onClick={() => onFiltersChange({ ...filters, isOpenSource: true })}
                  >
                    Open Source
                  </Button>
                  <Button
                    variant={filters.isOpenSource === false ? 'neural' : 'outline'}
                    size="sm"
                    onClick={() => onFiltersChange({ ...filters, isOpenSource: false })}
                  >
                    Commercial
                  </Button>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Minimum Rating
                </label>
                <div className="flex gap-1">
                  {[4, 4.5, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={filters.rating === rating ? 'neural' : 'outline'}
                      size="sm"
                      onClick={() => 
                        onFiltersChange({ 
                          ...filters, 
                          rating: filters.rating === rating ? undefined : rating 
                        })
                      }
                    >
                      {rating}+ ★
                    </Button>
                  ))}
                </div>
              </div>

              {/* Pricing Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Pricing
                </label>
                <div className="flex flex-wrap gap-1">
                  {['free', 'freemium', 'paid'].map((pricing) => (
                    <Button
                      key={pricing}
                      variant={filters.pricing?.includes(pricing) ? 'neural' : 'outline'}
                      size="sm"
                      onClick={() => {
                        const currentPricing = filters.pricing || []
                        const newPricing = currentPricing.includes(pricing)
                          ? currentPricing.filter(p => p !== pricing)
                          : [...currentPricing, pricing]
                        onFiltersChange({ 
                          ...filters, 
                          pricing: newPricing.length > 0 ? newPricing : undefined 
                        })
                      }}
                      className="text-xs"
                    >
                      {pricing.charAt(0).toUpperCase() + pricing.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Summary & Clear Filters */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-tertiary">
          {agentCount !== undefined && (
            <span>
              {agentCount} agent{agentCount !== 1 ? 's' : ''} found
              {filters.category && ` in ${AGENT_CATEGORIES[filters.category].label}`}
              {filters.search && ` for "${filters.search}"`}
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-text-tertiary hover:text-text-primary"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}

// Sort Options Component
interface SortOption {
  key: string
  label: string
  direction: 'asc' | 'desc'
}

const sortOptions: SortOption[] = [
  { key: 'name', label: 'Name A-Z', direction: 'asc' },
  { key: 'name', label: 'Name Z-A', direction: 'desc' },
  { key: 'popularity', label: 'Most Popular', direction: 'desc' },
  { key: 'rating', label: 'Highest Rated', direction: 'desc' },
  { key: 'created_at', label: 'Newest First', direction: 'desc' },
  { key: 'created_at', label: 'Oldest First', direction: 'asc' },
]

interface AgentSortProps {
  sortBy: string
  sortOrder: 'asc' | 'desc'
  onSortChange: (sortBy: string, sortOrder: 'asc' | 'desc') => void
  className?: string
}

export function AgentSort({ sortBy, sortOrder, onSortChange, className }: AgentSortProps) {
  const currentSort = sortOptions.find(
    option => option.key === sortBy && option.direction === sortOrder
  )

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm text-text-tertiary">Sort by:</span>
      <select
        value={`${sortBy}-${sortOrder}`}
        onChange={(e) => {
          const [key, direction] = e.target.value.split('-')
          onSortChange(key, direction as 'asc' | 'desc')
        }}
        className="bg-glass-secondary border border-glass-border rounded-lg px-3 py-1 text-sm text-text-primary focus:border-neon-cyan focus:outline-none"
      >
        {sortOptions.map((option) => (
          <option
            key={`${option.key}-${option.direction}`}
            value={`${option.key}-${option.direction}`}
            className="bg-surface-dark text-text-primary"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}