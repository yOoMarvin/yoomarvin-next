'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ToggleThemeButton() {
    const { systemTheme, theme, setTheme } = useTheme()
    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => {
        setIsOn(!isOn)
        const currentTheme = theme === 'system' ? systemTheme : theme
        currentTheme === 'dark' ? setTheme('light') : setTheme('dark')
    }

    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    }

    //avoid hydration mismatch
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div>
            {/* <button type="button" className="p-2">
                {themeChanger()}
            </button> */}
            <div
                className="flex h-10 w-16 cursor-pointer flex-row justify-start rounded-full border border-neutrals-50 p-1"
                data-isOn={isOn}
                onClick={toggleSwitch}
            >
                <motion.div
                    className="h-8 w-8 rounded-full bg-neutrals-default"
                    layout
                    transition={spring}
                >
                    {theme === 'dark' ? (
                        <MoonIcon className="ml-1.5 mt-1.5 h-5 text-text-primary" />
                    ) : (
                        <SunIcon className="ml-1.5 mt-1.5 h-5 text-text-primary" />
                    )}
                </motion.div>
            </div>
        </div>
    )
}
