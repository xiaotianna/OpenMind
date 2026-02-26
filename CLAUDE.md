# AI Agent 桌面应用规范

## 项目概述

- **项目名称**: AI Agent Desktop
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

### 代码组织

1. **组件拆分规则**
   - 组件和 hooks 不着急拆分
   - 只有当相同或相似的代码重复出现 **两次以上** 时才进行拆分
   - 优先保持代码简洁，避免过度抽象

2. **通用方法拆分**
   - 工具函数、通用逻辑需要单独拆分
   - 放在 `src/utils` 或 `src/hooks` 目录
   - 命名要有语义，使用驼峰命名法

### 文件结构

```
src/
├── components/       # React 组件
│   └── common/       # 通用组件
├── hooks/            # 自定义 hooks
├── utils/            # 工具函数
├── types/            # TypeScript 类型定义
├── styles/           # 样式文件
├── services/         # 与后端通信的服务
├── App.tsx           # 主应用组件
└── main.tsx          # 入口文件

server/               # 本地后端服务
├── src/
│   ├── index.ts      # 后端入口
│   ├── agents/       # Agent 逻辑 (LangGraph)
│   ├── chains/       # Chain 逻辑 (LangChain)
│   ├── providers/    # 大模型提供商适配
│   ├── routes/       # API 路由
│   └── storage/      # 本地存储
├── package.json
└── tsconfig.json
```

### 命名规范

- 组件文件: PascalCase (如 `ChatPanel.tsx`)
- 工具函数/hooks: camelCase (如 `useChat.ts`)
- CSS/样式文件: kebab-case (如 `chat-panel.module.css`)

### Git 提交规范

- 使用有意义的提交信息
- 遵循 conventional commits 格式（可选）

## 功能迭代记录

### v0.1.0 - 基础框架

- [x] 初始化 Electron + React 项目
- [x] 配置开发环境和构建脚本
- [x] 实现基础窗口管理（最小化、最大化、关闭）
- [x] 创建 CLAUDE.md 规范文档
- [ ] 安装依赖并验证开发环境运行

### v0.2.0 - 后端服务基础

- [ ] 创建本地后端服务框架
- [ ] 实现与大模型 API 的对接（可配置多 provider）
- [ ] 桌面端与后端通信服务封装
