import { Breadcrumbs, Card, Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { Room as RoomData } from '~/global/interface'
import { useEffect, useState } from 'react'
import useData from '~/hooks/useData'
const Room = () => {
  const { did } = useParams()
  const [data, setData] = useState<RoomData[]>([])
  const [dept, setDept] = useState('')
  const { documentTree } = useData()
  useEffect(() => {
    documentTree?.find((item) => {
      if (item.id === did) {
        setDept(item.name)
        setData(item.rooms)
      }
    })
  }, [did, documentTree])
  return (
    <>
      <Breadcrumbs separator='>' sx={{ fontWeight: 600 }}>
        <Link to='/document'>DEPARTMENT</Link>
        <Link to={`/document/dept/${did}`}>{dept}</Link>
      </Breadcrumbs>
      <Grid container spacing={3} columnSpacing={4} sx={{ marginTop: '0.5rem' }}>
        {data.map((item, index) => (
          <Grid key={index} item md={4}>
            <Link to={`/document/dept/${did}/room/${item.id}`}>
              <Card sx={{ p: '1rem' }}>{item.name}</Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Room
