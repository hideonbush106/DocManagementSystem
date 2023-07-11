import React, { useState, useEffect } from 'react'
import { SvgIconComponent } from '@mui/icons-material'
import DocumentCard from './DocumentCard'
import ActionsCell from '../table/ActionCell'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { DocumentDetail } from '~/global/interface'
import { DocumentStatus } from '~/global/enum'
import BorrowDocumentModal from '../modal/BorrowDocumentModal'
import useAuth from '~/hooks/useAuth'
import Detail from '../modal/Detail'

type Props = {
  icon: {
    Component: SvgIconComponent
    color?: string
  }
  name: string
  id: string
  fileId: string
  fileName: string
  status: string
}
const FileCard: React.FC<Props> = (props: Props) => {
  const { icon, name, fileId, fileName, status } = props
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const [detail, setDetail] = useState(false)
  const { user } = useAuth()
  const role = user?.role.toLocaleUpperCase()
  const { getDocument, getDocumentBarcode } = useDocumentApi()
  const [document, setDocument] = React.useState<DocumentDetail>()
  const [barcode, setBarcode] = React.useState<string>('')

  const handleDetailClose = () => {
    setDetail(false)
  }
  const handleDetailOpen = () => {
    setDetail(true)
  }
  const handleOpenBorrowModal = () => {
    setIsBorrowModalOpen(true)
    console.log(fileId)
  }

  const handleCloseBorrowModal = () => {
    setIsBorrowModalOpen(false)
  }
  const actions = [
    {
      text: 'Details',
      onClick: () => handleDetailOpen()
    },
    role === 'EMPLOYEE' && status === DocumentStatus.BORROWED
      ? null
      : role !== 'EMPLOYEE'
      ? {
          text: 'Edit',
          onClick: () => {
            return
          }
        }
      : {
          text: 'Borrow',
          onClick: () => handleOpenBorrowModal()
        },
    {
      text: 'Delete',
      onClick: () => {
        return
      }
    }
  ].filter(Boolean)

  const fetchData = async (id: string) => {
    try {
      setBarcode('')
      setDocument(undefined)
      const document = await getDocument(id)
      setDocument(document.data)
      if ([DocumentStatus.PENDING, DocumentStatus.AVAILABLE, DocumentStatus.BORROWED].includes(document.data.status)) {
        if (role !== 'EMPLOYEE') {
          const barcode = await getDocumentBarcode(id)
          if (barcode.data.barcode) {
            setBarcode(barcode.data.barcode)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(props.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id])
  return (
    <DocumentCard icon={icon} name={name}>
      <div style={{ marginLeft: 'auto', marginRight: '-18px' }}>
        <ActionsCell menuItems={actions} />
        <Detail document={document} barcode={barcode} open={detail} onClose={handleDetailClose} />
        <BorrowDocumentModal
          open={isBorrowModalOpen}
          handleClose={handleCloseBorrowModal}
          fileId={fileId}
          fileName={fileName}
        />
      </div>
    </DocumentCard>
  )
}

export default FileCard
