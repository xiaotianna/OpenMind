import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { isMac } from "./common"

function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-transparent">
      {/* 顶部预留空间：可拖拽移动无边框窗口；macOS 左侧留出红黄绿按钮点击区域 */}
      <header
        className="drag-region flex h-10 w-full shrink-0 cursor-move select-none items-center border-b border-border/50 bg-white/30 backdrop-blur-md"
        style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
      >
        {isMac && <div className="no-drag h-full w-[72px] shrink-0" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties} />}
      </header>
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  )
}

export default App
