import ModalLayout from './ModalLayout'
import { Box, Button, Typography } from '@mui/material'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { notifySuccess } from '~/global/toastify'

interface DeleteModalProps {
  open: boolean
  handleClose: () => void
  id: string
  name: string
  reFecthData: () => void
}

const ConfirmDeletePendingModal = ({ open, handleClose, id, name, reFecthData }: DeleteModalProps) => {
  const { deletePendingDocument } = useDocumentApi()

  const handleDeleteDocument = async (id: string) => {
    try {
      await deletePendingDocument(id)
      notifySuccess('Document deleted successfully')
      reFecthData()
    } catch (error) {
      console.log(error)
    } finally {
      handleClose()
    }
  }

  return (
    <ModalLayout open={open} handleClose={handleClose}>
      <Box
        display={'inline-flex'}
        sx={{
          p: {
            xs: 1.5,
            sm: 3
          },
          width: '100%'
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: 'var(--black-color)',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem'
            },
            fontFamily: 'inherit',
            mx: 1
          }}
          variant='h4'
        >
          Delete
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          px: {
            xs: 2.5,
            sm: 4
          }
        }}
      >
        <Typography
          sx={{
            color: 'var(--black-color)',
            my: 1.5,
            fontSize: {
              xs: '1.1rem',
              sm: '1.3rem'
            },
            fontFamily: 'inherit'
          }}
          variant='body2'
        >
          Are you sure you want to delete&nbsp;
          <span style={{ fontWeight: '600' }}>{name}</span>?
        </Typography>
      </Box>
      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 4
          },
          background: 'white',
          display: 'flex',
          justifyContent: 'end',
          width: '100%'
        }}
      >
        <Button
          sx={{ m: 1, mr: 1 }}
          variant='contained'
          color='error'
          onClick={() => handleDeleteDocument(id)}
          style={{ fontFamily: 'inherit' }}
        >
          Delete
        </Button>
      </Box>
    </ModalLayout>
  )
}

export default ConfirmDeletePendingModal
