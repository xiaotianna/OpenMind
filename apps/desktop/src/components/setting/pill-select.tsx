import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PillSelectProps {
  value: string
  onValueChange: (value: string) => void
  items: Array<{ value: string; label: string }>
  widthClassName?: string
}

export function PillSelect({
  value,
  onValueChange,
  items,
  widthClassName,
}: PillSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          'h-7 rounded-full border-0 bg-muted px-3 text-[12px] shadow-none',
          widthClassName ?? 'w-full md:min-w-[228px]',
        )}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
