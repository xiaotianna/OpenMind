import { useState } from 'react'
import { Copy, ExternalLink, FolderOpen, Trash2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { SettingsCard } from '@/components/setting/settings-card'
import { SettingsHeader } from '@/components/setting/settings-header'
import { SettingsRow } from '@/components/setting/settings-row'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

interface Skill {
  id: string
  name: string
  description: string
  enabled: boolean
}

const initialSkills: Skill[] = [
  {
    id: 'brainstorming',
    name: 'brainstorming',
    description:
      'You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior.You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior.',
    enabled: true
  },
  {
    id: 'docx',
    name: 'docx',
    description:
      'Use this skill whenever the user wants to create, read, edit, or manipulate Word documents (.docx files).',
    enabled: true
  },
  {
    id: 'executing-plans',
    name: 'executing-plans',
    description:
      'Use when you have a written implementation plan to execute in a separate session with review checkpoints',
    enabled: true
  },
  {
    id: 'find-skills',
    name: 'find-skills',
    description:
      'Helps users discover and install agent skills when they ask questions like "how do I do X", "find a skill for X"',
    enabled: true
  },
  {
    id: 'pdf',
    name: 'pdf',
    description:
      'Use this skill whenever the user wants to do anything with PDF files.',
    enabled: true
  },
  {
    id: 'pptx',
    name: 'pptx',
    description:
      'Use this skill any time a .pptx file is involved in any way — as input, output, or both.',
    enabled: true
  },
  {
    id: 'skill-creator',
    name: 'skill-creator',
    description:
      'Guide for creating effective skills. This skill should be used when users want to create a new skill.',
    enabled: true
  },
  {
    id: 'tool-builder',
    name: 'tool-builder',
    description: '交互式创建和管理 Chat 模式的自定义 HTTP 工具。',
    enabled: true
  },
  {
    id: 'writing-plans',
    name: 'writing-plans',
    description:
      'Use when you have a spec or requirements for a multi-step task, before touching code',
    enabled: true
  },
  {
    id: 'xlsx',
    name: 'xlsx',
    description:
      'Use this skill any time a spreadsheet file is the primary input or output.',
    enabled: false
  }
]

export default function SettingsSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const toggleSkill = (id: string) => {
    setSkills((prev) =>
      prev.map((skill) =>
        skill.id === id ? { ...skill, enabled: !skill.enabled } : skill
      )
    )
    // 更新 Dialog 中的 skill 数据
    if (selectedSkill?.id === id) {
      setSelectedSkill((prev) =>
        prev ? { ...prev, enabled: !prev.enabled } : null
      )
    }
  }

  const handleOpenDialog = (skill: Skill) => {
    setSelectedSkill(skill)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setSelectedSkill(null)
  }

  const handleUninstall = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id))
  }

  return (
    <>
      <section>
        <SettingsHeader
          title='Skills'
          description='将 SKILL.md 放入工作区 skills/ 目录即可被 Agent 自动发现'
          actions={
            <Button
              variant='secondary'
              size='sm'
            >
              <FolderOpen className='h-4 w-4 mr-1.5' />
              打开文件夹
            </Button>
          }
        />
      </section>

      <section>
        <SettingsCard>
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className='group hover:bg-secondary/50 transition-colors cursor-pointer'
              onClick={() => handleOpenDialog(skill)}
            >
              <SettingsRow
                title={skill.name}
                description={skill.description}
                descriptionClassName='line-clamp-2'
                noBorder={index === skills.length - 1}
                icon={
                  <svg
                    className='w-5 h-5 text-amber-500'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z' />
                  </svg>
                }
                control={
                  <div
                    className='flex items-center gap-2'
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7 opacity-0 group-hover:opacity-100'
                    >
                      <FolderOpen className='h-4 w-4 text-muted-foreground' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7 opacity-0 group-hover:opacity-100 hover:bg-destructive/20 text-muted-foreground hover:text-destructive'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                    <Switch
                      checked={skill.enabled}
                      onCheckedChange={() => toggleSkill(skill.id)}
                    />
                  </div>
                }
              />
            </div>
          ))}
        </SettingsCard>
      </section>

      <SkillDetailDialog
        open={dialogOpen}
        skill={selectedSkill}
        onClose={handleCloseDialog}
        onToggle={toggleSkill}
        onUninstall={handleUninstall}
      />
    </>
  )
}

interface Skill {
  id: string
  name: string
  description: string
  enabled: boolean
}

interface SkillDetailDialogProps {
  open: boolean
  skill: Skill | null
  onClose: () => void
  onToggle: (id: string) => void
  onUninstall: (id: string) => void
}

export function SkillDetailDialog({
  open,
  skill,
  onClose,
  onToggle,
  onUninstall
}: SkillDetailDialogProps) {
  const [copied, setCopied] = useState(false)

  const examplePrompt =
    'Implement this Figma design in this codebase, matching layout, states, and responsive behavior.'

  const handleCopy = () => {
    navigator.clipboard.writeText(examplePrompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!skill) return null

  return (
    <Dialog
      open={open}
      onOpenChange={onClose}
    >
      <DialogContent
        showCloseButton={true}
        className='w-[580px] h-[700px]'
      >
        <DialogHeader>
          <DialogTitle>
            <div className='w-12 h-12 p-2 rounded-lg bg-muted flex items-center justify-center overflow-hidden'>
              <img
                src={'/images/minimax-logo.svg'}
                alt={skill.name}
                className='w-8 h-8 object-contain'
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className='bg-background w-full h-full overflow-hidden flex flex-col'>
          {/* Header */}
          <div className='mb-6'>
            <div className='flex items-center justify-between mb-2'>
              <h1 className='text-lg font-bold text-foreground flex items-center gap-2'>
                {skill.name}
                {!skill.enabled && (
                  <span className='text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground'>
                    已禁用
                  </span>
                )}
              </h1>
              <Button
                variant='ghost'
                size='sm'
                className='flex items-center gap-1.5 text-xs focus-visible:ring-[none] text-muted-foreground hover:text-foreground transition-colors'
              >
                打开文件夹
                <ExternalLink className='h-3 w-3' />
              </Button>
            </div>
            <p className='mt-1 text-sm text-muted-foreground'>
              {skill.description}
            </p>
          </div>

          {/* Example Prompt */}
          <div className='mb-6 rounded-lg bg-muted/50 p-4'>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-xs text-muted-foreground'>示例提示</span>
              <button
                onClick={handleCopy}
                className='p-1.5 rounded hover:bg-muted transition-colors'
                title='复制'
              >
                <Copy className='h-4 w-4 text-muted-foreground' />
              </button>
            </div>
            <p className='font-mono text-xs text-foreground leading-relaxed'>
              {examplePrompt}
            </p>
            {copied && (
              <span className='text-xs text-green-600 mt-2 block'>已复制!</span>
            )}
          </div>

          {/* Main Content Card */}
          <div className='rounded-lg border border-border bg-card p-6 overflow-y-auto flex-1'>
            {/* Overview */}
            <section className='mb-8'>
              <h2 className='text-base font-semibold text-foreground mb-3'>
                Overview
              </h2>
              <p className='text-sm text-muted-foreground leading-relaxed'>
                This skill provides a structured workflow for translating Figma
                designs into production-ready code with pixel-perfect accuracy.
                It ensures consistent integration with the Figma MCP server,
                proper use of design tokens, and 1:1 visual parity with designs.
              </p>
            </section>

            {/* Prerequisites */}
            <section className='mb-8'>
              <h2 className='text-base font-semibold text-foreground mb-3'>
                Prerequisites
              </h2>
              <ul className='space-y-3 text-sm text-muted-foreground'>
                <li className='flex items-start gap-2'>
                  <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0' />
                  <span>Figma MCP server must be connected and accessible</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0' />
                  <div>
                    <span>User must provide a Figma URL in the format:</span>
                    <code className='mt-2 block rounded bg-muted px-3 py-2 font-mono text-xs text-foreground'>
                      https://figma.com/design/:fileKey/:fileName?node-id=1-2
                    </code>
                    <ul className='mt-2 ml-4 space-y-1'>
                      <li className='flex items-start gap-2'>
                        <span className='mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/60 shrink-0' />
                        <span>
                          <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-xs'>
                            :fileKey
                          </code>{' '}
                          is the file key
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <span className='mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/60 shrink-0' />
                        <span>
                          <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-xs'>
                            1-2
                          </code>{' '}
                          is the node ID (the specific component or frame to
                          implement)
                        </span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0' />
                  <span>
                    <strong className='text-foreground'>OR</strong> when using{' '}
                    <code className='rounded bg-muted px-1.5 py-0.5 font-mono text-xs'>
                      figma-desktop
                    </code>{' '}
                    MCP: User can select a node directly in the Figma desktop
                    app (no URL required)
                  </span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0' />
                  <span>
                    Project should have an established design system or
                    component library (preferred)
                  </span>
                </li>
              </ul>
            </section>

            {/* Required Workflow */}
            <section>
              <h2 className='text-base font-semibold text-foreground mb-3'>
                Required Workflow
              </h2>
              <p className='text-sm font-medium text-foreground mb-4'>
                Follow these steps in order. Do not skip steps.
              </p>
              <div className='rounded-lg bg-muted/30 p-4'>
                <h3 className='text-sm font-semibold text-foreground'>
                  Step 0: Set up Figma MCP (if not already configured)
                </h3>
              </div>
            </section>
          </div>
        </div>
        <DialogFooter className='flex-row justify-end sm:justify-end'>
          <Button
            variant='destructive'
            onClick={() => {
              if (skill) {
                onUninstall(skill.id)
                onClose()
              }
            }}
          >
            卸载
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              if (skill) {
                onToggle(skill.id)
              }
            }}
          >
            {skill?.enabled ? '禁用' : '启用'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
