import { lazy } from 'react'
import { redirect } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'

// layout
const RootLayout = lazy(() => import('@/pages/layout'))
const Chat = lazy(() => import('@/pages/layout/chat'))
// settings
const SettingsLayout = lazy(() => import('@/pages/settings'))
const SettingsGeneral = lazy(() => import('@/pages/settings/general'))
const SettingsConfig = lazy(() => import('@/pages/settings/config'))
const SettingsPersonalization = lazy(
  () => import('@/pages/settings/personalization')
)
const SettingsMcpServers = lazy(() => import('@/pages/settings/mcp-servers'))
const SettingsGit = lazy(() => import('@/pages/settings/git'))
const SettingsModels = lazy(() => import('@/pages/settings/models'))
const SettingsPrompts = lazy(() => import('@/pages/settings/prompts'))
const SettingsTools = lazy(() => import('@/pages/settings/tools'))
const SettingsSkills = lazy(() => import('@/pages/settings/skills'))

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
        path: 'config',
        element: <SettingsConfig />
      },
      {
        path: 'personalization',
        element: <SettingsPersonalization />
      },
      {
        path: 'mcp-servers',
        element: <SettingsMcpServers />
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
      }
    ]
  },
  {
    path: '*',
    loader: () => redirect('/chat')
  }
])

export { router }
