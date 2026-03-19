import { useState } from 'react'
import { Plus, Save, Trash2, Zap } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BackButton } from '@/components/back-button'
import { SettingsHeader } from '@/components/setting/settings-header'
import { ConfigTitle } from '@/components/setting/config-title'
import { SettingsCard } from '@/components/setting/settings-card'
import { SettingsRow } from '@/components/setting/settings-row'

interface EnvVar {
  id: string
  key: string
  value: string
}

interface McpServerFormData {
  name: string
  transportType: 'stdio' | 'streamable-http'
  command: string
  envVars: EnvVar[]
}

export default function NewMcpServerPage() {
  const [formData, setFormData] = useState<McpServerFormData>({
    name: '',
    transportType: 'stdio',
    command: '',
    envVars: [{ id: '1', key: '', value: '' }]
  })

  const updateFormData = (field: keyof McpServerFormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleAddEnvVar = () => {
    setFormData({
      ...formData,
      envVars: [
        ...formData.envVars,
        { id: Date.now().toString(), key: '', value: '' }
      ]
    })
  }

  const handleUpdateEnvVar = (
    id: string,
    field: 'key' | 'value',
    value: string
  ) => {
    setFormData({
      ...formData,
      envVars: formData.envVars.map((env) =>
        env.id === id ? { ...env, [field]: value } : env
      )
    })
  }

  const handleRemoveEnvVar = (id: string) => {
    setFormData({
      ...formData,
      envVars: formData.envVars.filter((env) => env.id !== id)
    })
  }

  return (
    <>
      <BackButton />
      <SettingsHeader
        title='新增 MCP 服务器'
        description='配置自定义 MCP 服务器连接'
        actions={
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='gap-1.5'
            >
              <Zap className='h-3.5 w-3.5' />
              测试连接
            </Button>
            <Button
              variant='default'
              size='sm'
            >
              <Save className='h-3.5 w-3.5 mr-1.5' />
              保存
            </Button>
          </div>
        }
      />

      <section>
        <ConfigTitle>基本信息</ConfigTitle>
        <SettingsCard>
          <SettingsRow
            title='服务器名称'
            description='显示名称'
            control={
              <Input
                placeholder='例如: My Custom Server'
                value={formData.name}
                onChange={(e) => updateFormData('name', e.target.value)}
                className='w-64 h-8 text-[13px]'
              />
            }
          />
          <SettingsRow
            title='传输类型'
            description='MCP 服务器的连接方式'
            control={
              <Select
                value={formData.transportType}
                onValueChange={(value) =>
                  updateFormData('transportType', value as 'stdio' | 'streamable-http')
                }
              >
                <SelectTrigger className='w-auto h-8 text-[13px]'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='stdio'>Stdio</SelectItem>
                  <SelectItem value='streamable-http'>
                    流式 HTTP (Streamable HTTP)
                  </SelectItem>
                </SelectContent>
              </Select>
            }
          />
          <SettingsRow
            title='启动命令'
            description='MCP 服务器的启动命令'
            noBorder
            control={
              <Input
                placeholder='例如: npx @modelcontextprotocol/server-filesystem'
                value={formData.command}
                onChange={(e) => updateFormData('command', e.target.value)}
                className='w-80 h-8 text-[13px]'
              />
            }
          />
        </SettingsCard>
      </section>

      <section>
        <div className='flex items-center justify-between'>
          <ConfigTitle>环境变量</ConfigTitle>
          <Button
            variant='ghost'
            size='sm'
            onClick={handleAddEnvVar}
            className='gap-1.5 mt-2'
          >
            <Plus className='h-3.5 w-3.5' />
            添加变量
          </Button>
        </div>
        <SettingsCard>
          <div className='px-3.5 py-3 space-y-3'>
            {formData.envVars.map((envVar) => (
              <div
                key={envVar.id}
                className='flex items-center gap-3'
              >
                <Input
                  placeholder='变量名'
                  value={envVar.key}
                  onChange={(e) =>
                    handleUpdateEnvVar(envVar.id, 'key', e.target.value)
                  }
                  className='h-8 text-[13px] flex-1'
                />
                <Input
                  placeholder='变量值'
                  value={envVar.value}
                  onChange={(e) =>
                    handleUpdateEnvVar(envVar.id, 'value', e.target.value)
                  }
                  className='h-8 text-[13px] flex-1'
                />
                {formData.envVars.length > 1 && (
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-7 w-7 hover:bg-destructive/20 text-muted-foreground hover:text-destructive shrink-0'
                    onClick={() => handleRemoveEnvVar(envVar.id)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </SettingsCard>
      </section>
    </>
  )
}
