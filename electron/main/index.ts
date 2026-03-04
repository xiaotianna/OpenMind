import { app, BrowserWindow, ipcMain } from 'electron'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// ESM 兼容
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
    frame: false, // 使用自定义标题栏（无边框）
    titleBarStyle: 'hiddenInset', // macOS 隐藏标题栏，保留红绿灯按钮区域
    trafficLightPosition: process.platform === 'darwin' ? { x: 20, y: 20 } : undefined, // 统一红黄绿按钮与窗口边框距离
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      // 确保 CSS backdrop-filter 在 Electron 中生效
      experimentalFeatures: true
    },
    show: false
  })

  // 窗口准备就绪后显示
  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  // 监听窗口事件
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 监听最大化状态变化
  mainWindow.on('maximize', () => {
    mainWindow?.webContents.send('window:maximizeChange', true)
  })

  mainWindow.on('unmaximize', () => {
    mainWindow?.webContents.send('window:maximizeChange', false)
  })

  // 开发环境下加载开发服务器
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    // 不默认打开 DevTools：macOS 下打开 DevTools 会导致 -webkit-app-region 拖拽失效，需要时用 Cmd+Option+I 打开
    // mainWindow.webContents.openDevTools()
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
