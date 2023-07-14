import { Breadcrumbs } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import DocumentCardList from '~/components/card/DocumentCardList'
import { Locker as LockerType } from '~/global/interface'
import useData from '~/hooks/useData'

const Locker = () => {
  const { departmentId, roomId } = useParams()
  const { documentMap } = useData()
  const department = documentMap.get(departmentId as string)
  const room = department?.roomMap?.get(roomId as string)
  const lockers = Array.from(room?.lockerMap as Map<string, LockerType>, ([, value]) => value)

  return (
    <>
      <Breadcrumbs separator='>' sx={{ fontWeight: 600 }}>
        <Link to='/document'>DEPARTMENT</Link>
        <Link to={`${location.pathname.substring(0, location.pathname.indexOf('room'))}`}>{department?.name}</Link>
        <p>{room?.name}</p>
      </Breadcrumbs>
      <DocumentCardList type='locker' items={lockers} />
    </>
  )
}

export default Locker
