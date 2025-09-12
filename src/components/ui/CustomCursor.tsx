import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Trail, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// 3D Cursor Component
const Cursor3D: React.FC<{ 
  position: [number, number, number]
  scale: number
  isHovering: boolean
}> = ({ position, scale, isHovering }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Main cursor sphere */}
      <Sphere ref={meshRef} args={[0.1, 16, 16]} scale={scale}>
        <meshStandardMaterial
          color={isHovering ? "#3b82f6" : "#ffffff"}
          emissive={isHovering ? "#1e40af" : "#000000"}
          emissiveIntensity={isHovering ? 0.3 : 0.1}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </Sphere>
      
      {/* Particle trail */}
      <Trail
        ref={trailRef}
        width={2}
        length={8}
        color={isHovering ? "#3b82f6" : "#ffffff"}
        attenuation={(t) => t * t}
      >
        <Sphere args={[0.05, 8, 8]}>
          <meshBasicMaterial
            color={isHovering ? "#3b82f6" : "#ffffff"}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </Trail>
    </group>
  )
}

// Particle system for enhanced visual effect
const ParticleSystem: React.FC<{ 
  position: [number, number, number]
  isHovering: boolean
}> = ({ position, isHovering }) => {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 20
  
  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        const time = state.clock.elapsedTime
        
        // Create orbiting particles around cursor
        const angle = (i / particleCount) * Math.PI * 2 + time * 0.5
        const radius = 0.3 + Math.sin(time + i) * 0.1
        
        positions[i3] = position[0] + Math.cos(angle) * radius
        positions[i3 + 1] = position[1] + Math.sin(time * 2 + i) * 0.1
        positions[i3 + 2] = position[2] + Math.sin(angle) * radius
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={new Float32Array(particleCount * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={isHovering ? "#3b82f6" : "#ffffff"}
        size={0.02}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// Main Custom Cursor Component
export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<[number, number, number]>([0, 0, 0])
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const canvasRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const lastMousePosition = useRef<[number, number, number]>([0, 0, 0])
  const targetPosition = useRef<[number, number, number]>([0, 0, 0])

  // Smooth cursor movement with easing
  const updateCursorPosition = useCallback(() => {
    const lerpFactor = 0.1
    const current = lastMousePosition.current
    const target = targetPosition.current
    
    const newX = current[0] + (target[0] - current[0]) * lerpFactor
    const newY = current[1] + (target[1] - current[1]) * lerpFactor
    const newZ = current[2] + (target[2] - current[2]) * lerpFactor
    
    lastMousePosition.current = [newX, newY, newZ]
    setMousePosition([newX, newY, newZ])
    
    animationRef.current = requestAnimationFrame(updateCursorPosition)
  }, [])

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) / 100
    const y = -(event.clientY - rect.top - rect.height / 2) / 100
    const z = 0
    
    targetPosition.current = [x, y, z]
    setIsVisible(true)
  }, [])

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  // Handle hover detection
  const handleMouseOver = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement
    const isInteractive = target.matches('button, a, [role="button"], input, textarea, select')
    setIsHovering(isInteractive)
  }, [])

  // Set up event listeners
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    
    // Start animation loop
    animationRef.current = requestAnimationFrame(updateCursorPosition)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [handleMouseMove, handleMouseOver, handleMouseLeave, updateCursorPosition])

  // Calculate cursor scale based on hover state
  const cursorScale = isHovering ? 1.5 : 1

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        zIndex: 10, // Above canvas but below UI elements
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        gl={{ 
          alpha: true, 
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
        
        {/* Cursor components */}
        {isVisible && (
          <>
            <Cursor3D 
              position={mousePosition} 
              scale={cursorScale}
              isHovering={isHovering}
            />
            <ParticleSystem 
              position={mousePosition}
              isHovering={isHovering}
            />
          </>
        )}
      </Canvas>
    </div>
  )
}

// Hook for cursor interactions
export const useCursorInteraction = () => {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
  }, [])

  return {
    isHovering,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }
}

export default CustomCursor
