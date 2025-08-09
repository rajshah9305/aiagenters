import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getAgentById, updateAgent, deleteAgent, deployAgent, stopAgent } from '@/lib/agents/registry'
import { rateLimit } from '@/lib/utils/rate-limit'
import { logger } from '@/lib/utils/logger'

// Input validation schemas
const UpdateAgentSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(10).max(500).optional(),
  features: z.array(z.string()).min(1).optional(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/).optional(),
  techStack: z.array(z.string()).min(1).optional(),
  repositoryUrl: z.string().url().optional(),
  documentationUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
})

const DeploymentSchema = z.object({
  action: z.enum(['deploy', 'stop', 'restart']),
  environment: z.enum(['development', 'staging', 'production']).default('development'),
  config: z.record(z.any()).optional(),
})

interface RouteContext {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit.check(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const { id } = params

    // Validate agent ID format
    if (!id || id.length < 1) {
      return NextResponse.json(
        { error: 'Invalid agent ID' },
        { status: 400 }
      )
    }

    // Get agent details
    const agent = await getAgentById(id)

    if (!agent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent not found',
          message: `Agent with ID '${id}' does not exist`,
        },
        { status: 404 }
      )
    }

    // Log successful request
    logger.info('Agent retrieved successfully', {
      agentId: id,
      name: agent.name,
      category: agent.category,
    })

    return NextResponse.json(
      {
        success: true,
        data: { agent },
        meta: {
          timestamp: new Date().toISOString(),
          version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
          'Content-Type': 'application/json',
          ...rateLimitResult.headers,
        },
      }
    )
  } catch (error) {
    logger.error('Error retrieving agent', { error, agentId: params.id })

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to retrieve agent details',
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit.check(request, { points: 3 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const { id } = params

    // Validate agent ID format
    if (!id || id.length < 1) {
      return NextResponse.json(
        { error: 'Invalid agent ID' },
        { status: 400 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = UpdateAgentSchema.parse(body)

    // Update agent
    const agent = await updateAgent(id, validatedData)

    if (!agent) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent not found',
          message: `Agent with ID '${id}' does not exist`,
        },
        { status: 404 }
      )
    }

    // Log successful update
    logger.info('Agent updated successfully', {
      agentId: id,
      name: agent.name,
      updatedFields: Object.keys(validatedData),
    })

    return NextResponse.json(
      {
        success: true,
        data: { agent },
        meta: {
          timestamp: new Date().toISOString(),
          version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...rateLimitResult.headers,
        },
      }
    )
  } catch (error) {
    logger.error('Error updating agent', { error, agentId: params.id })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to update agent',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit.check(request, { points: 5 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const { id } = params

    // Validate agent ID format
    if (!id || id.length < 1) {
      return NextResponse.json(
        { error: 'Invalid agent ID' },
        { status: 400 }
      )
    }

    // Delete agent
    const success = await deleteAgent(id)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent not found',
          message: `Agent with ID '${id}' does not exist`,
        },
        { status: 404 }
      )
    }

    // Log successful deletion
    logger.info('Agent deleted successfully', { agentId: id })

    return NextResponse.json(
      {
        success: true,
        message: 'Agent deleted successfully',
        meta: {
          timestamp: new Date().toISOString(),
          version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...rateLimitResult.headers,
        },
      }
    )
  } catch (error) {
    logger.error('Error deleting agent', { error, agentId: params.id })

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to delete agent',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit.check(request, { points: 3 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    const { id } = params

    // Validate agent ID format
    if (!id || id.length < 1) {
      return NextResponse.json(
        { error: 'Invalid agent ID' },
        { status: 400 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = DeploymentSchema.parse(body)

    let result

    switch (validatedData.action) {
      case 'deploy':
        result = await deployAgent(id, {
          environment: validatedData.environment,
          config: validatedData.config,
        })
        break
      case 'stop':
        result = await stopAgent(id)
        break
      case 'restart':
        await stopAgent(id)
        result = await deployAgent(id, {
          environment: validatedData.environment,
          config: validatedData.config,
        })
        break
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Deployment failed',
          message: result.message,
        },
        { status: 400 }
      )
    }

    // Log successful deployment action
    logger.info('Agent deployment action completed', {
      agentId: id,
      action: validatedData.action,
      environment: validatedData.environment,
      deploymentId: result.deploymentId,
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          action: validatedData.action,
          deploymentId: result.deploymentId,
          status: result.status,
          environment: validatedData.environment,
        },
        meta: {
          timestamp: new Date().toISOString(),
          version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        },
      },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...rateLimitResult.headers,
        },
      }
    )
  } catch (error) {
    logger.error('Error with agent deployment action', { error, agentId: params.id })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to execute deployment action',
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      'Access-Control-Max-Age': '86400',
    },
  })
}