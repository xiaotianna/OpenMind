import * as Diff from 'diff'
import hljs from 'highlight.js'
import { cn } from '@/lib/utils'
import 'highlight.js/styles/github-dark.min.css'

interface CodeDiffViewerProps {
  oldCode: string
  newCode: string
  /** 预览模式: "unified" 上下预览 | "split" 左右预览 */
  mode?: 'unified' | 'split'
  /** 文件名（可选） */
  fileName?: string
  /** 代码语言（可选） */
  language?: string
  className?: string
}

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged'
  content: string
  highlightedContent?: string
  oldLineNumber?: number
  newLineNumber?: number
}

// 对单行代码进行语法高亮
function highlightLine(code: string, language?: string): string {
  if (language && hljs.getLanguage(language)) {
    try {
      return hljs.highlight(code, { language }).value
    } catch {
      // Fallback to auto-detection
    }
  }
  try {
    return hljs.highlightAuto(code).value
  } catch {
    return code
  }
}

function computeDiffLines(oldCode: string, newCode: string): DiffLine[] {
  const changes = Diff.diffLines(oldCode, newCode)
  const lines: DiffLine[] = []
  let oldLineNum = 1
  let newLineNum = 1

  changes.forEach((change) => {
    const changeLines = change.value.split('\n')
    // 移除最后一个空行（如果存在）
    if (changeLines[changeLines.length - 1] === '') {
      changeLines.pop()
    }

    changeLines.forEach((line) => {
      if (change.added) {
        lines.push({
          type: 'added',
          content: line,
          newLineNumber: newLineNum++
        })
      } else if (change.removed) {
        lines.push({
          type: 'removed',
          content: line,
          oldLineNumber: oldLineNum++
        })
      } else {
        lines.push({
          type: 'unchanged',
          content: line,
          oldLineNumber: oldLineNum++,
          newLineNumber: newLineNum++
        })
      }
    })
  })

  return lines
}

function computeSplitDiff(
  oldCode: string,
  newCode: string
): { left: DiffLine[]; right: DiffLine[] } {
  const changes = Diff.diffLines(oldCode, newCode)
  const left: DiffLine[] = []
  const right: DiffLine[] = []
  let oldLineNum = 1
  let newLineNum = 1

  changes.forEach((change) => {
    const changeLines = change.value.split('\n')
    if (changeLines[changeLines.length - 1] === '') {
      changeLines.pop()
    }

    changeLines.forEach((line) => {
      if (change.added) {
        right.push({
          type: 'added',
          content: line,
          newLineNumber: newLineNum++
        })
      } else if (change.removed) {
        left.push({
          type: 'removed',
          content: line,
          oldLineNumber: oldLineNum++
        })
      } else {
        left.push({
          type: 'unchanged',
          content: line,
          oldLineNumber: oldLineNum++
        })
        right.push({
          type: 'unchanged',
          content: line,
          newLineNumber: newLineNum++
        })
      }
    })
  })

  // 对齐左右两边
  const maxLength = Math.max(left.length, right.length)
  while (left.length < maxLength) {
    left.push({ type: 'unchanged', content: '' })
  }
  while (right.length < maxLength) {
    right.push({ type: 'unchanged', content: '' })
  }

  return { left, right }
}

function DiffLineRow({
  line,
  showLineNumber = true,
  language
}: {
  line: DiffLine
  showLineNumber?: boolean
  language?: string
}) {
  const prefix =
    line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '

  const bgStyle =
    line.type === 'added'
      ? {
          backgroundColor: 'var(--diff-added-bg)',
          color: 'var(--diff-added-text)'
        }
      : line.type === 'removed'
        ? {
            backgroundColor: 'var(--diff-removed-bg)',
            color: 'var(--diff-removed-text)'
          }
        : { backgroundColor: 'hsl(var(--card))' }

  const prefixStyle =
    line.type === 'added'
      ? { color: 'var(--diff-added-text)' }
      : line.type === 'removed'
        ? { color: 'var(--diff-removed-text)' }
        : {}

  // 获取高亮后的内容
  const highlighted =
    line.highlightedContent ||
    (line.content ? highlightLine(line.content, language) : '')

  return (
    <div
      className='flex font-mono text-sm'
      style={bgStyle}
    >
      {/* 固定侧边栏：行号 + 前缀 */}
      <div
        className='sticky left-0 z-10 flex shrink-0'
        style={{ backgroundColor: bgStyle.backgroundColor }}
      >
        {showLineNumber && (
          <span className='w-12 shrink-0 select-none px-2 py-0.5 text-right text-muted-foreground/50'>
            {line.oldLineNumber || line.newLineNumber || ''}
          </span>
        )}
        <span
          className={cn(
            'w-6 shrink-0 select-none px-1 py-0.5 text-center',
            line.type === 'unchanged' && 'text-muted-foreground/50'
          )}
          style={prefixStyle}
        >
          {prefix}
        </span>
      </div>
      {/* 可滚动内容区 */}
      <span
        className='min-w-0 flex-1 whitespace-pre py-0.5 pr-4'
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  )
}

function UnifiedDiff({
  oldCode,
  newCode,
  language
}: {
  oldCode: string
  newCode: string
  language?: string
}) {
  const lines = computeDiffLines(oldCode, newCode)

  return (
    <div className='overflow-x-auto rounded-lg border border-border bg-card'>
      <div className='min-w-max'>
        {lines.map((line, index) => (
          <DiffLineRow
            key={index}
            line={line}
            language={language}
          />
        ))}
        {lines.length === 0 && (
          <div className='px-4 py-8 text-center text-muted-foreground'>
            没有差异
          </div>
        )}
      </div>
    </div>
  )
}

// Split 模式下的单列组件，支持 sticky 行号
function SplitColumn({
  lines,
  title,
  lineNumberType,
  language
}: {
  lines: DiffLine[]
  title: string
  lineNumberType: 'old' | 'new'
  language?: string
}) {
  return (
    <div className='overflow-x-auto'>
      <div className='min-w-max border-b border-border bg-muted/30 px-4 py-2 text-sm font-medium text-muted-foreground sticky left-0 z-10'>
        {title}
      </div>
      <div className='min-w-max'>
        {lines.map((line, index) => (
          <DiffLineRow
            key={index}
            line={{
              ...line,
              // 统一使用对应类型的行号
              oldLineNumber:
                lineNumberType === 'old' ? line.oldLineNumber : undefined,
              newLineNumber:
                lineNumberType === 'new' ? line.newLineNumber : undefined
            }}
            language={language}
          />
        ))}
      </div>
    </div>
  )
}

function SplitDiff({
  oldCode,
  newCode,
  language
}: {
  oldCode: string
  newCode: string
  language?: string
}) {
  const { left, right } = computeSplitDiff(oldCode, newCode)

  return (
    <div className='overflow-hidden rounded-lg border border-border bg-card'>
      <div className='grid grid-cols-2 divide-x divide-border'>
        <SplitColumn
          lines={left}
          title='旧代码'
          lineNumberType='old'
          language={language}
        />
        <SplitColumn
          lines={right}
          title='新代码'
          lineNumberType='new'
          language={language}
        />
      </div>
    </div>
  )
}

export function CodeDiffViewer({
  oldCode,
  newCode,
  mode = 'unified',
  fileName,
  className,
  language
}: CodeDiffViewerProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {fileName && (
        <div className='text-sm font-medium text-muted-foreground'>
          {fileName}
        </div>
      )}
      {mode === 'unified' ? (
        <UnifiedDiff
          oldCode={oldCode}
          newCode={newCode}
          language={language}
        />
      ) : (
        <SplitDiff
          oldCode={oldCode}
          newCode={newCode}
          language={language}
        />
      )}
    </div>
  )
}
