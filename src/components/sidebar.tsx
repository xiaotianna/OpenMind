import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  PenSquare,
  Puzzle,
  Folder,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Settings,
  ListFilter,
  FolderInput,
  Moon,
  Sun,
  CircleUserRound,
  Globe,
  LogOut
} from 'lucide-react'
import { DragHandle } from '@/components/drag-handle'
import { useTheme } from '@/hooks/use-theme'
import { isDesktop } from '@/common'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Thread {
  id: string
  title: string
  time: string
}

interface ThreadGroup {
  id: string
  name: string
  threads: Thread[]
}

const threadGroups: ThreadGroup[] = [
  {
    id: '1',
    name: 'PythonProject',
    threads: [
      { id: '1-1', title: 'summarization_middleware_an...', time: '1w' },
      { id: '1-2', title: 'Explain SummarizationMiddlew...', time: '1w' }
    ]
  },
  {
    id: '2',
    name: '\u9762\u8BD5\u6587\u6863_github_\u526F\u672C2',
    threads: [
      {
        id: '2-1',
        title:
          '\u5B8C\u5584\u9762\u8BD5\u98983-20\u7B54\u6848\u4F5C\u7B54\u6307\u5BFC\u8986...',
        time: '1w'
      }
    ]
  }
]

interface SidebarProps {
  width?: number
}

export function Sidebar({ width = 280 }: SidebarProps) {
  const navigate = useNavigate()
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      '1': true,
      '2': true
    }
  )
  const isFirstRender = useRef(true)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    isFirstRender.current = false
  }, [])

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside
      className='sidebar-glass flex h-full shrink-0 flex-col bg-background text-sidebar-foreground'
      style={{ width }}
    >
      {/* Drag handle area */}
      {isDesktop && <DragHandle className='h-8 w-full shrink-0' />}

      {/* Top actions */}
      <div className='flex flex-col gap-1 p-3 pt-4'>
        <button className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary'>
          <PenSquare className='h-4 w-4' />
          <span>New thread</span>
        </button>
        <button className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary'>
          <Puzzle className='h-4 w-4' />
          <span>Skills</span>
        </button>
      </div>

      {/* Threads header */}
      <div className='flex items-center justify-between px-4 pb-1 pt-4'>
        <span className='text-xs font-medium text-muted-foreground'>
          Threads
        </span>
        <div className='flex items-center gap-1'>
          <button className='rounded p-1 transition-colors hover:bg-secondary'>
            <FolderInput className='h-3.5 w-3.5 text-muted-foreground' />
          </button>
          <button className='rounded p-1 transition-colors hover:bg-secondary'>
            <ListFilter className='h-3.5 w-3.5 text-muted-foreground' />
          </button>
        </div>
      </div>

      {/* Thread groups */}
      <div className='flex-1 overflow-y-auto px-2'>
        {threadGroups.map((group) => (
          <div
            key={group.id}
            className='mb-1'
          >
            <button
              onClick={() => toggleGroup(group.id)}
              className='flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-secondary'
            >
              {expandedGroups[group.id] ? (
                <FolderOpen className='h-4 w-4 text-muted-foreground' />
              ) : (
                <Folder className='h-4 w-4 text-muted-foreground' />
              )}
              <span className='flex-1 truncate text-left text-sm'>
                {group.name}
              </span>
              {expandedGroups[group.id] ? (
                <ChevronDown className='h-3.5 w-3.5 text-muted-foreground' />
              ) : (
                <ChevronRight className='h-3.5 w-3.5 text-muted-foreground' />
              )}
            </button>
            <AnimatePresence mode='wait'>
              {expandedGroups[group.id] && (
                <motion.div
                  initial={
                    isFirstRender.current ? false : { height: 0, opacity: 0 }
                  }
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='ml-4 overflow-hidden'>
                    {group.threads.map((thread) => (
                      <button
                        key={thread.id}
                        className='flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-secondary'
                      >
                        <span className='truncate text-muted-foreground'>
                          {thread.title}
                        </span>
                        <span className='ml-2 shrink-0 text-xs text-muted-foreground'>
                          {thread.time}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Settings trigger and popup menu */}
      <div className='px-3 py-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className='flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary'>
              <Settings className='h-4 w-4' />
              <span>Setting</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side='top'
            align='start'
            sideOffset={6}
            className='w-[240px] rounded-xl border border-border bg-card p-1.5'
          >
            <div className='flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs text-muted-foreground'>
              <CircleUserRound className='h-4 w-4' />
              <span className='truncate'>xiaotianwifi@gmail.com</span>
            </div>

            <DropdownMenuSeparator />

            <button
              className='flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-secondary'
              onClick={() => navigate('/settings')}
            >
              <Settings className='h-3.5 w-3.5' />
              <span>Setting</span>
            </button>

            <button className='flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-secondary'>
              <Globe className='h-3.5 w-3.5' />
              <span className='flex-1'>语言</span>
              <ChevronRight className='h-3.5 w-3.5 text-muted-foreground' />
            </button>

            <button
              onClick={toggleTheme}
              className='flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-secondary'
            >
              {theme === 'dark' ? (
                <Sun className='h-3.5 w-3.5' />
              ) : (
                <Moon className='h-3.5 w-3.5' />
              )}
              <span>主题：{theme === 'dark' ? '深色' : '浅色'}</span>
            </button>

            <button className='flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-secondary'>
              <LogOut className='h-3.5 w-3.5' />
              <span>退出登录</span>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
