import { contextBridge, ipcRenderer } from 'electron'

// 暴露给渲染进程的 API
const electronAPI = {
  // 窗口控制
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),
  isMaximized: () => ipcRenderer.invoke('window:isMaximized'),

  // 监听窗口最大化状态变化
  onMaximizeChange: (callback: (isMaximized: boolean) => void) => {
    ipcRenderer.on('window:maximizeChange', (_event, isMaximized) => {
      callback(isMaximized)
    })
  },

  // 平台信息
  platform: process.platform
}

// 注入到 window 对象
contextBridge.exposeInMainWorld('electronAPI', electronAPI)

// 类型声明
export type ElectronAPI = typeof electronAPI
