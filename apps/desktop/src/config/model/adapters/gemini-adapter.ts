import type { ProtocolAdapter } from "."

// Gemini 原生协议适配器
export const GEMINI_PROTOCOL_ADAPTER: ProtocolAdapter = {
  protocol: "gemini",
  resolveChatCompletionsPath: (baseUrl) => {
    const normalizedBaseUrl = baseUrl.replace(/\/$/, "")
    return `${normalizedBaseUrl}/models`
  },
  resolveHeaders: (apiKey) => ({
    "x-goog-api-key": apiKey,
    "Content-Type": "application/json",
  }),
}
