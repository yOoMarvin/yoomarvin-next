'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ToggleThemeButton() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [isOn, setIsOn] = useState(false)

    //avoid hydration mismatch
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleSwitch = () => {
        setIsOn(!isOn)
        resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark')
    }

    const renderKnob = () => {
        if (!mounted) return null

        if (resolvedTheme == 'dark') {
            return <MoonIcon className="ml-1.5 mt-1.5 h-5 text-text-primary" />
        } else {
            return <SunIcon className="ml-1.5 mt-1.5 h-5 text-text-primary" />
        }
    }

    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    }

    return (
        <div
            className="flex h-10 w-16 cursor-pointer flex-row justify-start rounded-full border border-neutrals-50 p-1"
            data-ison={isOn}
            onClick={toggleSwitch}
        >
            <motion.div
                className="h-8 w-8 rounded-full bg-neutrals-default"
                layout
                transition={spring}
            >
                {renderKnob()}
            </motion.div>
        </div>
    )
}
