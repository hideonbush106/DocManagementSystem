import { Grid, Pagination } from '@mui/material'
import { Link } from 'react-router-dom'
import DocumentCard from './DocumentCard'
import { Apartment, SvgIconComponent, Folder, DescriptionOutlined, MeetingRoom, ViewModule } from '@mui/icons-material'
import FileCard from './FileCard'
import { useEffect, useState } from 'react'
import { DocumentStatus } from '~/global/enum'

type Props = {
  items: {
    id: string
    name: string
    status?: DocumentStatus
  }[]
  type: 'department' | 'room' | 'locker' | 'folder' | 'file'
  itemId?: string | null
  fetchFolder?: () => void
}

const DocumentCardList = (props: Props) => {
  const ITEMS_PER_PAGE = 15
  const { items, type } = props
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (props.itemId) {
      const itemIndex = items.findIndex((item) => item.id === props.itemId)
      if (itemIndex !== -1) setPage(Math.ceil(itemIndex + 1 / ITEMS_PER_PAGE))
    }
  }, [props.itemId, items])

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)

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
    <Grid container height='calc(100% - 24px)' alignContent={'space-between'}>
      <Grid item container spacing={3} sx={{ marginTop: '0.5rem' }} height='fit-content'>
        {items.slice((page - 1) * ITEMS_PER_PAGE, (page - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE).map((item) => (
          <Grid key={item.id} item xs={12} sm={4} md={6} lg={4}>
            {type === 'file' ? (
              <FileCard
                icon={icon}
                name={item.name}
                fileId={item.id}
                fileName={item.name}
                status={item.status as DocumentStatus}
                id={item.id}
                action
                fetchFolder={props.fetchFolder}
              />
            ) : (
              <Link to={`${type}/${item.id}`}>
                <DocumentCard icon={icon} name={item.name} key={item.id} />
              </Link>
            )}
          </Grid>
        ))}
      </Grid>
      <Grid item xs={10} mt={'2rem'} height={'fit-content'}>
        <Pagination
          size='large'
          count={totalPages}
          page={page}
          onChange={handleChange}
          variant='outlined'
          shape='rounded'
          sx={{ '& .MuiPagination-ul': { gap: '5px 0' } }}
        />
      </Grid>
    </Grid>
  )
}

export default DocumentCardList
