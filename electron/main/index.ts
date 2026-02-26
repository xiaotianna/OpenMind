import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'

// 禁用 GPU 加速（解决某些 macOS 问题）
app.disableHardwareAcceleration()

// 全局异常处理
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason)
})

let mainWindow: BrowserWindow | null = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false
    },
    show: false,
    backgroundColor: '#ffffff'
  })

  // 窗口准备就绪后显示
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  // 监听窗口事件
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 开发环境下加载开发服务器
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    // 生产环境加载打包文件
    mainWindow.loadFile(join(__dirname, '../../dist/index.html'))
  }
}

// 窗口控制 IPC 处理
ipcMain.handle('window:minimize', () => {
  mainWindow?.minimize()
})

ipcMain.handle('window:maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow?.maximize()
  }
})

ipcMain.handle('window:close', () => {
  mainWindow?.close()
})

ipcMain.handle('window:isMaximized', () => {
  return mainWindow?.isMaximized() ?? false
})

app.whenReady().then(() => {
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
