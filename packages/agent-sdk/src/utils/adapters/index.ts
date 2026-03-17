import { ANTHROPIC_PROTOCOL_ADAPTER } from "./anthropic-adapter"
import { GEMINI_PROTOCOL_ADAPTER } from "./gemini-adapter"
import { OPENAI_PROTOCOL_ADAPTER } from "./openai-adapter"

type ProviderProtocol = "openai" | "anthropic" | "gemini"

// 协议适配器注册表：根据协议选择请求路径与鉴权头构造逻辑
export const PROTOCOL_ADAPTERS: Record<ProviderProtocol, ProtocolAdapter> = {
  openai: OPENAI_PROTOCOL_ADAPTER,
  anthropic: ANTHROPIC_PROTOCOL_ADAPTER,
  gemini: GEMINI_PROTOCOL_ADAPTER,
}

// 协议适配器接口（把统一调用映射到不同协议实现）
export type ProtocolAdapter = {
  readonly protocol: ProviderProtocol
  resolveChatCompletionsPath: (baseUrl: string) => string
  resolveHeaders: (apiKey: string) => Record<string, string>
}

// 具体使用：看 ./example.md
export const getProtocolAdapter = (protocol: ProviderProtocol) =>
  PROTOCOL_ADAPTERS[protocol]
