import { app, BrowserWindow } from 'electron'
import { createWindow } from './window'
import { registerAllIpcHandlers } from './ipc'

// 禁用 GPU 加速（解决某些 macOS 问题）
app.disableHardwareAcceleration()

// 全局异常处理
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason)
})

app.whenReady().then(() => {
  // 注册 IPC handlers
  registerAllIpcHandlers()

  // 创建窗口
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
