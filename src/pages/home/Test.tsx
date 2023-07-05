import { Button } from '@mui/material'
import '@react-pdf-viewer/core/lib/styles/index.css'
import React, { useCallback, useEffect, useState } from 'react'
import PdfViewer from '~/components/modal/PdfViewer'
import useMedia from '~/hooks/api/useMedia'

const Test = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [fileUrl, setFileUrl] = useState<any>()
  const { getMedia } = useMedia()
  // const id = '0c08f2e8-b147-4612-ac7e-64f95b16e833'
  const id = '0c08f2e8-b147-4612-ac7e-64f95b16e833'

  const getDocument = useCallback(async () => {
    try {
      const response = await getMedia(id)
      const base64toBlob = (data: string) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length)

        const bytes = atob(base64WithoutPrefix)
        let length = bytes.length
        const out = new Uint8Array(length)

        while (length--) {
          out[length] = bytes.charCodeAt(length)
        }

        return new Blob([out], { type: 'application/pdf' })
      }
      const blob = base64toBlob(response)
      const url = URL.createObjectURL(blob)
      setFileUrl(url)
      console.log(url)
    } catch (error) {
      console.log(error)
    }
  }, [getMedia])

  useEffect(() => {
    getDocument()
  }, [getDocument])

  return (
    <>
      <Button onClick={handleOpen}>Open</Button>
      <PdfViewer fileUrl={fileUrl} open={open} handleClose={handleClose} />
    </>
  )
}

export default Test
