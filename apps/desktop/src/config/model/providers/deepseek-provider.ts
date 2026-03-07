// DeepSeek 厂商配置与模型清单
export const DEEPSEEK_PROVIDER = {
  provider: {
    id: "deepseek",
    label: "DeepSeek",
    protocol: "openai", // 使用 OpenAI 兼容协议
    defaultBaseUrl: "https://api.deepseek.com/v1",
    supportsCustomBaseUrl: true,
    auth: {
      type: "apiKey",
      header: "Authorization",
      prefix: "Bearer ",
    },
  },
  models: [
    {
      id: "deepseek-chat",
      name: "DeepSeek Chat",
      providerId: "deepseek",
      capabilities: {
        vision: false,
        tools: true,
      },
    },
    {
      id: "deepseek-coder",
      name: "DeepSeek Coder",
      providerId: "deepseek",
      capabilities: {
        vision: false,
        tools: true,
      },
    },
  ],
} as const
