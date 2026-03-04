import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/globals.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'

// 在渲染前初始化主题，避免页面闪烁
function initTheme() {
  const stored = localStorage.getItem('theme')
  const theme =
    stored === 'dark'
      ? 'dark'
      : stored === 'light'
        ? 'light'
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'

  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
}
initTheme()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
