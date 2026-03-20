import { lazy } from 'react'
import { redirect } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

// layout
const RootLayout = lazy(() => import('@/pages/layout'))
const Chat = lazy(() => import('@/pages/layout/chat'))
// settings
const SettingsLayout = lazy(() => import('@/pages/settings'))
const SettingsGeneral = lazy(() => import('@/pages/settings/general'))
const SettingsPersonalization = lazy(
  () => import('@/pages/settings/personalization')
)
const SettingsMcpServers = lazy(() => import('@/pages/settings/mcps'))
const NewMcpServer = lazy(() => import('@/pages/settings/mcps/new'))
const SettingsGit = lazy(() => import('@/pages/settings/git'))
const SettingsModels = lazy(() => import('@/pages/settings/models'))
const NewModel = lazy(() => import('@/pages/settings/models/new'))
const SettingsPrompts = lazy(() => import('@/pages/settings/prompts'))
const SettingsTools = lazy(() => import('@/pages/settings/tools'))
const SettingsSkills = lazy(() => import('@/pages/settings/skills'))
const SettingsMemory = lazy(() => import('@/pages/settings/memory'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: () => redirect('/chat')
      },
      {
        path: 'chat',
        element: <Chat />
      },
      {
        path: 'chat/:sessionId',
        element: <Chat />
      }
    ]
  },
  {
    path: '/settings',
    element: <SettingsLayout />,
    children: [
      {
        index: true,
        loader: () => redirect('/settings/general')
      },
      {
        path: 'general',
        element: <SettingsGeneral />
      },
      {
        path: 'personalization',
        element: <SettingsPersonalization />
      },
      {
        path: 'mcps',
        element: <SettingsMcpServers />
      },
      {
        path: 'mcps/new',
        element: <NewMcpServer />
      },
      {
        path: 'git',
        element: <SettingsGit />
      },
      {
        path: 'models',
        element: <SettingsModels />
      },
      {
        path: 'models/new',
        element: <NewModel />
      },
      {
        path: 'prompts',
        element: <SettingsPrompts />
      },
      {
        path: 'tools',
        element: <SettingsTools />
      },
      {
        path: 'skills',
        element: <SettingsSkills />
      },
      {
        path: 'memory',
        element: <SettingsMemory />
      }
    ]
  },
  {
    path: '*',
    loader: () => redirect('/chat')
  }
])

export { router }
