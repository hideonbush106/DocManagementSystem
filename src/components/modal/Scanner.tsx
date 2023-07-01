import QrReader from 'react-qr-reader'
import ModalLayout from './ModalLayout'
import { Box, Button, Grid, Typography } from '@mui/material'
import useDocumentApi from '~/hooks/api/useDocumentApi'

interface CodeScannerProps {
  open: boolean
  documentId: string
  handleClose: () => void
}

const Scanner = (props: CodeScannerProps) => {
  const { open, handleClose, documentId } = props
  // const [startScan, setStartScan] = useState(false)
  // const [loadingScan, setLoadingScan] = useState(false)
  const { confirmDocument } = useDocumentApi()
  const handleScan = async (scanData: string | null) => {
    // setLoadingScan(true)
    if (scanData && scanData !== '') {
      // setStartScan(false)
      // setLoadingScan(false)
      // setPrecScan(scanData);
      try {
        const result = await confirmDocument({
          id: documentId,
          locationQRcode: scanData
        })
        console.log(result)
        handleClose()
        window.location.reload()
      } catch (error) {
        console.log(error)
        handleClose()
      }
    }
  }
  const handleError = (err: string) => {
    console.error(err)
  }

  return (
    <ModalLayout open={open} handleClose={handleClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', p: 2.5 }}>
        <Typography
          variant='h6'
          align='center'
          sx={{
            mt: 2
          }}
        >
          {`Please move your camera over location's QR code`}
        </Typography>
        <Grid container justifyContent='center' sx={{ width: '100%', my: 2 }}>
          <Grid item xs={12} sm={8} md={8}>
            <QrReader style={{ width: 'inherit' }} facingMode='environment' onScan={handleScan} onError={handleError} />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Button
          sx={{ m: 2, float: 'right' }}
          variant='outlined'
          color='error'
          onClick={() => {
            handleClose()
          }}
        >
          Cancel
        </Button>
      </Box>
    </ModalLayout>
  )
}

export default Scanner
