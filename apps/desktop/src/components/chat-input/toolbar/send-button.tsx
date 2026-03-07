import { ArrowUp } from "lucide-react"

type SendButtonProps = {
  canSubmit: boolean
}

export function SendButton({ canSubmit }: SendButtonProps) {
  return (
    <button
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition-opacity ${
        canSubmit ? "opacity-100" : "opacity-80"
      }`}
      aria-label="Send message"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
