// src/lib/utils/rate-limit.ts
interface RateLimitOptions {
  points?: number
  duration?: number
  blockDuration?: number
}

interface RateLimitResult {
  success: boolean
  headers: Record<string, string>
  remaining?: number
  resetTime?: number
}

class RateLimit {
  private requests = new Map<string, { count: number; resetTime: number }>()

  async check(
    request: Request,
    options: RateLimitOptions = {}
  ): Promise<RateLimitResult> {
    const {
      points = 60,
      duration = 60000, // 1 minute
      blockDuration = 60000, // 1 minute
    } = options

    // Get client identifier (IP address)
    const clientId = this.getClientId(request)
    const now = Date.now()

    // Clean up expired entries
    this.cleanup()

    // Get or create request record
    let record = this.requests.get(clientId)
    if (!record || now > record.resetTime) {
      record = { count: 0, resetTime: now + duration }
      this.requests.set(clientId, record)
    }

    // Check if limit exceeded
    if (record.count >= points) {
      const resetTime = Math.ceil(record.resetTime / 1000)
      return {
        success: false,
        headers: {
          'X-RateLimit-Limit': points.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': resetTime.toString(),
          'Retry-After': Math.ceil(blockDuration / 1000).toString(),
        },
      }
    }

    // Increment counter
    record.count++

    const remaining = points - record.count
    const resetTime = Math.ceil(record.resetTime / 1000)

    return {
      success: true,
      headers: {
        'X-RateLimit-Limit': points.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toString(),
      },
      remaining,
      resetTime,
    }
  }

  private getClientId(request: Request): string {
    // In production, you might want to use a more sophisticated method
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip')
    return ip || 'unknown'
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [clientId, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(clientId)
      }
    }
  }
}

export const rateLimit = new RateLimit()

// src/lib/utils/logger.ts
type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  data?: any
  timestamp: string
  requestId?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  debug(message: string, data?: any): void {
    this.log('debug', message, data)
  }

  info(message: string, data?: any): void {
    this.log('info', message, data)
  }

  warn(message: string, data?: any): void {
    this.log('warn', message, data)
  }

  error(message: string, data?: any): void {
    this.log('error', message, data)
  }

  private log(level: LogLevel, message: string, data?: any): void {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    }

    if (this.isDevelopment) {
      const color = this.getColor(level)
      console.log(
        `%c[${level.toUpperCase()}] ${entry.timestamp} - ${message}`,
        `color: ${color}`,
        data || ''
      )
    } else {
      // In production, you might want to send logs to a service
      console.log(JSON.stringify(entry))
    }
  }

  private getColor(level: LogLevel): string {
    const colors = {
      debug: '#6b7280',
      info: '#3b82f6',
      warn: '#f59e0b',
      error: '#ef4444',
    }
    return colors[level]
  }
}

export const logger = new Logger()

// src/lib/utils/formatters.ts
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return formatDate(date)
}

export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
}

export const formatApiResponse = <T>(data: T, success = true, message?: string) => {
  return {
    success,
    data,
    message,
    timestamp: new Date().toISOString(),
  }
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// src/lib/utils/validators.ts
import { z } from 'zod'

export const emailSchema = z.string().email('Invalid email address')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

export const agentIdSchema = z.string().min(1, 'Agent ID is required')

export const deploymentConfigSchema = z.object({
  environment: z.enum(['development', 'staging', 'production']),
  config: z.record(z.any()).optional(),
  resources: z.object({
    cpu: z.string().optional(),
    memory: z.string().optional(),
    timeout: z.number().optional(),
  }).optional(),
})

export const validateEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success
}

export const validatePassword = (password: string): boolean => {
  return passwordSchema.safeParse(password).success
}

export const validateAgentId = (id: string): boolean => {
  return agentIdSchema.safeParse(id).success
}

// src/lib/utils/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, 'NOT_FOUND')
    this.name = 'NotFoundError'
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN')
    this.name = 'ForbiddenError'
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT')
    this.name = 'ConflictError'
  }
}

export const handleApiError = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      success: false,
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
    }
  }

  if (error instanceof z.ZodError) {
    return {
      success: false,
      error: 'Validation failed',
      details: error.errors,
      statusCode: 400,
    }
  }

  // Unknown error
  logger.error('Unknown error occurred', error)
  return {
    success: false,
    error: 'Internal server error',
    statusCode: 500,
  }
}