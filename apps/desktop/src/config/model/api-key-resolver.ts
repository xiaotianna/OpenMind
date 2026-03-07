// 做标记，来区分apikey是从本地的env还是从配置表单中读取
export type ApiKeyRef = `env:${string}` | `settings:${string}`
export type ApiKeySource = 'env' | 'settings'

/**
 * 根据 apiKeyRef 从不同来源读取真实 apiKey
 * 入参：apiKeyRef - 带来源前缀的 apiKey 引用，格式为 env:xxx 或 settings:xxx
 * 返回值：string | undefined，解析成功返回 apiKey，失败返回 undefined
 * 示例：
 * const apiKey = resolveApiKeyRef("settings:anthropic.apiKey")
 * apiKey => "sk-ant-settings-xxxx"
 */
export const resolveApiKeyRef = (apiKeyRef: ApiKeyRef): string | undefined => {
  const [source, ...keyParts] = apiKeyRef.split(':')
  const key = keyParts.join(':').trim()
  if (!key || (source !== 'env' && source !== 'settings')) {
    return undefined
  }

  let value: string | undefined

  if (source === 'env') {
    // 从环境变量读取
    value = import.meta.env[key] as string | undefined
  } else if (source === 'settings') {
    // TODO: const stored = getValue(`settings.${key}`)
    const stored = 'sk-settings-xxxx'
    value = stored ?? undefined
  }

  return value?.trim() || undefined
}
