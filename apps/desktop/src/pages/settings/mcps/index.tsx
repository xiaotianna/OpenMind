import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SettingsCard } from '@/components/setting/settings-card'
import { SettingsHeader } from '@/components/setting/settings-header'
import { SettingsRow } from '@/components/setting/settings-row'
import { SubConfigTitle } from '@/components/setting/sub-config-title'

interface RecommendedServer {
  id: string
  name: string
  author: string
  description: string
  icon: string
}

const recommendedServers: RecommendedServer[] = [
  {
    id: 'linear',
    name: 'Linear',
    author: 'Linear',
    description: '集成 Linear 的问题追踪和项目管理功能',
    icon: 'https://linear.app/static/apple-touch-icon.png'
  },
  {
    id: 'notion',
    name: 'Notion',
    author: 'Notion',
    description: '阅读文档、更新页面、管理任务',
    icon: 'https://www.notion.so/images/favicon.ico'
  },
  {
    id: 'figma',
    name: 'Figma',
    author: 'Figma',
    description: '通过引入完整的 Figma 设计背景信息来生成更优质的代码',
    icon: 'https://static.figma.com/app/icon/1/touch-76.png'
  },
  {
    id: 'playwright',
    name: 'Playwright',
    author: 'Microsoft',
    description: '集成浏览器自动化功能以设计和测试用户界面。',
    icon: 'https://playwright.dev/img/playwright-logo.svg'
  }
]

export default function SettingsMcpServersPage() {
  const navigate = useNavigate()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleAddServer = () => {
    navigate('/settings/mcps/new')
  }

  const handleRestart = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const hasCustomServers = false

  return (
    <>
      <section>
        <SettingsHeader
          title='MCP 服务器'
          description='连接外部工具和数据源。'
          actions={
            <Button
              variant='secondary'
              size='sm'
              onClick={handleRestart}
            >
              <RefreshCw
                className={`h-4 w-4 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              重启
            </Button>
          }
        />
      </section>

      <section className='mt-6'>
        <div className='flex items-center justify-between mb-3'>
          <SubConfigTitle>内置 MCP 服务器</SubConfigTitle>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleRefresh}
          >
            <RefreshCw
              className={`h-4 w-4 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            刷新
          </Button>
        </div>

        <SettingsCard>
          {recommendedServers.map((server, index) => (
            <SettingsRow
              key={server.id}
              title={server.name}
              description={`操作者：${server.author}`}
              noBorder={index === recommendedServers.length - 1}
              icon={
                <img
                  src={server.icon}
                  alt={server.name}
                  className='w-8 h-8 object-contain'
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              }
              control={
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                  >
                    安装
                  </Button>
                </div>
              }
            />
          ))}
        </SettingsCard>
      </section>

      <section className='mt-6'>
        <div className='flex items-center justify-between mb-3 relative'>
          <SubConfigTitle>自定义服务器</SubConfigTitle>
          {hasCustomServers && (
            <Button
              className='absolute right-0'
              variant='ghost'
              size='sm'
              onClick={handleAddServer}
            >
              <Plus className='h-4 w-4 mr-1.5' />
              添加服务器
            </Button>
          )}
        </div>

        <SettingsCard>
          {!hasCustomServers ? (
            <SettingsRow
              title='未连接自定义 MCP 服务器'
              noBorder
              control={
                <Button
                  variant='secondary'
                  size='sm'
                  onClick={handleAddServer}
                >
                  <Plus className='h-4 w-4 mr-1.5' />
                  添加服务器
                </Button>
              }
            />
          ) : null}
        </SettingsCard>
      </section>
    </>
  )
}
