import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/sidebar'
import '@/styles/globals.css'

const SIDEBAR_MIN_WIDTH = 220
const SIDEBAR_MAX_WIDTH = 520
const SIDEBAR_DEFAULT_WIDTH = 280
const SIDEBAR_WIDTH_STORAGE_KEY = 'sidebar-width'

export default function RootLayout() {
  const [sidebarWidth, setSidebarWidth] = React.useState(() => {
    const stored = localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY)
    const value = stored ? Number(stored) : SIDEBAR_DEFAULT_WIDTH
    if (Number.isNaN(value)) return SIDEBAR_DEFAULT_WIDTH
    return Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, value))
  })
  const isResizing = React.useRef(false)

  React.useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, String(sidebarWidth))
  }, [sidebarWidth])

  React.useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isResizing.current) return
      const nextWidth = Math.min(
        SIDEBAR_MAX_WIDTH,
        Math.max(SIDEBAR_MIN_WIDTH, event.clientX),
      )
      setSidebarWidth(nextWidth)
    }

    const stopResizing = () => {
      if (!isResizing.current) return
      isResizing.current = false
      document.body.classList.remove('cursor-col-resize', 'select-none')
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopResizing)
    window.addEventListener('pointercancel', stopResizing)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', stopResizing)
      window.removeEventListener('pointercancel', stopResizing)
      document.body.classList.remove('cursor-col-resize', 'select-none')
    }
  }, [])

  const startResize = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    isResizing.current = true
    document.body.classList.add('cursor-col-resize', 'select-none')
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar width={sidebarWidth} />
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        onPointerDown={startResize}
        className="group relative z-20 h-full w-0 shrink-0 cursor-col-resize"
      >
        <div className="absolute inset-y-0 left-0 w-px bg-border/70 transition-colors group-hover:bg-foreground/30" />
        <div className="absolute inset-y-0 -left-1.5 w-3 bg-transparent" />
      </div>
      <Outlet />
    </div>
  )
}