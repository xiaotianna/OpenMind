# AI Agent 桌面应用规范

## 项目概述

- **项目名称**: OpenMind
- **项目类型**: 桌面应用程序
- **技术栈**: Electron + React + TypeScript
- **核心功能**: AI Agent 桌面客户端，提供对话、任务处理等功能

## 架构说明

### 前端 (桌面端)

- **技术**: Electron + React + TypeScript
- **职责**: 用户界面交互、消息展示、本地数据管理
- **运行方式**: 打包为桌面应用程序 (.exe/.app)

### 后端 (本地服务)

- **技术**: Node.js + Express + LangChain + LangGraph
- **职责**:
  - 对接各大模型厂商 API (OpenAI、Claude、Gemini、国产模型等)
  - 使用 LangChain/LangGraph 构建 Agent 逻辑
  - 处理模型调用、上下文管理、流式响应
  - 业务逻辑处理
- **通信方式**: HTTP/WebSocket 与桌面端通信
- **端口**: 默认 8000 (可配置)

### 数据流

```
用户交互 (桌面端)  -->  本地后端服务  -->  大模型 API
                         |
                     (本地存储)
```

## 开发规范

### 禁止事项

- **禁止自动启动开发服务器**: 不要在完成任务时自动启动 `pnpm run dev` 或其他开发服务器，如果需要启动必须先询问用户确认
- **禁止私自 commit**: 没有用户明确要求的情况下，不允许私自执行 git commit，所有提交必须经过用户确认

### 代码组织

1. **组件拆分规则**
   - 组件和 hooks 不着急拆分
   - 只有当相同或相似的代码重复出现 **两次以上** 时才进行拆分
   - 优先保持代码简洁，避免过度抽象

2. **通用方法拆分**
   - 工具函数、通用逻辑需要单独拆分
   - 放在 `src/utils` 或 `src/hooks` 目录
   - 命名要有语义，使用驼峰命名法

3. **空节点规范**
   - 不需要包裹额外 DOM 元素时，使用 `<>` 或 `<React.Fragment>` 替代空 div
   - 避免不必要的 div 包装

4. **路径别名规范**
   - 使用 `@/` 替代相对路径 `../../`
   - 项目已配置 `@` 指向 `src` 目录
   - 示例：`import { ConfigTitle } from '@/components/config/config-title'`

### 文件组织规范

#### 目录命名

- 使用 **kebab-case**（短横线命名）
- 示例：`chat-input`、`use-theme`、`mcp-servers`

#### 文件命名

- **React 组件**: PascalCase（如 `Sidebar.tsx`、`ChatInput.tsx`）
- **Hooks**: camelCase，以 `use-` 开头（如 `use-theme.ts`）
- **工具函数**: camelCase（如 `utils.ts`）
- **配置文件**: 与目录同名的 index.ts 或独立命名

#### 目录结构

```
apps/desktop/src/
├── components/           # React 组件（非 UI 库）
│   ├── chat-input/       # 聊天输入组件
│   │   ├── chat-input.tsx
│   │   ├── chat-input-editor.tsx
│   │   ├── chat-input-toolbar.tsx
│   │   └── toolbar/      # 工具栏子组件
│   │       ├── send-button.tsx
│   │       ├── attachment.tsx
│   │       ├── model-selector.tsx
│   │       └── project-selector.tsx
│   ├── setting/          # 设置页面通用组件
│   │   ├── config-title.tsx
│   │   ├── sub-config-title.tsx
│   │   ├── settings-card.tsx
│   │   ├── settings-header.tsx
│   │   ├── settings-row.tsx
│   │   └── pill-select.tsx
│   ├── ui/               # UI 组件库（来自 shadcn）
│   ├── sidebar.tsx
│   ├── drag-handle.tsx
│   ├── dot-pattern.tsx
│   ├── back-button.tsx
│   ├── loading.tsx
│   ├── error-boundary.tsx
│   └── code-diff-viewer.tsx
├── pages/                # 页面组件
│   ├── layout/           # 布局页面
│   │   ├── chat/        # 聊天页面
│   │   └── index.tsx
│   └── settings/         # 设置页面（嵌套路由）
│       ├── general/     # 通用设置
│       ├── personalization/  # 个人化设置
│       ├── models/      # 模型管理
│       │   └── new/     # 新建模型页面
│       ├── mcps/        # MCP 服务器设置
│       ├── skills/      # 技能设置
│       ├── prompts/     # 提示词设置
│       ├── tools/       # 工具设置
│       └── git/         # Git 设置
├── hooks/                # 自定义 hooks
│   ├── use-theme.tsx
│   ├── use-mobile.ts
│   └── use-toast.ts
├── config/               # 配置相关
│   └── model/            # 模型配置
│       ├── index.ts
│       ├── api-key-resolver.ts
│       └── providers/   # 模型提供者
│           ├── openai-provider.ts
│           ├── anthropic-provider.ts
│           ├── google-provider.ts
│           ├── qwen-provider.ts
│           └── deepseek-provider.ts
├── utils/                # 工具函数
│   └── adapter.ts
├── lib/                  # 工具库
│   └── utils.ts
├── styles/               # 样式文件
│   └── globals.css
├── router/               # 路由配置
│   └── index.tsx
├── common/               # 通用常量和配置
│   └── index.ts
├── App.tsx
└── main.tsx
```

#### 嵌套页面组织

- 同类页面放在同一目录下，使用 `index.tsx` 作为父布局
- 子页面单独目录，如 `settings/general/index.tsx`

### 路由规范

- 使用 **配置式路由**，在 `src/router/index.tsx` 中统一管理
- 页面组件放在 `src/pages` 目录下
- 路由配置格式：
  ```typescript
  const routes = [
    { path: "/", component: HomePage },
    { path: "/settings", component: SettingsPage },
  ]
  ```

### 命名规范

- 组件文件: PascalCase (如 `ChatPanel.tsx`)
- 工具函数/hooks: camelCase (如 `useChat.ts`)
- CSS/样式文件: kebab-case (如 `chat-panel.module.css`)

### Git 提交规范

- 使用 **中文** 提交信息
- 遵循 conventional commits 格式
- 类型说明：
  - `feat`: 新功能
  - `fix`: 修复 bug
  - `refactor`: 代码重构
  - `docs`: 文档更新
  - `style`: 样式调整
  - `chore`: 构建/工具链调整
- 提交信息格式：`type: 描述`，例如 `feat: 添加用户登录功能`
- 每行不超过 100 字符

### 动画规范

- 使用 **Framer Motion** 作为动画库
- 交互元素（按钮、菜单、过渡）应添加适当的过渡动画
- 动画应保持简洁，避免过度使用
- 默认动画时长：0.2s - 0.3s

### UI 风格规范

- 遵循当前项目的整体 UI 风格（参考现有组件）
- 分组列表使用分组标题（如 "Threads"、"Settings"），标题使用小号字体（text-xs）加 muted 颜色
- 列表项使用圆角卡片样式（rounded-lg），hover 时使用 secondary 背景色
- 保持间距一致，使用 px-2/3/4 和 py-1/2/3 等标准间距
- 图标和文字保持垂直居中，使用 gap-2/3 控制间距

### 设置页面组件规范

- **所有设置页面必须使用 `@/components/setting/` 下的组件**，以保持 UI 统一
- 提供的组件包括：
  - `ConfigTitle`: 页面标题
  - `SubConfigTitle`: 子区域标题
  - `SettingsCard`: 卡片容器
  - `SettingsRow`: 行项目，支持 `title`、`description`、`control`、`icon`、`noBorder` 属性
  - `PillSelect`: 药丸选择器
  - `SettingsHeader`: 设置页头部
- `SettingsRow` 的 `icon` 属性支持自定义 ReactNode，可用于显示图标或图片
- 组件路径：`import { SettingsRow } from '@/components/setting/settings-row'`

## 功能迭代记录

### v0.1.0 - 基础框架

- [x] 初始化 Electron + React 项目
- [x] 配置开发环境和构建脚本
- [x] 实现基础窗口管理（最小化、最大化、关闭）
- [x] 创建 CLAUDE.md 规范文档
- [x] 安装依赖并验证开发环境运行
- [x] 实现聊天界面 UI（左侧边栏 + 右侧聊天区域）
- [x] 配置 react-router-dom 路由管理
- [x] 实现深色/浅色主题切换

### v0.2.0 - 后端服务基础

- [ ] 创建本地后端服务框架
- [ ] 实现与大模型 API 的对接（可配置多 provider）
- [ ] 桌面端与后端通信服务封装
