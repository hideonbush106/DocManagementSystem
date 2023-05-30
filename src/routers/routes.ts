import Login from '~/pages/auth/Login'
import Welcome from '~/pages/home/Welcome'
import Test from '~/pages/home/Test'
import Dashboard from '~/pages/dashboard/Dashboard'
import Document from '~/pages/document/Document'
import Requests from '~/pages/requests/Requests'
import PendingApprovals from '~/pages/pendingApprovals/PendingApprovals'
import Statistic from '~/pages/statistic/Statistic'
import Advanced from '~/pages/advanced/Advanced'

export const publicRoutes = [{ path: '/', component: Login }]

export const privateRoutes = [
  { path: '/welcome', component: Welcome },
  { path: '/test', component: Test },
  { path: '/dashboard', component: Dashboard },
  { path: '/document', component: Document },
  { path: '/request', component: Requests },
  { path: '/pending-approval', component: PendingApprovals },
  { path: '/statistic', component: Statistic },
  { path: '/advanced', component: Advanced }
]
