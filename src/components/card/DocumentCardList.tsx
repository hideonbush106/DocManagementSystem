import { Grid, Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import DocumentCard from './DocumentCard'
import { Apartment, SvgIconComponent, Folder, DescriptionOutlined, MeetingRoom, ViewModule } from '@mui/icons-material'
import FileCard from './FileCard'
import { useEffect, useState } from 'react'

type Props = {
  items: {
    id: string
    name: string
  }[]
  type: 'department' | 'room' | 'locker' | 'folder' | 'file'
  itemId?: string | null
}

const DocumentCardList = (props: Props) => {
  const { items, type } = props
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (props.itemId) {
      const itemIndex = items.findIndex((item) => item.id === props.itemId)
      if (itemIndex !== -1) setPage(Math.ceil(itemIndex / 6))
    }
  }, [props.itemId, items])

  const totalPages = Math.ceil(items.length / 6)

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  // sort by name
  items.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

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
      icon = { Component: MeetingRoom }
      break
    }
    case 'locker': {
      icon = { Component: ViewModule }
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
    <Grid container height='96.5%'>
      <Grid item container spacing={3} sx={{ marginTop: '0.5rem' }} height='fit-content'>
        {items.slice((page - 1) * 6, (page - 1) * 6 + 6).map((item) => (
          <Grid key={item.id} item xs={12} sm={4} md={6} lg={4}>
            {type === 'file' ? (
              <FileCard icon={icon} name={item.name} fileId={item.id} fileName={item.name} id={item.id} action />
            ) : (
              <Link to={`${type}/${item.id}`}>
                <DocumentCard icon={icon} name={item.name} key={item.id} />
              </Link>
            )}
          </Grid>
        ))}
      </Grid>
      <Grid item mt='auto'>
        <Pagination
          size='large'
          count={totalPages}
          page={page}
          onChange={handleChange}
          variant='outlined'
          shape='rounded'
        />
      </Grid>
    </Grid>
  )
}

export default DocumentCardList
