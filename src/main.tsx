import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App/App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import Favorites from './pages/Favorites/Favorites.tsx'
import Layout from './components/Layout/Layout.tsx'

const router = createBrowserRouter([
  {path: '/', element: <App/>},
  {
    element: <Layout/>,
    children: [
      {path: '/dashboard', element:<Dashboard/>},
      {path: '/favorites', element: <Favorites/>}
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
