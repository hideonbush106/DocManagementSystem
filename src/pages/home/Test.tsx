import { Button } from '@mui/material'
import '@react-pdf-viewer/core/lib/styles/index.css'
import React from 'react'
import PdfViewer from '~/components/modal/PdfViewer'

const Test = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Button onClick={handleOpen}>Open</Button>
      <PdfViewer open={open} handleClose={handleClose} />
    </>
  )
}

export default Test
