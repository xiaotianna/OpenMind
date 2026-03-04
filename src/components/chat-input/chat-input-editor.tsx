import { useLayoutEffect, useRef } from "react"

type ChatInputEditorProps = {
  value: string
  placeholder: string
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export function ChatInputEditor({
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
}: ChatInputEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return

    el.style.height = "auto"
    const nextHeight = Math.min(el.scrollHeight, 220)
    el.style.height = `${nextHeight}px`
    el.style.overflowY = el.scrollHeight > 220 ? "auto" : "hidden"
  }, [value])

  return (
    <div className="relative px-1">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="min-h-[60px] w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        rows={3}
      />
    </div>
  )
}
