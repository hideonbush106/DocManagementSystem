import { Grid, Typography } from '@mui/material'
import { DescriptionOutlined } from '@mui/icons-material'
import ModalLayout from './ModalLayout'
import FileCard from '../card/FileCard'
import { File } from '~/global/interface'
import { Link } from 'react-router-dom'

interface Props {
  open: boolean
  handleClose: () => void
  items: File[]
}

const SearchDocumentResult = ({ open, handleClose, items }: Props) => {
  return (
    <ModalLayout open={open} handleClose={handleClose}>
      <Typography
        sx={{
          fontWeight: 600,
          color: 'var(--black-color)',
          fontSize: {
            xs: '1.5rem',
            sm: '2rem'
          }
        }}
        variant='h4'
        textAlign='center'
        marginY='10px'
      >
        Search Document Result
      </Typography>
      {items.length > 0 ? (
        <Grid container spacing={3} sx={{ padding: '0.5rem' }}>
          {items.map((item) => (
            <Grid key={item.id} item xs={12} onClick={() => handleClose()}>
              <Link
                to={`/document/department/${item.folder.locker.room.department.id}/room/${item.folder.locker.room.id}/locker/${item.folder.locker.id}/folder/${item.folder.id}`}
              >
                <FileCard
                  icon={{ Component: DescriptionOutlined, color: '#84B1ED' }}
                  name={item.name}
                  fileId={item.id}
                  fileName={item.name}
                  id={item.id}
                  status={item.status}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant='h5' textAlign='center' marginY='10px' fontFamily='inherit'>
          There is no files
        </Typography>
      )}
    </ModalLayout>
  )
}

export default SearchDocumentResult
