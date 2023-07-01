import QrReader from 'react-qr-reader'
import ModalLayout from './ModalLayout'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import { useState } from 'react'

interface CodeScannerProps {
  open: boolean
  handleClose: () => void
}

const Scanner = (props: CodeScannerProps) => {
  const { open, handleClose } = props
  // const [startScan, setStartScan] = useState(false)
  // const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')

  const handleScan = async (scanData: string | null) => {
    // setLoadingScan(true)
    console.log(`loaded data data`, scanData)
    if (scanData && scanData !== '') {
      console.log(`loaded >>>`, scanData)
      setData(scanData)
      // setStartScan(false)
      // setLoadingScan(false)
      // setPrecScan(scanData);
    }
  }
  const handleError = (err: string) => {
    console.error(err)
  }

  return (
    <ModalLayout open={open} handleClose={handleClose}>
      {!data ? (
        <>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center', p: 2.5 }}
          >
            <Typography
              variant='h6'
              align='center'
              sx={{
                mt: 2
              }}
            >
              {`Please move your camera over document's barcode`}
            </Typography>
            <Grid container justifyContent='center' sx={{ width: '100%', my: 2 }}>
              <Grid item xs={12} sm={8} md={8}>
                <QrReader facingMode='environment' onScan={handleScan} onError={handleError} />
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
                setData('')
              }}
            >
              Cancel
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Paper>
            <Typography
              variant='h6'
              align='center'
              sx={{
                mt: 2
              }}
            >
              {data}
            </Typography>
          </Paper>
          <Button sx={{ mx: 1 }} variant='contained' onClick={() => setData('')}>
            Reset
          </Button>
        </>
      )}
    </ModalLayout>
  )
}

export default Scanner
