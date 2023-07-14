import NavTabs from '~/components/tab/NavTabs'
import DepartmentAdvanced from './department/DepartmentAdvanced'
import RoomAdvanced from './room/RoomAdvanced'
import LockerAdvanced from './locker/LockerAdvanced'
import FolderAdvanced from './folder/FolderAdvanced'
import CategoryAdvanced from './category/CategoryAdvanced'
import EmployeeAdvanced from './employee/EmployeeAdvanced'
import { Apartment, Folder, MeetingRoom, ViewModule, Category, PeopleAlt } from '@mui/icons-material'
import useAuth from '~/hooks/useAuth'
import { Navigate } from 'react-router-dom'

const Advanced = () => {
  const { user } = useAuth()
  const tabs = [
    { label: 'Department', component: <DepartmentAdvanced />, icon: Apartment },
    { label: 'Room', component: <RoomAdvanced />, icon: MeetingRoom },
    { label: 'Locker', component: <LockerAdvanced />, icon: ViewModule },
    { label: 'Folder', component: <FolderAdvanced />, icon: Folder },
    { label: 'Category', component: <CategoryAdvanced />, icon: Category },
    { label: 'Employee', component: <EmployeeAdvanced />, icon: PeopleAlt },
  ]
  return user?.role === 'STAFF' ? (
    <>
      <NavTabs tabs={tabs} />
    </>
  ) : (
    <Navigate to='/dashboard' replace />
  )
}

export default Advanced
