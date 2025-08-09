// ===== use-agents.ts =====
'use client'

import * as React from 'react'
import { Agent, AgentSearchParams, AgentFilter, DeploymentConfig } from '@/types/agent'
import { API_CONFIG } from '@/lib/utils/constants'
import { formatApiResponse } from '@/lib/utils/formatters'

interface UseAgentsState {
  agents: Agent[]
  loading: boolean
  error: string | null
  total: number
  hasNext: boolean
  hasPrevious: boolean
}

interface UseAgentsActions {
  searchAgents: (params: AgentSearchParams) => Promise<void>
  getAgentById: (id: string) => Promise<Agent | null>
  deployAgent: (id: string, config?: DeploymentConfig) => Promise<boolean>
  stopAgent: (id: string) => Promise<boolean>
  refreshAgents: () => Promise<void>
  resetError: () => void
}

export function useAgents(initialParams?: Partial<AgentSearchParams>): [UseAgentsState, UseAgentsActions] {
  const [state, setState] = React.useState<UseAgentsState>({
    agents: [],
    loading: false,
    error: null,
    total: 0,
    hasNext: false,
    hasPrevious: false,
  })

  const [searchParams, setSearchParams] = React.useState<AgentSearchParams>({
    limit: 20,
    offset: 0,
    sortBy: 'popularity',
    sortOrder: 'desc',
    ...initialParams,
  })

  const abortControllerRef = React.useRef<AbortController | null>(null)

  const searchAgents = React.useCallback(async (params: AgentSearchParams) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    setSearchParams(params)

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const queryParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })

      const response = await fetch(`/api/agents?${queryParams.toString()}`, {
        signal: abortControllerRef.current.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setState(prev => ({
          ...prev,
          agents: data.data.agents,
          total: data.data.pagination.total,
          hasNext: data.data.pagination.hasNext,
          hasPrevious: data.data.pagination.hasPrevious,
          loading: false,
        }))
      } else {
        throw new Error(data.error || 'Failed to fetch agents')
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message || 'Failed to fetch agents',
        }))
      }
    }
  }, [])

  const getAgentById = React.useCallback(async (id: string): Promise<Agent | null> => {
    try {
      const response = await fetch(`/api/agents/${id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success) {
        return data.data.agent
      } else {
        throw new Error(data.error || 'Agent not found')
      }
    } catch (error: any) {
      console.error('Error fetching agent:', error)
      return null
    }
  }, [])

  const deployAgent = React.useCallback(async (id: string, config?: DeploymentConfig): Promise<boolean> => {
    try {
      const response = await fetch(`/api/agents/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deploy',
          environment: config?.environment || 'development',
          config: config?.config,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success) {
        // Refresh the agents list to update deployment status
        await searchAgents(searchParams)
        return true
      } else {
        throw new Error(data.error || 'Deployment failed')
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to deploy agent',
      }))
      return false
    }
  }, [searchAgents, searchParams])

  const stopAgent = React.useCallback(async (id: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/agents/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'stop',
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success) {
        // Refresh the agents list to update deployment status
        await searchAgents(searchParams)
        return true
      } else {
        throw new Error(data.error || 'Stop operation failed')
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to stop agent',
      }))
      return false
    }
  }, [searchAgents, searchParams])

  const refreshAgents = React.useCallback(async () => {
    await searchAgents(searchParams)
  }, [searchAgents, searchParams])

  const resetError = React.useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  // Initial load
  React.useEffect(() => {
    searchAgents(searchParams)
  }, []) // Only run on mount

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  const actions: UseAgentsActions = {
    searchAgents,
    getAgentById,
    deployAgent,
    stopAgent,
    refreshAgents,
    resetError,
  }

  return [state, actions]
}

// Hook for managing agent filters
export function useAgentFilters(onFiltersChange?: (filters: AgentFilter) => void) {
  const [filters, setFilters] = React.useState<AgentFilter>({})

  const updateFilters = React.useCallback((newFilters: AgentFilter) => {
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }, [onFiltersChange])

  const clearFilters = React.useCallback(() => {
    const clearedFilters: AgentFilter = {}
    setFilters(clearedFilters)
    onFiltersChange?.(clearedFilters)
  }, [onFiltersChange])

  const hasActiveFilters = React.useMemo(() => {
    return Object.values(filters).some(value => 
      value !== undefined && value !== null && value !== ''
    )
  }, [filters])

  return {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  }
}

// ===== use-analytics.ts =====
'use client'

import * as React from 'react'
import { AnalyticsMetric, AnalyticsDashboard, TimeSeriesData, ActivityEvent } from '@/types/analytics'

interface UseAnalyticsState {
  metrics: AnalyticsMetric[]
  dashboard: AnalyticsDashboard | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
}

interface UseAnalyticsActions {
  refreshMetrics: () => Promise<void>
  getMetricHistory: (metricId: string, period: string) => Promise<TimeSeriesData | null>
  resetError: () => void
}

export function useAnalytics(autoRefresh = true, refreshInterval = 30000): [UseAnalyticsState, UseAnalyticsActions] {
  const [state, setState] = React.useState<UseAnalyticsState>({
    metrics: [],
    dashboard: null,
    loading: false,
    error: null,
    lastUpdated: null,
  })

  const abortControllerRef = React.useRef<AbortController | null>(null)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  // Generate mock analytics data (replace with real API calls)
  const generateMockData = React.useCallback((): AnalyticsDashboard => {
    const now = new Date()
    const baseMetrics: AnalyticsMetric[] = [
      {
        id: 'total-agents',
        name: 'Total Agents',
        value: 847 + Math.floor(Math.random() * 10),
        unit: '',
        change: {
          value: Math.floor(Math.random() * 5) + 1,
          percentage: Math.floor(Math.random() * 10) + 5,
          trend: 'up',
          period: 'vs last week',
        },
        icon: '🤖',
        color: '#3b82f6',
      },
      {
        id: 'active-deployments',
        name: 'Active Deployments',
        value: 156 + Math.floor(Math.random() * 20),
        unit: '',
        change: {
          value: Math.floor(Math.random() * 8) + 2,
          percentage: Math.floor(Math.random() * 15) + 10,
          trend: 'up',
          period: 'vs yesterday',
        },
        icon: '🚀',
        color: '#10b981',
      },
      {
        id: 'success-rate',
        name: 'Success Rate',
        value: '99.2%',
        change: {
          value: 0.3,
          percentage: 2.1,
          trend: 'up',
          period: 'vs last month',
        },
        icon: '✅',
        color: '#059669',
      },
      {
        id: 'response-time',
        name: 'Avg Response Time',
        value: '0.8s',
        change: {
          value: 0.2,
          percentage: 20,
          trend: 'down', // Lower is better for response time
          period: 'vs last week',
        },
        icon: '⚡',
        color: '#f59e0b',
      },
      {
        id: 'cost-savings',
        name: 'Cost Savings',
        value: '$2.1M',
        change: {
          value: 180000,
          percentage: 89,
          trend: 'up',
          period: 'this quarter',
        },
        icon: '💰',
        color: '#8b5cf6',
      },
      {
        id: 'api-calls',
        name: 'API Calls',
        value: '8.9M',
        change: {
          value: 1200000,
          percentage: 15,
          trend: 'up',
          period: 'this month',
        },
        icon: '📊',
        color: '#06b6d4',
      },
    ]

    // Generate time series data
    const generateTimeSeriesData = (points: number, baseValue: number): TimeSeriesData => {
      const data = []
      for (let i = points; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
        data.push({
          timestamp: date.toISOString(),
          value: baseValue + Math.floor(Math.random() * 20) - 10,
          label: date.toLocaleDateString(),
        })
      }
      return {
        id: 'sample-data',
        name: 'Sample Data',
        data,
        color: '#3b82f6',
      }
    }

    // Generate activity events
    const activities: ActivityEvent[] = [
      {
        id: '1',
        type: 'deployment',
        title: 'AutoGPT deployed',
        description: 'Successfully deployed to production environment',
        timestamp: new Date(now.getTime() - 2000).toISOString(),
        severity: 'low',
      },
      {
        id: '2',
        type: 'execution',
        title: 'ChatDev task completed',
        description: 'Mobile app development project finished',
        timestamp: new Date(now.getTime() - 15000).toISOString(),
        severity: 'low',
      },
      {
        id: '3',
        type: 'user_action',
        title: 'New agent registered',
        description: 'GPT Engineer v0.3.3 added to registry',
        timestamp: new Date(now.getTime() - 60000).toISOString(),
        severity: 'medium',
      },
    ]

    return {
      metrics: baseMetrics,
      charts: {
        deployments: [generateTimeSeriesData(30, 150)],
        performance: [generateTimeSeriesData(30, 99)],
        usage: [generateTimeSeriesData(30, 8500)],
        errors: [generateTimeSeriesData(30, 5)],
      },
      summary: {
        totalAgents: 847,
        activeDeployments: 156,
        successRate: 99.2,
        averageResponseTime: 0.8,
        todayExecutions: 12400,
        monthlyGrowth: 23.5,
      },
      topAgents: [
        { id: 'autogpt', name: 'AutoGPT', deployments: 2847, successRate: 94, averageTime: 1.2 },
        { id: 'gpt-engineer', name: 'GPT Engineer', deployments: 3421, successRate: 92, averageTime: 15.3 },
        { id: 'babyagi', name: 'BabyAGI', deployments: 1956, successRate: 97, averageTime: 0.8 },
      ],
      recentActivity: activities,
    }
  }, [])

  const refreshMetrics = React.useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // In a real app, this would be:
      // const response = await fetch('/api/analytics', {
      //   signal: abortControllerRef.current.signal,
      // })
      // const data = await response.json()

      const mockData = generateMockData()

      setState(prev => ({
        ...prev,
        metrics: mockData.metrics,
        dashboard: mockData,
        loading: false,
        lastUpdated: new Date(),
      }))
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setState(prev => ({
          ...prev,
          loading: false,
          error: error.message || 'Failed to fetch analytics',
        }))
      }
    }
  }, [generateMockData])

  const getMetricHistory = React.useCallback(async (metricId: string, period: string): Promise<TimeSeriesData | null> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))

      // Generate mock historical data
      const points = period === '7d' ? 7 : period === '30d' ? 30 : 90
      const baseValue = 100
      const data = []
      
      for (let i = points; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        data.push({
          timestamp: date.toISOString(),
          value: baseValue + Math.floor(Math.random() * 40) - 20,
          label: date.toLocaleDateString(),
        })
      }

      return {
        id: metricId,
        name: `${metricId} History`,
        data,
        color: '#3b82f6',
      }
    } catch (error: any) {
      console.error('Error fetching metric history:', error)
      return null
    }
  }, [])

  const resetError = React.useCallback(() => {
    setState(prev => ({ ...prev, error: null }))
  }, [])

  // Auto-refresh setup
  React.useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        refreshMetrics()
      }, refreshInterval)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [autoRefresh, refreshInterval, refreshMetrics])

  // Initial load
  React.useEffect(() => {
    refreshMetrics()
  }, []) // Only run on mount

  // Cleanup
  React.useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const actions: UseAnalyticsActions = {
    refreshMetrics,
    getMetricHistory,
    resetError,
  }

  return [state, actions]
}

// Hook for real-time metrics updates
export function useRealTimeMetrics(enabled = true) {
  const [metrics, setMetrics] = React.useState<Record<string, number>>({
    activeAgents: 847,
    runningDeployments: 156,
    totalExecutions: 12400,
    errorCount: 3,
  })

  React.useEffect(() => {
    if (!enabled) return

    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeAgents: prev.activeAgents + Math.floor(Math.random() * 3 - 1),
        runningDeployments: Math.max(0, prev.runningDeployments + Math.floor(Math.random() * 5 - 2)),
        totalExecutions: prev.totalExecutions + Math.floor(Math.random() * 10),
        errorCount: Math.max(0, prev.errorCount + Math.floor(Math.random() * 3 - 1)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [enabled])

  return metrics
}