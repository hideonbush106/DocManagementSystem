import { Button } from '@mui/material'
import '@react-pdf-viewer/core/lib/styles/index.css'
import React, { useCallback, useEffect, useState } from 'react'
import PdfViewer from '~/components/modal/PdfViewer'
import useMedia from '~/hooks/api/useMedia'

const Test = () => {
  const [open, setOpen] = React.useState(false)

  const handleClose = () => setOpen(false)
  const [fileUrl, setFileUrl] = useState<string>('')
  const { getMedia } = useMedia()
  // const id = '0c08f2e8-b147-4612-ac7e-64f95b16e833' //API .pdf
  // const id = '5a9b1011-8e3b-44b1-a2e2-530c858a1e9b' //usecase .pdf
  // const id = 'becc3d6e-9dc2-45e3-955f-24473c829ecc' //srs
  const id = 'e07c68b2-112a-4cc1-b33e-3764861b2eb1' //process material
  // const id = 'cb49cf1c-569b-4385-aa31-b11d97063d09'
  const getFile = async () => {
    try {
      const response = await getMedia(id)
      const base64toBlob = (data: string) => {
        const bytes = atob(data)
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
  }
  const handleOpen = () => {
    setOpen(true)
    getFile()
  }

  return (
    <>
      <Button onClick={handleOpen}>Open</Button>
      <PdfViewer fileUrl={fileUrl} open={open} handleClose={handleClose} />
    </>
  )
}

export default Test
