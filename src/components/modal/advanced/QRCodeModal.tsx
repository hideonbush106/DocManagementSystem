import { Box, Button, Modal, Typography } from '@mui/material'
import styled from 'styled-components'
import { ArrowForward } from '@mui/icons-material'
import { QRCodeSVG } from 'qrcode.react'
import * as React from 'react'
import { useReactToPrint } from 'react-to-print'

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

interface QRCodeModalProps {
  open: boolean
  onClose: () => void
  qrCode: string
}

const QRCodeModal = ({ open, onClose, qrCode }: QRCodeModalProps) => {
  const qrCodeRef = React.useRef(null)
  const handlePrint = useReactToPrint({
    content: () => qrCodeRef.current,
    documentTitle: 'Print QR Code'
  })
  const style = {
    fontFamily: 'var(--font-family)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(100%, 500px)',
    bgcolor: 'var(--white-color)',
    borderRadius: '5px',
    boxShadow: 24,
    py: 3,
    px: 3,
    color: 'var(--black-color)'
  }

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Box
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{
              width: '100%',
              m: '1rem 0'
            }}
          >
            <Typography variant='h4' sx={{ fontSize: '2rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
              Folder QR Code
            </Typography>
          </Box>
          <Print ref={qrCodeRef}>
            <QRCodeSVG value={qrCode} height={200} width={180} />
          </Print>
          <Box
            style={{
              width: '100%',
              height: '35px',
              display: 'flex',
              justifyContent: 'center'
            }}
            marginTop='2rem'
          >
            <Button
              size='small'
              variant='outlined'
              endIcon={<ArrowForward />}
              sx={{ lineHeight: 1, fontFamily: 'var(--family-font)' }}
              onClick={handlePrint}
            >
              Export
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default QRCodeModal
