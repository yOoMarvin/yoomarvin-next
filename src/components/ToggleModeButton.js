'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

export default function ToggleModeButton() {
    const [darkMode, setDarkMode] = useState(null)

    function toggleMode() {
        let darkModeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        )
        let isSystemDarkMode = darkModeMediaQuery.matches
        let isDarkMode = document.documentElement.classList.toggle('dark')

        if (isDarkMode === isSystemDarkMode) {
            setDarkMode(true)
            delete window.localStorage.isDarkMode
        } else {
            setDarkMode(false)
            window.localStorage.isDarkMode = isDarkMode
        }
    }

    return (
        <button onClick={toggleMode} className="p-2">
            {darkMode ? (
                <SunIcon className="transition-base h-6 text-neutral-500 hover:text-white " />
            ) : (
                <MoonIcon className="transition-base h-6 text-neutral-500 hover:text-black" />
            )}
        </button>
    )
}
