import { MODEL_PROVIDER_CONFIGS } from "./providers"

export const models = MODEL_PROVIDER_CONFIGS.flatMap((config) =>
  [...config.models]
)

// 供模型选择器使用的分组数据（Provider + Models）
export const MODEL_PROVIDERS = MODEL_PROVIDER_CONFIGS.map(
  (config) => ({
    provider: config.provider.label,
    providerSlug: config.provider.id,
    protocol: config.provider.protocol,
    themedLogo: "themedLogo" in config.provider ? config.provider.themedLogo : false,
    models: [...config.models],
  })
)
