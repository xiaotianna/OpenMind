import { Check, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ProjectSelectorProps = {
  projectOptions: string[]
  selectedProject: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSelectProject: (project: string) => void
}

export function ProjectSelector({
  projectOptions,
  selectedProject,
  isOpen,
  onOpenChange,
  onSelectProject,
}: ProjectSelectorProps) {
  const handleSelectProject = (project: string) => {
    onSelectProject(project)
    onOpenChange(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
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
            <ProjectOption
              key={project}
              label={project}
              value={project}
              active={selectedProject === project}
              onSelect={handleSelectProject}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type ProjectOptionProps = {
  label: string
  value: string
  active: boolean
  onSelect: (value: string) => void
}

function ProjectOption({ label, value, active, onSelect }: ProjectOptionProps) {
  return (
    <button
      onClick={() => onSelect(value)}
      className="flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-sm text-foreground transition-colors hover:bg-secondary"
    >
      <span className="flex-1">{label}</span>
      {active ? <Check className="h-3.5 w-3.5 text-foreground" /> : null}
    </button>
  )
}
