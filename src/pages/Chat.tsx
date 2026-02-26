import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  time: string
}

function Chat() {
  const { chatId } = useParams()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是 AI Agent，有什么可以帮助你的吗？',
      time: '10:00'
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // 模拟 AI 回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '这是 AI 的回复。我正在思考如何更好地回答你的问题...',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div className="chat-header-left">
          <h2 className="chat-title">关于React的面试题</h2>
        </div>
        <div className="chat-header-right">
          <button className="header-btn" title="删除对话">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M5.33333 4V2.66667C5.33333 2.29848 5.63181 2 6 2H10C10.3682 2 10.6667 2.29848 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.7015 12.3682 14 12 14H4C3.63181 14 3.33333 13.7015 3.33333 13.3333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message message-${message.role}`}>
            <div className="message-avatar">
              {message.role === 'user' ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 17C4 14.2386 6.23858 12 9 12H11C13.7614 12 16 14.2386 16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div className="message-content">
              <div className="message-bubble">{message.content}</div>
              <span className="message-time">{message.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="chat-input-container">
          <textarea
            className="chat-input"
            placeholder="发送消息..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M18.3334 1.66666L9.16669 10.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18.3334 1.66666L12.5 18.3333L9.16669 10.8333L1.66669 7.49999L18.3334 1.66666Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
