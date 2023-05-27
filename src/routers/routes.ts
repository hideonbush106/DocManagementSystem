import Login from '~/pages/auth/Login'
import Welcome from '~/pages/home/Welcome'

export const publicRoutes = [{ path: '/', component: Login }]

export const privateRoutes = [{ path: '/welcome', component: Welcome }]
