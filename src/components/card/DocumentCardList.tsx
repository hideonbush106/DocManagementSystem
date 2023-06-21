import { Grid, Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'
import DocumentCard from './DocumentCard'
import { Apartment, SvgIconComponent, Work, Lock, Folder, DescriptionOutlined } from '@mui/icons-material'
import FileCard from './FileCard'

type Props = {
  items: { id: string; name: string }[]
  type: 'department' | 'room' | 'locker' | 'folder' | 'file'
}

const DocumentCardList = (props: Props) => {
  const { loading } = useData()
  const { items, type } = props
  let icon: {
    Component: SvgIconComponent
    color?: string
  }
  switch (type) {
    case 'department': {
      icon = { Component: Apartment }
      break
    }
    case 'room': {
      icon = { Component: Work }
      break
    }
    case 'locker': {
      icon = { Component: Lock }
      break
    }
    case 'folder': {
      icon = { Component: Folder }
      break
    }
    default: {
      icon = { Component: DescriptionOutlined, color: '#84B1ED' }
    }
  }

  return (
    <Grid container spacing={3} sx={{ marginTop: '0.5rem' }}>
      {items.map((item) => (
        <Grid key={item.id} item xs={12} md={6} lg={4}>
          {type === 'file' ? (
            <FileCard icon={icon} name={item.name} />
          ) : (
            <Link to={`${type}/${item.id}`}>
              <DocumentCard icon={icon} name={item.name} key={item.id} />
            </Link>
          )}
        </Grid>
      ))}
    </Grid>
  )
}

export default DocumentCardList
