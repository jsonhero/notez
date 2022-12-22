import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@lib/query-client'

import { App } from './app'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
