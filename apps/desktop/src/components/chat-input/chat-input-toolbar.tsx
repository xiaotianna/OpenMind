import { useState } from "react"
import { models } from "@/config/model"
import { Attachment } from "./toolbar/attachment"
import { ModelSelector } from "./toolbar/model-selector"
import { ProjectSelector } from "./toolbar/project-selector"
import { SendButton } from "./toolbar/send-button"

type ChatInputToolbarProps = {
  canSubmit: boolean
}

export function ChatInputToolbar({ canSubmit }: ChatInputToolbarProps) {
  const projectOptions = [
    "AI Agent Desktop",
    "Project A",
    "Project B",
    "Project C",
  ]
  const [selectedModelId, setSelectedModelId] = useState(models[0]?.id ?? "")
  const [selectedProject, setSelectedProject] = useState(projectOptions[0])
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false)
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false)
  const selectedModel = models.find((model) => model.id === selectedModelId)

  const handleSelectModel = (modelId: string) => {
    setSelectedModelId(modelId)
  }

  const handleSelectProject = (project: string) => {
    setSelectedProject(project)
  }

  return (
    <div className="flex items-center justify-between pt-1">
      {/* 左侧 */}
      <div className="flex items-center gap-0.5">
        {/* 附件 */}
        <Attachment />
        {/* 模型选择 */}
        <ModelSelector
          isOpen={isModelMenuOpen}
          onOpenChange={setIsModelMenuOpen}
          onSelectModel={handleSelectModel}
          selectedModelId={selectedModelId}
          selectedModelName={selectedModel?.name}
          selectedProviderId={selectedModel?.providerId}
        />
      </div>
      {/* 右侧 */}
      <div className="flex items-center gap-1.5">
        {/* 项目选择 */}
        <ProjectSelector
          isOpen={isProjectMenuOpen}
          onOpenChange={setIsProjectMenuOpen}
          onSelectProject={handleSelectProject}
          projectOptions={projectOptions}
          selectedProject={selectedProject}
        />
        {/* 发送按钮 */}
        <SendButton canSubmit={canSubmit} />
      </div>
    </div>
  )
}
