import type { ReactNode } from 'react'
import { ConfigTitle } from './config-title'

interface SettingsHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
}

export function SettingsHeader({
  title,
  description,
  actions,
}: SettingsHeaderProps) {
  return (
    <div className='mb-6 flex items-start justify-between gap-10'>
      <div>
        <ConfigTitle>{title}</ConfigTitle>
        {description && (
          <p className='text-sm text-muted-foreground -mt-2'>{description}</p>
        )}
      </div>
      {actions && (
        <div className='flex items-center gap-2 shrink-0 mt-6'>
          {actions}
        </div>
      )}
    </div>
  )
}