import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
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
  const [videoDevice, setVideoDevice] = useState(videoDevicesList?.[0].deviceId)
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
    <div>
      {!result ? (
        <div>
          <div style={{ width: '500px', objectFit: 'cover' }}>
            <video ref={ref}>
              <track kind='captions' />
            </video>
          </div>
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
        </div>
      ) : (
        ''
      )}
      <div>{result}</div>
      <Button variant='contained' onClick={() => setResult('')}>
        Reset
      </Button>
    </div>
  )
}

export default CodeScanner
