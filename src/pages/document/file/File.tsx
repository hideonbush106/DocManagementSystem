import { Breadcrumbs } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import DocumentCardList from '~/components/card/DocumentCardList'
import useData from '~/hooks/useData'

const File = () => {
  const { departmentId, roomId, lockerId, folderId } = useParams()
  const { documentMap } = useData()
  const department = documentMap.get(departmentId as string)
  const room = department?.roomMap?.get(roomId as string)
  const locker = room?.lockerMap?.get(lockerId as string)
  const folder = locker?.folderMap?.get(folderId as string)
  const files = folder?.files?.map((file) => ({ id: file.id, name: file.name }))

  return (
    <>
      <Breadcrumbs separator='>' sx={{ fontWeight: 600 }}>
        <Link to='/document'>DEPARTMENT</Link>
        <Link to={`${location.pathname.substring(0, location.pathname.indexOf('room'))}`}>{department?.name}</Link>
        <Link to={`${location.pathname.substring(0, location.pathname.indexOf('locker'))}`}>{room?.name}</Link>
        <Link to={`${location.pathname.substring(0, location.pathname.indexOf('room'))}`}>{locker?.name}</Link>
        <p>{folder?.name}</p>
      </Breadcrumbs>
      <DocumentCardList type='locker' items={files ? files : []} />
    </>
  )
}

export default File
