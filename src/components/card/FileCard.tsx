import React, { useState } from 'react'
import { SvgIconComponent } from '@mui/icons-material'
import DocumentCard from './DocumentCard'
import ActionsCell from '../table/ActionCell'
import BorrowDocumentModal from '../modal/BorrowDocumentModal'
import useAuth from '~/hooks/useAuth'

type Props = {
  icon: {
    Component: SvgIconComponent
    color?: string
  }
  name: string
  fileId: string
  fileName: string
}

const FileCard: React.FC<Props> = (props: Props) => {
  const { icon, name, fileId, fileName } = props
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const { user } = useAuth()
  const role = user?.role

  const actions = [
    {
      text: 'Details',
      onClick: () => {
        return
      }
    },
    role === 'EMPLOYEE'
      ? {
          text: 'Borrow',
          onClick: () => {
            return handleOpenBorrowModal()
          }
        }
      : null,
    {
      text: 'Edit',
      onClick: () => {
        return
      }
    },
    {
      text: 'Delete',
      onClick: () => {
        return
      }
    }
  ].filter(Boolean)

  const handleOpenBorrowModal = () => {
    setIsBorrowModalOpen(true)
    console.log(fileId)
  }

  const handleCloseBorrowModal = () => {
    setIsBorrowModalOpen(false)
  }

  return (
    <>
      <DocumentCard icon={icon} name={name}>
        <div style={{ marginLeft: 'auto', marginRight: '-18px' }}>
          <ActionsCell menuItems={actions} />
        </div>
      </DocumentCard>
      <BorrowDocumentModal
        open={isBorrowModalOpen}
        handleClose={handleCloseBorrowModal}
        fileId={fileId}
        fileName={fileName}
      />
    </>
  )
}

export default FileCard
