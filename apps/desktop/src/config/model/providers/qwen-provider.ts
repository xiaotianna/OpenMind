// Qwen (阿里云) 厂商配置与模型清单
export const QWEN_PROVIDER = {
  provider: {
    id: "qwen",
    label: "Qwen",
    protocol: "openai", // 使用 OpenAI 兼容协议
    defaultBaseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    supportsCustomBaseUrl: true,
    auth: {
      type: "apiKey",
      header: "Authorization",
      prefix: "Bearer ",
    },
  },
  models: [
    {
      id: "qwen-plus",
      name: "Qwen Plus",
      providerId: "qwen",
      capabilities: {
        vision: true,
        tools: true,
      },
    },
    {
      id: "qwen-turbo",
      name: "Qwen Turbo",
      providerId: "qwen",
      capabilities: {
        vision: true,
        tools: true,
      },
    },
    {
      id: "qwen-max",
      name: "Qwen Max",
      providerId: "qwen",
      capabilities: {
        vision: true,
        tools: true,
      },
    },
  ],
} as const
