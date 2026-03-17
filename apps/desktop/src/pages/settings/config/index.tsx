import { useEffect } from "react"

import { PROTOCOL_ADAPTERS } from '@/utils/adapter'

export default function SettingsConfigPage() {
  useEffect(() => {
    console.log(PROTOCOL_ADAPTERS);
    
  }, [])
  return <div className="text-sm text-muted-foreground">配置页面占位,memory</div>
}
