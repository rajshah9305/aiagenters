// ===== analytics.ts =====
export interface AnalyticsMetric {
  id: string
  name: string
  value: number | string
  unit?: string
  change?: {
    value: number
    percentage: number
    trend: 'up' | 'down' | 'stable'
    period: string
  }
  icon?: string
  color?: string
  description?: string
}

export interface ChartDataPoint {
  timestamp: string
  value: number
  label?: string
  metadata?: Record<string, any>
}

export interface TimeSeriesData {
  id: string
  name: string
  data: ChartDataPoint[]
  color?: string
  unit?: string
}

export interface AnalyticsDashboard {
  metrics: AnalyticsMetric[]
  charts: {
    deployments: TimeSeriesData[]
    performance: TimeSeriesData[]
    usage: TimeSeriesData[]
    errors: TimeSeriesData[]
  }
  summary: {
    totalAgents: number
    activeDeployments: number
    successRate: number
    averageResponseTime: number
    todayExecutions: number
    monthlyGrowth: number
  }
  topAgents: {
    id: string
    name: string
    deployments: number
    successRate: number
    averageTime: number
  }[]
  recentActivity: ActivityEvent[]
}

export interface ActivityEvent {
  id: string
  type: 'deployment' | 'execution' | 'error' | 'user_action'
  title: string
  description: string
  timestamp: string
  severity?: 'low' | 'medium' | 'high' | 'critical'
  metadata?: Record<string, any>
  userId?: string
  agentId?: string
}

export interface UsageStats {
  daily: Record<string, number>
  weekly: Record<string, number>
  monthly: Record<string, number>
  byCategory: Record<string, number>
  byUser: Record<string, number>
  trends: {
    growth: number
    popularCategories: string[]
    peakHours: number[]
    topUsers: string[]
  }
}

// ===== deployment.ts =====
export interface DeploymentEnvironment {
  id: string
  name: string
  type: 'development' | 'staging' | 'production'
  url?: string
  status: 'active' | 'inactive' | 'maintenance'
  config: EnvironmentConfig
  resources: ResourceLimits
  createdAt: string
  lastDeployment?: string
}

export interface EnvironmentConfig {
  variables: Record<string, string>
  secrets: Record<string, string>
  features: string[]
  scaling: {
    minInstances: number
    maxInstances: number
    targetCPU: number
    targetMemory: number
  }
}

export interface ResourceLimits {
  cpu: string
  memory: string
  storage: string
  networkBandwidth?: string
  executionTime: number
  concurrentExecutions: number
}

export interface Deployment {
  id: string
  agentId: string
  environment: string
  status: DeploymentStatus
  version: string
  config: DeploymentConfig
  resources: ResourceUsage
  logs: DeploymentLog[]
  metrics: DeploymentMetrics
  createdAt: string
  startedAt?: string
  completedAt?: string
  error?: DeploymentError
}

export interface ResourceUsage {
  cpu: {
    current: number
    average: number
    peak: number
    unit: 'percentage' | 'cores'
  }
  memory: {
    current: number
    average: number
    peak: number
    unit: 'MB' | 'GB'
  }
  network: {
    incoming: number
    outgoing: number
    unit: 'MB' | 'GB'
  }
  storage: {
    used: number
    available: number
    unit: 'MB' | 'GB'
  }
}

export interface DeploymentLog {
  id: string
  timestamp: string
  level: 'debug' | 'info' | 'warn' | 'error' | 'fatal'
  message: string
  source: 'system' | 'agent' | 'user'
  metadata?: Record<string, any>
}

export interface DeploymentMetrics {
  uptime: number
  requests: number
  errors: number
  averageResponseTime: number
  throughput: number
  errorRate: number
  availability: number
  lastUpdate: string
}

export interface DeploymentError {
  code: string
  message: string
  details?: string
  stack?: string
  timestamp: string
  recoverable: boolean
  suggestions?: string[]
}

export interface DeploymentPipeline {
  id: string
  name: string
  stages: PipelineStage[]
  triggers: PipelineTrigger[]
  variables: Record<string, string>
  notifications: NotificationConfig[]
  createdAt: string
  updatedAt: string
}

export interface PipelineStage {
  id: string
  name: string
  type: 'build' | 'test' | 'deploy' | 'validate'
  dependencies: string[]
  config: Record<string, any>
  timeout: number
  retryCount: number
  continueOnError: boolean
}

export interface PipelineTrigger {
  type: 'manual' | 'webhook' | 'schedule' | 'git_push'
  config: Record<string, any>
  enabled: boolean
}

export interface NotificationConfig {
  type: 'email' | 'slack' | 'webhook'
  config: Record<string, any>
  events: string[]
  enabled: boolean
}