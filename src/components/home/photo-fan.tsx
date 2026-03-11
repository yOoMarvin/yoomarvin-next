'use client'

import { useReducedMotion } from 'motion/react'
import { useState, useRef, useCallback } from 'react'
import { motion, useSpring } from 'motion/react'

const SPRING = { stiffness: 200, damping: 24, mass: 1 }
const VELOCITY_THRESHOLD = 0.8 // px/ms — ignore hovers above this speed
const BASE_ROTATIONS = [-6, -3, 0, 3, 6]

const PLACEHOLDER_COLORS = [
  'bg-zinc-200 dark:bg-zinc-700',
  'bg-zinc-300 dark:bg-zinc-600',
  'bg-zinc-200 dark:bg-zinc-700',
  'bg-zinc-300 dark:bg-zinc-600',
  'bg-zinc-200 dark:bg-zinc-700',
]

interface PhotoCardProps {
  index: number
  hoveredIndex: number | null
  baseRotation: number
  color: string
  onEnter: (index: number, event: React.MouseEvent) => void
  onLeave: () => void
}

function PhotoCard({ index, hoveredIndex, baseRotation, color, onEnter, onLeave }: PhotoCardProps) {
  const isHovered = hoveredIndex === index
  const distance = hoveredIndex !== null ? index - hoveredIndex : 0
  const deflection =
    hoveredIndex !== null && !isHovered
      ? (16 / Math.max(1, Math.abs(distance) * 0.6)) * Math.sign(distance)
      : 0

  const x = useSpring(deflection, SPRING)
  const y = useSpring(isHovered ? -16 : 0, SPRING)
  const scale = useSpring(isHovered ? 1.12 : 1, SPRING)
  const rotate = useSpring(isHovered ? 0 : baseRotation, SPRING)

  return (
    <motion.div
      style={{ x, y, scale, rotate, zIndex: isHovered ? 10 : 1 }}
      className="relative origin-bottom cursor-pointer"
      onMouseEnter={(e) => onEnter(index, e)}
      onMouseLeave={onLeave}
    >
      <div className={`h-40 w-28 rounded-lg shadow-sm ${color}`} />
    </motion.div>
  )
}

export function PhotoFan() {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const lastPointer = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    lastPointer.current = { x: e.clientX, y: e.clientY, time: performance.now() }
  }, [])

  const handleEnter = useCallback((index: number, e: React.MouseEvent) => {
    if (lastPointer.current) {
      const dx = e.clientX - lastPointer.current.x
      const dy = e.clientY - lastPointer.current.y
      const dt = performance.now() - lastPointer.current.time
      const speed = Math.sqrt(dx * dx + dy * dy) / Math.max(dt, 1)
      if (speed > VELOCITY_THRESHOLD) return
    }
    setHoveredIndex(index)
  }, [])

  const handleLeave = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  if (prefersReducedMotion) {
    return (
      <div className="flex gap-3">
        {PLACEHOLDER_COLORS.map((color, i) => (
          <div key={i} className={`h-40 w-28 rounded-lg ${color}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-end gap-2" onMouseMove={handleMouseMove} onMouseLeave={handleLeave}>
      {PLACEHOLDER_COLORS.map((color, i) => (
        <PhotoCard
          key={i}
          index={i}
          hoveredIndex={hoveredIndex}
          baseRotation={BASE_ROTATIONS[i]}
          color={color}
          onEnter={handleEnter}
          onLeave={handleLeave}
        />
      ))}
    </div>
  )
}
