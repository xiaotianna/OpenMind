// Anthropic 厂商配置与模型清单
export const ANTHROPIC_PROVIDER = {
  provider: {
    id: "anthropic",
    label: "Anthropic",
    protocol: "anthropic",
    defaultBaseUrl: "https://api.anthropic.com",
    supportsCustomBaseUrl: true,
    auth: {
      type: "apiKey",
      header: "x-api-key",
    },
  },
  models: [
    {
      id: "claude-opus-4-20250514",
      name: "Claude Opus 4.6",
      providerId: "anthropic",
      capabilities: {
        vision: true,
        tools: true,
      },
    },
    {
      id: "claude-sonnet-4-20250514",
      name: "Claude Sonnet 4",
      providerId: "anthropic",
      capabilities: {
        vision: true,
        tools: true,
      },
    },
    {
      id: "claude-haiku-4.5",
      name: "Claude Haiku 4.5",
      providerId: "anthropic",
      capabilities: {
        vision: true,
        tools: true,
      },
    },
  ],
} as const
