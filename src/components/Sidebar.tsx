import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  PenSquare,
  Clock,
  Puzzle,
  FolderOpen,
  ChevronDown,
  ChevronRight,
  Settings,
  ListFilter,
  FolderInput,
  Moon,
  Sun,
} from "lucide-react"
import { DragHandle } from "@/components/drag-handle"
import { useTheme } from "@/hooks/use-theme"
import { isMac } from "@/common"

interface Thread {
  id: string
  title: string
  time: string
}

interface ThreadGroup {
  id: string
  name: string
  threads: Thread[]
}

const threadGroups: ThreadGroup[] = [
  {
    id: "1",
    name: "PythonProject",
    threads: [
      { id: "1-1", title: "summarization_middleware_an...", time: "1w" },
      { id: "1-2", title: "Explain SummarizationMiddlew...", time: "1w" },
    ],
  },
  {
    id: "2",
    name: "\u9762\u8BD5\u6587\u6863_github_\u526F\u672C2",
    threads: [
      { id: "2-1", title: "\u5B8C\u5584\u9762\u8BD5\u98983-20\u7B54\u6848\u4F5C\u7B54\u6307\u5BFC\u8986...", time: "1w" },
    ],
  },
]

export function Sidebar() {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    "1": true,
    "2": true,
  })
  const { theme, toggleTheme } = useTheme()

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <aside className="sidebar-glass flex h-full w-[280px] flex-col border-r border-border/60 text-sidebar-foreground backdrop-blur-2xl backdrop-saturate-150">
      {/* Drag handle area */}
      {isMac && <DragHandle className="h-8 w-full shrink-0" />}

      {/* Top actions */}
      <div className="flex flex-col gap-1 pb-2 px-2 pt-2">
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary">
          <PenSquare className="h-4 w-4" />
          <span>New thread</span>
        </button>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary">
          <Clock className="h-4 w-4" />
          <span>Automations</span>
        </button>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary">
          <Puzzle className="h-4 w-4" />
          <span>Skills</span>
        </button>
      </div>

      {/* Threads header */}
      <div className="flex items-center justify-between px-4 pb-1 pt-4">
        <span className="text-xs font-medium text-muted-foreground">Threads</span>
        <div className="flex items-center gap-1">
          <button className="rounded p-1 transition-colors hover:bg-secondary">
            <FolderInput className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
          <button className="rounded p-1 transition-colors hover:bg-secondary">
            <ListFilter className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Thread groups */}
      <div className="flex-1 overflow-y-auto px-2">
        {threadGroups.map((group) => (
          <div key={group.id} className="mb-1">
            <button
              onClick={() => toggleGroup(group.id)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-secondary"
            >
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1 truncate text-left text-sm">{group.name}</span>
              {expandedGroups[group.id] ? (
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>
            {expandedGroups[group.id] && (
              <div className="ml-4">
                {group.threads.map((thread) => (
                  <button
                    key={thread.id}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-secondary"
                  >
                    <span className="truncate text-muted-foreground">{thread.title}</span>
                    <span className="ml-2 shrink-0 text-xs text-muted-foreground">{thread.time}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="border-t border-border px-3 py-2">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </motion.div>
          </AnimatePresence>
          <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-secondary">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  )
}
