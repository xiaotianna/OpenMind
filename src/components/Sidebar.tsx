import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

interface ChatItem {
  id: string
  title: string
  time: string
}

function Sidebar() {
  const location = useLocation()
  const [chats, setChats] = useState<ChatItem[]>([
    { id: '1', title: '关于React的面试题', time: '今天 10:30' },
    { id: '2', title: '帮我写一个排序算法', time: '昨天 15:20' },
    { id: '3', title: '解释一下什么是闭包', time: '2月25日' },
  ])

  const handleNewChat = () => {
    const newChat: ChatItem = {
      id: Date.now().toString(),
      title: '新对话',
      time: '现在'
    }
    setChats([newChat, ...chats])
  }

  const isActive = (path: string) => {
    if (path === '/chat') {
      return location.pathname === '/chat' || location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">AI Agent Desktop</h1>
        <button className="new-chat-btn" onClick={handleNewChat}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          新建聊天
        </button>
      </div>

      <div className="sidebar-content">
        <div className="chat-list">
          {chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/chat/${chat.id}`}
              className={`chat-item ${isActive(`/chat/${chat.id}`) ? 'active' : ''}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="chat-icon">
                <path d="M14 10.5V13.5C14 14.0523 13.5523 14.5 13 14.5H3C2.44772 14.5 2 14.0523 2 13.5V3.5C2 2.94772 2.44772 2.5 3 2.5H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14 10.5V12.5C14 12.7761 13.7761 13 13.5 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 6.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M6 9H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div className="chat-info">
                <span className="chat-title">{chat.title}</span>
                <span className="chat-time">{chat.time}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <Link to="/settings" className={`settings-btn ${isActive('/settings') ? 'active' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M13 8L14 7M2 8L3 7M8 2L7 3M8 14L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          设置
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
