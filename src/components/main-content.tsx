import { useState } from "react"
import {
  Paperclip,
  SlidersHorizontal,
  FolderOpen,
  ChevronDown,
  Zap,
  Settings,
  ArrowUp,
  Clock,
  FileText,
  Radio,
  Presentation,
  MoreHorizontal,
} from "lucide-react"
import { DotPattern } from "@/components/dot-pattern"
import { DragHandle } from "@/components/drag-handle"

const quickActions = [
  { icon: Clock, label: "\u5B9A\u65F6\u4EFB\u52A1", color: "text-orange-400" },
  { icon: FileText, label: "\u6587\u4EF6\u6574\u7406", color: "text-green-400" },
  { icon: Radio, label: "\u793E\u5A92\u53D1\u5E03", color: "text-red-400" },
  { icon: Presentation, label: "AI PPT", color: "text-blue-400" },
  { icon: MoreHorizontal, label: "\u66F4\u591A", color: "text-muted-foreground" },
]

export function MainContent() {
  const [inputValue, setInputValue] = useState("")

  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-background">
      {/* Drag handle area */}
      <DragHandle className="absolute left-0 top-0 h-8 w-full shrink-0" />

      {/* Dot pattern background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[15%] h-[300px] w-[700px] -translate-x-1/2">
          <DotPattern />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-[780px] flex-col items-center gap-8 px-6">
        {/* Title */}
        <h1 className="text-balance text-center text-4xl font-semibold italic tracking-tight text-foreground">
          MiniMax Agent, {"让你的工作更轻松"}
        </h1>

        {/* Chat input */}
        <div className="w-full rounded-2xl border border-border bg-card p-4 shadow-lg shadow-black/20">
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={"下载文件夹：帮我按照文件类型整理下载文件夹里的内容"}
              className="min-h-[80px] w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              rows={3}
            />
            {!inputValue && (
              <span className="pointer-events-none absolute right-0 top-1 rounded border border-border px-2 py-0.5 text-xs text-muted-foreground">
                tab
              </span>
            )}
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <button className="rounded-lg p-2 transition-colors hover:bg-secondary">
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="rounded-lg p-2 transition-colors hover:bg-secondary">
                <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary">
                <FolderOpen className="h-4 w-4" />
                <span>projects</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">MiniMax-M2.5</span>
              <button className="rounded-lg p-2 transition-colors hover:bg-secondary">
                <Zap className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="rounded-lg p-2 transition-colors hover:bg-secondary">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </button>
              <button
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  inputValue.trim()
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
            >
              <action.icon className={`h-4 w-4 ${action.color}`} />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
