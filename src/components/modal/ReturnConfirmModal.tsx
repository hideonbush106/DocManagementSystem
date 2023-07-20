import { Info } from '@mui/icons-material'
import ModalLayout from './ModalLayout'
import { Box, Button, Typography } from '@mui/material'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { notifySuccess } from '~/global/toastify'

interface ReturnModalProps {
  open: boolean
  handleClose: () => void
  response: {
    data: string
    message: string
    details?: string
  }
  scanData: string | null
}

const ReturnConfirmModal = (props: ReturnModalProps) => {
  const { open, handleClose, response, scanData } = props
  const { returnDocument } = useDocumentApi()

  const handleReturnDocument = async () => {
    try {
      await returnDocument(scanData)
      notifySuccess('Document returned successfully')
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
          position: 'sticky',
          top: 0,
          background: 'white',
          zIndex: 1,
          width: '100%',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }}
      >
        <Info fontSize='large' sx={{ color: 'var(--black-color)', mx: 1 }} />
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
        >
          Return Confirmation
        </Typography>
      </Box>

      <Box
        sx={{
          p: 1.5,
          position: 'sticky',
          bottom: -1,
          zIndex: 1,
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          width: '100%',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            textAlign: 'center',
            color: 'var(--black-color)',
            my: 6
          }}
          variant='h6'
        >
          {response.data}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Button sx={{ my: 1, mr: 1 }} variant='contained' onClick={handleReturnDocument} color='primary'>
            Continue
          </Button>
          <Button sx={{ my: 1, mr: 1 }} variant='outlined' color='error' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </ModalLayout>
  )
}

export default ReturnConfirmModal
