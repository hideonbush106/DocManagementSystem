import { useNavigate } from 'react-router-dom'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { DescriptionOutlined } from '@mui/icons-material'
import ModalLayout from './ModalLayout'
import FileCard from '../card/FileCard'
import { File } from '~/global/interface'

interface Props {
  open: boolean
  handleClose: () => void
  items: File[]
  loading: boolean
}

const SearchDocumentResult = ({ open, handleClose, items, loading }: Props) => {
  const navigate = useNavigate()
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
      {!loading ? (
        items && items.length > 0 ? (
          <Grid container>
            {items.map((item) => (
              <Grid
                key={item.id}
                item
                xs={12}
                sx={{ '&:not(:last-child)': { borderBottom: '1px solid #84B1ED' } }}
                padding='5px'
              >
                <FileCard
                  icon={{ Component: DescriptionOutlined, color: '#84B1ED' }}
                  name={item.name}
                  fileId={item.id}
                  fileName={item.name}
                  id={item.id}
                  action
                  onClick={() => {
                    handleClose()
                    navigate(
                      `/document/department/${item.folder?.locker?.room?.department?.id}/room/${item.folder?.locker?.room?.id}/locker/${item.folder?.locker?.id}/folder/${item.folder?.id}`
                    )
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant='h5' textAlign='center' marginY='10px' fontFamily='inherit'>
            There is no files
          </Typography>
        )
      ) : (
        <Box sx={{ display: 'flex', height: '200px' }} justifyContent='center' alignItems='center'>
          <CircularProgress size={40} />
        </Box>
      )}
    </ModalLayout>
  )
}

export default SearchDocumentResult
