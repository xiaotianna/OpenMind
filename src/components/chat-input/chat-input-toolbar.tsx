import type { ReactNode } from "react"
import { useState } from "react"
import {
  ArrowUp,
  BookOpenText,
  Check,
  ChevronDown,
  ChevronRight,
  Figma,
  Folder,
  Github,
  Image,
  Plus,
  Upload,
  Workflow,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"

type ChatInputToolbarProps = {
  canSubmit: boolean
}

export function ChatInputToolbar({ canSubmit }: ChatInputToolbarProps) {
  const modelOptions = [
    "GPT-5.3-Codex",
    "GPT-5.2-Codex",
    "GPT-5.1-Codex-Max",
    "GPT-5.2",
    "GPT-5.1-Codex-Mini",
  ]
  const projectOptions = [
    "AI Agent Desktop",
    "Project A",
    "Project B",
    "Project C",
  ]
  const [selectedModel, setSelectedModel] = useState(modelOptions[0])
  const [selectedProject, setSelectedProject] = useState(projectOptions[0])
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false)
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false)

  const handleSelectModel = (model: string) => {
    setSelectedModel(model)
    setIsModelMenuOpen(false)
  }

  const handleSelectProject = (project: string) => {
    setSelectedProject(project)
    setIsProjectMenuOpen(false)
  }

  return (
    <div className="flex items-center justify-between pt-1">
      <div className="flex items-center gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-secondary">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="bottom"
            sideOffset={8}
            className="w-[260px] rounded-2xl border-border/70 bg-card p-0"
          >
            <div className="space-y-0.5 p-2">
              <MenuRow icon={<Github className="h-4 w-4" />} label="Import from GitHub" />
              <MenuRow
                icon={<Figma className="h-4 w-4" />}
                label="Create from Figma"
                right={
                  <span className="rounded-full bg-teal-500/20 px-2.5 py-0.5 text-[11px] text-teal-300">
                    Premium
                  </span>
                }
              />
              <MenuRow icon={<Upload className="h-4 w-4" />} label="Upload from computer" />
            </div>
            <DropdownMenuSeparator className="mx-0" />
            <div className="space-y-0.5 p-2">
              <MenuRow
                icon={<Image className="h-4 w-4" />}
                label="Generate Images"
                right={<Switch defaultChecked aria-label="Generate Images" />}
              />
              <MenuRow
                icon={<Workflow className="h-4 w-4" />}
                label="Design System"
                right={<ChevronRight className="h-4 w-4 text-muted-foreground" />}
              />
              <MenuRow
                icon={<Folder className="h-4 w-4" />}
                label="Folder"
                right={<ChevronRight className="h-4 w-4 text-muted-foreground" />}
              />
              <MenuRow
                icon={<BookOpenText className="h-4 w-4" />}
                label="Instructions"
                right={<ChevronRight className="h-4 w-4 text-muted-foreground" />}
              />
              <MenuRow
                icon={<Workflow className="h-4 w-4" />}
                label="MCPs"
                right={<ChevronRight className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu open={isModelMenuOpen} onOpenChange={setIsModelMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] text-foreground transition-colors hover:bg-secondary">
              <span>{selectedModel}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="bottom"
            sideOffset={8}
            className="w-[180px] rounded-xl border-border/70 bg-card p-1.5"
          >
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground">选择模型</div>
            <div className="space-y-0.5">
              {modelOptions.map((model) => (
                <ModelItem
                  key={model}
                  label={model}
                  active={selectedModel === model}
                  onSelect={handleSelectModel}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-1.5">
        <DropdownMenu open={isProjectMenuOpen} onOpenChange={setIsProjectMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 items-center gap-1.5 rounded-full px-3.5 text-sm text-foreground transition-colors hover:bg-secondary">
              <span>{selectedProject}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="bottom"
            sideOffset={8}
            className="w-[180px] rounded-xl border-border/70 bg-card p-1.5"
          >
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground">选择项目</div>
            <div className="space-y-0.5">
              {projectOptions.map((project) => (
                <ModelItem
                  key={project}
                  label={project}
                  active={selectedProject === project}
                  onSelect={handleSelectProject}
                />
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-sm transition-opacity ${
            canSubmit ? "opacity-100" : "opacity-80"
          }`}
          aria-label="Send message"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

type MenuRowProps = {
  icon: ReactNode
  label: string
  right?: ReactNode
}

function MenuRow({ icon, label, right }: MenuRowProps) {
  return (
    <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-secondary/70">
      <span className="text-muted-foreground">{icon}</span>
      <span className="flex-1">{label}</span>
      {right}
    </button>
  )
}

type ModelItemProps = {
  label: string
  active: boolean
  onSelect: (label: string) => void
}

function ModelItem({ label, active, onSelect }: ModelItemProps) {
  return (
    <button
      onClick={() => onSelect(label)}
      className={`flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-secondary`}
    >
      <span className="flex-1">{label}</span>
      {active && <Check className="h-3.5 w-3.5 text-foreground" />}
    </button>
  )
}
