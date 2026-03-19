import {
  ArrowLeft,
  BookOpen,
  Brain,
  GitBranch,
  Palette,
  SlidersHorizontal,
  Wand2,
  Wrench
} from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DragHandle } from '@/components/drag-handle'
import { isDesktop } from '@/common'
import { MCP } from '@lobehub/icons'

const menuItems = [
  { icon: SlidersHorizontal, label: '常规', to: 'general' },
  { icon: Palette, label: '个性化', to: 'personalization' },
  { icon: Brain, label: '模型', to: 'models' },
  { icon: BookOpen, label: '提示词', to: 'prompts' },
  { icon: Wrench, label: '工具', to: 'tools' },
  { icon: MCP, label: 'MCP 服务器', to: 'mcp-servers' },
  { icon: Wand2, label: 'Skills', to: 'skills' },
  { icon: GitBranch, label: 'Git', to: 'git' },
]

const SettingsLayout = () => {
  const navigate = useNavigate()

  return (
    <div className='flex h-screen w-screen overflow-hidden bg-background text-foreground'>
      <aside className='w-64 shrink-0 border-r border-border/50 bg-card/50'>
        {isDesktop && <DragHandle className='h-8 w-full shrink-0' />}
        <div className='px-3 pb-4 pt-4'>
          <Button
            variant='ghost'
            className='mb-2 w-full justify-start px-3 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground'
            onClick={() => navigate('/chat')}
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            返回应用
          </Button>

          <nav className='space-y-0.5'>
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex h-9 w-full items-center gap-2.5 rounded-lg px-3 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-secondary font-medium text-foreground'
                      : 'text-foreground/80 hover:bg-secondary hover:text-foreground'
                  )
                }
              >
                <item.icon className='h-4 w-4' />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <main className='flex-1 overflow-y-auto bg-background relative'>
        <div className='mx-auto w-full max-w-[680px] pb-5 px-5 py-4 md:px-6 mt-6'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default SettingsLayout
