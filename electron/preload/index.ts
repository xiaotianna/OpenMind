import { contextBridge } from 'electron'

// 暴露给渲染进程的 API
const electronAPI = {
  // 平台信息
  platform: process.platform
}

// 注入到 window 对象
contextBridge.exposeInMainWorld('electronAPI', electronAPI)

// 类型声明
export type ElectronAPI = typeof electronAPI
