import { useState } from 'react'
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
    </>
  )
}

export default Test
