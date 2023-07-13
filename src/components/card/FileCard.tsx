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
import UpdateDocumentModal from '../modal/UpdateDocumentModal'

type Props = {
  icon: {
    Component: SvgIconComponent
    color?: string
  }
  name: string
  id: string
  fileId: string
  fileName: string
}
const FileCard: React.FC<Props> = (props: Props) => {
  const { user } = useAuth()
  const role = user?.role.toLocaleUpperCase()
  const { icon, fileId, name, fileName } = props
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const { getDocument, getDocumentBarcode } = useDocumentApi()
  const [document, setDocument] = React.useState<DocumentDetail>()
  const [documentName, setDocumentName] = React.useState<string>(name)
  const [barcode, setBarcode] = React.useState<string>('')

  const handleDetailClose = () => {
    setIsDetailModalOpen(false)
  }
  const handleDetailOpen = () => {
    setIsDetailModalOpen(true)
  }

  const handleOpenBorrowModal = () => {
    setIsBorrowModalOpen(true)
  }
  const handleCloseBorrowModal = () => {
    setIsBorrowModalOpen(false)
  }

  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true)
  }
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false)
  }

  const actions = [
    {
      text: 'Details',
      onClick: () => handleDetailOpen()
    },
    role == 'STAFF'
      ? {
          text: 'Edit',
          onClick: () => handleOpenUpdateModal()
        }
      : {
          text: 'Borrow',
          onClick: () => handleOpenBorrowModal()
        }
    // {
    //   text: 'Delete',
    //   onClick: () => {
    //     return
    //   }
    // }
  ].filter(Boolean)

  const fetchData = async (id: string) => {
    try {
      setBarcode('')
      setDocument(undefined)
      const document = await getDocument(id)
      setDocumentName(document.data.name)
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
    <DocumentCard icon={icon} name={documentName}>
      <div style={{ marginLeft: 'auto', marginRight: '-18px' }}>
        <ActionsCell menuItems={actions} />
        <Detail document={document} barcode={barcode} open={isDetailModalOpen} onClose={handleDetailClose} />
        <BorrowDocumentModal
          open={isBorrowModalOpen}
          handleClose={handleCloseBorrowModal}
          fileId={fileId}
          fileName={fileName}
        />
        <UpdateDocumentModal
          document={document}
          open={isUpdateModalOpen}
          handleClose={handleCloseUpdateModal}
          reload={fetchData}
        />
      </div>
    </DocumentCard>
  )
}

export default FileCard
