'use client'

import { useReducedMotion } from 'motion/react'
import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useSpring } from 'motion/react'

const SPRING = { stiffness: 200, damping: 24, mass: 1 }
const VELOCITY_THRESHOLD = 0.8 // px/ms — ignore hovers above this speed
const BASE_ROTATIONS = [-20, -13, -7, 0, 7, 13, 20]

const CARDS = [
  { color: 'bg-zinc-300 dark:bg-zinc-600', label: "Berlin '23" },
  { color: 'bg-zinc-200 dark:bg-zinc-700', label: "Kyoto '23" },
  { color: 'bg-zinc-400 dark:bg-zinc-500', label: "Oslo '24" },
  { color: 'bg-zinc-200 dark:bg-zinc-700', label: "London '24" },
  { color: 'bg-zinc-300 dark:bg-zinc-600', label: "Lisbon '24" },
  { color: 'bg-zinc-200 dark:bg-zinc-700', label: "NYC '25" },
  { color: 'bg-zinc-400 dark:bg-zinc-500', label: "Munich '25" },
]

interface PhotoCardProps {
  index: number
  isHovered: boolean
  anyHovered: boolean
  deflection: number
  baseRotation: number
  color: string
  label: string
  overlap: boolean
  onEnter?: never
}

function PhotoCard({ isHovered, anyHovered, deflection, baseRotation, color, label, overlap }: PhotoCardProps) {

  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)
  const scale = useSpring(1, SPRING)
  const rotate = useSpring(baseRotation, SPRING)
  const glossOpacity = useSpring(0, SPRING)
  const gradientOpacity = useSpring(0, SPRING)
  const shadowOpacity = useSpring(0, SPRING)
  const shadowScaleX = useSpring(0.5, SPRING)

  useEffect(() => {
    x.set(deflection)
    y.set(isHovered ? -20 : 0)
    scale.set(isHovered ? 1.12 : anyHovered ? 0.95 : 1)
    rotate.set(isHovered ? 0 : baseRotation)
    glossOpacity.set(isHovered ? 0.15 : 0)
    gradientOpacity.set(isHovered ? 1 : 0)
    shadowOpacity.set(isHovered ? 0.4 : 0)
    shadowScaleX.set(isHovered ? 1.1 : 0.5)
  }, [deflection, isHovered, anyHovered, baseRotation, x, y, scale, rotate, glossOpacity, gradientOpacity, shadowOpacity, shadowScaleX])

  return (
    <motion.div
      style={{ x, y, scale, rotate, zIndex: isHovered ? 10 : 1, marginLeft: overlap ? -64 : 0 }}
      className="relative origin-bottom shrink-0 snap-center"
    >
      {/* Shadow — sibling to card, not clipped by overflow-hidden */}
      <motion.div
        style={{ opacity: shadowOpacity, scaleX: shadowScaleX }}
        className="absolute -bottom-3 left-3 right-3 h-6 rounded-full bg-black/50 blur-lg pointer-events-none"
      />
      <div className={`relative aspect-[3/4] w-36 rounded-2xl shadow-sm overflow-hidden ${color}`}>
        <motion.div
          style={{ opacity: glossOpacity }}
          className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none"
        />
        <motion.div
          style={{ opacity: gradientOpacity }}
          className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
        />
        <motion.p
          style={{ opacity: gradientOpacity }}
          className="absolute bottom-2.5 left-3 font-mono text-xs text-white pointer-events-none"
        >
          {label}
        </motion.p>
      </div>
    </motion.div>
  )
}

export function PhotoFan() {
  const prefersReducedMotion = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const lastPointer = useRef<{ x: number; y: number; time: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now()
    const prev = lastPointer.current

    if (prev) {
      const dx = e.clientX - prev.x
      const dy = e.clientY - prev.y
      const dt = now - prev.time
      const speed = Math.sqrt(dx * dx + dy * dy) / Math.max(dt, 1)

      // Proximity-based detection: find card whose center is closest to cursor.
      // This avoids flickering from overlapping hit boxes entirely.
      if (speed <= VELOCITY_THRESHOLD && containerRef.current) {
        const children = Array.from(containerRef.current.children) as HTMLElement[]
        let closestIndex = -1
        let closestDist = Infinity

        children.forEach((child, i) => {
          const rect = child.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const dist = Math.abs(e.clientX - centerX)
          if (dist < closestDist) {
            closestDist = dist
            closestIndex = i
          }
        })

        if (closestIndex !== -1) setHoveredIndex(closestIndex)
      }
    }

    lastPointer.current = { x: e.clientX, y: e.clientY, time: now }
  }, [])

  const handleLeave = useCallback(() => {
    setHoveredIndex(null)
    lastPointer.current = null
  }, [])

  if (prefersReducedMotion) {
    return (
      <div className="flex gap-3 overflow-x-auto pb-1">
        {CARDS.map(({ color, label }, i) => (
          <div key={i} className={`relative aspect-[3/4] w-36 shrink-0 rounded-2xl ${color}`}>
            <p className="absolute bottom-2.5 left-3 font-mono text-xs text-white">{label}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex items-end justify-center overflow-x-auto pb-10 snap-x snap-mandatory md:overflow-x-visible md:snap-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
    >
      {CARDS.map(({ color, label }, i) => {
        const isHovered = hoveredIndex === i
        const distance = hoveredIndex !== null ? i - hoveredIndex : 0
        const deflection =
          hoveredIndex !== null && !isHovered
            ? (16 / Math.max(1, Math.abs(distance) * 0.6)) * Math.sign(distance)
            : 0
        return (
          <PhotoCard
            key={i}
            index={i}
            isHovered={isHovered}
            anyHovered={hoveredIndex !== null}
            deflection={deflection}
            baseRotation={BASE_ROTATIONS[i]}
            color={color}
            label={label}
            overlap={i > 0}
          />
        )
      })}
    </div>
  )
}
