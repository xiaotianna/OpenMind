import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SettingsRowProps {
  title: string | ReactNode
  description?: string
  control: ReactNode
  noBorder?: boolean
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  icon?: ReactNode
}

export function SettingsRow({
  title,
  description,
  control,
  noBorder,
  className,
  titleClassName,
  descriptionClassName,
  icon,
}: SettingsRowProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-1 px-3.5 py-3 min-h-[56px] md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-3 group',
        !noBorder && 'border-b border-border/60',
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
            {icon}
          </div>
        )}
        <div className="min-w-0 flex flex-col gap-1 flex-1">
          <p
            className={cn(
              'text-sm font-medium leading-5 text-foreground',
              titleClassName,
            )}
          >
            {title}
          </p>
          {description && (
            <p
              className={cn(
                'mt-0.5 text-[13px] leading-[1.1rem] text-muted-foreground',
                descriptionClassName,
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="w-full md:w-auto md:justify-self-end">{control}</div>
    </div>
  )
}
