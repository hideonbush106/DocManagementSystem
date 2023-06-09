import { Breadcrumbs, Card, Grid, Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import useData from '~/hooks/useData'
import { fakeArray } from '~/utils/fakeArray'
const Department = () => {
  const { documentTree, loading } = useData()
  return (
    <>
      <Breadcrumbs separator='/' sx={{ fontWeight: 600 }}>
        <Link to='/document'>DEPARTMENT</Link>
      </Breadcrumbs>
      <Grid container spacing={3} columnSpacing={4} sx={{ marginTop: '0.5rem' }}>
        {loading
          ? documentTree?.map((item, index) => (
              <Grid key={index} item md={4}>
                <Link to={`/document/dept/${item.id}`}>
                  <Card sx={{ p: '1rem' }}>{item.name}</Card>
                </Link>
              </Grid>
            ))
          : fakeArray(6).map((_, index) => (
              <Grid key={index} item md={4}>
                <Skeleton animation='wave' variant='rounded' height='3rem' />
              </Grid>
            ))}
      </Grid>
    </>
  )
}

export default Department
