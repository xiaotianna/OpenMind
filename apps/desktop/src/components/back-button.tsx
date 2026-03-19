import { ArrowLeft } from 'lucide-react'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { backMap } from '@/common'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  className?: string
  to?: string
}

export function BackButton({ className, to }: BackButtonProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = useCallback(() => {
    if (to) {
      navigate(to)
      return
    }

    const path = backMap[location.pathname]
    if (path) {
      navigate(path)
    } else {
      window.history.back()
    }
  }, [to, location.pathname, navigate])

  return (
    <div className={cn('absolute left-4 top-4', className)}>
      <Button
        variant='ghost'
        size='sm'
        className='gap-1.5 text-muted-foreground'
        onClick={handleBack}
      >
        <ArrowLeft className='h-3.5 w-3.5 mr-1.5' />
        返回
      </Button>
    </div>
  )
}
