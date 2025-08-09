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
  pricing: {
    model: 'free' | 'freemium' | 'paid' | 'enterprise'
    cost?: string
    features?: string[]
  }
  performance: {
    successRate: string
    averageSpeed: string
    uptime: string
    costPerTask: string
  }
  metadata: {
    totalDeployments: string
    rating: number
    lastUpdated: string
    createdAt: string
    updatedAt: string
  }
  deploymentStatus?: DeploymentStatus
  icon?: string
  thumbnail?: string
  tags: string[]
}

export type AgentCategory = 
  | 'coding' 
  | 'research' 
  | 'automation' 
  | 'creative' 
  | 'enterprise'
  | 'productivity'
  | 'customer-service'
  | 'sales'
  | 'data-analysis'

export interface AgentFilter {
  category?: AgentCategory
  search?: string
  tags?: string[]
  pricing?: string[]
  isOpenSource?: boolean
  rating?: number
}

export interface AgentSearchParams {
  category?: string
  search?: string
  limit?: number
  offset?: number
  sortBy?: 'name' | 'category' | 'created_at' | 'popularity' | 'rating'
  sortOrder?: 'asc' | 'desc'
}

export interface AgentSearchResult {
  agents: Agent[]
  total: number
  hasNext: boolean
  hasPrevious: boolean
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
  status?: DeploymentStatus
  message?: string
  error?: string
  logs?: string[]
}

export type DeploymentStatus = 
  | 'pending'
  | 'deploying'
  | 'running'
  | 'stopped'
  | 'failed'
  | 'completed'

export interface AgentExecution {
  id: string
  agentId: string
  status: DeploymentStatus
  progress: number
  startTime: string
  endTime?: string
  logs: ExecutionLog[]
  result?: any
  error?: string
}

export interface ExecutionLog {
  timestamp: string
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  metadata?: Record<string, any>
}

export interface AgentRegistry {
  agents: Map<string, Agent>
  categories: Map<AgentCategory, Agent[]>
  getAgent(id: string): Agent | undefined
  searchAgents(params: AgentSearchParams): Promise<AgentSearchResult>
  deployAgent(id: string, config: DeploymentConfig): Promise<DeploymentResult>
  stopAgent(id: string): Promise<DeploymentResult>
}

export interface AgentMetrics {
  totalAgents: number
  activeDeployments: number
  successRate: number
  averageResponseTime: number
  totalExecutions: number
  categoryCounts: Record<AgentCategory, number>
  topPerformers: Agent[]
  recentActivity: ExecutionLog[]
}