// OpenAI 厂商配置与模型清单
export const OPENAI_PROVIDER = {
  provider: {
    id: "openai",
    label: "OpenAI",
    protocol: "openai", // 使用 OpenAI 兼容协议适配器
    defaultBaseUrl: "https://api.openai.com/v1", // 默认请求基地址
    supportsCustomBaseUrl: true, // 是否允许用户自定义 baseUrl
    auth: {
      type: "apiKey", // 鉴权方式
      header: "Authorization", // API Key 注入请求头
      prefix: "Bearer ", // 请求头值前缀
    },
  },
  models: [
    {
      id: "gpt-5.4",
      name: "GPT-5.4",
      providerId: "openai", // 归属 Provider
      capabilities: {
        vision: true, // 支持视觉输入
        tools: true, // 支持工具调用
      },
    },
    {
      id: "gpt-5.3-codex",
      name: "GPT-5.3 Codex",
      providerId: "openai",
      capabilities: {
        vision: true,
        tools: true,
      },
    },
  ],
} as const
