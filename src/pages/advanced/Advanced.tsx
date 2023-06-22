import NavTabs from '~/components/tab/NavTabs'
import DepartmentAdvanced from './department/DepartmentAdvanced'
import RoomAdvanced from './room/RoomAdvanced'
import LockerAdvanced from './locker/LockerAdvanced'
import FolderAdvance from './folder/FolderAdvanced'
import { Apartment, Folder, MeetingRoom, ViewModule } from '@mui/icons-material'

const Advanced = () => {
  const tabs = [
    { label: 'Department', component: <DepartmentAdvanced />, icon: Apartment },
    { label: 'Room', component: <RoomAdvanced />, icon: MeetingRoom },
    { label: 'Locker', component: <LockerAdvanced />, icon: ViewModule },
    { label: 'Folder', component: <FolderAdvance />, icon: Folder }
  ]
  return (
    <>
      <NavTabs tabs={tabs} />
    </>
  )
}

export default Advanced
