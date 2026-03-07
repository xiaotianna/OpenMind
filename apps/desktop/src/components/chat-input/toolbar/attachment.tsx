import type { ReactNode } from "react"
import {
  BookOpenText,
  ChevronRight,
  Figma,
  Folder,
  Github,
  Image,
  Plus,
  Shapes,
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

export function Attachment() {
  return (
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
            icon={<Shapes className="h-4 w-4" />}
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
