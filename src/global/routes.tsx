import ProtectedRoute from '~/components/ProtectedRoute'
import { Outlet, RouteObject } from 'react-router-dom'
import Login from '~/routers/auth/Login'
import Welcome from '~/routers/home/Welcome'
import { ThemeProvider } from 'styled-components'
import AuthContext from '~/context/AuthContext'
import { theme } from './theme'

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Login />
  }
]

const protectedRoutes: RouteObject[] = [
  {
    path: '/system',
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [{ path: '/system/welcome', element: <Welcome /> }] // TODO: add more routes here
  }
]

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ThemeProvider theme={theme}>
        <AuthContext>
          <Outlet />
        </AuthContext>
      </ThemeProvider>
    ),
    children: publicRoutes.concat(protectedRoutes)
  }
]
