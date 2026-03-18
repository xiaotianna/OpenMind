import { useEffect } from "react"

import { ConfigTitle } from '@/components/config/config-title'
import { PROTOCOL_ADAPTERS } from '@/utils/adapter'

export default function SettingsConfigPage() {
  useEffect(() => {
    console.log(PROTOCOL_ADAPTERS);

  }, [])
  return (
    <>
      <section>
        <ConfigTitle>配置</ConfigTitle>
      </section>
    </>
  )
}
