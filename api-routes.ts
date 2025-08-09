// src/app/api/agents/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAgents, createAgent } from '@/lib/agents/registry'
import { rateLimit } from '@/lib/utils/rate-limit'
import { logger } from '@/lib/utils/logger'
import { handleApiError, ValidationError } from '@/lib/utils/errors'
import { formatApiResponse } from '@/lib/utils/formatters'
import { z } from 'zod'

const agentCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['coding', 'research', 'automation', 'creative', 'enterprise']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  features: z.array(z.string()).optional(),
  capabilities: z.string().optional(),
  useCases: z.array(z.string()).optional(),
  version: z.string().optional(),
  techStack: z.array(z.string()).optional(),
  repositoryUrl: z.string().url().optional(),
  documentationUrl: z.string().url().optional(),
  isOpenSource: z.boolean().optional(),
  icon: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit.check(request, { points: 60 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const { searchParams } = new URL(request.url)
    const params = {
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
      sortBy: searchParams.get('sortBy') || 'name',
      sortOrder: (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc',
    }

    const result = await getAgents(params)
    
    logger.info('Agents fetched', { 
      count: result.agents.length,
      total: result.total,
      params 
    })

    return NextResponse.json(
      formatApiResponse(result),
      { headers: rateLimitResult.headers }
    )
  } catch (error) {
    logger.error('Error fetching agents', error)
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit.check(request, { points: 10 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const body = await request.json()
    const validatedData = agentCreateSchema.parse(body)
    
    const agent = await createAgent(validatedData)
    
    logger.info('Agent created', { agentId: agent.id, name: agent.name })

    return NextResponse.json(
      formatApiResponse(agent, true, 'Agent created successfully'),
      { status: 201, headers: rateLimitResult.headers }
    )
  } catch (error) {
    logger.error('Error creating agent', error)
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}

// src/app/api/agents/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getAgentById, updateAgent, deleteAgent } from '@/lib/agents/registry'
import { rateLimit } from '@/lib/utils/rate-limit'
import { logger } from '@/lib/utils/logger'
import { handleApiError, NotFoundError } from '@/lib/utils/errors'
import { formatApiResponse } from '@/lib/utils/formatters'

interface RouteParams {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const rateLimitResult = await rateLimit.check(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const agent = await getAgentById(params.id)
    if (!agent) {
      throw new NotFoundError(`Agent with ID '${params.id}' not found`)
    }

    logger.info('Agent fetched', { agentId: params.id })

    return NextResponse.json(
      formatApiResponse(agent),
      { headers: rateLimitResult.headers }
    )
  } catch (error) {
    logger.error('Error fetching agent', error)
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const rateLimitResult = await rateLimit.check(request, { points: 20 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const body = await request.json()
    const updatedAgent = await updateAgent(params.id, body)
    
    if (!updatedAgent) {
      throw new NotFoundError(`Agent with ID '${params.id}' not found`)
    }

    logger.info('Agent updated', { agentId: params.id })

    return NextResponse.json(
      formatApiResponse(updatedAgent, true, 'Agent updated successfully'),
      { headers: rateLimitResult.headers }
    )
  } catch (error) {
    logger.error('Error updating agent', error)
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const rateLimitResult = await rateLimit.check(request, { points: 10 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const deleted = await deleteAgent(params.id)
    if (!deleted) {
      throw new NotFoundError(`Agent with ID '${params.id}' not found`)
    }

    logger.info('Agent deleted', { agentId: params.id })

    return NextResponse.json(
      formatApiResponse(null, true, 'Agent deleted successfully'),
      { headers: rateLimitResult.headers }
    )
  } catch (error) {
    logger.error('Error deleting agent', error)
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}

// src/app/api/agents/[id]/deploy/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { deployAgent, stopAgent } from '@/lib/agents/registry'
import { rateLimit } from '@/lib/utils/rate-limit'
import { logger } from '@/lib/utils/logger'
import { handleApiError } from '@/lib/utils/errors'
import { formatApiResponse } from '@/lib/utils/formatters'
import { z } from 'zod'

const deployConfigSchema = z.object({
  environment: z.enum(['development', 'staging', 'production']).default('development'),
  config: z.record(z.any()).optional(),
  resources: z.object({
    cpu: z.string().optional(),
    memory: z.string().optional(),
    timeout: z.number().optional(),
  }).optional(),
})

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rateLimitResult = await rateLimit.check(request, { points: 5 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const body = await request.json().catch(() => ({}))
    const config = deployConfigSchema.parse(body)
    
    const result = await deployAgent(params.id, config)
    
    if (!result.success) {
      return NextResponse.json(
        formatApiResponse(null, false, result.message),
        { status: 400, headers: rateLimitResult.headers }
      )
    }

    logger.info('Agent deployment initiated', { 
      agentId: params.id,
      deploymentId: result.deploymentId,
      environment: config.environment 
    })

    return NextResponse.json(
      formatApiResponse(result, true, 'Agent deployment initiated'),
      { headers: rateLimitResult.headers }
    )
  } catch (error) {
    logger.error('Error deploying agent', error)
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const rateLimitResult = await rateLimit.check(request, { points: 5 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const result = await stopAgent(params.id)
    
    if (!result.success) {
      return NextResponse.json(
        formatApiResponse(null, false, result.message),
        { status: 400, headers: rateLimitResult.headers }
      )
    }

    logger.info('Agent stopped', { agentId: params.id })

    return NextResponse.json(
      formatApiResponse(result, true, 'Agent stopped successfully'),
      { headers: rateLimitResult.headers }
    )
  } catch (error) {
    logger.error('Error stopping agent', error)
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}

// src/app/api/health/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { formatApiResponse } from '@/lib/utils/formatters'
import { APP_CONFIG } from '@/lib/utils/constants'

export async function GET(request: NextRequest) {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: APP_CONFIG.version,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    services: {
      database: 'healthy',
      cache: 'healthy',
      agents: 'healthy',
    },
  }

  return NextResponse.json(formatApiResponse(health))
}

// src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/utils/rate-limit'
import { formatApiResponse } from '@/lib/utils/formatters'

export async function GET(request: NextRequest) {
  try {
    const rateLimitResult = await rateLimit.check(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    // Mock analytics data
    const analytics = {
      activeAgents: 847,
      runningDeployments: 156,
      totalExecutions: 124567,
      successRate: 99.2,
      averageResponseTime: 0.8,
      costSavings: 2100000,
      apiCalls: 8900000,
      metrics: {
        hourly: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          requests: Math.floor(Math.random() * 1000) + 500,
          success: Math.floor(Math.random() * 950) + 950,
          errors: Math.floor(Math.random() * 50),
        })),
        daily: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          agents: Math.floor(Math.random() * 100) + 800,
          deployments: Math.floor(Math.random() * 50) + 120,
          executions: Math.floor(Math.random() * 5000) + 10000,
        })),
      },
    }

    return NextResponse.json(
      formatApiResponse(analytics),
      { headers: rateLimitResult.headers }
    )
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}