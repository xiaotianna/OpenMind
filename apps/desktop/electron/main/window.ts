import { BrowserWindow } from 'electron'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let mainWindow: BrowserWindow | null = null

export function createWindow(): BrowserWindow {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    frame: false, // 使用自定义标题栏（无边框）
    titleBarStyle: 'hiddenInset', // macOS 隐藏标题栏，保留红黄绿按钮区域
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

  // 加载页面
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../../dist/index.html'))
  }

  return mainWindow
}

export function getMainWindow(): BrowserWindow | null {
  return mainWindow
}

// 窗口控制函数
export function minimizeWindow(): void {
  mainWindow?.minimize()
}

export function maximizeWindow(): void {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize()
  } else {
    mainWindow?.maximize()
  }
}

export function closeWindow(): void {
  mainWindow?.close()
}

export function isMaximizedWindow(): boolean {
  return mainWindow?.isMaximized() ?? false
}
