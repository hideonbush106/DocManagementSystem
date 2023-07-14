import { Box, Button, Modal, Typography } from '@mui/material'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { ArrowForward, Description } from '@mui/icons-material'
import { DocumentDetail } from '~/global/interface'
import useMedia from '~/hooks/api/useMedia'
import PdfViewer from './PdfViewer'
import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import * as React from 'react'
import { useReactToPrint } from 'react-to-print'

const TitleText = styled.span`
  font-weight: 600;
  font-family: var(--font-family);
`
const Text = styled(Typography)`
  font-size: 14px;
  margin-bottom: 4px;
  font-family: var(--font-family);
  @media (min-width: 400px) {
    font-size: 1rem;
    margin-bottom: 16px;
  }
`

const Print = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0;

  @media print {
    margin: 0;
    height: 50vh;
  }
`

interface DetailProps {
  document?: DocumentDetail
  barcode: string
  open: boolean
  onClose: () => void
}

const Detail = ({ document, barcode, open, onClose }: DetailProps) => {
  const qrCodeRef = React.useRef(null)
  const handlePrint = useReactToPrint({
    content: () => qrCodeRef.current,
    documentTitle: 'Print QR Code'
  })

  const getStatusColor = (status: string | undefined) => {
    if (status) {
      switch (status) {
        case 'REQUESTING':
          return 'var(--orange-color)'
        case 'PENDING':
          return 'var(--primary-color)'
        case 'AVAILABLE':
          return 'var(--green-color)'
        case 'BORROWED':
          return 'var(--red-color)'
        default:
          return 'var(--black-color)'
      }
    }
  }
  const { getMedia } = useMedia()
  const [fileUrl, setFileUrl] = useState<string>('initial')
  const [openPDF, setOpenPDF] = useState<boolean>(false)
  const style = {
    fontFamily: 'var(--font-family)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(100%, 600px)',
    bgcolor: 'var(--white-color)',
    borderRadius: '5px',
    boxShadow: 24,
    py: { xs: 3, sm: 6 },
    px: { xs: 3, sm: 6 },
    color: 'var(--black-color)'
  }

  const getFile = async () => {
    setOpenPDF(true)
    try {
      setFileUrl('initial')
      const response = await getMedia(document?.id || '')
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
    } catch (error) {
      console.log(error)
      setFileUrl('')
    }
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Box
            display={'inline-flex'}
            alignItems={'center'}
            sx={{
              width: '100%',
              mb: { sm: 4, xs: 2 },
              ml: -1
            }}
          >
            <Description sx={{ color: 'var(--black-color)', mr: 1 }} fontSize='large' />
            <Typography variant='h4' sx={{ fontSize: { sm: '2rem', xs: '1.5rem' }, fontWeight: '600' }}>
              Document Detail
            </Typography>
          </Box>
          <Text variant='body1'>
            <TitleText>File name: </TitleText> {document?.name}
          </Text>
          <Text variant='body1'>
            <TitleText>Description: </TitleText> {document?.description}
          </Text>
          <Text variant='body1'>
            <TitleText>Number of pages: </TitleText> {document?.numOfPages}
          </Text>
          <Text variant='body1'>
            <TitleText>Department: </TitleText>
            {document?.folder.locker.room.department.name}
          </Text>
          <Text variant='body1'>
            <TitleText>Category: </TitleText>
            {document?.category.name}
          </Text>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }} flexDirection={{ sm: 'row', xs: 'column' }}>
            <Text variant='body1'>
              <TitleText>Room: </TitleText>
              {document?.folder.locker.room.name}
            </Text>
            <Text variant='body1'>
              <TitleText>Locker: </TitleText>
              {document?.folder.locker.name}
            </Text>
            <Text variant='body1'>
              <TitleText>Folder: </TitleText>
              {document?.folder.name}
            </Text>
          </Box>
          <Text variant='body1'>
            <TitleText>Created at: </TitleText> {dayjs(document?.createdAt).format('MM/DD/YYYY HH:mm:ss')}
          </Text>
          <Text variant='body1'>
            <TitleText>Status: </TitleText>
            <span style={{ color: getStatusColor(document?.status), fontWeight: 600 }}>{document?.status}</span>
          </Text>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {barcode && (
              <Print ref={qrCodeRef}>
                <QRCodeSVG value={barcode} />
              </Print>
            )}
            <Box
              style={{
                width: '90%',
                height: '35px',
                display: 'flex',
                justifyContent: barcode ? 'space-between' : 'center'
              }}
              marginTop='1rem'
            >
              <Button
                size='small'
                variant='contained'
                onClick={getFile}
                sx={{ width: '95px', lineHeight: 1, fontFamily: 'var(--family-font)', boxShadow: 'none' }}
              >
                View PDF
              </Button>
              <PdfViewer fileUrl={fileUrl} open={openPDF} handleClose={() => setOpenPDF(false)} />
              {barcode && (
                <Button
                  size='small'
                  variant='outlined'
                  endIcon={<ArrowForward />}
                  sx={{ lineHeight: 1, fontFamily: 'var(--family-font)' }}
                  onClick={handlePrint}
                >
                  Export
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default Detail
