import { Card, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { fakeData } from '~/shared/fakeData'

const Department = () => {
  return (
    <>
      <Grid container spacing={3} columnSpacing={4} sx={{ marginTop: '0.5rem' }}>
        {fakeData.map((item, index) => (
          <Grid key={index} item md={4}>
            <Link to={`/document/dept/${item.id}`}>
              <Card sx={{ p: '1rem' }}>{item.department}</Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Department
