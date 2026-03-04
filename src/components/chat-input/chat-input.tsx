import { useState } from "react"
import { ChatInputEditor } from "@/components/chat-input/chat-input-editor"
import { ChatInputToolbar } from "@/components/chat-input/chat-input-toolbar"

type ChatInputProps = {
  placeholder: string
}

export function ChatInput({ placeholder }: ChatInputProps) {
  const [inputValue, setInputValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      className={`w-full rounded-[26px] bg-card pt-4 px-3 pb-2 transition-all border border-border ${
        isFocused ? "shadow-md shadow-black/10" : ""
      }`}
    >
      <ChatInputEditor
        value={inputValue}
        placeholder={placeholder}
        onChange={setInputValue}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <ChatInputToolbar canSubmit={Boolean(inputValue.trim())} />
    </div>
  )
}
