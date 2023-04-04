'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import '@theme-toggles/react/css/Around.css'
import { Around } from '@theme-toggles/react'

export default function ToggleThemeButton() {
    const { theme, setTheme, resolvedTheme } = useTheme()

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark')
    }

    if (!mounted) return null

    return (
        <div className="scale-150">
            <Around toggled={resolvedTheme === 'dark'} toggle={toggleTheme} />
        </div>
    )
}
