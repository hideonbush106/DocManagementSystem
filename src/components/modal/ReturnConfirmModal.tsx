import { Info } from '@mui/icons-material'
import ModalLayout from './ModalLayout'
import { Box, Button, TextField, Typography } from '@mui/material'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { notifySuccess } from '~/global/toastify'
import { useState } from 'react'

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
  const [note, setNote] = useState<string | null>(null)
  const handleReturnDocument = async () => {
    try {
      if (note) {
        await returnDocument(scanData, note)
      } else {
        await returnDocument(scanData)
      }
      notifySuccess('Return document successfully')
    } catch (error) {
      console.log(error)
    } finally {
      handleClose()
    }
  }

  const noteHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value)
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
          px: 7,
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
        {response.data === 'Document can be returned but late.' ? (
          <>
            <form
              method='POST'
              onSubmit={(event) => {
                event.preventDefault()
                handleReturnDocument()
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
                <TextField
                  required
                  sx={{ my: 2 }}
                  variant='outlined'
                  onChange={noteHandleChange}
                  rows={4}
                  multiline
                  value={note}
                  label='Note'
                  fullWidth
                  name='note'
                />
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  sx={{ my: 1, mr: 1 }}
                  variant='contained'
                  disabled={note === null || note === '' || note.length < 10 || note.length > 100}
                  onClick={handleReturnDocument}
                  color='primary'
                >
                  Continue
                </Button>
                <Button sx={{ my: 1, mr: 1 }} variant='outlined' color='error' onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </form>
          </>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </ModalLayout>
  )
}

export default ReturnConfirmModal
