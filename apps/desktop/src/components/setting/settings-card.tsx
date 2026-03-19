import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'

export function SettingsCard({ children }: { children: ReactNode }) {
  return (
    <Card className="overflow-hidden gap-0 rounded-xl border-border/60 bg-card/40 py-0 shadow-none">
      {children}
    </Card>
  )
}
