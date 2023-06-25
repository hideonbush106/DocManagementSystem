import { Viewer, Worker } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'

const Test = () => {
  const [, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
      <Viewer fileUrl='assets/progit.pdf' />
    </Worker>
  )
}
