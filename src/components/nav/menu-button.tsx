'use client'

import { motion, useReducedMotion } from 'motion/react'

interface MenuButtonProps {
    isOpen: boolean
    onClick: () => void
}

const CLOSED_TOP = 'M5 8H19'
const CLOSED_BOTTOM = 'M5 16H19'
const OPEN_TOP = 'M6 6L18 18'
const OPEN_BOTTOM = 'M6 18L18 6'

export function MenuButton({ isOpen, onClick }: MenuButtonProps) {
    const shouldReduceMotion = useReducedMotion()
    const duration = shouldReduceMotion ? 0 : 0.15

    return (
        <button
            onClick={onClick}
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            className="group fixed left-4 sm:left-6 top-6 z-50 flex min-h-[44px] min-w-[44px] cursor-pointer items-start justify-start text-[var(--text-primary)]"
        >
            {/* Hover circle — centered on the 24px icon */}
            <span
                className="pointer-events-none absolute -left-1.5 -top-1.5 h-9 w-9 rounded-full transition-colors duration-100 group-hover:bg-[var(--bg-moderate)]"
                aria-hidden="true"
            />
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative"
            >
                <motion.path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ d: isOpen ? OPEN_TOP : CLOSED_TOP }}
                    transition={{ duration, ease: 'easeInOut' }}
                />
                <motion.path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    animate={{ d: isOpen ? OPEN_BOTTOM : CLOSED_BOTTOM }}
                    transition={{ duration, ease: 'easeInOut' }}
                />
            </svg>
        </button>
    )
}
