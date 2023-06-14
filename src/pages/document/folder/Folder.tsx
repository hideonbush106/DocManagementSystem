import { Breadcrumbs } from '@mui/material'
import { Link, useLocation, useParams } from 'react-router-dom'
import useData from '~/hooks/useData'
import { Folder as FolderType } from '~/global/interface'
import DocumentCardList from '~/components/card/DocumentCardList'

const Folder = () => {
  const { departmentId, roomId, lockerId } = useParams()
  const location = useLocation()
  const { documentMap } = useData()
  const department = documentMap.get(departmentId as string)
  const room = department?.roomMap?.get(roomId as string)
  const locker = room?.lockerMap?.get(lockerId as string)
  const folders = Array.from(locker?.folderMap as Map<string, FolderType>, ([, value]) => value)

  return (
    <>
      <Breadcrumbs separator='>' sx={{ fontWeight: 600 }}>
        <Link to='/document'>DEPARTMENT</Link>
        <Link to={`${location.pathname.substring(0, location.pathname.indexOf('room'))}`}>{department?.name}</Link>
        <Link to={`${location.pathname.substring(0, location.pathname.indexOf('locker'))}`}>{room?.name}</Link>
        <p>{locker?.name}</p>
      </Breadcrumbs>
      <DocumentCardList items={folders} type='folder' />
    </>
  )
}

export default Folder
