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

  const { ref } = useZxing({
    deviceId: videoDevice?.[1],
    onResult(result) {
      console.log(result)
    }
  })

  return (
    <div>
      <video ref={ref}></video>
      <h1>react-media-devices example</h1>
      <ul>
        {videoDevicesList?.map((device, index) => (
          <li key={index}>
            <strong>Label: {device.label || 'undefined'}</strong>
            <br />
            <small>Device id: {device.deviceId}</small>
            <br />
            <small>Group id: {device.groupId}</small>
            <br />
            <small>Kind: {device.kind}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CodeScanner
