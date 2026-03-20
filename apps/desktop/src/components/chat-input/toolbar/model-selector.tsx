import { useState } from "react"
import type { ComponentPropsWithoutRef } from "react"
import { Check, ChevronDown, Search, Sparkles, XIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { MODEL_PROVIDERS } from "@/config/model"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/use-theme"

// 下拉框中最多显示的 provider 数量
const MAX_PROVIDERS = 3
// 下拉框中每个 provider 最多显示的模型数量
const MAX_MODELS_PER_PROVIDER = 2

type ModelSelectorProps = {
  selectedModelId: string
  selectedModelName?: string
  selectedProviderId?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSelectModel: (modelId: string) => void
}

export function ModelSelector({
  selectedModelId,
  selectedModelName,
  selectedProviderId,
  isOpen,
  onOpenChange,
  onSelectModel,
}: ModelSelectorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { theme } = useTheme()

  const handleSelectModel = (modelId: string) => {
    onSelectModel(modelId)
    onOpenChange(false)
  }

  const handleOpenAllModels = () => {
    onOpenChange(false)
    setIsDialogOpen(true)
  }

  const handleDialogSelectModel = (modelId: string) => {
    onSelectModel(modelId)
    setIsDialogOpen(false)
  }

  // 获取当前选中 provider 的 themedLogo 配置
  const selectedProviderConfig = MODEL_PROVIDERS.find(
    (p) => p.providerSlug === selectedProviderId
  )

  // 预处理：限制显示的 provider 和每个 provider 的模型数量
  // 如果当前模型属于已显示的 provider，将其添加到该 provider 的显示列表中
  const displayProviders = MODEL_PROVIDERS.slice(0, MAX_PROVIDERS).map((provider) => {
    const displayModels = provider.models.slice(0, MAX_MODELS_PER_PROVIDER)

    // 检查当前模型是否属于该 provider 但不在前 N 个中
    const isCurrentModelInProvider = selectedModelId &&
      selectedProviderId === provider.providerSlug &&
      !displayModels.some((m) => m.id === selectedModelId)

    // 如果是，将当前模型添加到显示列表中
    if (isCurrentModelInProvider && selectedModelName) {
      const currentModel = {
        id: selectedModelId,
        name: selectedModelName,
        providerId: selectedProviderId,
        capabilities: {},
      }
      return {
        ...provider,
        displayModels: [...displayModels, currentModel],
      }
    }

    return {
      ...provider,
      displayModels,
    }
  })

  // 如果当前模型不在前3个 provider 中，单独显示
  const isCurrentModelOutsideProviders = selectedModelId &&
    selectedModelName &&
    selectedProviderId &&
    !MODEL_PROVIDERS.slice(0, MAX_PROVIDERS).some(
      (p) => p.providerSlug === selectedProviderId
    )

  // 当前模型信息（用于在 provider 之外显示）
  let currentModelInfo: {
    label: string
    value: string
    providerId: string
    themedLogo: boolean
    providerName: string
  } | null = null

  if (isCurrentModelOutsideProviders && selectedProviderConfig) {
    currentModelInfo = {
      label: selectedModelName,
      value: selectedModelId,
      providerId: selectedProviderId,
      themedLogo: selectedProviderConfig.themedLogo,
      providerName: selectedProviderConfig.provider,
    }
  }

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <button className="flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] text-foreground transition-colors hover:bg-secondary">
            {selectedProviderId ? (
              <ProviderLogo
                provider={selectedProviderId}
                themedLogo={selectedProviderConfig?.themedLogo}
                theme={theme}
              />
            ) : null}
            <span>{selectedModelName ?? "选择模型"}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          side="bottom"
          sideOffset={8}
          avoidCollisions={false}
          className="max-h-[320px] w-[240px] rounded-xl border-border/70 bg-card p-1.5"
        >
          <div className="px-2 py-1 text-xs font-medium text-muted-foreground">选择模型</div>
          <div className="space-y-1">
            {displayProviders.map((provider, index) => (
              <div key={provider.provider} className="space-y-0.5">
                <div className="px-2 py-1 text-[11px] font-medium tracking-wide text-muted-foreground/80">
                  {provider.provider}
                </div>
                <div className="space-y-0.5">
                  {provider.displayModels.map((model) => (
                    <ModelOption
                      key={model.id}
                      label={model.name}
                      value={model.id}
                      providerId={model.providerId}
                      themedLogo={provider.themedLogo}
                      active={selectedModelId === model.id}
                      onSelect={handleSelectModel}
                    />
                  ))}
                </div>
                {index < displayProviders.length - 1 ? (
                  <DropdownMenuSeparator className="my-1" />
                ) : null}
              </div>
            ))}
          </div>
          {/* 当前选中的模型（如果不在显示列表中） */}
          {currentModelInfo && (
            <>
              <DropdownMenuSeparator className="my-1" />
              <div className="space-y-0.5">
                <div className="px-2 py-1 text-[11px] font-medium tracking-wide text-muted-foreground/80">
                  {currentModelInfo.providerName}
                </div>
                <ModelOption
                  label={currentModelInfo.label}
                  value={currentModelInfo.value}
                  providerId={currentModelInfo.providerId}
                  themedLogo={currentModelInfo.themedLogo}
                  active={true}
                  onSelect={handleSelectModel}
                />
              </div>
            </>
          )}
          {/* 全部模型选项 */}
          <DropdownMenuSeparator className="my-1" />
          <button
            onClick={handleOpenAllModels}
            className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-secondary"
          >
            <Sparkles className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            <span className="flex-1">全部模型</span>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 全部模型弹窗 */}
      <ModelSelectorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedModelId={selectedModelId}
        onSelectModel={handleDialogSelectModel}
      />
    </>
  )
}

// 全部模型弹窗组件
type ModelSelectorDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedModelId: string
  onSelectModel: (modelId: string) => void
}

function ModelSelectorDialog({
  open,
  onOpenChange,
  selectedModelId,
  onSelectModel,
}: ModelSelectorDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProviders = MODEL_PROVIDERS.map((provider) => ({
    ...provider,
    models: provider.models.filter(
      (model) =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.provider.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((provider) => provider.models.length > 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[480px] p-0 sm:max-w-[540px]"
        showCloseButton={false}
      >
        <div className="flex flex-col p-3">
          {/* 搜索框 */}
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索模型..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 w-full rounded-full bg-secondary/50 px-10 py-2 text-sm text-foreground caret-foreground outline-none placeholder:text-muted-foreground"
              autoFocus
            />
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full hover:bg-secondary"
            >
              <XIcon className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* 模型列表 */}
          <div className="mt-2 max-h-[360px] space-y-4 overflow-y-auto pr-1">
            {filteredProviders.length === 0 ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                未找到匹配的模型
              </div>
            ) : (
              filteredProviders.map((provider) => (
                <div key={provider.provider} className="space-y-1.5">
                  <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                    {provider.provider}
                  </div>
                  <div className="space-y-0.5">
                    {provider.models.map((model) => (
                      <ModelOption
                        key={model.id}
                        label={model.name}
                        value={model.id}
                        providerId={model.providerId}
                        themedLogo={provider.themedLogo}
                        active={selectedModelId === model.id}
                        onSelect={onSelectModel}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

type ModelOptionProps = {
  label: string
  value: string
  providerId?: string
  themedLogo?: boolean
  active: boolean
  onSelect: (value: string) => void
}

function ModelOption({ label, value, providerId, themedLogo, active, onSelect }: ModelOptionProps) {
  const { theme } = useTheme()

  return (
    <button
      onClick={() => onSelect(value)}
      className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-secondary"
    >
      {providerId ? <ProviderLogo provider={providerId} themedLogo={themedLogo} theme={theme} /> : null}
      <span className={`flex-1 ${providerId ? "ml-1.5" : ""}`}>{label}</span>
      {active ? <Check className="h-3.5 w-3.5 text-foreground" /> : null}
    </button>
  )
}

type ProviderLogoProps = Omit<ComponentPropsWithoutRef<"img">, "src" | "alt"> & {
  provider: string
  themedLogo?: boolean
  theme: "light" | "dark"
}

function ProviderLogo({ provider, themedLogo, theme, className, ...props }: ProviderLogoProps) {
  const src = themedLogo
    ? `/images/${provider}_${theme}-logo.svg`
    : `/images/${provider}-logo.svg`

  return (
    <img
      {...props}
      alt={`${provider} logo`}
      className={cn("size-3 mr-0.5", className)}
      height={12}
      src={src}
      width={12}
    />
  )
}
