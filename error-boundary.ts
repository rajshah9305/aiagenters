'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      errorInfo,
    })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }

    // Call optional error handler
    this.props.onError?.(error, errorInfo)

    // In production, you might want to send to error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          errorInfo={this.state.errorInfo || undefined}
        />
      )
    }

    return this.props.children
  }
}

// Default Error Fallback Component
const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError, errorInfo }) => {
  const [showDetails, setShowDetails] = React.useState(false)

  const handleReload = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-surface-darker via-surface-dark to-surface-darker">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <CardTitle className="text-2xl text-red-600 dark:text-red-400">
            Oops! Something went wrong
          </CardTitle>
          <CardDescription className="text-base">
            We encountered an unexpected error. Don't worry, our team has been notified.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-medium text-red-800 dark:text-red-400 mb-2">Error Details:</h4>
            <p className="text-sm text-red-700 dark:text-red-300 font-mono">
              {error.name}: {error.message}
            </p>
          </div>

          {process.env.NODE_ENV === 'development' && errorInfo && (
            <details className="group">
              <summary 
                className="cursor-pointer text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? '🔽' : '▶️'} Technical Details (Development)
              </summary>
              {showDetails && (
                <div className="mt-3 p-4 bg-surface-darker rounded-lg border border-glass-border">
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-sm text-text-primary mb-2">Stack Trace:</h5>
                      <pre className="text-xs text-text-tertiary overflow-x-auto whitespace-pre-wrap font-mono">
                        {error.stack}
                      </pre>
                    </div>
                    <div>
                      <h5 className="font-medium text-sm text-text-primary mb-2">Component Stack:</h5>
                      <pre className="text-xs text-text-tertiary overflow-x-auto whitespace-pre-wrap font-mono">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </details>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">What you can do:</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Try refreshing the page</li>
              <li>• Check your internet connection</li>
              <li>• Go back to the homepage</li>
              <li>• Contact support if the problem persists</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button onClick={resetError} variant="outline" className="flex-1">
            Try Again
          </Button>
          <Button onClick={handleReload} variant="outline" className="flex-1">
            Reload Page
          </Button>
          <Button onClick={handleGoHome} variant="neural" className="flex-1">
            Go Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

// React Error Boundary Hook for Functional Components
export function useErrorHandler() {
  return React.useCallback((error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Error caught by error handler:', error, errorInfo)
    
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: reportError(error, errorInfo)
    }
  }, [])
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ComponentType<ErrorFallbackProps>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`
  
  return WrappedComponent
}

// Custom Error Classes
export class AgentDeploymentError extends Error {
  constructor(message: string, public agentId: string) {
    super(message)
    this.name = 'AgentDeploymentError'
  }
}

export class NetworkError extends Error {
  constructor(message: string, public status?: number) {
    super(message)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

// Error Reporting Utility
export const reportError = (error: Error, context?: Record<string, any>) => {
  const errorReport = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : '',
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    context,
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('Error Report:', errorReport)
  } else {
    // In production, send to error monitoring service
    // Example: 
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorReport)
    // })
  }
}