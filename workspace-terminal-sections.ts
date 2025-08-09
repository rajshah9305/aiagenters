// src/components/sections/workspace-section.tsx
'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Square, Settings, Monitor, Activity, Clock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils/cn'

export function WorkspaceSection() {
  const [activeAgents, setActiveAgents] = React.useState([
    {
      id: 'autogpt-1',
      name: 'AutoGPT',
      task: 'Market Research',
      progress: 78,
      status: 'running',
      eta: '2m 30s',
    },
    {
      id: 'gpt-engineer-1',
      name: 'GPT Engineer',
      task: 'E-commerce Build',
      progress: 23,
      status: 'planning',
      eta: '15m 45s',
    },
    {
      id: 'babyagi-1',
      name: 'BabyAGI',
      task: 'Task Optimization',
      progress: 91,
      status: 'running',
      eta: '30s',
    },
    {
      id: 'chatdev-1',
      name: 'ChatDev',
      task: 'Mobile App',
      progress: 0,
      status: 'queued',
      eta: 'Pending',
    },
  ])

  const statusConfig = {
    running: { color: 'text-neon-green', bg: 'bg-neon-green/20', icon: Play },
    planning: { color: 'text-neon-orange', bg: 'bg-neon-orange/20', icon: Settings },
    queued: { color: 'text-text-tertiary', bg: 'bg-glass-border', icon: Clock },
    paused: { color: 'text-yellow-400', bg: 'bg-yellow-400/20', icon: Pause },
  }

  return (
    <section className="section-padding bg-gradient-to-br from-transparent via-surface-dark/30 to-transparent">
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
            Agent Workspace
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Orchestrate multiple AI agents, monitor their performance, and manage complex workflows 
            in our revolutionary multi-agent environment.
          </p>
        </motion.div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Agents Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-text-primary">
                  <Activity className="h-5 w-5 text-neon-green" />
                  Active Agents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 overflow-y-auto">
                {activeAgents.map((agent, index) => {
                  const status = statusConfig[agent.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon

                  return (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-lg bg-glass-secondary border border-glass-border hover:border-neon-cyan transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <StatusIcon className={cn('h-4 w-4', status.color)} />
                          <span className="font-medium text-text-primary">
                            {agent.name}
                          </span>
                        </div>
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', status.bg, status.color)}>
                          {agent.status}
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-sm text-text-secondary mb-1">{agent.task}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-glass-border rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${agent.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-neon-cyan to-neon-green rounded-full"
                            />
                          </div>
                          <span className="text-sm text-text-tertiary">{agent.progress}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-text-tertiary">
                        <span>ETA: {agent.eta}</span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" variant="ghost">
                            View
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Central Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="h-[600px] relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-text-primary">
                    <Monitor className="h-5 w-5 text-neon-purple" />
                    Neural Orchestration Hub
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="neural">
                      <Play className="h-4 w-4 mr-2" />
                      Start All
                    </Button>
                    <Button size="sm" variant="outline">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-full">
                <div className="relative h-full bg-gradient-to-br from-surface-darker/50 to-surface-dark/50 rounded-lg flex items-center justify-center overflow-hidden">
                  {/* Network Visualization */}
                  <div className="relative w-full h-full">
                    {/* Agent Nodes */}
                    {activeAgents.slice(0, 3).map((agent, index) => (
                      <motion.div
                        key={agent.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.3 }}
                        className="absolute w-16 h-16 rounded-full bg-agent-gradient flex items-center justify-center text-black font-semibold text-sm shadow-lg"
                        style={{
                          left: `${20 + index * 30}%`,
                          top: `${30 + index * 20}%`,
                        }}
                      >
                        {agent.name.slice(0, 3)}
                      </motion.div>
                    ))}

                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <defs>
                        <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      <motion.line
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1 }}
                        x1="20%" y1="30%" x2="50%" y2="50%"
                        stroke="url(#connectionGrad)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <motion.line
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1.5 }}
                        x1="50%" y1="50%" x2="80%" y2="70%"
                        stroke="url(#connectionGrad)"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>

                    {/* Center Info */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6 bg-glass-primary backdrop-blur-20 rounded-lg border border-glass-border">
                        <div className="text-2xl font-bold text-gradient mb-2">
                          Multi-Agent Network
                        </div>
                        <div className="text-text-secondary text-sm">
                          Real-time agent orchestration and monitoring
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// src/components/sections/terminal-section.tsx
export function TerminalSection() {
  const [input, setInput] = React.useState('')
  const [history, setHistory] = React.useState([
    { type: 'system', content: 'AgentForge Elite Terminal v3.0 initialized' },
    { type: 'system', content: 'Multi-agent orchestration system ready • 50+ AI agents available' },
    { type: 'system', content: 'Type "help" for commands or "agents list" to see available agents' },
  ])

  const handleCommand = (command: string) => {
    if (!command.trim()) return

    const newHistory = [...history, { type: 'input', content: `$ ${command}` }]

    // Simple command processing
    switch (command.toLowerCase()) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: `Available commands:
• agents list - Show all available agents
• agents deploy [name] - Deploy specific agent
• system status - Check platform health
• workspace show - Display workspace
• clear - Clear terminal`
        })
        break
      case 'agents list':
        newHistory.push({
          type: 'output',
          content: `Available AI Agents:
🧠 AutoGPT - Autonomous reasoning agent
⚡ GPT Engineer - Full-stack code generation
👶 BabyAGI - Task management with memory
👥 ChatDev - Multi-agent development team
🔧 SWE-Agent - Software engineering assistant`
        })
        break
      case 'system status':
        newHistory.push({
          type: 'output',
          content: `System Status: ✅ Healthy
Active Agents: 847
Running Deployments: 156
Success Rate: 99.2%
Uptime: 99.9%`
        })
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      default:
        newHistory.push({
          type: 'error',
          content: `Command not found: ${command}. Type "help" for available commands.`
        })
    }

    setHistory(newHistory)
    setInput('')
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
            AgentForge Terminal
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            Command and control your AI agents through our advanced terminal interface. 
            Execute complex multi-agent workflows with simple commands.
          </p>
        </motion.div>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-surface-darker rounded-lg overflow-hidden shadow-2xl border border-glass-border">
            {/* Terminal Header */}
            <div className="bg-glass-primary px-6 py-4 border-b border-glass-border">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span className="font-mono text-neon-green">AgentForge Terminal v3.0</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                    <span>Multi-Agent Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="h-96 overflow-y-auto bg-surface-darker p-6 font-mono text-sm">
              {history.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'mb-2',
                    entry.type === 'input' && 'text-neon-green',
                    entry.type === 'output' && 'text-text-primary whitespace-pre-line',
                    entry.type === 'error' && 'text-red-400',
                    entry.type === 'system' && 'text-text-tertiary'
                  )}
                >
                  {entry.content}
                </motion.div>
              ))}
              
              {/* Input Line */}
              <div className="flex items-center gap-2 mt-4">
                <span className="text-neon-green">agentforge@elite:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCommand(input)
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-text-primary caret-neon-green"
                  placeholder="Enter command..."
                  autoFocus
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}