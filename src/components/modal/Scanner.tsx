import QrReader from 'react-qr-reader'
import ModalLayout from './ModalLayout'
import { Box, Button, Grid, Typography } from '@mui/material'

interface CodeScannerProps {
  open: boolean
  handleClose: () => void
  handleScan: (data: string | null) => void
}

const Scanner = (props: CodeScannerProps) => {
  const { open, handleClose, handleScan } = props
  // const [startScan, setStartScan] = useState(false)
  // const [loadingScan, setLoadingScan] = useState(false)
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
