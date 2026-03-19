import { useState } from 'react'
import { Eye, EyeOff, Plus, Zap, Download, Save } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { BackButton } from '@/components/back-button'
import { SettingsHeader } from '@/components/config/settings-header'
import { ConfigTitle } from '@/components/config/config-title'

interface ModelEntry {
  id: string
  modelId: string
  displayName: string
}

interface ChannelFormData {
  channelName: string
  provider: string
  baseUrl: string
  apiKey: string
  enabled: boolean
}

interface ChannelBasicFormProps {
  data: ChannelFormData
  onChange: (data: ChannelFormData) => void
}

interface ChannelModelListProps {
  models: ModelEntry[]
  onChange: (models: ModelEntry[]) => void
}

const providers = [
  {
    value: 'anthropic',
    label: 'Anthropic',
    baseUrl: 'https://api.anthropic.com'
  },
  { value: 'openai', label: 'OpenAI', baseUrl: 'https://api.openai.com' },
  {
    value: 'google',
    label: 'Google',
    baseUrl: 'https://generativelanguage.googleapis.com'
  },
  { value: 'mistral', label: 'Mistral', baseUrl: 'https://api.mistral.ai' },
  { value: 'deepseek', label: 'DeepSeek', baseUrl: 'https://api.deepseek.com' }
]

function ChannelBasicForm({ data, onChange }: ChannelBasicFormProps) {
  const [showApiKey, setShowApiKey] = useState(false)

  const selectedProvider = providers.find((p) => p.value === data.provider)
  const previewUrl = selectedProvider ? `${data.baseUrl}/v1/messages` : ''

  const update = (field: keyof ChannelFormData, value: string | boolean) => {
    onChange({ ...data, [field]: value })
  }

  const handleProviderChange = (value: string) => {
    const newProvider = providers.find((p) => p.value === value)
    onChange({
      ...data,
      provider: value,
      baseUrl: newProvider?.baseUrl || data.baseUrl
    })
  }

  return (
    <section>
      <ConfigTitle>基本信息</ConfigTitle>
      <div className='space-y-4'>
        {/* 渠道名称 */}
        <div className='rounded-lg border border-border bg-card p-4'>
          <label className='mb-2 block text-sm font-medium text-foreground'>
            渠道名称
          </label>
          <Input
            placeholder='例如: My Anthropic'
            value={data.channelName}
            onChange={(e) => update('channelName', e.target.value)}
            className='bg-background'
          />
        </div>

        {/* 供应商类型 */}
        <div className='rounded-lg border border-border bg-card p-4'>
          <label className='mb-2 block text-sm font-medium text-foreground'>
            供应商类型
          </label>
          <Select
            value={data.provider}
            onValueChange={handleProviderChange}
          >
            <SelectTrigger className='w-full bg-background'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {providers.map((p) => (
                <SelectItem
                  key={p.value}
                  value={p.value}
                >
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Base URL */}
        <div className='rounded-lg border border-border bg-card p-4'>
          <label className='mb-1 block text-sm font-medium text-foreground'>
            Base URL
          </label>
          <p className='mb-2 text-sm text-muted-foreground'>
            预览：{previewUrl}
          </p>
          <Input
            value={data.baseUrl}
            onChange={(e) => update('baseUrl', e.target.value)}
            className='bg-background'
          />
        </div>

        {/* API Key */}
        <div className='rounded-lg border border-border bg-card p-4'>
          <label className='mb-2 block text-sm font-medium text-foreground'>
            API Key
          </label>
          <div className='relative'>
            <Input
              type={showApiKey ? 'text' : 'password'}
              placeholder='输入 API Key'
              value={data.apiKey}
              onChange={(e) => update('apiKey', e.target.value)}
              className='bg-background pr-10'
            />
            <button
              type='button'
              onClick={() => setShowApiKey(!showApiKey)}
              className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
            >
              {showApiKey ? (
                <EyeOff className='size-4' />
              ) : (
                <Eye className='size-4' />
              )}
            </button>
          </div>
        </div>

        {/* 启用此渠道 */}
        <div className='flex items-center justify-between rounded-lg border border-border bg-card p-4'>
          <div>
            <p className='text-sm font-medium text-foreground'>启用此渠道</p>
            <p className='text-sm text-muted-foreground'>
              关闭后该渠道不会在模型选择中出现
            </p>
          </div>
          <Switch
            checked={data.enabled}
            onCheckedChange={(enabled) => update('enabled', enabled)}
          />
        </div>
      </div>
    </section>
  )
}

function ChannelModelList({ models, onChange }: ChannelModelListProps) {
  const addModel = () => {
    onChange([
      ...models,
      { id: Date.now().toString(), modelId: '', displayName: '' }
    ])
  }

  const updateModel = (
    id: string,
    field: 'modelId' | 'displayName',
    value: string
  ) => {
    onChange(
      models.map((model) =>
        model.id === id ? { ...model, [field]: value } : model
      )
    )
  }

  return (
    <section>
      <div className='flex items-center justify-between'>
        <ConfigTitle>模型列表</ConfigTitle>
        <Button
          variant='ghost'
          size='sm'
          className='gap-1.5 text-muted-foreground mt-3'
        >
          <Download className='size-4' />
          从供应商获取
        </Button>
      </div>

      <div className='space-y-3'>
        {models.map((model) => (
          <div
            key={model.id}
            className='flex items-center gap-3'
          >
            <Input
              placeholder='模型 ID（如 claude-opus-4-6）'
              value={model.modelId}
              onChange={(e) => updateModel(model.id, 'modelId', e.target.value)}
              className='flex-1 bg-card'
            />
            <Input
              placeholder='显示名称（可选）'
              value={model.displayName}
              onChange={(e) =>
                updateModel(model.id, 'displayName', e.target.value)
              }
              className='flex-1 bg-card'
            />
            <Button
              variant='ghost'
              size='icon'
              onClick={addModel}
              className='shrink-0 text-muted-foreground hover:text-foreground'
            >
              <Plus className='size-4' />
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function NewModelPage() {
  const [formData, setFormData] = useState<ChannelFormData>({
    channelName: '',
    provider: 'anthropic',
    baseUrl: 'https://api.anthropic.com',
    apiKey: '',
    enabled: true
  })
  const [models, setModels] = useState<ModelEntry[]>([
    { id: '1', modelId: '', displayName: '' }
  ])

  return (
    <>
    <BackButton />
      <SettingsHeader
        title='新增模型'
        description='配置新的 AI 模型供应商和 API Key'
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

      <ChannelBasicForm
        data={formData}
        onChange={setFormData}
      />
      <ChannelModelList
        models={models}
        onChange={setModels}
      />
    </>
  )
}
