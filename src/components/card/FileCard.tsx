import React, { useState, useEffect } from 'react'
import { Box, Paper } from '@mui/material'
import { SvgIconComponent } from '@mui/icons-material'
import DocumentCard from './DocumentCard'
import ActionsCell from '../table/ActionCell'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { Categories, DocumentDetail } from '~/global/interface'
import { DocumentStatus } from '~/global/enum'
import BorrowDocumentModal from '../modal/BorrowDocumentModal'
import useAuth from '~/hooks/useAuth'
import Detail from '../modal/Detail'
import UpdateDocumentModal from '../modal/UpdateDocumentModal'
import useCategoryApi from '~/hooks/api/useCategoryApi'
import useMedia from '~/hooks/api/useMedia'

type Props = {
  icon: {
    Component: SvgIconComponent
    color?: string
  }
  name: string
  id: string
  fileId: string
  fileName: string
  action?: boolean
  onClick?: () => void
  fetchFolder?: () => void
}
const FileCard: React.FC<Props> = (props: Props) => {
  const { user } = useAuth()
  const role = user?.role.toLocaleUpperCase()
  const { icon, name, fileId, fileName, action, onClick } = props
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const { getDocument, getDocumentBarcode } = useDocumentApi()
  const { getAllCategories } = useCategoryApi()
  const { checkMedia } = useMedia()
  const [document, setDocument] = React.useState<DocumentDetail>()
  const [barcode, setBarcode] = React.useState<string>('')
  const [isHavePdf, setIsHavePdf] = useState<boolean>(false)
  const [categories, setCategories] = useState<Categories[]>([])

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
      setDocument(document.data)
      if ([DocumentStatus.PENDING, DocumentStatus.AVAILABLE, DocumentStatus.BORROWED].includes(document.data.status)) {
        if (role !== 'EMPLOYEE') {
          const barcode = await getDocumentBarcode(id)
          if (barcode.data.barcode) {
            setBarcode(barcode.data.barcode)
          }
        }
      }
      Promise.all([
        checkMedia(document.data.id),
        getAllCategories(document.data.folder.locker.room.department.id)
      ]).then(([isHavePdf, categories]) => {
        setIsHavePdf(isHavePdf.data)
        setCategories(categories.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(props.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id])

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        ...(onClick && { cursor: 'pointer' })
      }}
    >
      <Box onClick={onClick} width='100%'>
        <DocumentCard icon={icon} name={document?.name ?? name} />
      </Box>
      <Box style={{ position: 'absolute', right: 0, backgroundColor: 'white' }}>
        {action && <ActionsCell menuItems={actions} />}
      </Box>
      <Detail document={document} barcode={barcode} open={isDetailModalOpen} onClose={handleDetailClose} />
      <BorrowDocumentModal
        open={isBorrowModalOpen}
        handleClose={handleCloseBorrowModal}
        fileId={fileId}
        fileName={fileName}
      />
      {role == 'STAFF' && (
        <UpdateDocumentModal
          document={document}
          isHavePdf={isHavePdf}
          categories={categories}
          open={isUpdateModalOpen}
          handleClose={handleCloseUpdateModal}
          reload={props.fetchFolder}
        />
      )}
    </Paper>
  )
}

export default FileCard
