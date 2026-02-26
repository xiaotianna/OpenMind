import { useState, useEffect } from 'react'
import TitleBar from './components/TitleBar'

function App() {
  const [message, setMessage] = useState('Welcome to AI Agent Desktop')

  useEffect(() => {
    // 初始化逻辑
    console.log('App initialized')
  }, [])

  return (
    <div className="app">
      <TitleBar title="AI Agent Desktop" />
      <main className="app-content">
        <h1>{message}</h1>
        <p>这是一个 AI Agent 桌面应用程序</p>
      </main>
    </div>
  )
}

export default App
