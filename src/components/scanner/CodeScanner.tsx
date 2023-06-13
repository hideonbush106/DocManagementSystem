import { CameraAltOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material'
import { useState } from 'react'
import { useMediaDevices } from 'react-media-devices'
import { useZxing } from 'react-zxing'

const CodeScanner = () => {
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      {!result ? (
        <Paper
          square
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: {
              lg: '50%',
              md: '70%',
              sm: '90%'
            },
            p: 3
          }}
        >
          <CameraAltOutlined
            color='primary'
            sx={{
              fontSize: {
                lg: 80,
                md: 50,
                sm: 40
              },
              m: '0 auto'
            }}
          />
          <Typography
            variant='h6'
            align='center'
            sx={{
              mt: 2
            }}
          >
            {`Please move your camera over document's barcode`}
          </Typography>
          <Box sx={{ width: 'fit-content', display: 'flex', my: 2, justifyContent: 'center' }}>
            <video ref={ref} width='80%'>
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
          <Box>
            <Button sx={{ mx: 1 }}>Back</Button>
          </Box>
        </Paper>
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
    </Box>
  )
}

export default CodeScanner
