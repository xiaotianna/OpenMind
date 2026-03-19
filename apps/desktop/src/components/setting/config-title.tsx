import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function ConfigTitle({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <h2 className={cn('mt-6 mb-3 text-xl font-semibold tracking-tight', className)}>
      {children}
    </h2>
  )
}
