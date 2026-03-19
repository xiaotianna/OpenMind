export const isMac = typeof window !== "undefined" && window.electronAPI?.platform === "darwin"
export const isDesktop = typeof window !== "undefined" && !!window.electronAPI

// 路由返回路径映射
export const backMap: Record<string, string> = {
  '/settings/models/new': '/settings/models',
  '/settings/mcps/new': '/settings/mcps',
}