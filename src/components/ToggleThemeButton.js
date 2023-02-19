'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ToggleThemeButton() {
    const { systemTheme, theme, setTheme } = useTheme()

    //avoid hydration mismatch
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    function themeChanger() {
        if (!mounted) return null

        const currentTheme = theme === 'system' ? systemTheme : theme

        if (currentTheme === 'dark') {
            return (
                <SunIcon
                    className="transition-base h-6 text-neutral-500 hover:text-white "
                    onClick={() => setTheme('light')}
                />
            )
        } else {
            return (
                <MoonIcon
                    className="transition-base h-6 text-neutral-500 hover:text-black "
                    onClick={() => setTheme('dark')}
                />
            )
        }
    }

    return (
        <button type="button" className="p-2">
            {themeChanger()}
        </button>
    )
}
