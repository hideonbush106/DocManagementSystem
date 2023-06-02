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
  { path: '/dashboard', component: Dashboard, excludeTitle: true, title: 'Dashboard' },
  { path: '/document', component: Document, excludeTitle: true, title: 'Document' },
  { path: '/request', component: Requests, excludeTitle: true, title: 'Requests' },
  { path: '/pending-approval', component: PendingApprovals, excludeTitle: false },
  { path: '/statistic', component: Statistic, excludeTitle: true, title: 'Statistic' },
  { path: '/advanced', component: Advanced, excludeTitle: true, title: 'Advanced' }
]
