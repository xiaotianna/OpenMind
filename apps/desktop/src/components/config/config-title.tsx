import type { ReactNode } from 'react'

export function ConfigTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-6 mb-3 text-xl font-semibold tracking-tight">
      {children}
    </h2>
  )
}
