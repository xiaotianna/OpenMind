import React from 'react'
import ReactDOM from 'react-dom/client'
import { Sidebar } from '@/components/sidebar'
import { MainContent } from '@/components/main-content'
import '@/styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <MainContent />
    </div>
  </React.StrictMode>
)
