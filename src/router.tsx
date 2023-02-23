import { createBrowserRouter } from 'react-router-dom'
import App from './pages/App'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />
      }
    ]
  },
])

export default router
