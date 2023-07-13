import NavTabs from '~/components/tab/NavTabs'
import DepartmentAdvanced from './department/DepartmentAdvanced'
import RoomAdvanced from './room/RoomAdvanced'
import LockerAdvanced from './locker/LockerAdvanced'
import FolderAdvanced from './folder/FolderAdvanced'
import CategoryAdvanced from './category/CategoryAdvanced'
import { Folder, MeetingRoom, ViewModule, Category, Apartment } from '@mui/icons-material'

const Advanced = () => {
  const tabs = [
    { label: 'Department', component: <DepartmentAdvanced />, icon: Apartment },
    { label: 'Room', component: <RoomAdvanced />, icon: MeetingRoom },
    { label: 'Locker', component: <LockerAdvanced />, icon: ViewModule },
    { label: 'Folder', component: <FolderAdvanced />, icon: Folder },
    { label: 'Category', component: <CategoryAdvanced />, icon: Category }
  ]
  return (
    <>
      <NavTabs tabs={tabs} />
    </>
  )
}

export default Advanced
