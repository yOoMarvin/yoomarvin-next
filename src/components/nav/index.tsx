'use client'

import { useState, useEffect } from 'react'
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
      <MenuButton isOpen={isOpen} onClick={() => setIsOpen((v) => !v)} />
      <Breadcrumb />
      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
