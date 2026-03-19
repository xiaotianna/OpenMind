import { useState } from "react"
import { Plus, RefreshCw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { SettingsCard } from "@/components/setting/settings-card"
import { SettingsHeader } from "@/components/setting/settings-header"
import { SettingsRow } from "@/components/setting/settings-row"
import { SubConfigTitle } from "@/components/setting/sub-config-title"

interface CustomServer {
  id: string
  name: string
  enabled: boolean
}

interface RecommendedServer {
  id: string
  name: string
  author: string
  description: string
  icon: string
}

const recommendedServers: RecommendedServer[] = [
  {
    id: "linear",
    name: "Linear",
    author: "Linear",
    description: "集成 Linear 的问题追踪和项目管理功能",
    icon: "https://linear.app/static/apple-touch-icon.png",
  },
  {
    id: "notion",
    name: "Notion",
    author: "Notion",
    description: "阅读文档、更新页面、管理任务",
    icon: "https://www.notion.so/images/favicon.ico",
  },
  {
    id: "figma",
    name: "Figma",
    author: "Figma",
    description: "通过引入完整的 Figma 设计背景信息来生成更优质的代码",
    icon: "https://static.figma.com/app/icon/1/touch-76.png",
  },
  {
    id: "playwright",
    name: "Playwright",
    author: "Microsoft",
    description: "集成浏览器自动化功能以设计和测试用户界面。",
    icon: "https://playwright.dev/img/playwright-logo.svg",
  },
]

export default function SettingsMcpServersPage() {
  const [customServers, setCustomServers] = useState<CustomServer[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleAddServer = () => {
    const newServer: CustomServer = {
      id: `server-${Date.now()}`,
      name: `context${customServers.length + 7}`,
      enabled: true,
    }
    setCustomServers([...customServers, newServer])
  }

  const handleToggleServer = (id: string) => {
    setCustomServers(
      customServers.map((server) =>
        server.id === id ? { ...server, enabled: !server.enabled } : server
      )
    )
  }

  const handleRemoveServer = (id: string) => {
    setCustomServers(customServers.filter((server) => server.id !== id))
  }

  const handleRestart = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const hasCustomServers = customServers.length > 0

  return (
    <>
      <section>
        <SettingsHeader
          title="MCP 服务器"
          description="连接外部工具和数据源。 Learn more."
          actions={
            <Button variant="secondary" size="sm" onClick={handleRestart}>
              <RefreshCw className={`h-4 w-4 mr-1.5 ${isRefreshing ? "animate-spin" : ""}`} />
              重启
            </Button>
          }
        />
      </section>

      <section>
        <div className="flex items-center justify-between mb-3 relative">
          <SubConfigTitle>自定义服务器</SubConfigTitle>
          {hasCustomServers && (
            <Button className="absolute right-0" variant="ghost" size="sm" onClick={handleAddServer}>
              <Plus className="h-4 w-4 mr-1.5" />
              添加服务器
            </Button>
          )}
        </div>

        <SettingsCard>
          {hasCustomServers ? (
            customServers.map((server, index) => (
              <SettingsRow
                key={server.id}
                title={server.name}
                noBorder={index === customServers.length - 1}
                control={
                  <div className="flex items-center gap-3">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-destructive/20 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除</AlertDialogTitle>
                          <AlertDialogDescription>
                            确定要删除服务器 "{server.name}" 吗？此操作无法撤销。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemoveServer(server.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            删除
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Switch
                      checked={server.enabled}
                      onCheckedChange={() => handleToggleServer(server.id)}
                    />
                  </div>
                }
              />
            ))
          ) : (
            <SettingsRow
              title="未连接自定义 MCP 服务器"
              noBorder
              control={
                <Button variant="secondary" size="sm" onClick={handleAddServer}>
                  <Plus className="h-4 w-4 mr-1.5" />
                  添加服务器
                </Button>
              }
            />
          )}
        </SettingsCard>
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <SubConfigTitle>推荐的服务器</SubConfigTitle>
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            <RefreshCw className={`h-4 w-4 mr-1.5 ${isRefreshing ? "animate-spin" : ""}`} />
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
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                  }}
                />
              }
              control={
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    安装
                  </Button>
                </div>
              }
            />
          ))}
        </SettingsCard>
      </section>
    </>
  )
}
