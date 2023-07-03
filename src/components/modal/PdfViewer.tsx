import React from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import ModalLayout from './ModalLayout'
import { zoomPlugin, ZoomInIcon, ZoomOutIcon } from '@react-pdf-viewer/zoom'
import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode'
import { CreateNewFolderOutlined, FileOpen } from '@mui/icons-material'

interface PdfViewProps {
  open: boolean
  handleClose: () => void
}

const PdfView = (props: PdfViewProps) => {
  const { open, handleClose } = props
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
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
          <FileOpen fontSize='large' sx={{ color: 'var(--black-color)', mx: 1 }} />
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
          <Viewer fileUrl='assets/PROCESS_MATERIAL.pdf' />
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
          <Button sx={{ my: 1, mr: 1 }} variant='contained' color='primary' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </ModalLayout>
    </>
  )
}

export default PdfView
