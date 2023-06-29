import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Detail from '~/components/modal/Detail'
import ModalLayout from '~/components/modal/ModalLayout'
import UpdateDocument from '~/components/modal/UpdateDocument'
import ModalTest from '~/components/test/ModalTest'
import { DocumentStatus } from '~/global/enum'
import { DocumentDetail } from '~/global/interface'
import useDocumentApi from '~/hooks/api/useDocumentApi'


const Test = () => {
  // const [, setOpen] = useState(false)

  // const handleClose = () => {
  //   setOpen(false)
  // }

  const [detail, setDetail] = useState(false)
  const handleDetailClose = () => {
    setDetail(false)
  }

  const { getDocument, getDocumentBarcode } = useDocumentApi()
  const [document, setDocument] = React.useState<DocumentDetail>()
  const [barcode, setBarcode] = React.useState<string>('')
  const id = '0c08f2e8-b147-4612-ac7e-64f95b16e833'
  // const id2 = 'b7b30a94-1844-4507-b921-fafecf0a548d'
  
  const fetchData = async (id: string) => {
    try {
      setBarcode('')
      setDocument(undefined)
      const document = await getDocument(id)
      setDocument(document.data)
      if ([DocumentStatus.PENDING, DocumentStatus.AVAILABLE, DocumentStatus.BORROWED].includes(document.data.status)) {
        const barcode = await getDocumentBarcode(id)
        if (barcode.data.barcode) {
          setBarcode(barcode.data.barcode)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      {/* <ModalLayout button='Test'>
        <UpdateDocument handleClose={handleClose} />
      </ModalLayout>
      <ModalLayout button='Test2'>
        <ModalTest handleClose={handleClose} />
      </ModalLayout> */}
      <Button onClick={() => setDetail(true)}>Detail</Button>
      <Detail document={document} barcode={barcode} open={detail} onClose={handleDetailClose} />
    </>
  )
}

export default Test
