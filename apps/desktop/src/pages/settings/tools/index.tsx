import { useState } from 'react'
import {
  Globe,
  Terminal,
  FileText,
  GitBranch,
  Code2,
  Search
} from 'lucide-react'
import { ConfigTitle } from '@/components/config/config-title'
import { SettingsCard } from '@/components/config/settings-card'
import { SettingsRow } from '@/components/config/settings-row'
import { Switch } from '@/components/ui/switch'

interface Tool {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  enabled: boolean
}

export default function SettingsToolsPage() {
  const [tools, setTools] = useState<Record<string, boolean>>({
    webSearch: true,
    webBrowse: false,
    fileRead: true,
    codeExecution: false,
    git: true,
    terminal: false
  })

  const toggleTool = (toolId: string) => {
    setTools((prev) => ({
      ...prev,
      [toolId]: !prev[toolId]
    }))
  }

  const toolList: Tool[] = [
    {
      id: 'webSearch',
      name: '联网搜索',
      description: '搜索互联网获取最新信息和答案',
      icon: <Search className='h-4 w-4' />,
      enabled: tools.webSearch
    },
    {
      id: 'webBrowse',
      name: '网页浏览',
      description: '访问并提取网页内容',
      icon: <Globe className='h-4 w-4' />,
      enabled: tools.webBrowse
    },
    {
      id: 'fileRead',
      name: '文件读取',
      description: '读取本地文件内容和结构',
      icon: <FileText className='h-4 w-4' />,
      enabled: tools.fileRead
    },
    {
      id: 'codeExecution',
      name: '代码执行',
      description: '运行代码片段获取执行结果',
      icon: <Code2 className='h-4 w-4' />,
      enabled: tools.codeExecution
    },
    {
      id: 'git',
      name: 'Git 操作',
      description: '执行 Git 命令进行版本控制',
      icon: <GitBranch className='h-4 w-4' />,
      enabled: tools.git
    },
    {
      id: 'terminal',
      name: '终端命令',
      description: '执行 Shell 命令操作系统',
      icon: <Terminal className='h-4 w-4' />,
      enabled: tools.terminal
    }
  ]

  return (
    <>
      <section>
        <ConfigTitle>内置工具</ConfigTitle>
        <SettingsCard>
          {toolList.map((tool, index) => (
            <SettingsRow
              key={tool.id}
              title={tool.name}
              description={tool.description}
              noBorder={index === toolList.length - 1}
              control={
                <div className='flex items-center gap-4'>
                  <span className='text-muted-foreground/60'>{tool.icon}</span>
                  <Switch
                    checked={tool.enabled}
                    onCheckedChange={() => toggleTool(tool.id)}
                    className='h-5 w-8 data-[state=checked]:bg-[#0A84FF]'
                  />
                </div>
              }
            />
          ))}
        </SettingsCard>
      </section>

      <section className='mt-6'>
        <ConfigTitle>安全</ConfigTitle>
        <SettingsCard>
          <SettingsRow
            title='高危操作确认'
            description='执行删除、覆盖等高危操作前显示确认提示'
            control={
              <Switch
                checked={true}
                onCheckedChange={() => {}}
                className='h-5 w-8 data-[state=checked]:bg-[#0A84FF]'
              />
            }
          />
          <SettingsRow
            title='命令执行超时'
            description='单次命令执行的最大时间限制'
            noBorder
            control={
              <div className='flex items-center gap-1.5 text-[12px] text-muted-foreground'>
                <span>60</span>
                <span>秒</span>
              </div>
            }
          />
        </SettingsCard>
      </section>
    </>
  )
}
