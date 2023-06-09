import { publicRoutes, privateRoutes } from '~/routers/routes'
import { ThemeProvider } from 'styled-components'
import AuthProvider from './context/AuthContext'
import { theme } from '~/global/theme'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import PrivateRoute from './routers/PrivateRoute'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} Component={route.component} />
            ))}
            {privateRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={<PrivateRoute Component={route.component} />}>
                {route.children?.map((child, index) => (
                  <Route key={index} index={child.index} path={child.path} Component={child.component} />
                ))}
              </Route>
            ))}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
