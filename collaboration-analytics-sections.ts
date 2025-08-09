// src/components/sections/collaboration-section.tsx
'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Users, MessageCircle, Activity, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

export function CollaborationSection() {
  const [teamMembers] = React.useState([
    {
      id: 1,
      name: 'Alex Smith',
      avatar: 'AS',
      status: 'online',
      activity: 'Leading AutoGPT deployment',
      lastSeen: 'now',
    },
    {
      id: 2,
      name: 'Maria Johnson',
      avatar: 'MJ',
      status: 'away',
      activity: 'Configuring ChatDev agents',
      lastSeen: '5m ago',
    },
    {
      id: 3,
      name: 'David Chen',
      avatar: 'DC',
      status: 'online',
      activity: 'Monitoring analytics',
      lastSeen: 'now',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      avatar: 'SW',
      status: 'offline',
      activity: 'Testing new deployment',
      lastSeen: '1h ago',
    },
  ])

  const [recentActivity] = React.useState([
    {
      id: 1,
      type: 'deployment',
      user: 'Alex Smith',
      action: 'deployed AutoGPT',
      details: 'Production environment',
      timestamp: '2 seconds ago',
      status: 'success',
    },
    {
      id: 2,
      type: 'collaboration',
      user: 'Maria Johnson',
      action: 'shared workspace',
      details: 'ChatDev mobile project',
      timestamp: '15 seconds ago',
      status: 'info',
    },
    {
      id: 3,
      type: 'completion',
      user: 'System',
      action: 'task completed',
      details: 'GPT Engineer React component',
      timestamp: '1 minute ago',
      status: 'success',
    },
    {
      id: 4,
      type: 'issue',
      user: 'David Chen',
      action: 'resolved 3 GitHub issues',
      details: 'SWE-Agent automation',
      timestamp: '3 minutes ago',
      status: 'success',
    },
    {
      id: 5,
      type: 'alert',
      user: 'System',
      action: 'rate limit warning',
      details: 'API usage at 85%',
      timestamp: '5 minutes ago',
      status: 'warning',
    },
  ])

  const statusConfig = {
    online: { color: 'bg-neon-green', label: 'Online' },
    away: { color: 'bg-yellow-400', label: 'Away' },
    offline: { color: 'bg-gray-400', label: 'Offline' },
  }

  const activityIcons = {
    deployment: CheckCircle,
    collaboration: Users,
    completion: CheckCircle,
    issue: CheckCircle,
    alert: AlertCircle,
  }

  const activityColors = {
    success: 'border-neon-green/20 bg-neon-green/5',
    info: 'border-neon-cyan/20 bg-neon-cyan/5',
    warning: 'border-yellow-400/20 bg-yellow-400/5',
    error: 'border-red-400/20 bg-red-400/5',
  }

  return (
    <section className="section-padding">
      <div className="container-fluid">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black font-display text-gradient mb-6">
            Real-time Collaboration
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Collaborate with your team and AI agents in real-time. Share workspaces, 
            monitor progress, and coordinate complex multi-agent operations.
          </p>
        </motion.div>

        {/* Collaboration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Members Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-text-primary">
                  <Users className="h-5 w-5 text-neon-purple" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.map((member, index) => {
                  const status = statusConfig[member.status as keyof typeof statusConfig]
                  
                  return (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-lg bg-glass-secondary hover:bg-glass-primary transition-all duration-300 cursor-pointer group"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-agent-gradient flex items-center justify-center text-black font-semibold">
                          {member.avatar}
                        </div>
                        <div className={cn(
                          'absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-surface-dark',
                          status.color
                        )} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-text-primary truncate">
                            {member.name}
                          </span>
                          <span className={cn(
                            'px-2 py-0.5 text-xs rounded-full',
                            member.status === 'online' ? 'text-neon-green bg-neon-green/20' :
                            member.status === 'away' ? 'text-yellow-400 bg-yellow-400/20' :
                            'text-gray-400 bg-gray-400/20'
                          )}>
                            {status.label}
                          </span>
                        </div>
                        <div className="text-sm text-text-secondary truncate">
                          {member.activity}
                        </div>
                        <div className="text-xs text-text-tertiary">
                          {member.lastSeen}
                        </div>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Activity Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-text-primary">
                  <Activity className="h-5 w-5 text-neon-green" />
                  Live Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {recentActivity.map((activity, index) => {
                  const ActivityIcon = activityIcons[activity.type as keyof typeof activityIcons]
                  const colorClass = activityColors[activity.status as keyof typeof activityColors]
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        'p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02]',
                        colorClass
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <ActivityIcon className={cn(
                          'h-5 w-5 mt-0.5',
                          activity.status === 'success' ? 'text-neon-green' :
                          activity.status === 'info' ? 'text-neon-cyan' :
                          activity.status === 'warning' ? 'text-yellow-400' :
                          'text-red-400'
                        )} />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-text-primary text-sm">
                              {activity.user}
                            </span>
                            <span className="text-text-secondary text-sm">
                              {activity.action}
                            </span>
                          </div>
                          <div className="text-sm text-text-tertiary mb-2">
                            {activity.details}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-text-tertiary">
                            <Clock className="h-3 w-3" />
                            {activity.timestamp}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// src/components/sections/analytics-section.tsx
export function AnalyticsSection() {
  const [metrics] = React.useState([
    {
      title: 'Active Agents',
      value: '847',
      change: { value: 23, trend: 'up', period: 'vs last week' },
      icon: '🤖',
      color: '#3b82f6',
    },
    {
      title: 'Tasks Completed',
      value: '12.4K',
      change: { value: 156, trend: 'up', period: 'this month' },
      icon: '⚡',
      color: '#10b981',
    },
    {
      title: 'Success Rate',
      value: '99.2%',
      change: { value: 2.1, trend: 'up', period: 'improvement' },
      icon: '🎯',
      color: '#059669',
    },
    {
      title: 'Cost Savings',
      value: '$2.1M',
      change: { value: 89, trend: 'up', period: 'ROI' },
      icon: '💰',
      color: '#8b5cf6',
    },
    {
      title: 'Avg Response Time',
      value: '0.8s',
      change: { value: 45, trend: 'down', period: 'faster' },
      icon: '⏱️',
      color: '#f59e0b',
    },
    {
      title: 'API Calls',
      value: '8.9M',
      change: { value: 0, trend: 'up', period: 'daily volume' },
      icon: '🌐',
      color: '#06b6d4',
    },
  ])

  return (
    <section className="section-padding">
      <div className="container-fluid">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black font-display text-gradient mb-6">
            Analytics & Insights
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Monitor agent performance, track success rates, and gain deep insights into your 
            AI automation ecosystem with advanced analytics.
          </p>
        </motion.div>

        {/* Analytics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-quantum transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium text-text-tertiary flex items-center gap-2">
                      <span className="text-lg">{metric.icon}</span>
                      {metric.title}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-4xl font-bold text-gradient font-display group-hover:scale-105 transition-transform">
                      {metric.value}
                    </div>
                    
                    {metric.change && (
                      <div className={cn(
                        'flex items-center gap-1 text-sm font-medium',
                        metric.change.trend === 'up' ? 'text-neon-green' : 'text-red-400'
                      )}>
                        <span>{metric.change.trend === 'up' ? '↗' : '↘'}</span>
                        <span>
                          {metric.change.value > 0 && metric.change.trend === 'up' ? '+' : ''}
                          {metric.change.value > 0 ? `${metric.change.value}%` : ''} {metric.change.period}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Analytics Visualizations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-text-primary">Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-surface-darker/50 to-surface-dark/50 rounded-lg flex items-center justify-center">
                <div className="text-center text-text-tertiary">
                  <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <div className="font-medium">Real-time Performance Charts</div>
                  <div className="text-sm">Coming Soon</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="text-text-primary">Usage Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-surface-darker/50 to-surface-dark/50 rounded-lg flex items-center justify-center">
                <div className="text-center text-text-tertiary">
                  <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <div className="font-medium">Agent Usage Analytics</div>
                  <div className="text-sm">Interactive Charts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}