import { ipcMain } from 'electron'
import {
  minimizeWindow,
  maximizeWindow,
  closeWindow,
  isMaximizedWindow
} from '../window'

// 注册窗口控制 IPC handlers
export function registerWindowHandlers(): void {
  ipcMain.handle('window:minimize', () => {
    minimizeWindow()
  })

  ipcMain.handle('window:maximize', () => {
    maximizeWindow()
  })

  ipcMain.handle('window:close', () => {
    closeWindow()
  })

  ipcMain.handle('window:isMaximized', () => {
    return isMaximizedWindow()
  })
}
