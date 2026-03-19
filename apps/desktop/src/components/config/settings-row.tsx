import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SettingsRowProps {
  title: string | ReactNode
  description: string
  control: ReactNode
  noBorder?: boolean
  titleClassName?: string
  descriptionClassName?: string
}

export function SettingsRow({
  title,
  description,
  control,
  noBorder,
  titleClassName,
  descriptionClassName,
}: SettingsRowProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-1 px-3.5 py-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-3',
        !noBorder && 'border-b border-border/60',
      )}
    >
      <div className="min-w-0 flex flex-col gap-1">
        <p
          className={cn(
            'text-sm font-medium leading-5 text-foreground',
            titleClassName,
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            'mt-0.5 text-[13px] leading-[1.1rem] text-muted-foreground',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      </div>
      <div className="w-full md:w-auto md:justify-self-end">{control}</div>
    </div>
  )
}
