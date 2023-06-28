import { Button } from '@mui/material'
import { useState } from 'react'
import Detail from '~/components/modal/Detail'
// import ModalLayout from '~/components/modal/ModalLayout'
// import UpdateDocument from '~/components/modal/UpdateDocument'
// import ModalTest from '~/components/test/ModalTest'

const Test = () => {
  // const [, setOpen] = useState(false)

  // const handleClose = () => {
  //   setOpen(false)
  // }

  const [detail, setDetail] = useState(false)
  const handleDetailClose = () => {
    setDetail(false)
  }

  return (
    <>
      {/* <ModalLayout button='Test'>
        <UpdateDocument handleClose={handleClose} />
      </ModalLayout>
      <ModalLayout button='Test2'>
        <ModalTest handleClose={handleClose} />
      </ModalLayout> */}
      <Button onClick={() => setDetail(true)}>Detail</Button>
      <Detail id='0c08f2e8-b147-4612-ac7e-64f95b16e833' open={detail} onClose={handleDetailClose} />
    </>
  )
}

export default Test
