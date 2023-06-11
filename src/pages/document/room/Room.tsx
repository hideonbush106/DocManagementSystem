import { Breadcrumbs } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import useData from '~/hooks/useData'
import DocumentCardList from '~/components/card/DocumentCardList'
import { Room as RoomType } from '~/global/interface'

const Room = () => {
  const { departmentId } = useParams()
  const { documentMap } = useData()
  const department = documentMap.get(departmentId as string)
  const rooms = Array.from(department?.roomMap as Map<string, RoomType>, ([, value]) => value)

  return (
    <>
      <Breadcrumbs separator='>' sx={{ fontWeight: 600 }}>
        <Link to='/document'>DEPARTMENT</Link>
        <p>{department?.name}</p>
      </Breadcrumbs>
      <DocumentCardList type='room' items={rooms} />
    </>
  )
}

export default Room
