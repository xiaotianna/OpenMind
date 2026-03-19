import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function SubConfigTitle({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2 className={cn('text-base font-semibold text-foreground', className)}>
      {children}
    </h2>
  )
}
