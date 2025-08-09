// ===== particle-system.tsx =====
'use client'

import * as React from 'react'
import * as THREE from 'three'

interface ParticleSystemProps {
  particleCount?: number
  className?: string
}

export default function ParticleSystem({ 
  particleCount = 3000, 
  className = 'fixed inset-0 -z-10' 
}: ParticleSystemProps) {
  const mountRef = React.useRef<HTMLDivElement>(null)
  const sceneRef = React.useRef<THREE.Scene | null>(null)
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (!mountRef.current || typeof window === 'undefined') return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particles
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    // Agent gradient colors
    const agentColors = [
      new THREE.Color(0x667eea), // Purple
      new THREE.Color(0x764ba2), // Violet
      new THREE.Color(0xf093fb), // Pink
      new THREE.Color(0xf5576c), // Red-pink
      new THREE.Color(0x4facfe), // Blue
      new THREE.Color(0x00d4ff), // Cyan
      new THREE.Color(0x10b981), // Green
    ]

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 2000
      positions[i + 1] = (Math.random() - 0.5) * 2000
      positions[i + 2] = (Math.random() - 0.5) * 2000

      // Velocity
      velocities[i] = (Math.random() - 0.5) * 0.5
      velocities[i + 1] = (Math.random() - 0.5) * 0.5
      velocities[i + 2] = (Math.random() - 0.5) * 0.5

      // Color
      const color = agentColors[Math.floor(Math.random() * agentColors.length)]
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    // Particle material
    const particleMaterial = new THREE.PointsMaterial({
      transparent: true,
      opacity: 0.6,
      vertexColors: true,
      sizeAttenuation: true,
      size: 2,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Camera position
    camera.position.z = 1000

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (!particles.geometry.attributes.position) return

      const positions = particles.geometry.attributes.position.array as Float32Array
      const velocities = particles.geometry.attributes.velocity.array as Float32Array
      const time = Date.now() * 0.001

      // Update particle positions
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] + Math.sin(time + i) * 0.01
        positions[i + 1] += velocities[i + 1] + Math.cos(time + i) * 0.01
        positions[i + 2] += velocities[i + 2]

        // Wrap around screen boundaries
        if (positions[i] > 1000) positions[i] = -1000
        if (positions[i] < -1000) positions[i] = 1000
        if (positions[i + 1] > 1000) positions[i + 1] = -1000
        if (positions[i + 1] < -1000) positions[i + 1] = 1000
        if (positions[i + 2] > 1000) positions[i + 2] = -1000
        if (positions[i + 2] < -1000) positions[i + 2] = 1000
      }

      particles.geometry.attributes.position.needsUpdate = true

      // Rotate particle system
      particles.rotation.x += 0.0005
      particles.rotation.y += 0.001

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('resize', handleResize)
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      
      renderer.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
    }
  }, [particleCount])

  return <div ref={mountRef} className={className} />
}

// ===== neural-network.tsx =====
'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

interface NeuralNetworkProps {
  nodeCount?: number
  className?: string
}

export default function NeuralNetwork({ 
  nodeCount = 20, 
  className = 'fixed inset-0 -z-10 opacity-30' 
}: NeuralNetworkProps) {
  const [nodes, setNodes] = React.useState<Array<{
    id: number
    x: number
    y: number
    connections: number[]
    activity: number
  }>>([])
  
  const [connections, setConnections] = React.useState<Array<{
    from: number
    to: number
    strength: number
    active: boolean
  }>>([])

  const containerRef = React.useRef<HTMLDivElement>(null)

  // Generate neural network layout
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const generateNodes = () => {
      const newNodes = []
      const newConnections = []

      // Create nodes in a distributed pattern
      for (let i = 0; i < nodeCount; i++) {
        const node = {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          connections: [],
          activity: Math.random(),
        }

        // Connect to nearby nodes
        const connectionsCount = Math.floor(Math.random() * 4) + 2
        for (let j = 0; j < connectionsCount && newNodes.length > 0; j++) {
          const targetIndex = Math.floor(Math.random() * newNodes.length)
          const target = newNodes[targetIndex]
          
          if (target && !node.connections.includes(target.id)) {
            node.connections.push(target.id)
            target.connections.push(node.id)
            
            newConnections.push({
              from: node.id,
              to: target.id,
              strength: Math.random(),
              active: false,
            })
          }
        }

        newNodes.push(node)
      }

      setNodes(newNodes)
      setConnections(newConnections)
    }

    generateNodes()
  }, [nodeCount])

  // Animate neural activity
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prevNodes => 
        prevNodes.map(node => ({
          ...node,
          activity: Math.max(0, node.activity + (Math.random() - 0.5) * 0.3)
        }))
      )

      setConnections(prevConnections =>
        prevConnections.map(conn => ({
          ...conn,
          active: Math.random() > 0.7,
          strength: Math.max(0.1, conn.strength + (Math.random() - 0.5) * 0.2)
        }))
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (nodes.length === 0) return null

  return (
    <div ref={containerRef} className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
      >
        {/* Neural Connections */}
        <g className="neural-connections">
          {connections.map((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from)
            const toNode = nodes.find(n => n.id === connection.to)
            
            if (!fromNode || !toNode) return null

            return (
              <motion.line
                key={`connection-${index}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={connection.active ? '#00d4ff' : '#667eea'}
                strokeWidth={connection.strength * 0.5}
                opacity={connection.active ? 0.8 : 0.3}
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: 1,
                  opacity: connection.active ? 0.8 : 0.3,
                }}
                transition={{ 
                  duration: 2,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
            )
          })}
        </g>

        {/* Neural Nodes */}
        <g className="neural-nodes">
          {nodes.map((node) => (
            <motion.g key={`node-${node.id}`}>
              {/* Node glow */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.activity * 2 + 1}
                fill={`rgba(0, 212, 255, ${node.activity * 0.3})`}
                animate={{
                  r: [node.activity * 2 + 1, node.activity * 3 + 2, node.activity * 2 + 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Node core */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={0.8}
                fill="#00d4ff"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2 + node.activity,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.g>
          ))}
        </g>

        {/* Floating data packets */}
        <g className="data-packets">
          {connections.slice(0, 5).map((connection, index) => {
            const fromNode = nodes.find(n => n.id === connection.from)
            const toNode = nodes.find(n => n.id === connection.to)
            
            if (!fromNode || !toNode || !connection.active) return null

            return (
              <motion.circle
                key={`packet-${index}`}
                r={0.3}
                fill="#10b981"
                initial={{
                  cx: fromNode.x,
                  cy: fromNode.y,
                  opacity: 0,
                }}
                animate={{
                  cx: toNode.x,
                  cy: toNode.y,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: index * 0.5,
                }}
              />
            )
          })}
        </g>
      </svg>
    </div>
  )
}

// ===== quantum-field.tsx (Additional Background Effect) =====
'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

interface QuantumFieldProps {
  className?: string
}

export function QuantumField({ className = 'fixed inset-0 -z-10 opacity-20' }: QuantumFieldProps) {
  const fieldSize = 20
  const [activeNodes, setActiveNodes] = React.useState<Set<number>>(new Set())

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newActiveNodes = new Set<number>()
      const nodeCount = Math.floor(Math.random() * 8) + 3

      for (let i = 0; i < nodeCount; i++) {
        newActiveNodes.add(Math.floor(Math.random() * fieldSize * fieldSize))
      }

      setActiveNodes(newActiveNodes)
    }, 1500)

    return () => clearInterval(interval)
  }, [fieldSize])

  return (
    <div className={className}>
      <div className="grid grid-cols-20 gap-1 w-full h-full p-8">
        {Array.from({ length: fieldSize * fieldSize }).map((_, index) => (
          <motion.div
            key={index}
            className="w-1 h-1 rounded-full"
            animate={{
              backgroundColor: activeNodes.has(index) 
                ? ['#667eea', '#00d4ff', '#10b981', '#667eea']
                : '#334155',
              scale: activeNodes.has(index) ? [1, 1.5, 1] : 1,
              opacity: activeNodes.has(index) ? [0.3, 1, 0.3] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: activeNodes.has(index) ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}