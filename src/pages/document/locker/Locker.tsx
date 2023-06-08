import { Breadcrumbs, Card, Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { fakeData } from '~/shared/fakeData'

const Locker = () => {
  const { did, rid } = useParams()
  const roomId = Number(rid)
  const deptId = Number(did)
  return (
    <>
      <Breadcrumbs separator='/'>
        <Link to='/document'>{fakeData[deptId - 1].department}</Link>
        <Link to={`/document/dept/${fakeData[deptId - 1].id}`}>{fakeData[deptId - 1].room[roomId - 1].name}</Link>
      </Breadcrumbs>
      <Grid container spacing={3} columnSpacing={4} sx={{ marginTop: '0.5rem' }}>
        {fakeData[deptId - 1].room[roomId - 1].locker.map((item, index) => (
          <Grid key={index} item md={4}>
            <Link to={`/document/dept/${did}/room/${roomId}/locker/${item.id}`}>
              <Card sx={{ p: '1rem' }}>{item.name}</Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Locker
