import { useState, useEffect } from 'react'

interface TitleBarProps {
  title: string
}

declare global {
  interface Window {
    electronAPI: {
      minimize: () => Promise<void>
      maximize: () => Promise<void>
      close: () => Promise<void>
      isMaximized: () => Promise<boolean>
      onMaximizeChange: (callback: (isMaximized: boolean) => void) => void
    }
  }
}

function TitleBar({ title }: TitleBarProps) {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    // 获取初始最大化状态
    window.electronAPI?.isMaximized().then(setIsMaximized)

    // 监听最大化状态变化
    window.electronAPI?.onMaximizeChange((maximized) => {
      setIsMaximized(maximized)
    })
  }, [])

  const handleMinimize = () => {
    window.electronAPI?.minimize()
  }

  const handleMaximize = () => {
    window.electronAPI?.maximize()
  }

  const handleClose = () => {
    window.electronAPI?.close()
  }

  return (
    <div className="title-bar">
      <div className="title-bar-drag">
        <span className="title-bar-title">{title}</span>
      </div>
      <div className="title-bar-controls">
        <button
          className="title-bar-button minimize"
          onClick={handleMinimize}
          aria-label="最小化"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect y="5" width="12" height="2" fill="currentColor" />
          </svg>
        </button>
        <button
          className="title-bar-button maximize"
          onClick={handleMaximize}
          aria-label={isMaximized ? '还原' : '最大化'}
        >
          {isMaximized ? (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M2 4V10H8V4H2ZM3 5H7V9H3V5ZM4 2H10V8H9V3H4V2Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12">
              <rect
                x="1"
                y="1"
                width="10"
                height="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          )}
        </button>
        <button
          className="title-bar-button close"
          onClick={handleClose}
          aria-label="关闭"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default TitleBar
