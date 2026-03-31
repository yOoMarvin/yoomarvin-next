'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useReducedMotion,
} from 'motion/react'
import { Heart } from 'iconoir-react'
import { cn } from '@/lib/utils'

const MAX_LIKES = 10
const DEBOUNCE_MS = 500

// ---------------------------------------------------------------------------
// Animated digits
// ---------------------------------------------------------------------------

function AnimatedDigit({
    digit,
    direction,
}: {
    digit: string
    direction: 'up' | 'down'
}) {
    const reduced = useReducedMotion()
    return (
        <span className="relative inline-flex h-[1em] w-[0.6em] items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={digit}
                    initial={
                        reduced
                            ? false
                            : {
                                  y: direction === 'up' ? '100%' : '-100%',
                                  filter: 'blur(4px)',
                              }
                    }
                    animate={{ y: '0%', filter: 'blur(0px)' }}
                    exit={
                        reduced
                            ? undefined
                            : {
                                  y: direction === 'up' ? '-100%' : '100%',
                                  filter: 'blur(4px)',
                              }
                    }
                    transition={{
                        duration: 0.2,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="absolute leading-none will-change-transform [backface-visibility:hidden]"
                >
                    {digit}
                </motion.span>
            </AnimatePresence>
        </span>
    )
}

function PlainNumber({ value }: { value: number }) {
    return (
        <span className="inline-flex leading-none tabular-nums">
            {String(value)
                .split('')
                .map((d, i) => (
                    <span
                        key={i}
                        className="relative inline-flex h-[1em] w-[0.6em] items-center justify-center"
                    >
                        {d}
                    </span>
                ))}
        </span>
    )
}

function AnimatedNumber({
    value,
    animated,
}: {
    value: number
    animated: boolean
}) {
    const [prev, setPrev] = useState(value)
    const direction = value > prev ? 'up' : 'down'

    if (value !== prev) {
        setPrev(value)
    }

    if (!animated) return <PlainNumber value={value} />

    const digits = String(value).split('')

    return (
        <span className="inline-flex leading-none tabular-nums">
            {digits.map((d, i) => (
                <AnimatedDigit
                    key={digits.length - 1 - i}
                    digit={d}
                    direction={direction}
                />
            ))}
        </span>
    )
}

// ---------------------------------------------------------------------------
// Particles
// ---------------------------------------------------------------------------

interface Particle {
    id: number
    angle: number
    distance: number
    size: number
    duration: number
}

function generateParticles(
    nextId: () => number,
    intensity: number
): Particle[] {
    const count = Math.floor(6 + intensity * 6)
    const baseSpread = 30 + intensity * 20
    const baseSize = 4 + intensity * 4
    const baseDuration = 0.5 + intensity * 0.2

    return Array.from({ length: count }, () => ({
        id: nextId(),
        angle: Math.random() * Math.PI * 2,
        distance: baseSpread * (0.7 + Math.random() * 0.6),
        size: baseSize * (0.6 + Math.random() * 0.8),
        duration: baseDuration * (0.8 + Math.random() * 0.4),
    }))
}

function Particles({ particles }: { particles: Particle[] }) {
    const reduced = useReducedMotion()
    if (reduced) return null

    return (
        <span className="pointer-events-none absolute inset-0">
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.span
                        key={p.id}
                        className="absolute left-1/2 top-1/2 rounded-full bg-red-400"
                        style={{ width: p.size, height: p.size }}
                        initial={{ x: '-50%', y: '-50%', scale: 1, opacity: 1 }}
                        animate={{
                            x: Math.cos(p.angle) * p.distance - p.size / 2,
                            y: Math.sin(p.angle) * p.distance - p.size / 2,
                            scale: 0,
                            opacity: 0,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: p.duration,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </AnimatePresence>
        </span>
    )
}

// ---------------------------------------------------------------------------
// LikeButton
// ---------------------------------------------------------------------------

// Maps like progress (0–1) to increasingly saturated Tailwind red classes
const HEART_COLOR_STEPS = [
    'text-red-400',
    'text-red-450',
    'text-red-500',
    'text-red-550',
    'text-red-600',
] as const

function getHeartColorClass(progress: number): string {
    const index = Math.min(
        Math.floor(progress * HEART_COLOR_STEPS.length),
        HEART_COLOR_STEPS.length - 1
    )
    return HEART_COLOR_STEPS[index]
}

interface LikeButtonProps {
    slug: string
    initialLikes: number
}

export function LikeButton({ slug, initialLikes }: LikeButtonProps) {
    const [displayCount, _setDisplayCount] = useState(initialLikes)
    const displayCountRef = useRef(initialLikes)
    const setDisplayCount = useCallback(
        (update: number | ((prev: number) => number)) => {
            _setDisplayCount((prev) => {
                const next =
                    typeof update === 'function' ? update(prev) : update
                displayCountRef.current = next
                return next
            })
        },
        []
    )
    const [userLikes, setUserLikes] = useState(0)
    const [mounted, setMounted] = useState(false)
    const [ready, setReady] = useState(false)
    const [particles, setParticles] = useState<Particle[]>([])
    const [isShaking, setIsShaking] = useState(false)
    const [countVisible, setCountVisible] = useState(true)
    const pendingDelta = useRef(0)
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const flushGeneration = useRef(0)
    const particleIdRef = useRef(0)
    const reduced = useReducedMotion()

    // Springs
    const buttonScale = useMotionValue(1)
    const buttonSpring = useSpring(buttonScale, {
        stiffness: 400,
        damping: 25,
    })
    const heartScale = useMotionValue(1)
    const heartSpring = useSpring(heartScale, {
        stiffness: 500,
        damping: 15,
        mass: 0.5,
    })

    // Read localStorage + fetch fresh count on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(`likes:${slug}`)
            if (stored) setUserLikes(Number(stored) || 0)
        } catch {
            // private browsing or unavailable
        }
        setParticles([])
        setMounted(true)

        fetch(`/api/likes/${slug}`)
            .then((res) => res.json())
            .then((data) => {
                if (typeof data.likes === 'number') {
                    const fresh = data.likes + pendingDelta.current
                    if (fresh !== displayCountRef.current) {
                        // Crossfade: fade out, swap value, fade in
                        setCountVisible(false)
                        setTimeout(() => {
                            setDisplayCount(fresh)
                            setCountVisible(true)
                            requestAnimationFrame(() => setReady(true))
                        }, 150)
                    } else {
                        requestAnimationFrame(() => setReady(true))
                    }
                } else {
                    requestAnimationFrame(() => setReady(true))
                }
            })
            .catch(() => {
                requestAnimationFrame(() => setReady(true))
            })
    }, [slug])

    // Flush pending likes on unmount
    useEffect(() => {
        return () => {
            if (debounceTimer.current) clearTimeout(debounceTimer.current)
            if (pendingDelta.current > 0) {
                fetch(`/api/likes/${slug}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ count: pendingDelta.current }),
                    keepalive: true,
                })
            }
        }
    }, [slug])

    const flushLikes = useCallback(() => {
        if (pendingDelta.current <= 0) return
        const delta = pendingDelta.current
        pendingDelta.current = 0
        const gen = ++flushGeneration.current

        fetch(`/api/likes/${slug}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ count: delta }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (gen !== flushGeneration.current) return
                if (typeof data.likes === 'number') {
                    setDisplayCount(data.likes + pendingDelta.current)
                }
            })
            .catch(() => {
                pendingDelta.current += delta
            })
    }, [slug])

    const scheduleFlush = useCallback(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
        debounceTimer.current = setTimeout(flushLikes, DEBOUNCE_MS)
    }, [flushLikes])

    const handleClick = useCallback(() => {
        if (userLikes >= MAX_LIKES) {
            // Shake
            setIsShaking(true)
            if (!reduced) {
                heartScale.set(1.15)
            }
            setTimeout(() => {
                setIsShaking(false)
                heartScale.set(1)
            }, 500)
            return
        }

        const newUserLikes = userLikes + 1
        setUserLikes(newUserLikes)
        setDisplayCount((c) => c + 1)
        pendingDelta.current += 1

        try {
            localStorage.setItem(`likes:${slug}`, String(newUserLikes))
        } catch {
            // ignore
        }

        // Animations
        if (!reduced) {
            const intensity = newUserLikes / MAX_LIKES
            heartScale.set(1.2 + intensity * 0.1)
            setTimeout(() => heartScale.set(1), 150)
            buttonScale.set(1.02)
            setTimeout(() => buttonScale.set(1), 100)
            setParticles(
                generateParticles(() => particleIdRef.current++, intensity)
            )
        }

        scheduleFlush()
    }, [userLikes, slug, reduced, heartScale, buttonScale, scheduleFlush])

    const isFilled = mounted && userLikes > 0
    const fillProgress = userLikes / MAX_LIKES

    return (
        <motion.button
            onClick={handleClick}
            onPointerDown={() => {
                if (!reduced) {
                    buttonScale.set(0.97)
                    heartScale.set(0.88)
                }
            }}
            onPointerUp={() => {
                if (!reduced && !isShaking) {
                    buttonScale.set(1)
                    heartScale.set(1)
                }
            }}
            onPointerLeave={() => {
                if (!reduced && !isShaking) {
                    buttonScale.set(1)
                    heartScale.set(1)
                }
            }}
            style={{ scale: buttonSpring }}
            animate={isShaking ? { x: [0, -4, 4, -4, 4, -2, 2, 0] } : { x: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            aria-label={`Like this post, ${displayCount} likes`}
            className={cn(
                'flex h-8 cursor-pointer items-center gap-1.5 rounded-full pl-2.5 pr-3',
                'bg-[var(--bg-surface)] shadow-sm ring-1 ring-[var(--border-subtle)]',
                'transition-colors duration-150',
                'hover:bg-[var(--bg-subtle)]',
                isFilled
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-[var(--text-tertiary)]'
            )}
        >
            <motion.span className="relative" style={{ scale: heartSpring }}>
                <Heart
                    width={18}
                    height={18}
                    className={cn(
                        'fill-current transition-colors duration-150',
                        isFilled && getHeartColorClass(fillProgress)
                    )}
                />
                <Particles particles={particles} />
            </motion.span>
            <span
                className={cn(
                    '-translate-x-px translate-y-px font-mono text-sm font-medium leading-none transition-all duration-150',
                    countVisible ? 'opacity-100' : 'opacity-0',
                    isFilled ? 'text-red-500' : 'text-[var(--text-tertiary)]'
                )}
            >
                <AnimatedNumber value={displayCount} animated={ready} />
            </span>
        </motion.button>
    )
}
