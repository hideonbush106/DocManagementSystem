import { Box, Button, Typography } from '@mui/material'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import ModalLayout from './ModalLayout'
import { PictureAsPdf } from '@mui/icons-material'

interface PdfViewProps {
  open: boolean
  handleClose: () => void
  fileUrl: any
}

const PdfView = (props: PdfViewProps) => {
  const { open, handleClose, fileUrl } = props
  return (
    <>
      <ModalLayout open={open} handleClose={handleClose}>
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
            variant='h4'
          >
            Document Name
          </Typography>
        </Box>
        <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.8.162/build/pdf.worker.min.js'>
          <Viewer fileUrl={fileUrl} />
        </Worker>
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
      </ModalLayout>
    </>
  )
}

export default PdfView
