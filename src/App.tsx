import { Suspense, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '@/components/loading'
import ErrorBoundary from '@/components/error-boundary'

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </Suspense>
  )
}

export default App
