import {
  Clock,
  FileText,
  Radio,
  Presentation,
  MoreHorizontal
} from 'lucide-react'
import { ChatInput } from '@/components/chat-input/chat-input'
import { DotPattern } from '@/components/dot-pattern'
import { DragHandle } from '@/components/drag-handle'
import { isMac } from '@/common'

const quickActions = [
  { icon: Clock, label: '\u5B9A\u65F6\u4EFB\u52A1', color: 'text-orange-400' },
  {
    icon: FileText,
    label: '\u6587\u4EF6\u6574\u7406',
    color: 'text-green-400'
  },
  { icon: Radio, label: '\u793E\u5A92\u53D1\u5E03', color: 'text-red-400' },
  { icon: Presentation, label: 'AI PPT', color: 'text-blue-400' },
  {
    icon: MoreHorizontal,
    label: '\u66F4\u591A',
    color: 'text-muted-foreground'
  }
]

export default function Chat() {
  return (
    <main className='relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-background'>
      {/* Drag handle area */}
      {isMac && (
        <DragHandle className='absolute left-0 top-0 h-8 w-full shrink-0' />
      )}

      {/* Dot pattern background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute left-1/2 top-[15%] h-[300px] w-[700px] -translate-x-1/2'>
          <DotPattern />
        </div>
      </div>

      {/* Content */}
      <div className='relative z-10 flex w-full max-w-[780px] flex-col items-center gap-8 px-6'>
        {/* Title */}
        <h1 className='text-balance text-center text-4xl tracking-tight text-foreground'>
          Let's build
        </h1>

        {/* Chat input */}
        <ChatInput placeholder={'输入你的想法...'} />

        {/* Quick actions */}
        <div className='flex flex-wrap items-center justify-center gap-3'>
          {quickActions.map((action) => (
            <button
              key={action.label}
              className='flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary'
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
