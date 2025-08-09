# .env.local.example
# Copy this to .env.local and fill in your values

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="AgentForge Elite"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Environment
NODE_ENV=development

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_RATE_LIMIT_POINTS=60
API_RATE_LIMIT_DURATION=60000

# Authentication (if implemented)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Database (if using external database)
DATABASE_URL=postgresql://username:password@localhost:5432/agentforge
REDIS_URL=redis://localhost:6379

# External APIs
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key

# Monitoring & Analytics
SENTRY_DSN=your-sentry-dsn
GOOGLE_ANALYTICS_ID=your-ga-id

# Feature Flags
NEXT_PUBLIC_FEATURE_AGENTS=true
NEXT_PUBLIC_FEATURE_COLLABORATION=true
NEXT_PUBLIC_FEATURE_ANALYTICS=true
NEXT_PUBLIC_FEATURE_TERMINAL=true

# Deployment
VERCEL_URL=your-vercel-url
DEPLOYMENT_ENVIRONMENT=development

# Valid API Keys (comma-separated)
VALID_API_KEYS=demo-key-123,test-key-456

# .gitignore
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local
.env.production

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db

# Logs
logs
*.log

# Database
*.db
*.sqlite

# Cache
.cache/

# scripts/setup.sh
#!/bin/bash

echo "🚀 Setting up AgentForge Elite..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "⚠️  Please edit .env.local with your configuration"
fi

# Run type checking
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

echo "✅ Setup complete! Run 'npm run dev' to start the development server."

# scripts/build.sh
#!/bin/bash

echo "🔨 Building AgentForge Elite for production..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf out

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run type checking
echo "🔍 Type checking..."
npm run type-check

# Run tests
echo "🧪 Running tests..."
npm test

# Build application
echo "🏗️  Building application..."
npm run build

echo "✅ Build complete!"

# scripts/test.sh
#!/bin/bash

echo "🧪 Running AgentForge Elite tests..."

# Run linting
echo "🧹 Linting..."
npm run lint

# Run type checking
echo "🔍 Type checking..."
npm run type-check

# Run tests with coverage
echo "🎯 Running tests with coverage..."
npm run test:coverage

echo "✅ All tests passed!"

# scripts/docker-build.sh
#!/bin/bash

echo "🐳 Building Docker image for AgentForge Elite..."

# Build the Docker image
docker build -t agentforge-elite:latest .

# Tag with version if provided
if [ ! -z "$1" ]; then
    docker tag agentforge-elite:latest agentforge-elite:$1
    echo "✅ Tagged image as agentforge-elite:$1"
fi

echo "✅ Docker image built successfully!"
echo "🚀 Run with: docker run -p 3000:3000 agentforge-elite:latest"

# scripts/deploy.sh
#!/bin/bash

echo "🚀 Deploying AgentForge Elite..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Are you in the project root?"
    exit 1
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Run build script
echo "🔨 Building application..."
./scripts/build.sh

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"

# .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}

# .prettierignore
node_modules
.next
.vercel
out
coverage
*.md

# .eslintignore
node_modules
.next
.vercel
out
coverage

# CHANGELOG.md
# Changelog

All notable changes to AgentForge Elite will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of AgentForge Elite
- 50+ AI agents marketplace
- Real-time collaboration features
- Advanced analytics dashboard
- Terminal-style command interface
- Neural workspace environment

### Features
- **Agents**: Browse and deploy 50+ AI agents
- **Workspace**: Multi-agent orchestration environment
- **Collaboration**: Real-time team features
- **Analytics**: Comprehensive performance monitoring
- **Terminal**: Command-line interface for power users
- **API**: RESTful API for programmatic access

### Technical
- Next.js 14 with App Router
- TypeScript throughout
- Tailwind CSS design system
- Framer Motion animations
- Comprehensive test suite
- Docker containerization
- CI/CD pipeline

## [1.0.0] - 2024-01-20

### Added
- Initial release

# LICENSE
MIT License

Copyright (c) 2024 AgentForge Elite

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# .vscode/settings.json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "files.associations": {
    "*.css": "tailwindcss"
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"],
    ["cva\\(([^)]*)\\)", "['\"](.*?)['\"]"]
  ]
}

# .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json"
  ]
}