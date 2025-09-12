import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const ParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null!)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000) // Reduced from 2000 to 1000
    
    for (let i = 0; i < 1000; i++) {
      positions[i] = (Math.random() - 0.5) * 10
    }
    
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      // Reduce rotation speed for better performance
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export const ParticleBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  )
}
