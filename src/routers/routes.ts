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
import File from '~/pages/document/file/File'

export const publicRoutes = [{ path: '/', component: Login }]

export const privateRoutes = [
  { path: '/welcome', component: Welcome, title: 'Welcome' },
  { path: '/test', component: Test },
  { path: '/dashboard', component: Dashboard, title: 'Dashboard' },
  {
    path: '/document',
    component: Document,
    children: [
      { path: '/document', component: Department, index: true },
      { path: '/document/department/:departmentId', component: Room, index: false },
      { path: '/document/department/:departmentId/room/:roomId', component: Locker, index: false },
      { path: '/document/department/:departmentId/room/:roomId/locker/:lockerId', component: Folder, index: false },
      {
        path: '/document/department/:departmentId/room/:roomId/locker/:lockerId/folder/:folderId',
        component: File,
        index: false
      }
    ]
  },
  { path: '/request', component: Requests },
  { path: '/pending-approval', component: PendingApprovals },
  { path: '/statistic', component: Statistic },
  { path: '/advanced', component: Advanced }
]
