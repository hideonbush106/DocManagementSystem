import DocumentCard from './DocumentCard'
import { SvgIconComponent } from '@mui/icons-material'
import ActionsCell from '../table/ActionCell'
import Detail from '../modal/Detail'
import React, { useEffect, useState } from 'react'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { DocumentDetail } from '~/global/interface'
import { DocumentStatus } from '~/global/enum'
import useAuth from '~/hooks/useAuth'

type Props = {
  icon: {
    Component: SvgIconComponent
    color?: string
  }
  name: string
  id: string
}

const FileCard = (props: Props) => {
  const [detail, setDetail] = useState(false)
  const { user } = useAuth()
  const role = user?.role.toLocaleUpperCase()

  const handleDetailClose = () => {
    setDetail(false)
  }
  const handleDetailOpen = () => {
    setDetail(true)
  }
  const { getDocument, getDocumentBarcode } = useDocumentApi()
  const [document, setDocument] = React.useState<DocumentDetail>()
  const [barcode, setBarcode] = React.useState<string>('')

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

  const actions = [
    {
      text: 'Details',
      onClick: () => handleDetailOpen()
    },
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
  ]

  return (
    <DocumentCard icon={props.icon} name={props.name}>
      <div style={{ marginLeft: 'auto', marginRight: '-18px' }}>
        <ActionsCell menuItems={actions} />
        <Detail document={document} barcode={barcode} open={detail} onClose={handleDetailClose} />
      </div>
    </DocumentCard>
  )
}

export default FileCard
