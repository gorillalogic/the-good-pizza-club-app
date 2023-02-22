import { createBrowserRouter } from 'react-router-dom'
import App from './app/App'
import NotFound from './app/pages/NotFound/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
  },
])

export default router
