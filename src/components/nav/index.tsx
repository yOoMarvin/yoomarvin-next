'use client'

import { useState, useEffect, Suspense } from 'react'
import { MenuButton } from './menu-button'
import { Breadcrumb } from './breadcrumb'
import { Sidebar } from './sidebar'

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  // Scroll lock
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isOpen)
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isOpen])

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 h-16 bg-[var(--bg-page)]" />
      <MenuButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
      <Suspense>
        <Breadcrumb />
      </Suspense>
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
