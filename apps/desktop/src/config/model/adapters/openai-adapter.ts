import type { ProtocolAdapter } from "."

// OpenAI 兼容协议适配器（可复用于 OpenRouter / vLLM 等兼容 OpenAI 的服务）
export const OPENAI_PROTOCOL_ADAPTER: ProtocolAdapter = {
  protocol: "openai",
  resolveChatCompletionsPath: (baseUrl) => {
    const normalizedBaseUrl = baseUrl.replace(/\/$/, "")
    return `${normalizedBaseUrl}/chat/completions`
  },
  resolveHeaders: (apiKey) => ({
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  }),
}
