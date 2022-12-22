import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { MainLayout } from '@layouts/main'
import { AppView } from '@views/app'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<AppView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}