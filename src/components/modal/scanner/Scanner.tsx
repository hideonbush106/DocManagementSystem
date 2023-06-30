import { Html5QrcodeScanner, QrcodeErrorCallback, QrcodeSuccessCallback } from 'html5-qrcode'
import { useEffect } from 'react'

const qrcodeRegionId = 'html5qr-code-full-region'
interface ScannerProps {
  fps: number | undefined
  qrbox?: number | undefined
  aspectRatio?: number | undefined
  disableFlip?: boolean | undefined
  verbose?: boolean | undefined
  qrCodeSuccessCallback?: QrcodeSuccessCallback | undefined
  qrCodeErrorCallback?: QrcodeErrorCallback | undefined
}
// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: ScannerProps) => {
  const config: ScannerProps = {
    fps: 0,
    qrbox: 0,
    aspectRatio: 0,
    disableFlip: false
  }
  if (props.fps) {
    config.fps = props.fps
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip
  }
  return config
}

const Scanner = (props: ScannerProps) => {
  useEffect(() => {
    // when component mounts
    const config = createConfig(props)
    const verbose = props.verbose === true
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw 'qrCodeSuccessCallback is required callback.'
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose)
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback)

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error('Failed to clear html5QrcodeScanner. ', error)
      })
    }
  }, [props])

  return <div id={qrcodeRegionId} />
}

export default Scanner
