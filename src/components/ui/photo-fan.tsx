'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useSpring, useReducedMotion } from 'motion/react'
import Image from 'next/image'

const SPRING = { stiffness: 200, damping: 24, mass: 1 }
const VELOCITY_THRESHOLD = 0.8 // px/ms — ignore hovers above this speed

const CARDS = [
  { src: '/photo-fan/cycling.webp', label: "Cylcling in summer" },
  { src: '/photo-fan/desk.webp', label: "Where things get done" },
  { src: '/photo-fan/laptop-min.webp', label: "Running workshops" },
  { src: '/marvin-profile.webp', label: "My first day at DAYY" },
  { src: '/photo-fan/memfam.webp', label: "Memorisely Fam" },
  { src: '/photo-fan/running.webp', label: "My first Marathon" },
  { src: '/photo-fan/work-min.webp', label: "Work in the office" },
]

// Derived from card count so rotations and cards can never get out of sync.
const BASE_ROTATIONS = CARDS.map((_, i) => {
  const t = CARDS.length === 1 ? 0 : (i / (CARDS.length - 1)) * 2 - 1
  return Math.round(t * 20)
})

interface PhotoCardProps {
  isHovered: boolean
  anyHovered: boolean
  deflection: number
  baseRotation: number
  src: string
  label: string
  overlap: boolean
}

function PhotoCard({ isHovered, anyHovered, deflection, baseRotation, src, label, overlap }: PhotoCardProps) {
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
      style={{ x, y, scale, rotate, zIndex: isHovered ? 10 : 1 }}
      className={`relative origin-bottom shrink-0 ${overlap ? '-ml-16' : ''}`}
    >
      {/* Shadow — sibling to card, not clipped by overflow-hidden */}
      <motion.div
        style={{ opacity: shadowOpacity, scaleX: shadowScaleX }}
        className="absolute -bottom-3 left-3 right-3 h-6 rounded-full bg-black/50 blur-lg pointer-events-none"
      />
      <div className="relative aspect-[3/4] w-30 md:w-36 rounded-2xl shadow-sm overflow-hidden bg-zinc-200 dark:bg-zinc-700 ring-1 ring-inset ring-black/10 dark:ring-white/10">
        <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 768px) 120px, 144px" />
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
          className="absolute bottom-2.5 left-3 right-3 font-mono text-xs text-white text-balance pointer-events-none"
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
  const hoveredIndexRef = useRef<number | null>(null)
  const lastPointer = useRef<{ x: number; y: number; time: number } | null>(null)
  const lastTouchTime = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Keep ref in sync so handleMouseMove can read it without being in deps.
  hoveredIndexRef.current = hoveredIndex

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Ignore synthetic mouse events fired by the browser after a touch interaction.
    if (Date.now() - lastTouchTime.current < 500) return

    const now = performance.now()
    const prev = lastPointer.current

    if (prev) {
      const dx = e.clientX - prev.x
      const dy = e.clientY - prev.y
      const dt = now - prev.time
      const speed = Math.sqrt(dx * dx + dy * dy) / Math.max(dt, 1)

      if (speed <= VELOCITY_THRESHOLD && containerRef.current) {
        const children = Array.from(containerRef.current.children) as HTMLElement[]
        const current = hoveredIndexRef.current

        // If cursor is still within the current card's bounds (post-transform),
        // keep it active — prevents premature switching while over the lifted card.
        if (current !== null) {
          const rect = children[current].getBoundingClientRect()
          if (e.clientX >= rect.left && e.clientX <= rect.right) {
            lastPointer.current = { x: e.clientX, y: e.clientY, time: now }
            return
          }
        }

        // Cursor is outside the current card — find closest by center proximity.
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

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    lastTouchTime.current = Date.now()
    if (!containerRef.current) return
    const touch = e.touches[0]
    const children = Array.from(containerRef.current.children) as HTMLElement[]

    let closestIndex = -1
    let closestDist = Infinity

    children.forEach((child, i) => {
      const rect = child.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const dist = Math.abs(touch.clientX - centerX)
      if (dist < closestDist) {
        closestDist = dist
        closestIndex = i
      }
    })

    if (closestIndex !== -1) {
      setHoveredIndex((prev) => (prev === closestIndex ? null : closestIndex))
    }
  }, [])

  if (prefersReducedMotion) {
    return (
      <div className="flex justify-center">
        {CARDS.map(({ src, label }, i) => (
          <div key={i} className={`relative aspect-[3/4] w-30 md:w-36 shrink-0 rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-700 ring-1 ring-inset ring-black/10 dark:ring-white/10 ${i > 0 ? '-ml-16' : ''}`}>
            <Image src={src} alt={label} fill className="object-cover" sizes="(max-width: 768px) 120px, 144px" />
            <p className="absolute bottom-2.5 left-3 right-3 font-mono text-xs text-white text-balance">{label}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="flex items-end justify-center pt-8 pb-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onTouchStart={handleTouchStart}
    >
      {CARDS.map(({ src, label }, i) => {
        const isHovered = hoveredIndex === i
        const distance = hoveredIndex !== null ? i - hoveredIndex : 0
        const deflection =
          hoveredIndex !== null && !isHovered
            ? (16 / Math.max(1, Math.abs(distance) * 0.6)) * Math.sign(distance)
            : 0
        return (
          <PhotoCard
            key={i}
            isHovered={isHovered}
            anyHovered={hoveredIndex !== null}
            deflection={deflection}
            baseRotation={BASE_ROTATIONS[i]}
            src={src}
            label={label}
            overlap={i > 0}
          />
        )
      })}
    </div>
  )
}
