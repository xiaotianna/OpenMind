// Google 厂商配置与模型清单
export const GOOGLE_PROVIDER = {
  provider: {
    id: "google",
    label: "Google",
    protocol: "gemini",
    defaultBaseUrl: "https://generativelanguage.googleapis.com/v1beta",
    supportsCustomBaseUrl: true,
    auth: {
      type: "apiKey",
      header: "x-goog-api-key",
    },
  },
  models: [
    {
      id: "gemini-3-flash",
      name: "Gemini 3 Flash",
      providerId: "google",
      capabilities: {
        vision: true,
        tools: true,
      },
    }
  ],
} as const
