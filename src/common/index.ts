export const isMac = typeof window !== "undefined" && window.electronAPI?.platform === "darwin"
export const isDesktop = typeof window !== "undefined" && !!window.electronAPI