import { useEffect, useRef, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { isMac } from "./common"

const SIDEBAR_MIN_WIDTH = 220
const SIDEBAR_MAX_WIDTH = 520
const SIDEBAR_DEFAULT_WIDTH = 280
const SIDEBAR_WIDTH_STORAGE_KEY = "sidebar-width"

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_WIDTH_STORAGE_KEY)
    const value = stored ? Number(stored) : SIDEBAR_DEFAULT_WIDTH
    if (Number.isNaN(value)) {
      return SIDEBAR_DEFAULT_WIDTH
    }
    return Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, value))
  })
  const isResizing = useRef(false)

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_STORAGE_KEY, String(sidebarWidth))
  }, [sidebarWidth])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (!isResizing.current) {
        return
      }
      const nextWidth = Math.min(
        SIDEBAR_MAX_WIDTH,
        Math.max(SIDEBAR_MIN_WIDTH, event.clientX),
      )
      setSidebarWidth(nextWidth)
    }

    const stopResizing = () => {
      if (!isResizing.current) {
        return
      }
      isResizing.current = false
      document.body.classList.remove("cursor-col-resize", "select-none")
    }

    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", stopResizing)
    window.addEventListener("pointercancel", stopResizing)
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", stopResizing)
      window.removeEventListener("pointercancel", stopResizing)
      document.body.classList.remove("cursor-col-resize", "select-none")
    }
  }, [])

  const startResize = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault()
    isResizing.current = true
    document.body.classList.add("cursor-col-resize", "select-none")
  }

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background">
      {/* 顶部预留空间：可拖拽移动无边框窗口；macOS 左侧留出红黄绿按钮点击区域 */}
      <header
        className="drag-region flex h-10 w-full shrink-0 cursor-move select-none items-center border-b border-border/50 bg-white/30 backdrop-blur-md"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        {isMac && <div className="no-drag h-full w-28 shrink-0" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties} />}
      </header>
      <div className="flex min-h-0 flex-1">
        <Sidebar width={sidebarWidth} />
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize sidebar"
          onPointerDown={startResize}
          className="group relative z-10 w-3 shrink-0 cursor-col-resize bg-transparent"
          style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
        >
          <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border/70 transition-colors group-hover:bg-foreground/35" />
        </div>
        <MainContent />
      </div>
    </div>
  )
}

export default App
