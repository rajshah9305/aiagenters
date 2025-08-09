# ==========================================
# AgentForge Elite Environment Variables
# ==========================================

# Database Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AgentForge Elite
NEXT_PUBLIC_APP_VERSION=1.0.0

# WebSocket Configuration
WEBSOCKET_PORT=3001
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3001

# Analytics and Monitoring
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_vercel_analytics_id
VERCEL_ANALYTICS_ID=your_vercel_analytics_id
NEXT_PUBLIC_VERCEL_SPEED_INSIGHTS_ID=your_speed_insights_id

# Third-party API Keys (Optional)
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
CEREBRAS_API_KEY=your_cerebras_api_key

# E2B Configuration (Optional)
E2B_API_KEY=your_e2b_api_key

# Email Configuration (Optional)
EMAIL_FROM=noreply@agentforge-elite.com
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your_email_username
EMAIL_SERVER_PASSWORD=your_email_password

# Redis Configuration (Optional - for caching)
REDIS_URL=redis://localhost:6379

# Rate Limiting (Optional)
RATE_LIMIT_REQUESTS_PER_MINUTE=100
RATE_LIMIT_REQUESTS_PER_HOUR=1000

# Feature Flags (Optional)
NEXT_PUBLIC_FEATURE_TERMINAL=true
NEXT_PUBLIC_FEATURE_COLLABORATION=true
NEXT_PUBLIC_FEATURE_ANALYTICS=true
NEXT_PUBLIC_FEATURE_AGENTS=true

# Development Configuration
NEXT_TELEMETRY_DISABLED=1
DISABLE_SSL=false

# Logging Configuration
LOG_LEVEL=info
ENABLE_QUERY_LOGGING=false

# Security Configuration
ALLOWED_ORIGINS=http://localhost:3000,https://agentforge-elite.vercel.app
CSRF_SECRET=your_csrf_secret_here

# Database Pool Configuration
DATABASE_MAX_CONNECTIONS=10
DATABASE_TIMEOUT=30000

# File Upload Configuration
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=.pdf,.txt,.md,.json

# Backup Configuration (Optional)
BACKUP_ENABLED=false
BACKUP_SCHEDULE=0 2 * * *
BACKUP_RETENTION_DAYS=30