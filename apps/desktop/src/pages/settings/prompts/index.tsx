import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Download, Plus, Star, Trash2 } from 'lucide-react'
import { ConfigTitle } from '@/components/config/config-title'
import { SettingsCard } from '@/components/config/settings-card'
import { SettingsHeader } from '@/components/config/settings-header'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

interface Prompt {
  id: string
  name: string
  content: string
  isBuiltIn: boolean
}

const initialPrompts: Prompt[] = [
  {
    id: '1',
    name: 'Proma 内置提示词',
    content: `你首先是某个大模型，这我们当然知道，你现在的任务是作为 Proma AI 助手，来帮助我解决实际问题。 

你需要在以下一些方面上保持关注：

**1.直接解决问题，但先确保信息完整**

- 优先调用记忆工具（如果有），了解我的偏好或背景信息
- 优先给出简洁的解决方案
- 如果方案依赖前置信息或关键决策，先向我提问
- 如果我的需求可能忽略了重要的知识点（如安全性、性能、最佳实践），主动提醒我，但保持简洁

**2.渐进式引导，降低认知压力**

- 多步骤复杂教程：先给出结构和选项，让我选择后再展开
- 多种方法：先对比各方案的适用场景和权衡，让我决定后再详细说明
- 复杂概念：先给核心要点，我需要时再深入

**3.根据上下文推测我的水平**

- 从我的提问方式、使用的术语判断我的能力水平
- 调整解释的深度：新手多解释概念，熟手直接给方案
- 不确定时可以直接问我："你对 [概念] 熟悉吗？"

**4.遇到不确定时主动询问，避免主观决断**

- 技术选型、架构决策、配置参数等关键选择，先问我的场景和需求
- 如果有多个合理方案，列出对比让我选择，而不是替我决定
- 避免使用过多默认值，除非是行业标准

**5.识别学习场景，提供适当支持**

- 当我在学习新概念时，避免引入超出当前范围认知的复杂内容
- 多鼓励，少批评
- 可以主动提示："这个涉及到 [高级概念]，我们可以先跳过，等基础掌握后再回来"

**6.保持耐心、人性化、简洁**

- 保持对我的关心和真实富有人性的理解
- 用自然的语言，不要过于正式或机械
- 直接回答问题，不要过度铺垫
- 承认不确定性，而不是强行给出模糊答案

**7.主动识别并提示知识内核**

- 当你发现有多种概念混杂或者逻辑混乱时，请主动点明并纠正
- 当我的问题可能触及某个重要概念但我可能并没能意识到时，主动提醒，帮我完成这种关联
- 格式："💡 你可能还需要考虑 [概念]，因为 [原因]"
- 如果忽略这些知识点可能导致问题，明确指出风险
- 但注意：只提示真正重要的，不要过度提醒造成信息过载

**8.关于工具**

- 我希望你能更主动积极地使用工具来获取信息和解决问题，而不是仅仅依赖于你内置的知识
- 当你觉得需要使用工具时，不要犹豫，直接使用
- 如果你不确定是否需要使用工具，可以先问我："我觉得这个问题可能需要使用 [工具] 来更好地解决，你觉得呢？"
- 尤其需要注意的是主动使用记忆工具来获取我的偏好和背景信息，这样可以更好地定制化你的回答
- 当我的问题比较复杂，需要多步骤执行、或者需要额外的工具可以做的更好更自动更快时，你要主动调用 Agent 推荐模式工具`,
    isBuiltIn: true
  }
]

export default function SettingsPromptsPage() {
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts)
  const [selectedPromptId, setSelectedPromptId] = useState<string>('1')
  const [appendDateTime, setAppendDateTime] = useState(false)

  const selectedPrompt = prompts.find((p) => p.id === selectedPromptId)

  const handleCreateNew = () => {
    const newPrompt: Prompt = {
      id: Date.now().toString(),
      name: '新建提示词',
      content: '',
      isBuiltIn: false
    }
    setPrompts([...prompts, newPrompt])
    setSelectedPromptId(newPrompt.id)
  }

  const handleNameChange = (name: string) => {
    if (!selectedPrompt || selectedPrompt.isBuiltIn) return
    setPrompts(
      prompts.map((p) => (p.id === selectedPromptId ? { ...p, name } : p))
    )
  }

  const handleContentChange = (content: string) => {
    if (!selectedPrompt || selectedPrompt.isBuiltIn) return
    setPrompts(
      prompts.map((p) => (p.id === selectedPromptId ? { ...p, content } : p))
    )
  }

  const handleDownload = () => {
    if (!selectedPrompt) return
    const blob = new Blob([selectedPrompt.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedPrompt.name}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleDelete = (id: string) => {
    const newPrompts = prompts.filter((p) => p.id !== id)
    setPrompts(newPrompts)
    if (selectedPromptId === id) {
      setSelectedPromptId(newPrompts[0]?.id || '')
    }
  }

  return (
    <>
      <section>
        <SettingsHeader
          title='系统提示词'
          description='管理 Chat 模式的系统提示词'
          actions={
            <>
              <Button variant='outline' size='sm' onClick={handleDownload}>
                <Download className='h-3.5 w-3.5 mr-1.5' />
                下载
              </Button>
              <Button variant='default' size='sm' onClick={handleCreateNew}>
                <Plus className='h-3.5 w-3.5 mr-1.5' />
                新建
              </Button>
            </>
          }
        />
      </section>

      <div className='space-y-6'>
        <section>
          <SettingsCard>
            <div className='px-3.5 py-2 border-b border-border/60'>
              <p className='text-[13px] font-medium text-foreground'>
                提示词列表
              </p>
            </div>
            {prompts.map((prompt, index) => (
              <div
                key={prompt.id}
                className={`px-3.5 py-2.5 cursor-pointer flex items-center justify-between gap-2 transition-colors hover:bg-muted/50 group relative ${
                  selectedPromptId === prompt.id ? 'bg-secondary' : ''
                } ${index !== prompts.length - 1 ? 'border-b border-border/60' : ''}`}
                onClick={() => setSelectedPromptId(prompt.id)}
              >
                <div className='flex items-center gap-2'>
                  <span className='text-[13px] text-foreground'>
                    {prompt.name}
                  </span>
                  {prompt.isBuiltIn && (
                    <>
                      <span className='text-[12px] text-muted-foreground'>
                        (内置)
                      </span>
                      <Star className='h-3.5 w-3.5 text-yellow-500 fill-yellow-500' />
                    </>
                  )}
                </div>
                {!prompt.isBuiltIn && (
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-1/2 -translate-y-1/2'>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          className='h-7 w-7 hover:bg-destructive/20 text-muted-foreground hover:text-destructive'
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除</AlertDialogTitle>
                          <AlertDialogDescription>
                            确定要删除提示词 "{prompt.name}"
                            吗？此操作无法撤销。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(prompt.id)}
                            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                          >
                            删除
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            ))}
          </SettingsCard>
        </section>

        <section>
          <ConfigTitle>提示词内容</ConfigTitle>
          <SettingsCard>
            <div className='px-3.5 py-3 space-y-3'>
              <div className='grid grid-cols-1 gap-1'>
                <label className='text-[13px] font-medium text-foreground'>
                  名称
                </label>
                <Input
                  value={selectedPrompt?.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  disabled={selectedPrompt?.isBuiltIn}
                  className='h-8 text-[13px]'
                  placeholder='输入提示词名称'
                />
              </div>

              <div className='grid grid-cols-1 gap-1'>
                <label className='text-[13px] font-medium text-foreground'>
                  内容
                </label>
                <Textarea
                  value={selectedPrompt?.content || ''}
                  onChange={(e) => handleContentChange(e.target.value)}
                  disabled={selectedPrompt?.isBuiltIn}
                  className='min-h-[200px] text-[13px] resize-y'
                  placeholder='输入提示词内容'
                />
              </div>
            </div>
          </SettingsCard>
        </section>

        <section>
          <ConfigTitle>增强选项</ConfigTitle>
          <SettingsCard>
            <div className='px-3.5 py-3 flex items-center justify-between'>
              <div className='flex flex-col gap-0.5'>
                <p className='text-[13px] font-medium text-foreground'>
                  追加日期时间和用户名
                </p>
                <p className='text-[12px] text-muted-foreground'>
                  在提示词末尾自动追加当前日期时间和用户名
                </p>
              </div>
              <Switch
                checked={appendDateTime}
                onCheckedChange={setAppendDateTime}
              />
            </div>
          </SettingsCard>
        </section>
      </div>
    </>
  )
}
