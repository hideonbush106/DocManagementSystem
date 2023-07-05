import { Box, Button, Modal, Typography } from '@mui/material'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { PictureAsPdf, Warning } from '@mui/icons-material'

interface PdfViewProps {
  open: boolean
  handleClose: () => void
  fileUrl: string
}

const PdfViewer = (props: PdfViewProps) => {
  const { open, handleClose, fileUrl } = props
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    bgcolor: 'white',
    boxShadow: 24,
    maxHeight: '90vh'
  }

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component={'div'} style={{ overflowY: 'auto' }}>
          <Box
            display={'inline-flex'}
            sx={{
              p: {
                xs: 0.75,
                sm: 1.5
              },
              position: 'sticky',
              top: 0,
              background: 'white',
              zIndex: 1,
              width: '100%',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            }}
          >
            <PictureAsPdf fontSize='large' sx={{ color: 'var(--black-color)', mx: 1 }} />
            <Typography
              sx={{
                fontWeight: 600,
                color: 'var(--black-color)',
                fontSize: {
                  xs: '1.5rem',
                  sm: '2rem'
                }
              }}
              variant='h5'
            >
              Document Preview
            </Typography>
          </Box>
          {fileUrl ? (
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js'>
              <Viewer fileUrl={fileUrl} />
            </Worker>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                height: '70vh',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Warning color='warning' sx={{ textAlign: 'center', width: '10rem', height: '10rem' }} />
              <Typography variant='h4' align='center'>
                404 Not Found
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              p: 1.5,
              position: 'sticky',
              bottom: -1,
              zIndex: 1,
              background: 'white',
              display: 'flex',
              justifyContent: 'end',
              width: '100%',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            }}
          >
            <Button sx={{ my: 1, mr: 1 }} variant='outlined' color='error' onClick={handleClose}>
              Return
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default PdfViewer
