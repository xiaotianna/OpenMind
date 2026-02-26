interface DragHandleProps {
  className?: string
}

export function DragHandle({ className = "" }: DragHandleProps) {
  return (
    <div
      className={className}
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    />
  )
}
