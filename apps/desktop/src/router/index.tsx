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
const SettingsEnvironment = lazy(() => import('@/pages/settings/environment'))
const SettingsWorktree = lazy(() => import('@/pages/settings/worktree'))
const SettingsArchivedThreads = lazy(
  () => import('@/pages/settings/archived-threads')
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: () => redirect('/chat'),
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'chat/:sessionId',
        element: <Chat />,
      },
    ],
  },
  {
    path: '/settings',
    element: <SettingsLayout />,
    children: [
      {
        index: true,
        loader: () => redirect('/settings/general'),
      },
      {
        path: 'general',
        element: <SettingsGeneral />,
      },
      {
        path: 'config',
        element: <SettingsConfig />,
      },
      {
        path: 'personalization',
        element: <SettingsPersonalization />,
      },
      {
        path: 'mcp-servers',
        element: <SettingsMcpServers />,
      },
      {
        path: 'git',
        element: <SettingsGit />,
      },
      {
        path: 'environment',
        element: <SettingsEnvironment />,
      },
      {
        path: 'worktree',
        element: <SettingsWorktree />,
      },
      {
        path: 'archived-threads',
        element: <SettingsArchivedThreads />,
      },
    ],
  },
  {
    path: '*',
    loader: () => redirect('/chat'),
  },
])

export { router }
