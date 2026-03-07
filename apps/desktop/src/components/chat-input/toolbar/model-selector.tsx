import type { ComponentPropsWithoutRef } from "react"
import { Check, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MODEL_PROVIDERS } from "@/config/model"
import { cn } from "@/lib/utils"

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
  const handleSelectModel = (modelId: string) => {
    onSelectModel(modelId)
    onOpenChange(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] text-foreground transition-colors hover:bg-secondary">
          {selectedProviderId ? <ProviderLogo provider={selectedProviderId} /> : null}
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
          {MODEL_PROVIDERS.map((provider, index) => (
            <div key={provider.provider} className="space-y-0.5">
              <div className="px-2 py-1 text-[11px] font-medium tracking-wide text-muted-foreground/80">
                {provider.provider}
              </div>
              <div className="space-y-0.5">
                {provider.models.map((model) => (
                  <ModelOption
                    key={model.id}
                    label={model.name}
                    value={model.id}
                    providerId={model.providerId}
                    active={selectedModelId === model.id}
                    onSelect={handleSelectModel}
                  />
                ))}
              </div>
              {index < MODEL_PROVIDERS.length - 1 ? (
                <DropdownMenuSeparator className="my-1" />
              ) : null}
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type ModelOptionProps = {
  label: string
  value: string
  providerId?: string
  active: boolean
  onSelect: (value: string) => void
}

function ModelOption({ label, value, providerId, active, onSelect }: ModelOptionProps) {
  return (
    <button
      onClick={() => onSelect(value)}
      className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-secondary"
    >
      {providerId ? <ProviderLogo provider={providerId} /> : null}
      <span className={`flex-1 ${providerId ? "ml-2" : ""}`}>{label}</span>
      {active ? <Check className="h-3.5 w-3.5 text-foreground" /> : null}
    </button>
  )
}

type ProviderLogoProps = Omit<ComponentPropsWithoutRef<"img">, "src" | "alt"> & {
  provider: string
}

function ProviderLogo({ provider, className, ...props }: ProviderLogoProps) {
  return (
    <img
      {...props}
      alt={`${provider} logo`}
      className={cn("size-3", className)}
      height={12}
      src={`/images/${provider}-logo.svg`}
      width={12}
    />
  )
}
