'use client'

import { ThemeProvider } from 'next-themes'

export default function Provider({ children }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}
