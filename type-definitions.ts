// src/types/agent.ts
export type AgentCategory = 'coding' | 'research' | 'automation' | 'creative' | 'enterprise'

export interface AgentPricing {
  model: 'free' | 'paid' | 'enterprise'
  cost: string
  features: string[]
}

export interface AgentPerformance {
  successRate: string
  averageSpeed: string
  uptime: string
  costPerTask: string
}

export interface AgentMetadata {
  totalDeployments: string
  rating: number
  lastUpdated: string
  createdAt: string
  updatedAt: string
}

export interface Agent {
  id: string
  name: string
  category: AgentCategory
  description: string
  features: string[]
  capabilities: string
  useCases: string[]
  version: string
  techStack: string[]
  repositoryUrl?: string
  documentationUrl?: string
  isActive: boolean
  isOpenSource: boolean
  pricing: AgentPricing
  performance: AgentPerformance
  metadata: AgentMetadata
  icon?: string
  tags: string[]
}

export interface AgentSearchParams {
  category?: AgentCategory
  search?: string
  limit?: number
  offset?: number
  sortBy?: 'name' | 'category' | 'created_at' | 'popularity' | 'rating'
  sortOrder?: 'asc' | 'desc'
}

export interface DeploymentConfig {
  environment: 'development' | 'staging' | 'production'
  config?: Record<string, any>
  resources?: {
    cpu?: string
    memory?: string
    timeout?: number
  }
}

export interface DeploymentResult {
  success: boolean
  deploymentId?: string
  status?: 'running' | 'stopped' | 'error'
  message?: string
  error?: string
}

// src/types/api.ts
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  hasNext: boolean
  hasPrevious: boolean
  page: number
  limit: number
}

export interface ErrorResponse {
  success: false
  error: string
  code?: string
  details?: any
  statusCode: number
}

// src/types/analytics.ts
export interface MetricData {
  title: string
  value: string | number
  change?: {
    value: number
    percentage: number
    trend: 'up' | 'down'
    period: string
  }
  icon?: string
  color?: string
}

export interface ChartDataPoint {
  timestamp: string
  value: number
  label?: string
}

export interface AnalyticsMetrics {
  activeAgents: number
  runningDeployments: number
  totalExecutions: number
  successRate: number
  averageResponseTime: number
  costSavings: number
  apiCalls: number
  metrics: {
    hourly: Array<{
      hour: number
      requests: number
      success: number
      errors: number
    }>
    daily: Array<{
      date: string
      agents: number
      deployments: number
      executions: number
    }>
  }
}

// src/types/collaboration.ts
export interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  status: 'online' | 'away' | 'offline'
  activity?: string
  lastSeen: string
  role: 'admin' | 'member' | 'viewer'
}

export interface ActivityEvent {
  id: string
  type: 'deployment' | 'collaboration' | 'completion' | 'issue' | 'alert'
  user: string
  action: string
  details: string
  timestamp: string
  status: 'success' | 'info' | 'warning' | 'error'
  metadata?: Record<string, any>
}

export interface Workspace {
  id: string
  name: string
  description?: string
  members: TeamMember[]
  agents: Agent[]
  createdAt: string
  updatedAt: string
  owner: string
}

// src/types/terminal.ts
export interface TerminalCommand {
  command: string
  description: string
  usage: string
  category: 'general' | 'agents' | 'system' | 'workspace'
  examples?: string[]
}

export interface TerminalOutput {
  type: 'input' | 'output' | 'error' | 'system'
  content: string
  timestamp: string
}

export interface TerminalSession {
  id: string
  history: TerminalOutput[]
  workingDirectory: string
  environment: Record<string, string>
}

// src/types/ui.ts
export interface SelectOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface BadgeVariant {
  variant: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info' | 'purple'
}

export interface ButtonVariant {
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'neural' | 'glass' | 'neon'
  size: 'default' | 'sm' | 'lg' | 'xl' | 'icon'
}

// src/types/deployment.ts
export interface Deployment {
  id: string
  agentId: string
  environment: 'development' | 'staging' | 'production'
  status: 'pending' | 'running' | 'stopped' | 'error' | 'completed'
  config: Record<string, any>
  resources?: {
    cpu: string
    memory: string
    timeout: number
  }
  logs: Array<{
    timestamp: string
    level: 'info' | 'warn' | 'error' | 'debug'
    message: string
  }>
  startTime: string
  endTime?: string
  health?: {
    status: 'healthy' | 'unhealthy' | 'unknown'
    lastCheck: string
    uptime: number
  }
  metrics?: {
    requests: number
    errors: number
    responseTime: number
    cpuUsage: number
    memoryUsage: number
  }
}

export interface DeploymentStats {
  total: number
  running: number
  stopped: number
  error: number
  successRate: number
}

// src/types/user.ts
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user' | 'viewer'
  preferences: {
    theme: 'dark' | 'light' | 'system'
    notifications: {
      email: boolean
      browser: boolean
      slack: boolean
    }
    dashboard: {
      layout: 'grid' | 'list'
      defaultView: 'agents' | 'workspace' | 'analytics'
    }
  }
  subscription?: {
    plan: 'free' | 'pro' | 'enterprise'
    status: 'active' | 'cancelled' | 'past_due'
    currentPeriodEnd: string
  }
  createdAt: string
  lastLoginAt: string
}

export interface UserSession {
  user: User
  token: string
  expiresAt: string
}

// src/types/events.ts
export interface WebSocketEvent {
  type: string
  data: any
  timestamp: string
  userId?: string
}

export interface AgentEvent extends WebSocketEvent {
  type: 'agent.deployed' | 'agent.stopped' | 'agent.error' | 'agent.completed'
  data: {
    agentId: string
    deploymentId?: string
    status: string
    message?: string
  }
}

export interface SystemEvent extends WebSocketEvent {
  type: 'system.maintenance' | 'system.update' | 'system.alert'
  data: {
    severity: 'low' | 'medium' | 'high' | 'critical'
    message: string
    affectedServices?: string[]
  }
}

// src/types/search.ts
export interface SearchFilters {
  category?: AgentCategory[]
  tags?: string[]
  isOpenSource?: boolean
  rating?: {
    min: number
    max: number
  }
  pricing?: 'free' | 'paid' | 'enterprise'
}

export interface SearchResult {
  agents: Agent[]
  total: number
  facets: {
    categories: Array<{ value: AgentCategory; count: number }>
    tags: Array<{ value: string; count: number }>
    pricing: Array<{ value: string; count: number }>
  }
  suggestions?: string[]
}

// Global type augmentations
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export {}