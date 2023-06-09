import { Card, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

type Props = {
  items: { id: string; name: string }[]
  type: 'department' | 'room' | 'locker' | 'folder' | 'file'
}

const DocumentCardList = (props: Props) => {
  const { items, type } = props
  return (
    <Grid container spacing={3} sx={{ marginTop: '0.5rem' }}>
      {items.map((item) => (
        <Grid key={item.id} item xs={12} md={6} lg={4}>
          <Link to={`/${type}?id=${item.id}`}>
            <Card sx={{ p: '1rem' }}>{item.name}</Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}

export default DocumentCardList
