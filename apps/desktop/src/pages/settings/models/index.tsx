import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { SettingsCard } from '@/components/config/settings-card'
import { SettingsHeader } from '@/components/config/settings-header'
import { MODEL_PROVIDERS } from '@/config/model'
import { useTheme } from '@/hooks/use-theme'

function ProviderLogo({
  providerSlug,
  themedLogo,
  className,
}: {
  providerSlug: string
  themedLogo?: boolean
  className?: string
}) {
  const { theme } = useTheme()
  const src = themedLogo
    ? `/images/${providerSlug}_${theme}-logo.svg`
    : `/images/${providerSlug}-logo.svg`

  return (
    <div
      className={cn(
        'flex size-9 items-center justify-center rounded-lg bg-secondary',
        className
      )}
    >
      <img alt={`${providerSlug} logo`} className='size-5' height={20} src={src} width={20} />
    </div>
  )
}

function ModelItem({
  model,
  enabled,
  onToggle,
}: {
  model: {
    id: string
    name: string
    capabilities?: { vision?: boolean; tools?: boolean }
  }
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className='overflow-hidden'
    >
      <div className='flex items-center justify-between px-4 py-3 pl-16 hover:bg-muted/50 transition-colors'>
        <div className='flex items-center gap-2'>
          <span className='text-[13px]'>{model.name}</span>
          <div className='flex gap-1'>
            {model.capabilities?.vision && (
              <span className='inline-flex items-center rounded-full bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground'>
                视觉
              </span>
            )}
            {model.capabilities?.tools && (
              <span className='inline-flex items-center rounded-full bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground'>
                工具
              </span>
            )}
          </div>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={onToggle}
          className='h-4 w-7 data-[state=checked]:bg-[#0A84FF]'
        />
      </div>
    </motion.div>
  )
}

function ProviderRow({
  provider,
  providerSlug,
  models,
  themedLogo,
}: {
  provider: string
  providerSlug: string
  models: { id: string; name: string; capabilities?: { vision?: boolean; tools?: boolean } }[]
  themedLogo?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const [enabledModels, setEnabledModels] = useState<Set<string>>(new Set())

  const toggleModel = (modelId: string) => {
    setEnabledModels((prev) => {
      const next = new Set(prev)
      if (next.has(modelId)) {
        next.delete(modelId)
      } else {
        next.add(modelId)
      }
      return next
    })
  }

  return (
    <div className='border-b border-border/60 last:border-b-0'>
      <div
        className='flex items-center justify-between px-3.5 py-3 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors'
        onClick={() => setExpanded(!expanded)}
      >
        <div className='flex items-center gap-3'>
          <ProviderLogo providerSlug={providerSlug} themedLogo={themedLogo} />
          <div>
            <p className='text-[14px] font-medium'>{provider}</p>
            <p className='text-[12px] text-muted-foreground'>
              {provider} · {models.length} 个模型可用
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className='h-4 w-4 text-muted-foreground' />
        </motion.div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className='bg-card/40'
          >
            {models.map((model) => (
              <ModelItem
                key={model.id}
                model={model}
                enabled={enabledModels.has(model.id)}
                onToggle={() => toggleModel(model.id)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SettingsModelsPage() {
  const navigate = useNavigate()

  return (
    <>
      <section>
        <SettingsHeader
          title='模型管理'
          description='管理 AI 供应商连接，配置 API Key 和可用模型。'
          actions={
            <Button variant='default' size='sm' onClick={() => navigate('/settings/models/new')}>
              <Plus className='h-3.5 w-3.5 mr-1.5' />
              新建
            </Button>
          }
        />
      </section>

      <section>
        <SettingsCard>
          {MODEL_PROVIDERS.map((p) => (
            <ProviderRow
              key={p.providerSlug}
              provider={p.provider}
              providerSlug={p.providerSlug}
              models={p.models}
              themedLogo={p.themedLogo}
            />
          ))}
        </SettingsCard>
      </section>
    </>
  )
}