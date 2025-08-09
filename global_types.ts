export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  details?: any
  meta?: {
    timestamp: string
    version: string
    requestId?: string
  }
}

export interface PaginationParams {
  limit: number
  offset: number
  total?: number
  hasNext?: boolean
  hasPrevious?: boolean
}

export interface SortParams {
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export interface SearchParams extends PaginationParams, SortParams {
  search?: string
  filters?: Record<string, any>
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin' | 'developer'
  preferences: UserPreferences
  subscription?: Subscription
  createdAt: string
  lastLogin?: string
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: NotificationSettings
  dashboard: DashboardSettings
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  agentDeployments: boolean
  systemUpdates: boolean
  weeklyReports: boolean
}

export interface DashboardSettings {
  layout: 'grid' | 'list'
  cardsPerPage: number
  defaultCategory?: string
  showMetrics: boolean
  autoRefresh: boolean
}

export interface Subscription {
  plan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'cancelled' | 'expired'
  currentPeriodStart: string
  currentPeriodEnd: string
  features: string[]
  limits: {
    maxAgents: number
    maxDeployments: number
    executionTime: number
  }
}

export interface WebSocketMessage {
  type: 'deployment_update' | 'agent_status' | 'execution_log' | 'system_notification'
  payload: any
  timestamp: string
  userId?: string
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'down'
  services: ServiceStatus[]
  uptime: string
  lastCheck: string
}

export interface ServiceStatus {
  name: string
  status: 'up' | 'down' | 'maintenance'
  responseTime?: number
  lastCheck: string
}

export interface ErrorInfo {
  message: string
  stack?: string
  statusCode?: number
  timestamp: string
  userId?: string
  requestId?: string
  metadata?: Record<string, any>
}

export interface LoadingState {
  isLoading: boolean
  progress?: number
  message?: string
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
}

export interface FeatureFlag {
  name: string
  enabled: boolean
  rollout?: number
  conditions?: Record<string, any>
}

export type ThemeMode = 'light' | 'dark' | 'system'

export interface AppConfig {
  name: string
  version: string
  environment: 'development' | 'staging' | 'production'
  features: FeatureFlag[]
  limits: {
    fileUploadSize: number
    apiRateLimit: number
    maxConcurrentDeployments: number
  }
  endpoints: {
    api: string
    websocket: string
    docs: string
  }
}