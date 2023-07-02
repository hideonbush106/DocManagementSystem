import React from 'react'
import { Box, Button, Modal } from '@mui/material'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import styled from 'styled-components'

const PdfView = () => {
  const PdfContainer = styled(Worker)`
    width: 30%;
  `
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '95vw',
      md: '60vw',
      lg: '40vw'
    },
    bgcolor: 'white',
    boxShadow: 24,
    maxHeight: {
      xs: '100vh',
      md: '80vh'
    }
  }
  return (
    <>
      <Button onClick={handleOpen}>Open PDF</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box>
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
            <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl='assets/progit.pdf' />
          </Worker>
        </Box>
      </Modal>
    </>
  )
}

export default PdfView
