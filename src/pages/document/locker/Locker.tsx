import { Breadcrumbs, Card, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Locker as LockerData } from '~/global/interface'
import useData from '~/hooks/useData'
const Locker = () => {
  const { did, rid } = useParams()
  const [data, setData] = useState<LockerData[]>([])
  const [dept, setDept] = useState('')
  const [room, setRoom] = useState('')
  const { documentTree } = useData()
  useEffect(() => {
    documentTree?.find((item) => {
      if (item.id === did) {
        setDept(item.name)
        item.rooms?.find((room) => {
          if (room.id === rid) {
            setRoom(room.name)
            setData(room.lockers)
          }
        })
      }
    })
  }, [did, documentTree, rid])
  return (
    <>
      <Breadcrumbs separator='>' sx={{ fontWeight: 600 }}>
        <Link to='/document'>DEPARTMENT</Link>
        <Link to={`/document/dept/${did}`}>{dept}</Link>
        <p>{room}</p>
      </Breadcrumbs>
      <Grid container spacing={3} columnSpacing={4} sx={{ marginTop: '0.5rem' }}>
        {data.map((item, index) => (
          <Grid key={index} item md={4}>
            <Link to={`/document/dept/${did}/room/${rid}/locker/${item.id}`}>
              <Card sx={{ p: '1rem' }}>{item.name}</Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Locker
