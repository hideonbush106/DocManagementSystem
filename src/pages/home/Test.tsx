import { useState } from 'react'
import Detail from '~/components/modal/Detail'
import ModalLayout from '~/components/modal/ModalLayout'
import UpdateDocument from '~/components/modal/UpdateDocument'
import ModalTest from '~/components/test/ModalTest'

const Test = () => {
  const [, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <ModalLayout button='Test'>
        <UpdateDocument handleClose={handleClose} />
      </ModalLayout>
      <ModalLayout button='Test2'>
        <ModalTest handleClose={handleClose} />
      </ModalLayout>
      <Detail id='0c08f2e8-b147-4612-ac7e-64f95b16e833' />
    </>
  )
}

export default Test
