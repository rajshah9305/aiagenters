import { Agent, AgentSearchParams, AgentSearchResult, DeploymentConfig, DeploymentResult } from '@/types/agent'
import { SAMPLE_AGENTS } from '@/lib/utils/constants'
import { logger } from '@/lib/utils/logger'
import { generateId } from '@/lib/utils/formatters'

// In-memory store for development (replace with database in production)
class AgentRegistry {
  private agents = new Map<string, Agent>()
  private deployments = new Map<string, any>()

  constructor() {
    // Initialize with sample agents
    SAMPLE_AGENTS.forEach(agent => {
      this.agents.set(agent.id, agent)
    })

    // Add more sample agents
    this.initializeSampleAgents()
  }

  private initializeSampleAgents() {
    const additionalAgents: Agent[] = [
      {
        id: 'chatdev',
        name: 'ChatDev',
        category: 'enterprise',
        description: 'Virtual software company with AI agents in different roles collaborating on software development.',
        features: ['Multi-Role Agents', 'Collaborative Development', 'QA Testing', 'Project Management', 'Code Review', 'Documentation'],
        capabilities: 'ChatDev simulates an entire software development team with CEO, CTO, programmer, designer, and tester roles. Each agent specializes in their domain for professional-quality output.',
        useCases: ['Enterprise Development', 'Team Collaboration', 'Quality Assurance', 'Large Projects', 'Professional Software', 'Corporate Solutions'],
        version: '1.4.1',
        techStack: ['GPT-4', 'Multi-Agent Framework', 'Git Integration', 'Docker', 'Testing Suites'],
        repositoryUrl: 'https://github.com/OpenBMB/ChatDev',
        documentationUrl: 'https://chatdev.modelbest.cn/',
        isActive: true,
        isOpenSource: true,
        pricing: { model: 'freemium', cost: '$1.20/project' },
        performance: { successRate: '96%', averageSpeed: '25.7s', uptime: '99.6%', costPerTask: '$1.20' },
        metadata: { totalDeployments: '1,234', rating: 4.8, lastUpdated: '2024-01-12', createdAt: '2023-07-20', updatedAt: '2024-01-12' },
        icon: '👥',
        tags: ['enterprise', 'collaboration', 'team', 'development'],
      },
      {
        id: 'swe-agent',
        name: 'SWE-Agent',
        category: 'coding',
        description: 'Software Engineering Agent that automatically identifies and fixes bugs in codebases.',
        features: ['Bug Detection', 'Automated Fixes', 'Code Analysis', 'GitHub Integration', 'Testing', 'Quality Assurance'],
        capabilities: 'SWE-Agent analyzes codebases, identifies issues, and implements fixes automatically. Integrates with GitHub for seamless workflow and maintains code quality standards.',
        useCases: ['Bug Fixing', 'Code Maintenance', 'Quality Control', 'GitHub Integration', 'Automated Testing', 'Code Review'],
        version: '0.2.8',
        techStack: ['GPT-4', 'GitHub API', 'Static Analysis', 'Testing Frameworks', 'CI/CD'],
        repositoryUrl: 'https://github.com/princeton-nlp/SWE-agent',
        isActive: true,
        isOpenSource: true,
        pricing: { model: 'free', cost: '$0.25/fix' },
        performance: { successRate: '89%', averageSpeed: '8.4s', uptime: '99.5%', costPerTask: '$0.25' },
        metadata: { totalDeployments: '5,678', rating: 4.6, lastUpdated: '2024-01-14', createdAt: '2023-08-05', updatedAt: '2024-01-14' },
        icon: '🔧',
        tags: ['coding', 'bugs', 'automation', 'github'],
      },
      {
        id: 'chemcrow',
        name: 'ChemCrow',
        category: 'research',
        description: 'Specialized chemistry agent with 13 expert tools for molecular analysis, synthesis planning, and chemical research.',
        features: ['Molecular Analysis', 'Synthesis Planning', 'Chemical Tools', 'Expert Knowledge', 'Research Assistance', 'Data Analysis'],
        capabilities: 'ChemCrow uses advanced chemistry tools and knowledge bases to assist with molecular analysis, synthesis planning, and chemical research. Outperforms general AI in chemistry-specific tasks.',
        useCases: ['Drug Discovery', 'Material Science', 'Chemical Synthesis', 'Molecular Modeling', 'Research Analysis', 'Academic Chemistry'],
        version: '1.2.0',
        techStack: ['GPT-4', 'RDKit', 'Chemical Databases', 'Python', 'Molecular Tools'],
        repositoryUrl: 'https://github.com/ur-whitelab/chemcrow-public',
        isActive: true,
        isOpenSource: true,
        pricing: { model: 'free', cost: '$0.15/analysis' },
        performance: { successRate: '91%', averageSpeed: '12.1s', uptime: '99.3%', costPerTask: '$0.15' },
        metadata: { totalDeployments: '892', rating: 4.7, lastUpdated: '2024-01-11', createdAt: '2023-09-12', updatedAt: '2024-01-11' },
        icon: '🧪',
        tags: ['chemistry', 'research', 'molecules', 'analysis'],
      },
      {
        id: 'aider',
        name: 'Aider',
        category: 'coding',
        description: 'AI pair programming tool that edits code in your local git repository. Seamlessly integrates with existing projects.',
        features: ['Pair Programming', 'Git Integration', 'Local Repository', 'Code Editing', 'Context Awareness', 'Version Control'],
        capabilities: 'Aider works directly with your local git repository, understanding context and making intelligent code changes while maintaining clean git history.',
        useCases: ['Code Enhancement', 'Bug Fixes', 'Feature Development', 'Refactoring', 'Code Review', 'Pair Programming'],
        version: '0.34.0',
        techStack: ['GPT-4', 'Git', 'Python', 'Tree-sitter', 'Language Servers'],
        repositoryUrl: 'https://github.com/paul-gauthier/aider',
        isActive: true,
        isOpenSource: true,
        pricing: { model: 'free', cost: '$0.05/edit' },
        performance: { successRate: '88%', averageSpeed: '3.2s', uptime: '99.7%', costPerTask: '$0.05' },
        metadata: { totalDeployments: '4,123', rating: 4.5, lastUpdated: '2024-01-13', createdAt: '2023-05-18', updatedAt: '2024-01-13' },
        icon: '🤝',
        tags: ['coding', 'git', 'pair-programming', 'local'],
      },
      {
        id: 'agent4rec',
        name: 'Agent4Rec',
        category: 'creative',
        description: 'Recommender system simulator with 1,000 LLM-powered generative agents for personalized recommendations.',
        features: ['1000 Agents', 'Personalization', 'Behavior Simulation', 'Collaborative Filtering', 'Recommendation Engine', 'User Modeling'],
        capabilities: 'Agent4Rec creates personalized recommendations through multi-agent collaboration and user behavior simulation with 1,000 intelligent agents.',
        useCases: ['E-commerce', 'Content Recommendation', 'Product Discovery', 'User Personalization', 'Marketing', 'Customer Experience'],
        version: '1.0.2',
        techStack: ['GPT-4', 'Multi-Agent System', 'Recommendation Algorithms', 'User Modeling', 'ML Pipeline'],
        repositoryUrl: 'https://github.com/LehengTHU/Agent4Rec',
        isActive: true,
        isOpenSource: true,
        pricing: { model: 'freemium', cost: '$0.30/recommendation' },
        performance: { successRate: '93%', averageSpeed: '5.8s', uptime: '99.1%', costPerTask: '$0.30' },
        metadata: { totalDeployments: '756', rating: 4.6, lastUpdated: '2024-01-09', createdAt: '2023-10-25', updatedAt: '2024-01-09' },
        icon: '🎯',
        tags: ['recommendations', 'personalization', 'e-commerce', 'ml'],
      },
    ]

    additionalAgents.forEach(agent => {
      this.agents.set(agent.id, agent)
    })
  }

  async getAgents(params: AgentSearchParams): Promise<AgentSearchResult> {
    try {
      let filteredAgents = Array.from(this.agents.values())

      // Apply category filter
      if (params.category) {
        filteredAgents = filteredAgents.filter(agent => agent.category === params.category)
      }

      // Apply search filter
      if (params.search) {
        const searchTerm = params.search.toLowerCase()
        filteredAgents = filteredAgents.filter(agent =>
          agent.name.toLowerCase().includes(searchTerm) ||
          agent.description.toLowerCase().includes(searchTerm) ||
          agent.category.toLowerCase().includes(searchTerm) ||
          agent.features.some(feature => feature.toLowerCase().includes(searchTerm)) ||
          agent.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        )
      }

      // Apply sorting
      filteredAgents.sort((a, b) => {
        let comparison = 0
        switch (params.sortBy) {
          case 'name':
            comparison = a.name.localeCompare(b.name)
            break
          case 'category':
            comparison = a.category.localeCompare(b.category)
            break
          case 'popularity':
            comparison = parseInt(b.metadata.totalDeployments.replace(/,/g, '')) - parseInt(a.metadata.totalDeployments.replace(/,/g, ''))
            break
          case 'rating':
            comparison = b.metadata.rating - a.metadata.rating
            break
          case 'created_at':
          default:
            comparison = new Date(b.metadata.createdAt).getTime() - new Date(a.metadata.createdAt).getTime()
            break
        }
        return params.sortOrder === 'desc' ? comparison : -comparison
      })

      // Apply pagination
      const total = filteredAgents.length
      const startIndex = params.offset || 0
      const limit = params.limit || 20
      const paginatedAgents = filteredAgents.slice(startIndex, startIndex + limit)

      return {
        agents: paginatedAgents,
        total,
        hasNext: startIndex + limit < total,
        hasPrevious: startIndex > 0,
      }
    } catch (error) {
      logger.error('Error getting agents', { error, params })
      throw error
    }
  }

  async getAgentById(id: string): Promise<Agent | undefined> {
    try {
      const agent = this.agents.get(id)
      if (agent) {
        logger.info('Agent retrieved', { agentId: id, name: agent.name })
      }
      return agent
    } catch (error) {
      logger.error('Error getting agent by ID', { error, agentId: id })
      throw error
    }
  }

  async createAgent(agentData: Omit<Agent, 'id' | 'metadata'>): Promise<Agent> {
    try {
      const id = generateId('agent')
      const now = new Date().toISOString()
      
      const agent: Agent = {
        ...agentData,
        id,
        metadata: {
          totalDeployments: '0',
          rating: 0,
          lastUpdated: now,
          createdAt: now,
          updatedAt: now,
        },
      }

      this.agents.set(id, agent)
      logger.info('Agent created', { agentId: id, name: agent.name })
      
      return agent
    } catch (error) {
      logger.error('Error creating agent', { error, agentData })
      throw error
    }
  }

  async updateAgent(id: string, updates: Partial<Agent>): Promise<Agent | undefined> {
    try {
      const existingAgent = this.agents.get(id)
      if (!existingAgent) {
        return undefined
      }

      const updatedAgent: Agent = {
        ...existingAgent,
        ...updates,
        id, // Ensure ID doesn't change
        metadata: {
          ...existingAgent.metadata,
          ...updates.metadata,
          updatedAt: new Date().toISOString(),
        },
      }

      this.agents.set(id, updatedAgent)
      logger.info('Agent updated', { agentId: id, updatedFields: Object.keys(updates) })
      
      return updatedAgent
    } catch (error) {
      logger.error('Error updating agent', { error, agentId: id, updates })
      throw error
    }
  }

  async deleteAgent(id: string): Promise<boolean> {
    try {
      const existed = this.agents.has(id)
      if (existed) {
        this.agents.delete(id)
        // Also clean up any related deployments
        for (const [deploymentId, deployment] of this.deployments.entries()) {
          if (deployment.agentId === id) {
            this.deployments.delete(deploymentId)
          }
        }
        logger.info('Agent deleted', { agentId: id })
      }
      return existed
    } catch (error) {
      logger.error('Error deleting agent', { error, agentId: id })
      throw error
    }
  }

  async deployAgent(id: string, config: DeploymentConfig): Promise<DeploymentResult> {
    try {
      const agent = this.agents.get(id)
      if (!agent) {
        return {
          success: false,
          error: 'Agent not found',
          message: `Agent with ID '${id}' does not exist`,
        }
      }

      const deploymentId = generateId('deploy')
      const deployment = {
        id: deploymentId,
        agentId: id,
        environment: config.environment,
        status: 'deploying',
        startTime: new Date().toISOString(),
        config,
        logs: [{
          timestamp: new Date().toISOString(),
          level: 'info',
          message: `Starting deployment of ${agent.name} to ${config.environment}`,
        }],
      }

      this.deployments.set(deploymentId, deployment)

      // Simulate deployment process
      setTimeout(() => {
        const updatedDeployment = {
          ...deployment,
          status: 'running',
          completedAt: new Date().toISOString(),
          logs: [
            ...deployment.logs,
            {
              timestamp: new Date().toISOString(),
              level: 'info',
              message: 'Deployment completed successfully',
            },
          ],
        }
        this.deployments.set(deploymentId, updatedDeployment)

        // Update agent deployment count
        const currentDeployments = parseInt(agent.metadata.totalDeployments.replace(/,/g, ''))
        this.updateAgent(id, {
          deploymentStatus: 'running',
          metadata: {
            ...agent.metadata,
            totalDeployments: (currentDeployments + 1).toLocaleString(),
          },
        })
      }, 2000)

      logger.info('Agent deployment started', { agentId: id, deploymentId, environment: config.environment })

      return {
        success: true,
        deploymentId,
        status: 'deploying',
        message: `Deployment of ${agent.name} started successfully`,
        logs: deployment.logs,
      }
    } catch (error) {
      logger.error('Error deploying agent', { error, agentId: id, config })
      return {
        success: false,
        error: 'Deployment failed',
        message: 'An error occurred during deployment',
      }
    }
  }

  async stopAgent(id: string): Promise<DeploymentResult> {
    try {
      const agent = this.agents.get(id)
      if (!agent) {
        return {
          success: false,
          error: 'Agent not found',
          message: `Agent with ID '${id}' does not exist`,
        }
      }

      // Find active deployments for this agent
      const activeDeployments = Array.from(this.deployments.values())
        .filter(deployment => deployment.agentId === id && deployment.status === 'running')

      if (activeDeployments.length === 0) {
        return {
          success: false,
          error: 'No active deployments',
          message: `No active deployments found for ${agent.name}`,
        }
      }

      // Stop all active deployments
      for (const deployment of activeDeployments) {
        const updatedDeployment = {
          ...deployment,
          status: 'stopped',
          completedAt: new Date().toISOString(),
          logs: [
            ...deployment.logs,
            {
              timestamp: new Date().toISOString(),
              level: 'info',
              message: 'Agent stopped by user request',
            },
          ],
        }
        this.deployments.set(deployment.id, updatedDeployment)
      }

      // Update agent status
      await this.updateAgent(id, {
        deploymentStatus: 'stopped',
      })

      logger.info('Agent stopped', { agentId: id, stoppedDeployments: activeDeployments.length })

      return {
        success: true,
        status: 'stopped',
        message: `${agent.name} stopped successfully`,
      }
    } catch (error) {
      logger.error('Error stopping agent', { error, agentId: id })
      return {
        success: false,
        error: 'Stop operation failed',
        message: 'An error occurred while stopping the agent',
      }
    }
  }

  getDeployment(deploymentId: string) {
    return this.deployments.get(deploymentId)
  }

  getAgentDeployments(agentId: string) {
    return Array.from(this.deployments.values())
      .filter(deployment => deployment.agentId === agentId)
  }

  getAllDeployments() {
    return Array.from(this.deployments.values())
  }

  getStats() {
    const agents = Array.from(this.agents.values())
    const deployments = Array.from(this.deployments.values())
    
    return {
      totalAgents: agents.length,
      activeDeployments: deployments.filter(d => d.status === 'running').length,
      categoryCounts: agents.reduce((acc, agent) => {
        acc[agent.category] = (acc[agent.category] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      averageRating: agents.reduce((sum, agent) => sum + agent.metadata.rating, 0) / agents.length,
    }
  }
}

// Create singleton instance
export const agentRegistry = new AgentRegistry()

// Export convenience functions
export const getAgents = (params: AgentSearchParams) => agentRegistry.getAgents(params)
export const getAgentById = (id: string) => agentRegistry.getAgentById(id)
export const createAgent = (data: Omit<Agent, 'id' | 'metadata'>) => agentRegistry.createAgent(data)
export const updateAgent = (id: string, updates: Partial<Agent>) => agentRegistry.updateAgent(id, updates)
export const deleteAgent = (id: string) => agentRegistry.deleteAgent(id)
export const deployAgent = (id: string, config: DeploymentConfig) => agentRegistry.deployAgent(id, config)
export const stopAgent = (id: string) => agentRegistry.stopAgent(id)

// API key validation (simple implementation for demo)
export const validateApiKey = (apiKey: string): boolean => {
  // In production, implement proper API key validation
  return apiKey === process.env.ADMIN_API_KEY || apiKey?.startsWith('af_dev_')
}