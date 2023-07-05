import { Button } from '@mui/material'
import '@react-pdf-viewer/core/lib/styles/index.css'
import React, { useCallback, useEffect, useState } from 'react'
import PdfViewer from '~/components/modal/PdfViewer'
import useMedia from '~/hooks/api/useMedia'
import { inflate } from 'pako'

const Test = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [fileUrl, setFileUrl] = useState<any>()
  const { getMedia } = useMedia()
  // const id = '0c08f2e8-b147-4612-ac7e-64f95b16e833'
  const id = '0c08f2e8-b147-4612-ac7e-64f95b16e833'
  const getDocuemnt = useCallback(async () => {
    try {
      const response = await getMedia(id)
      const file = new Blob([response], { type: 'application/pdf;charset=utf-8' })
      const fileURL = URL.createObjectURL(file)
      setFileUrl(fileURL)
      console.log(fileURL)
    } catch (error) {
      console.log(error)
    }
  }, [getMedia])

  useEffect(() => {
    getDocuemnt()
  }, [getDocuemnt])

  return (
    <>
      <Button onClick={handleOpen}>Open</Button>
      <PdfViewer fileUrl={fileUrl} open={open} handleClose={handleClose} />
    </>
  )
}

export default Test
