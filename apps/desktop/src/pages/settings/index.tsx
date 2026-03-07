import {
  Archive,
  ArrowLeft,
  GitBranch,
  Monitor,
  Palette,
  PlugZap,
  Settings2,
  SlidersHorizontal,
  Workflow,
} from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { DragHandle } from '@/components/drag-handle'
import { isDesktop } from '@/common'

const menuItems = [
  { icon: SlidersHorizontal, label: '常规', to: 'general' },
  { icon: Settings2, label: '配置', to: 'config' },
  { icon: Palette, label: '个性化', to: 'personalization' },
  { icon: PlugZap, label: 'MCP 服务器', to: 'mcp-servers' },
  { icon: GitBranch, label: 'Git', to: 'git' },
  { icon: Monitor, label: '环境', to: 'environment' },
  { icon: Workflow, label: '工作树', to: 'worktree' },
  { icon: Archive, label: '已归档线程', to: 'archived-threads' },
]

const SettingsLayout = () => {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <aside className="w-64 shrink-0 border-r border-border/50 bg-card/50">
        {isDesktop && <DragHandle className="h-8 w-full shrink-0" />}
        <div className="px-3 pb-4 pt-4">
          <Button
            variant="ghost"
            className="mb-2 w-full justify-start px-3 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground"
            onClick={() => navigate('/chat')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回应用
          </Button>

          <nav className="space-y-0.5">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex h-9 w-full items-center gap-2.5 rounded-lg px-3 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-secondary font-medium text-foreground'
                      : 'text-foreground/80 hover:bg-secondary hover:text-foreground',
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background">
        <div className="mx-auto w-full max-w-[980px] px-5 py-4 md:px-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default SettingsLayout
