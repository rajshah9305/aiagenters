// src/lib/hooks/use-agents.ts
import { useState, useEffect, useCallback } from 'react'
import { Agent, AgentSearchParams } from '@/types/agent'
import { logger } from '@/lib/utils/logger'

interface UseAgentsReturn {
  agents: Agent[]
  loading: boolean
  error: string | null
  total: number
  hasNext: boolean
  hasPrevious: boolean
  refetch: () => Promise<void>
  loadMore: () => Promise<void>
}

export function useAgents(params: AgentSearchParams = {}): UseAgentsReturn {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)

  const fetchAgents = useCallback(async (loadMore = false) => {
    try {
      setError(null)
      if (!loadMore) setLoading(true)

      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })

      const response = await fetch(`/api/agents?${searchParams.toString()}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch agents')
      }

      if (loadMore) {
        setAgents(prev => [...prev, ...data.data.agents])
      } else {
        setAgents(data.data.agents)
      }
      
      setTotal(data.data.total)
      setHasNext(data.data.hasNext)
      setHasPrevious(data.data.hasPrevious)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      logger.error('Error fetching agents', err)
    } finally {
      setLoading(false)
    }
  }, [params])

  const loadMore = useCallback(async () => {
    if (hasNext && !loading) {
      const newParams = {
        ...params,
        offset: agents.length,
      }
      await fetchAgents(true)
    }
  }, [hasNext, loading, agents.length, params, fetchAgents])

  useEffect(() => {
    fetchAgents()
  }, [fetchAgents])

  return {
    agents,
    loading,
    error,
    total,
    hasNext,
    hasPrevious,
    refetch: () => fetchAgents(false),
    loadMore,
  }
}

// src/lib/hooks/use-agent.ts
import { useState, useEffect } from 'react'
import { Agent } from '@/types/agent'
import { logger } from '@/lib/utils/logger'

interface UseAgentReturn {
  agent: Agent | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useAgent(id: string): UseAgentReturn {
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAgent = async () => {
    try {
      setError(null)
      setLoading(true)

      const response = await fetch(`/api/agents/${id}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch agent')
      }

      setAgent(data.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      logger.error('Error fetching agent', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchAgent()
    }
  }, [id])

  return {
    agent,
    loading,
    error,
    refetch: fetchAgent,
  }
}

// src/lib/hooks/use-analytics.ts
import { useState, useEffect } from 'react'
import { logger } from '@/lib/utils/logger'

interface AnalyticsData {
  activeAgents: number
  runningDeployments: number
  totalExecutions: number
  successRate: number
  averageResponseTime: number
  costSavings: number
  apiCalls: number
}

interface UseAnalyticsReturn {
  data: AnalyticsData | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useAnalytics(): UseAnalyticsReturn {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAnalytics = async () => {
    try {
      setError(null)
      setLoading(true)

      const response = await fetch('/api/analytics')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch analytics')
      }

      setData(result.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      logger.error('Error fetching analytics', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
    
    // Set up polling for real-time updates
    const interval = setInterval(fetchAnalytics, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetchAnalytics,
  }
}

// Hook for real-time metrics (simplified version)
export function useRealTimeMetrics() {
  const [metrics, setMetrics] = useState({
    activeAgents: 847,
    runningDeployments: 156,
    totalExecutions: 124567,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeAgents: prev.activeAgents + Math.floor(Math.random() * 3) - 1,
        runningDeployments: prev.runningDeployments + Math.floor(Math.random() * 5) - 2,
        totalExecutions: prev.totalExecutions + Math.floor(Math.random() * 10) + 1,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return metrics
}

// src/lib/hooks/use-deployment.ts
import { useState } from 'react'
import { DeploymentConfig, DeploymentResult } from '@/types/agent'
import { logger } from '@/lib/utils/logger'

interface UseDeploymentReturn {
  deploying: boolean
  error: string | null
  deploy: (agentId: string, config?: DeploymentConfig) => Promise<DeploymentResult | null>
  stop: (agentId: string) => Promise<DeploymentResult | null>
}

export function useDeployment(): UseDeploymentReturn {
  const [deploying, setDeploying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deploy = async (agentId: string, config?: DeploymentConfig): Promise<DeploymentResult | null> => {
    try {
      setError(null)
      setDeploying(true)

      const response = await fetch(`/api/agents/${agentId}/deploy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config || {}),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to deploy agent')
      }

      logger.info('Agent deployed successfully', { agentId, deploymentId: data.data.deploymentId })
      return data.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      logger.error('Error deploying agent', err)
      return null
    } finally {
      setDeploying(false)
    }
  }

  const stop = async (agentId: string): Promise<DeploymentResult | null> => {
    try {
      setError(null)
      setDeploying(true)

      const response = await fetch(`/api/agents/${agentId}/deploy`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Failed to stop agent')
      }

      logger.info('Agent stopped successfully', { agentId })
      return data.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      logger.error('Error stopping agent', err)
      return null
    } finally {
      setDeploying(false)
    }
  }

  return {
    deploying,
    error,
    deploy,
    stop,
  }
}

// src/lib/hooks/use-local-storage.ts
import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      logger.error('Error reading from localStorage', error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      logger.error('Error writing to localStorage', error)
    }
  }

  return [storedValue, setValue] as const
}

// src/lib/hooks/use-debounce.ts
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// src/lib/hooks/use-intersection.ts
import { useEffect, useRef, useState } from 'react'

interface UseIntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersection(options: UseIntersectionOptions = {}) {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const frozen = entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    const node = elementRef?.current
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen || !node) return

    const observerParams = { threshold, root, rootMargin }
    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry)
      setIsVisible(entry.isIntersecting)
    }, observerParams)

    observer.observe(node)

    return () => observer.disconnect()
  }, [elementRef, threshold, root, rootMargin, frozen])

  return { ref: elementRef, entry, isVisible }
}