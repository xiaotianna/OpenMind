import { ANTHROPIC_PROVIDER } from './anthropic-provider'
import { DEEPSEEK_PROVIDER } from './deepseek-provider'
import { GOOGLE_PROVIDER } from './google-provider'
import { OPENAI_PROVIDER } from './openai-provider'
import { QWEN_PROVIDER } from './qwen-provider'

// Provider 配置总入口：新增厂商时仅需在这里注册
export const MODEL_PROVIDER_CONFIGS = [
  OPENAI_PROVIDER,
  ANTHROPIC_PROVIDER,
  GOOGLE_PROVIDER,
  DEEPSEEK_PROVIDER,
  QWEN_PROVIDER,
] as const

// 从 provider 配置自动推导 ProviderId 联合类型
export type ModelProviderId =
  (typeof MODEL_PROVIDER_CONFIGS)[number]['provider']['id']

// 从 provider 配置自动推导协议联合类型
export type ProviderProtocol =
  (typeof MODEL_PROVIDER_CONFIGS)[number]['provider']['protocol']
