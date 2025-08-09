import { Agent, AgentSearchParams, DeploymentConfig, DeploymentResult } from '@/types/agent'
import { MOCK_AGENTS } from '@/lib/utils/constants'
import { logger } from '@/lib/utils/logger'
import { NotFoundError, ConflictError } from '@/lib/utils/errors'
import { nanoid } from 'nanoid'

// Mock database - in production, this would be replaced with actual database calls
class AgentRegistry {
  private agents: Map<string, Agent> = new Map()
  private deployments: Map<string, any> = new Map()

  constructor() {
    // Initialize with mock agents
    MOCK_AGENTS.forEach(agent => {
      this.agents.set(agent.id, agent)
    })
  }

  async getAgents(params: AgentSearchParams = {}) {
    const {
      category,
      search,
      limit = 20,
      offset = 0,
      sortBy = 'name',
      sortOrder = 'asc',
    } = params

    let agents = Array.from(this.agents.values())

    // Filter by category
    if (category) {
      agents = agents.filter(agent => agent.category === category)
    }

    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase()
      agents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm) ||
        agent.description.toLowerCase().includes(searchTerm) ||
        agent.features.some(feature => feature.toLowerCase().includes(searchTerm)) ||
        agent.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // Sort agents
    agents.sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'category':
          comparison = a.category.localeCompare(b.category)
          break
        case 'created_at':
          comparison = new Date(a.metadata.createdAt).getTime() - new Date(b.metadata.createdAt).getTime()
          break
        case 'popularity':
          const aDeployments = parseInt(a.metadata.totalDeployments.replace(/,/g, ''))
          const bDeployments = parseInt(b.metadata.totalDeployments.replace(/,/g, ''))
          comparison = aDeployments - bDeployments
          break
        case 'rating':
          comparison = a.metadata.rating - b.metadata.rating
          break
        default:
          comparison = 0
      }

      return sortOrder === 'asc' ? comparison : -comparison
    })

    // Pagination
    const total = agents.length
    const paginatedAgents = agents.slice(offset, offset + limit)

    return {
      agents: paginatedAgents,
      total,
      hasNext: offset + limit < total,
      hasPrevious: offset > 0,
    }
  }

  async getAgentById(id: string): Promise<Agent | null> {
    const agent = this.agents.get(id)
    if (!agent) {
      return null
    }

    return agent
  }

  async createAgent(agentData: Partial<Agent>): Promise<Agent> {
    const id = nanoid()

    // Check if agent with same name already exists
    const existingAgent = Array.from(this.agents.values()).find(
      agent => agent.name.toLowerCase() === agentData.name?.toLowerCase()
    )

    if (existingAgent) {
      throw new ConflictError(`Agent with name '${agentData.name}' already exists`)
    }

    const now = new Date().toISOString()
    const agent: Agent = {
      id,
      name: agentData.name || '',
      category: agentData.category || 'automation',
      description: agentData.description || '',
      features: agentData.features || [],
      capabilities: agentData.capabilities || '',
      useCases: agentData.useCases || [],
      version: agentData.version || '1.0.0',
      techStack: agentData.techStack || [],
      repositoryUrl: agentData.repositoryUrl,
      documentationUrl: agentData.documentationUrl,
      isActive: agentData.isActive ?? true,
      isOpenSource: agentData.isOpenSource ?? true,
      pricing: agentData.pricing || {
        model: 'free',
        cost: 'Free with API costs',
        features: ['Open Source'],
      },
      performance: agentData.performance || {
        successRate: '95%',
        averageSpeed: '1.0s',
        uptime: '99.9%',
        costPerTask: '$0.10',
      },
      metadata: {
        totalDeployments: '0',
        rating: 4.5,
        lastUpdated: now,
        createdAt: now,
        updatedAt: now,
      },
      icon: agentData.icon || '🤖',
      tags: agentData.tags || [],
    }

    this.agents.set(id, agent)
    logger.info('Agent created', { agentId: id, name: agent.name })

    return agent
  }

  async updateAgent(id: string, updates: Partial<Agent>): Promise<Agent | null> {
    const agent = this.agents.get(id)
    if (!agent) {
      return null
    }

    const updatedAgent: Agent = {
      ...agent,
      ...updates,
      metadata: {
        ...agent.metadata,
        updatedAt: new Date().toISOString(),
      },
    }

    this.agents.set(id, updatedAgent)
    logger.info('Agent updated', { agentId: id, updatedFields: Object.keys(updates) })

    return updatedAgent
  }

  async deleteAgent(id: string): Promise<boolean> {
    const agent = this.agents.get(id)
    if (!agent) {
      return false
    }

    this.agents.delete(id)
    // Also clean up any related deployments
    this.deployments.delete(id)

    logger.info('Agent deleted', { agentId: id })
    return true
  }

  async deployAgent(id: string, config: DeploymentConfig = { environment: 'development' }): Promise<DeploymentResult> {
    const agent = this.agents.get(id)
    if (!agent) {
      return {
        success: false,
        error: 'Agent not found',
        message: `Agent with ID '${id}' does not exist`,
      }
    }

    // Generate deployment ID
    const deploymentId = nanoid()

    // Simulate deployment process
    const deployment = {
      id: deploymentId,
      agentId: id,
      environment: config.environment,
      config: config.config,
      status: 'running',
      startTime: new Date().toISOString(),
      logs: [
        {
          timestamp: new Date().toISOString(),
          level: 'info',
          message: 'Deployment started',
        },
        {
          timestamp: new Date().toISOString(),
          level: 'info',
          message: 'Environment prepared',
        },
        {
          timestamp: new Date().toISOString(),
          level: 'info',
          message: 'Agent deployed successfully',
        },
      ],
    }

    this.deployments.set(deploymentId, deployment)

    // Update agent status
    const updatedAgent = { ...agent, isActive: true }
    this.agents.set(id, updatedAgent)

    logger.info('Agent deployed', {
      agentId: id,
      deploymentId,
      environment: config.environment,
    })

    return {
      success: true,
      deploymentId,
      status: 'running',
      message: 'Agent deployed successfully',
    }
  }

  async stopAgent(id: string): Promise<DeploymentResult> {
    const agent = this.agents.get(id)
    if (!agent) {
      return {
        success: false,
        error: 'Agent not found',
        message: `Agent with ID '${id}' does not exist`,
      }
    }

    // Find and stop deployments for this agent
    const deployments = Array.from(this.deployments.entries()).filter(
      ([_, deployment]) => deployment.agentId === id
    )

    deployments.forEach(([deploymentId, deployment]) => {
      deployment.status = 'stopped'
      deployment.endTime = new Date().toISOString()
      deployment.logs.push({
        timestamp: new Date().toISOString(),
        level: 'info',
        message: 'Agent stopped',
      })
      this.deployments.set(deploymentId, deployment)
    })

    // Update agent status
    const updatedAgent = { ...agent, isActive: false }
    this.agents.set(id, updatedAgent)

    logger.info('Agent stopped', { agentId: id })

    return {
      success: true,
      status: 'stopped',
      message: 'Agent stopped successfully',
    }
  }

  async getDeployment(deploymentId: string) {
    return this.deployments.get(deploymentId) || null
  }

  async getAgentDeployments(agentId: string) {
    return Array.from(this.deployments.values()).filter(
      deployment => deployment.agentId === agentId
    )
  }
}

// Create singleton instance
const agentRegistry = new AgentRegistry()

// Export individual functions for API routes
export const getAgents = (params?: AgentSearchParams) => agentRegistry.getAgents(params)
export const getAgentById = (id: string) => agentRegistry.getAgentById(id)
export const createAgent = (agentData: Partial<Agent>) => agentRegistry.createAgent(agentData)
export const updateAgent = (id: string, updates: Partial<Agent>) => agentRegistry.updateAgent(id, updates)
export const deleteAgent = (id: string) => agentRegistry.deleteAgent(id)
export const deployAgent = (id: string, config?: DeploymentConfig) => agentRegistry.deployAgent(id, config)
export const stopAgent = (id: string) => agentRegistry.stopAgent(id)
export const getDeployment = (deploymentId: string) => agentRegistry.getDeployment(deploymentId)
export const getAgentDeployments = (agentId: string) => agentRegistry.getAgentDeployments(agentId)

// Simple API key validation (in production, use proper JWT or session management)
export const validateApiKey = (apiKey: string): boolean => {
  const validApiKeys = process.env.VALID_API_KEYS?.split(',') || ['demo-key-123']
  return validApiKeys.includes(apiKey)
}

export default agentRegistry