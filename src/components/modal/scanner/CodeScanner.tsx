import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import { useState } from 'react'
import { useMediaDevices } from 'react-media-devices'
import { useZxing } from 'react-zxing'
interface CodeScannerProps {
  handleClose: () => void
}
const CodeScanner = (props: CodeScannerProps) => {
  const constraints: MediaStreamConstraints = {
    video: true,
    audio: false
  }

  const { devices } = useMediaDevices({
    constraints: constraints
  })
  const videoDevicesList = devices?.filter((device) => device.kind === 'videoinput')
  const [videoDevice, setVideoDevice] = useState(videoDevicesList?.[1].deviceId)
  const [result, setResult] = useState<string>('')
  const { ref } = useZxing({
    deviceId: videoDevice,
    paused: !!result,
    onResult(result) {
      console.log(result.getBarcodeFormat())
      setResult(result.getText())
    }
  })

  return (
    <Box sx={{ px: 5, py: 3 }}>
      {!result ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
          <Typography
            variant='h6'
            align='center'
            sx={{
              mt: 2
            }}
          >
            {`Please move your camera over document's barcode`}
          </Typography>
          <Box sx={{ width: '100%', display: 'flex', my: 2, justifyContent: 'center' }}>
            <video ref={ref} width='60%'>
              <track kind='captions' />
            </video>
          </Box>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Device list</InputLabel>
            <Select
              defaultValue={videoDevicesList?.[0].deviceId}
              label='device list'
              value={videoDevice}
              onChange={(e) => setVideoDevice(e.target.value)}
            >
              {videoDevicesList?.map((device, index) => (
                <MenuItem key={index} value={device.deviceId}>
                  {device.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
              {result}
            </Typography>
          </Paper>
          <Button sx={{ mx: 1 }} variant='contained' onClick={() => setResult('')}>
            Reset
          </Button>
        </>
      )}
      <Button sx={{ my: 1 }} color='error' onClick={props.handleClose}>
        Cancel
      </Button>
    </Box>
  )
}

export default CodeScanner
