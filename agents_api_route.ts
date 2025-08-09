import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getAgents, createAgent, validateApiKey } from '@/lib/agents/registry'
import { rateLimit } from '@/lib/utils/rate-limit'
import { logger } from '@/lib/utils/logger'

// Input validation schemas
const CreateAgentSchema = z.object({
  name: z.string().min(1).max(100),
  category: z.enum(['coding', 'research', 'automation', 'creative', 'enterprise']),
  description: z.string().min(10).max(500),
  features: z.array(z.string()).min(1),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  techStack: z.array(z.string()).min(1),
  repositoryUrl: z.string().url().optional(),
  documentationUrl: z.string().url().optional(),
})

const QuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
  sortBy: z.enum(['name', 'category', 'created_at', 'popularity']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
})

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit.check(request)
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    // Parse and validate query parameters
    const url = new URL(request.url)
    const queryParams = Object.fromEntries(url.searchParams.entries())
    const validatedQuery = QuerySchema.parse(queryParams)

    // Get agents from registry
    const result = await getAgents({
      category: validatedQuery.category,
      search: validatedQuery.search,
      limit: validatedQuery.limit,
      offset: validatedQuery.offset,
      sortBy: validatedQuery.sortBy,
      sortOrder: validatedQuery.sortOrder,
    })

    // Log successful request
    logger.info('Agents retrieved successfully', {
      count: result.agents.length,
      total: result.total,
      category: validatedQuery.category,
      search: validatedQuery.search,
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          agents: result.agents,
          pagination: {
            total: result.total,
            limit: validatedQuery.limit,
            offset: validatedQuery.offset,
            hasNext: result.total > validatedQuery.offset + validatedQuery.limit,
            hasPrevious: validatedQuery.offset > 0,
          },
        },
        meta: {
          timestamp: new Date().toISOString(),
          version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        },
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'Content-Type': 'application/json',
          ...rateLimitResult.headers,
        },
      }
    )
  } catch (error) {
    logger.error('Error retrieving agents', { error })

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to retrieve agents',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit.check(request, { points: 5 })
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: rateLimitResult.headers }
      )
    }

    // Validate API key
    const apiKey = request.headers.get('x-api-key')
    if (!apiKey || !validateApiKey(apiKey)) {
      return NextResponse.json(
        { error: 'Invalid or missing API key' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validatedData = CreateAgentSchema.parse(body)

    // Create new agent
    const agent = await createAgent(validatedData)

    // Log successful creation
    logger.info('Agent created successfully', {
      agentId: agent.id,
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
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Location': `/api/agents/${agent.id}`,
          ...rateLimitResult.headers,
        },
      }
    )
  } catch (error) {
    logger.error('Error creating agent', { error })

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

    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Agent already exists',
          message: 'An agent with this name already exists',
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Failed to create agent',
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
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
      'Access-Control-Max-Age': '86400',
    },
  })
}