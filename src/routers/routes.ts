import Login from '~/pages/auth/Login'
import Welcome from '~/pages/home/Welcome'
import Test from '~/pages/home/Test'
import Dashboard from '~/pages/dashboard/Dashboard'
import Document from '~/pages/document/Document'
import Requests from '~/pages/requests/Requests'
import PendingApprovals from '~/pages/pendingApprovals/PendingApprovals'
import Statistic from '~/pages/statistic/Statistic'
import Advanced from '~/pages/advanced/Advanced'
import Department from '~/pages/document/department/Department'
import Room from '~/pages/document/room/Room'
import Locker from '~/pages/document/locker/Locker'
import Folder from '~/pages/document/folder/Folder'

export const publicRoutes = [{ path: '/', component: Login }]

export const privateRoutes = [
  { path: '/welcome', component: Welcome },
  { path: '/test', component: Test },
  { path: '/dashboard', component: Dashboard, excludeTitle: true },
  {
    path: '/document',
    component: Document,
    excludeTitle: true,
    children: [
      { path: '/document', component: Department, index: true },
      { path: '/document/dept/:did', component: Room, index: false },
      { path: '/document/dept/:did/room/:rid', component: Locker, index: false },
      { path: '/document/dept/:did/room/:rid/locker/:fid', component: Folder, index: false }
    ]
  },
  { path: '/request', component: Requests, excludeTitle: true },
  { path: '/pending-approval', component: PendingApprovals, excludeTitle: false },
  { path: '/statistic', component: Statistic, excludeTitle: true },
  { path: '/advanced', component: Advanced, excludeTitle: true }
]
