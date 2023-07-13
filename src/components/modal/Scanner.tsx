import QrReader from 'react-qr-reader'
import { Box, Button, Grid, Modal, Typography } from '@mui/material'

interface CodeScannerProps {
  open: boolean
  handleClose: () => void
  handleScan: (data: string | null) => void
  scanning: boolean
}

const Scanner = (props: CodeScannerProps) => {
  const { open, handleClose, handleScan, scanning } = props
  // const [startScan, setStartScan] = useState(false)
  // const [loadingScan, setLoadingScan] = useState(false)
  const handleError = (err: string) => {
    console.error(err)
  }
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
    boxShadow: 24
  }
  return (
    <>
      {scanning && (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style} component={'div'} style={{ overflowY: 'auto' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
                p: 2.5
              }}
            >
              <Typography
                variant='h6'
                align='center'
                sx={{
                  mt: 2
                }}
              >
                {`Please move your camera over QR code`}
              </Typography>
              <Grid
                container
                justifyContent='center'
                sx={{ width: { xs: '100%', sm: '80%', md: '100%', lg: '100%' }, alignSelf: 'center', my: 2 }}
              >
                <Grid item xs={12} sm={8} md={8}>
                  <QrReader
                    delay={1000}
                    style={{ width: 'inherit' }}
                    facingMode='environment'
                    onScan={handleScan}
                    onError={handleError}
                  />
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
          </Box>
        </Modal>
      )}
    </>
  )
}

export default Scanner
