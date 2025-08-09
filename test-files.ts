// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/layout.tsx',
    '!src/app/globals.css',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)

// jest.setup.js
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock intersection observer
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// src/__tests__/components/ui/button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('h-10', 'px-4', 'py-2')
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="neural">Neural Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-agent-gradient')
  })

  it('applies size classes correctly', () => {
    render(<Button size="lg">Large Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('h-11')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Button onClick={handleClick}>Clickable</Button>)
    const button = screen.getByRole('button')
    
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
})

// src/__tests__/components/ui/card.test.tsx
import { render, screen } from '@testing-library/react'
import { AgentCard } from '@/components/ui/card'

const mockAgent = {
  id: 'test-agent',
  name: 'Test Agent',
  category: 'automation',
  description: 'A test agent for automation tasks',
  icon: '🤖',
  rating: 4.5,
  deployments: '1,234',
  status: 'active' as const,
}

describe('AgentCard', () => {
  it('renders agent information correctly', () => {
    render(<AgentCard agent={mockAgent} />)
    
    expect(screen.getByText('Test Agent')).toBeInTheDocument()
    expect(screen.getByText('A test agent for automation tasks')).toBeInTheDocument()
    expect(screen.getByText('automation')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
    expect(screen.getByText('1,234')).toBeInTheDocument()
  })

  it('shows correct status', () => {
    render(<AgentCard agent={mockAgent} />)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('calls onDeploy when deploy button is clicked', async () => {
    const user = userEvent.setup()
    const onDeploy = jest.fn()
    
    render(<AgentCard agent={mockAgent} onDeploy={onDeploy} />)
    
    const deployButton = screen.getByText('Deploy')
    await user.click(deployButton)
    
    expect(onDeploy).toHaveBeenCalledTimes(1)
  })

  it('calls onView when view button is clicked', async () => {
    const user = userEvent.setup()
    const onView = jest.fn()
    
    render(<AgentCard agent={mockAgent} onView={onView} />)
    
    const viewButton = screen.getByText('View Details')
    await user.click(viewButton)
    
    expect(onView).toHaveBeenCalledTimes(1)
  })
})

// src/__tests__/lib/utils/formatters.test.ts
import {
  formatNumber,
  formatCurrency,
  formatDate,
  formatRelativeTime,
  formatDuration,
  truncateText,
  slugify,
} from '@/lib/utils/formatters'

describe('formatters', () => {
  describe('formatNumber', () => {
    it('formats large numbers correctly', () => {
      expect(formatNumber(1234567)).toBe('1.2M')
      expect(formatNumber(1234)).toBe('1.2K')
      expect(formatNumber(123)).toBe('123')
    })
  })

  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56')
      expect(formatCurrency(0)).toBe('$0.00')
    })
  })

  describe('formatDate', () => {
    it('formats dates correctly', () => {
      const date = new Date('2024-01-15')
      const formatted = formatDate(date)
      expect(formatted).toMatch(/Jan 15, 2024/)
    })
  })

  describe('formatDuration', () => {
    it('formats duration correctly', () => {
      expect(formatDuration(30)).toBe('30s')
      expect(formatDuration(90)).toBe('1m 30s')
      expect(formatDuration(3661)).toBe('1h 1m')
    })
  })

  describe('truncateText', () => {
    it('truncates text correctly', () => {
      const text = 'This is a long text that should be truncated'
      expect(truncateText(text, 20)).toBe('This is a long text...')
      expect(truncateText('Short', 20)).toBe('Short')
    })
  })

  describe('slugify', () => {
    it('creates slugs correctly', () => {
      expect(slugify('Hello World!')).toBe('hello-world')
      expect(slugify('Test-Agent_Name')).toBe('test-agent-name')
    })
  })
})

// src/__tests__/lib/utils/validators.test.ts
import {
  validateEmail,
  validatePassword,
  validateAgentId,
} from '@/lib/utils/validators'

describe('validators', () => {
  describe('validateEmail', () => {
    it('validates correct emails', () => {
      expect(validateEmail('test@example.com')).toBe(true)
      expect(validateEmail('user+tag@domain.co.uk')).toBe(true)
    })

    it('rejects invalid emails', () => {
      expect(validateEmail('invalid-email')).toBe(false)
      expect(validateEmail('test@')).toBe(false)
      expect(validateEmail('@example.com')).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('validates strong passwords', () => {
      expect(validatePassword('StrongP@ss123')).toBe(true)
      expect(validatePassword('Another1!')).toBe(true)
    })

    it('rejects weak passwords', () => {
      expect(validatePassword('weak')).toBe(false)
      expect(validatePassword('nouppercas3')).toBe(false)
      expect(validatePassword('NOLOWERCASE1')).toBe(false)
      expect(validatePassword('NoNumbers!')).toBe(false)
    })
  })

  describe('validateAgentId', () => {
    it('validates agent IDs', () => {
      expect(validateAgentId('valid-agent-id')).toBe(true)
      expect(validateAgentId('agent123')).toBe(true)
    })

    it('rejects invalid agent IDs', () => {
      expect(validateAgentId('')).toBe(false)
      expect(validateAgentId('   ')).toBe(false)
    })
  })
})

// src/__tests__/api/agents.test.ts
import { createMocks } from 'node-mocks-http'
import { GET, POST } from '@/app/api/agents/route'

// Mock the registry
jest.mock('@/lib/agents/registry', () => ({
  getAgents: jest.fn(),
  createAgent: jest.fn(),
}))

import { getAgents, createAgent } from '@/lib/agents/registry'

const mockGetAgents = getAgents as jest.MockedFunction<typeof getAgents>
const mockCreateAgent = createAgent as jest.MockedFunction<typeof createAgent>

describe('/api/agents', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('returns agents successfully', async () => {
      const mockResponse = {
        agents: [
          {
            id: 'test-agent',
            name: 'Test Agent',
            category: 'automation',
            description: 'Test description',
          },
        ],
        total: 1,
        hasNext: false,
        hasPrevious: false,
      }

      mockGetAgents.mockResolvedValue(mockResponse)

      const { req } = createMocks({
        method: 'GET',
        url: '/api/agents',
      })

      const response = await GET(req as any)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockResponse)
    })

    it('handles search parameters', async () => {
      const { req } = createMocks({
        method: 'GET',
        url: '/api/agents?category=automation&search=test',
      })

      mockGetAgents.mockResolvedValue({
        agents: [],
        total: 0,
        hasNext: false,
        hasPrevious: false,
      })

      await GET(req as any)

      expect(mockGetAgents).toHaveBeenCalledWith({
        category: 'automation',
        search: 'test',
        limit: 20,
        offset: 0,
        sortBy: 'name',
        sortOrder: 'asc',
      })
    })
  })

  describe('POST', () => {
    it('creates agent successfully', async () => {
      const mockAgent = {
        id: 'new-agent',
        name: 'New Agent',
        category: 'automation',
        description: 'A new test agent',
      }

      mockCreateAgent.mockResolvedValue(mockAgent as any)

      const { req } = createMocks({
        method: 'POST',
        body: {
          name: 'New Agent',
          category: 'automation',
          description: 'A new test agent',
        },
      })

      const response = await POST(req as any)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockAgent)
    })
  })
})