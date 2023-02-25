'use client'

import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'

export default function Provider({ children }) {
    //avoid hydration mismatch
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}
