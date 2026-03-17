import type { ProtocolAdapter } from "."

// Anthropic 原生协议适配器
export const ANTHROPIC_PROTOCOL_ADAPTER: ProtocolAdapter = {
  protocol: "anthropic",
  resolveChatCompletionsPath: (baseUrl) => {
    const normalizedBaseUrl = baseUrl.replace(/\/$/, "")
    return `${normalizedBaseUrl}/v1/messages`
  },
  resolveHeaders: (apiKey) => ({
    "x-api-key": apiKey,
    "Content-Type": "application/json",
  }),
}
