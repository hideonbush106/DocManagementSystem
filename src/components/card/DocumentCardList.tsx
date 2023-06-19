import { Grid, Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import DocumentCard from './DocumentCard'
import { Apartment, SvgIconComponent, Work, Lock, Folder, DescriptionOutlined } from '@mui/icons-material'
import useData from '~/hooks/useData'
import { fakeArray } from '~/utils/fakeArray'

type Props = {
  items: { id: string; name: string }[]
  type: 'department' | 'room' | 'locker' | 'folder' | 'file'
}

const DocumentCardList = (props: Props) => {
  const { loading } = useData()
  const { items, type } = props
  let icon: SvgIconComponent
  switch (type) {
    case 'department': {
      icon = Apartment
      break
    }
    case 'room': {
      icon = Work
      break
    }
    case 'locker': {
      icon = Lock
      break
    }
    case 'folder': {
      icon = Folder
      break
    }
    default: {
      icon = DescriptionOutlined
    }
  }

  return (
    <Grid container spacing={3} sx={{ marginTop: '0.5rem' }}>
      {!loading
        ? items.map((item) => (
            <Grid key={item.id} item xs={12} sm={4} md={6} lg={4}>
              <Link to={`${type}/${item.id}`}>
                <DocumentCard icon={icon} name={item.name} key={item.id} />
              </Link>
            </Grid>
          ))
        : fakeArray(6).map((_, index) => (
            <Grid key={index} item xs={12} sm={4} md={6} lg={4}>
              <Skeleton animation='wave' variant='rounded' width='15rem' height='3rem' />
            </Grid>
          ))}
    </Grid>
  )
}

export default DocumentCardList
