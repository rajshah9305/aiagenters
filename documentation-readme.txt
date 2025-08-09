# AgentForge Elite

<div align="center">
  <img src="public/logo.png" alt="AgentForge Elite" width="200" height="200">
  
  **Revolutionary AI Agents Orchestration Platform**
  
  Deploy, manage, and orchestrate autonomous AI agents with unprecedented power and ease.

  [![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-38bdf8)](https://tailwindcss.com/)
  [![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16-ff69b4)](https://www.framer.com/motion/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
</div>

## 🚀 Features

### 🧠 **50+ AI Agents**
- **AutoGPT** - Autonomous reasoning and task execution
- **GPT Engineer** - Full-stack code generation
- **BabyAGI** - Task management with persistent memory
- **ChatDev** - Multi-agent development teams
- **SWE-Agent** - Software engineering automation
- **ChemCrow** - Specialized chemistry research
- And many more cutting-edge agents...

### 🎛️ **Advanced Orchestration**
- Real-time multi-agent coordination
- Neural workspace environment
- Intelligent task distribution
- Automated workflow management
- Performance monitoring & optimization

### 👥 **Real-time Collaboration**
- Team workspace sharing
- Live activity monitoring
- Collaborative agent management
- Real-time notifications
- Role-based access control

### 📊 **Comprehensive Analytics**
- Performance metrics & insights
- Success rate tracking
- Cost optimization analytics
- Usage pattern analysis
- Custom dashboards

### 🔧 **Developer Experience**
- Intuitive web interface
- Terminal-style command center
- RESTful API access
- Comprehensive documentation
- TypeScript support throughout

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **Animations**: Framer Motion
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React
- **Validation**: Zod
- **State Management**: React Hooks + Context
- **API**: Next.js API Routes
- **Database**: In-memory (with external DB support)

## 🏁 Quick Start

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/agentforge/agentforge-elite.git
   cd agentforge-elite
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

AgentForge Elite features a cutting-edge neural-inspired design system:

### Colors
- **Surface**: Deep dark backgrounds with glass morphism
- **Neon Accents**: Cyan (#00d4ff), Green (#00ff88), Purple (#8b5cf6)
- **Typography**: Gradient text effects and premium font stacks
- **Glass Effects**: Backdrop blur and transparency layers

### Components
- **Neural Cards**: Hover effects with quantum shadows
- **Agent Gradients**: Dynamic multi-color backgrounds
- **Animated Elements**: Framer Motion powered interactions
- **Responsive Design**: Mobile-first approach

## 📡 API Reference

### Agents

```typescript
// Get all agents
GET /api/agents
Query params: category, search, limit, offset, sortBy, sortOrder

// Get specific agent
GET /api/agents/[id]

// Create new agent
POST /api/agents
Body: AgentCreateRequest

// Update agent
PUT /api/agents/[id]
Body: AgentUpdateRequest

// Delete agent
DELETE /api/agents/[id]
```

### Deployments

```typescript
// Deploy agent
POST /api/agents/[id]/deploy
Body: DeploymentConfig

// Stop agent
DELETE /api/agents/[id]/deploy

// Get deployment status
GET /api/deployments/[deploymentId]
```

### Analytics

```typescript
// Get analytics data
GET /api/analytics

// Get real-time metrics
GET /api/analytics/real-time
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set environment variables**
   Configure your environment variables in the Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Docker

```bash
# Build the image
docker build -t agentforge-elite .

# Run the container
docker run -p 3000:3000 agentforge-elite
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 🔧 Configuration

### Environment Variables

```env
# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME="AgentForge Elite"

# API Configuration  
API_RATE_LIMIT_POINTS=60
VALID_API_KEYS=your-api-keys

# External APIs
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key

# Database (optional)
DATABASE_URL=your-database-url

# Analytics (optional)
GOOGLE_ANALYTICS_ID=your-ga-id
```

### Feature Flags

Enable/disable features via environment variables:

```env
NEXT_PUBLIC_FEATURE_AGENTS=true
NEXT_PUBLIC_FEATURE_COLLABORATION=true
NEXT_PUBLIC_FEATURE_ANALYTICS=true
NEXT_PUBLIC_FEATURE_TERMINAL=true
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

### Code Style

- Use TypeScript for all code
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

## 📚 Documentation

- [API Documentation](docs/api.md)
- [Component Guide](docs/components.md)
- [Deployment Guide](docs/deployment.md)
- [Contributing Guide](CONTRIBUTING.md)

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core agent marketplace
- ✅ Basic orchestration
- ✅ Real-time collaboration
- ✅ Analytics dashboard

### Phase 2 (Q2 2024)
- 🔄 Advanced workflow builder
- 🔄 Custom agent creation
- 🔄 Plugin system
- 🔄 Enterprise features

### Phase 3 (Q3 2024)
- 📋 AI-powered agent recommendations
- 📋 Advanced monitoring
- 📋 Multi-tenant support
- 📋 Mobile application

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT models and APIs
- **Anthropic** for Claude models
- **Vercel** for hosting and deployment
- **Open Source Community** for amazing tools and libraries

## 📞 Support

- 📧 Email: support@agentforge-elite.com
- 💬 Discord: [Join our community](https://discord.gg/agentforge)
- 📖 Documentation: [docs.agentforge-elite.com](https://docs.agentforge-elite.com)
- 🐛 Issues: [GitHub Issues](https://github.com/agentforge/agentforge-elite/issues)

---

<div align="center">
  Made with ❤️ by the AgentForge Elite Team
  
  **[Website](https://agentforge-elite.com) • [Documentation](https://docs.agentforge-elite.com) • [Community](https://discord.gg/agentforge)**
</div>

# CONTRIBUTING.md

# Contributing to AgentForge Elite

Thank you for your interest in contributing to AgentForge Elite! This document provides guidelines and information for contributors.

## 🌟 Ways to Contribute

- 🐛 **Bug Reports**: Help us identify and fix issues
- ✨ **Feature Requests**: Suggest new features and improvements
- 📖 **Documentation**: Improve our docs and guides
- 🔧 **Code Contributions**: Submit bug fixes and new features
- 🎨 **Design**: Help improve UI/UX and design systems

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repo on GitHub, then clone your fork
git clone https://github.com/your-username/agentforge-elite.git
cd agentforge-elite

# Add upstream remote
git remote add upstream https://github.com/agentforge/agentforge-elite.git
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

### 3. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

## 📝 Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Commit Messages

Follow conventional commits format:

```
type(scope): description

feat(agents): add new deployment status indicator
fix(api): resolve rate limiting issue
docs(readme): update installation instructions
style(ui): improve button hover animations
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### TypeScript Guidelines

- Use strict TypeScript
- Define proper interfaces and types
- Avoid `any` types when possible
- Document complex type definitions

```typescript
// Good
interface AgentConfig {
  id: string
  name: string
  category: AgentCategory
  isActive: boolean
}

// Avoid
const config: any = {...}
```

### Component Guidelines

- Use functional components with hooks
- Implement proper error boundaries
- Follow the established design system
- Write reusable, composable components

```typescript
// Component template
interface ComponentProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function Component({ title, children, className }: ComponentProps) {
  return (
    <div className={cn('base-styles', className)}>
      <h2>{title}</h2>
      {children}
    </div>
  )
}
```

### API Guidelines

- Use proper HTTP status codes
- Implement rate limiting
- Validate input with Zod schemas
- Include comprehensive error handling

```typescript
// API route template
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

    // Your logic here
    const data = await fetchData()

    return NextResponse.json(
      formatApiResponse(data),
      { headers: rateLimitResult.headers }
    )
  } catch (error) {
    const errorResponse = handleApiError(error)
    return NextResponse.json(errorResponse, { status: errorResponse.statusCode })
  }
}
```

## 🧪 Testing

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for API routes
- Write component tests for complex UI logic

```typescript
// Test example
import { render, screen } from '@testing-library/react'
import { AgentCard } from '@/components/ui/card'

describe('AgentCard', () => {
  it('renders agent information correctly', () => {
    const mockAgent = {
      id: 'test-agent',
      name: 'Test Agent',
      description: 'A test agent',
      category: 'automation'
    }

    render(<AgentCard agent={mockAgent} />)
    
    expect(screen.getByText('Test Agent')).toBeInTheDocument()
    expect(screen.getByText('A test agent')).toBeInTheDocument()
  })
})
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## 📋 Pull Request Process

### 1. Before Submitting

- ✅ Code follows style guidelines
- ✅ Tests pass locally
- ✅ Documentation is updated
- ✅ No console errors or warnings
- ✅ Responsive design works
- ✅ Accessibility guidelines followed

### 2. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass
- [ ] Manual testing completed
- [ ] Edge cases considered

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### 3. Review Process

1. Automated checks must pass
2. Code review by maintainers
3. Address feedback if requested
4. Final approval and merge

## 🐛 Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce the behavior

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]

**Additional context**
Any other context about the problem
```

## ✨ Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want to happen

**Describe alternatives you've considered**
Alternative solutions or features

**Additional context**
Mockups, examples, or other context
```

## 🏗️ Architecture Guidelines

### File Structure

```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   ├── ui/             # Base UI components
│   ├── layout/         # Layout components
│   └── sections/       # Page sections
├── lib/                # Utilities and logic
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   └── agents/         # Agent-related logic
├── types/              # TypeScript definitions
└── styles/             # Global styles
```

### Design System

Follow the established design system:

- Use Tailwind CSS classes
- Follow color palette (neon-cyan, neon-green, etc.)
- Use consistent spacing and typography
- Implement glass morphism effects
- Add smooth animations with Framer Motion

## 🚀 Release Process

1. Version bump in `package.json`
2. Update `CHANGELOG.md`
3. Create release PR
4. Tag release after merge
5. Deploy to production

## 📞 Getting Help

- 💬 **Discord**: [Join our community](https://discord.gg/agentforge)
- 📧 **Email**: dev@agentforge-elite.com
- 📖 **Docs**: [Development docs](https://docs.agentforge-elite.com/dev)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AgentForge Elite! 🎉