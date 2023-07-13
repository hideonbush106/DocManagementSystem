/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ActionsCell from './ActionCell'
import PropTypes, { Validator } from 'prop-types'
import { useState } from 'react'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { ConfirmButton } from '../button/Button'
import Scanner from '../modal/Scanner'
import { notifySuccess } from '~/global/toastify'
import dayjs from 'dayjs'
import { DocumentDetail } from '~/global/interface'
import { DocumentStatus } from '~/global/enum'
import Detail from '../modal/Detail'
import { Box, CircularProgress } from '@mui/material'

interface ApprovalsTableProps {
  view: 'dashboard' | 'full'
  rows: never[]
  rowCount: number
  loading: boolean
  paginationModel: PaginationModel
  handlePaginationModelChange: (newPaginationModel: PaginationModel) => void
}

interface PaginationModel {
  page: number
  pageSize: number
}

const ApprovalsTable: React.FC<ApprovalsTableProps> = (props: ApprovalsTableProps) => {
  let loading = props.loading
  const { view, rows, rowCount, paginationModel, handlePaginationModelChange } = props
  let columns: GridColDef[] = []
  const [open, setOpen] = useState(false)
  const [documentId, setDocumentId] = useState('')
  const [scanning, setScanning] = useState(false)
  const { confirmDocument } = useDocumentApi()

  const [loadingDetail, setLoadingDetail] = useState(false)
  const { getDocument, getDocumentBarcode } = useDocumentApi()
  const [document, setDocument] = useState<DocumentDetail>()
  const [barcode, setBarcode] = useState<string>('')
  const [openDetail, setOpenDetail] = useState(false)

  const handleDetailOpen = async (id: string) => {
    setLoadingDetail(true)
    await fetchDetails(id)
    setOpenDetail(true)
  }

  const fetchDetails = async (id: string) => {
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
      setLoadingDetail(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDetailClose = () => {
    setOpenDetail(false)
  }

  const handleCloseScan = () => {
    setOpen(false)
  }

  const handleScan = async (scanData: string | null) => {
    if (scanData && scanData !== '') {
      try {
        const result = await confirmDocument({
          id: documentId,
          locationQRcode: scanData
        })
        if (result) {
          notifySuccess('Document confirmed successfully')
        }
        loading = true
      } catch (error) {
        console.log(error)
      } finally {
        handleCloseScan()
        setScanning(false)
      }
    }
  }

  let rowHeight = 60
  if (view === 'dashboard') {
    columns = [
      {
        field: 'id',
        headerName: 'No.',
        width: 50,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) =>
          paginationModel.pageSize * paginationModel.page +
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) +
          1
      },
      { field: 'name', headerName: 'Name', flex: 1 },
      {
        field: 'updatedAt',
        headerName: 'Created at',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        valueFormatter: ({ value }) => dayjs(value).format('MM/DD/YYYY')
      },
      {
        field: 'more-options',
        headerName: '',
        width: 20,
        sortable: false,
        filterable: false,
        align: 'left',
        renderCell: (params: GridRenderCellParams) => {
          const menuItems = [
            {
              text: 'Detail',
              onClick: () => {
                handleDetailOpen(params.row.id as string)
              }
            },
            {
              text: 'Confirm',
              onClick: () => {
                setOpen(true)
                setScanning(true)
                setDocumentId(params.row.id as string)
              }
            }
          ]
          return <ActionsCell id={params.row.id as number} menuItems={menuItems} />
        }
      }
    ]
    rowHeight = 40
  } else if (view === 'full') {
    columns = [
      {
        field: 'id',
        headerName: 'No.',
        width: 50,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: (params) =>
          paginationModel.pageSize * paginationModel.page +
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) +
          1
      },
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 130 },
      {
        field: 'department',
        headerName: 'Department',
        flex: 1,
        filterable: false,
        minWidth: 85,
        maxWidth: 150,
        valueGetter: ({ row }) => {
          return row.folder.locker.room.department.name
        }
      },
      {
        field: 'room',
        headerName: 'Room',
        minWidth: 85,
        maxWidth: 120,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        valueGetter: ({ row }) => {
          return row.folder.locker.room.name
        }
      },
      {
        field: 'locker',
        headerName: 'Locker',
        minWidth: 85,
        maxWidth: 120,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        valueGetter: ({ row }) => {
          return row.folder.locker.name
        }
      },
      {
        field: 'folder',
        headerName: 'Folder',
        minWidth: 85,
        maxWidth: 120,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        valueFormatter: ({ value }) => value.name
      },
      {
        field: 'category',
        headerName: 'Category',
        minWidth: 100,
        maxWidth: 200,
        flex: 1,
        valueFormatter: ({ value }) => value.name
      },
      {
        field: 'updatedAt',
        headerName: 'Created at',
        flex: 1,
        minWidth: 120,
        headerAlign: 'center',
        align: 'center',
        valueFormatter: ({ value }) => dayjs(value).format('MM/DD/YYYY')
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 120,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: (param: GridRenderCellParams) => (
          <ConfirmButton
            text='Confirm'
            onClick={() => {
              setOpen(true)
              setScanning(true)
              setDocumentId(param.row.id as string)
            }}
          />
        )
      },
      {
        field: 'more-options',
        headerName: '',
        width: 20,
        sortable: false,
        filterable: false,
        align: 'left',
        renderCell: (params: GridRenderCellParams) => {
          const menuItems = [
            {
              text: 'Detail',
              onClick: () => {
                handleDetailOpen(params.row.id as string)
              }
            }
            //{ text: 'Delete', onClick: () => console.log('Delete clicked') }
          ]
          return <ActionsCell id={params.row.id as number} menuItems={menuItems} />
        }
      }
    ]
  }
  return (
    <div
      style={{
        width: '100%',
        height: view === 'dashboard' ? 'calc(100% - 30px)' : 'calc(100vh - 225px)',
        borderRadius: 5,
        margin: '10px 0'
      }}
    >
      <Scanner scanning={scanning} open={open} handleClose={handleCloseScan} handleScan={handleScan} />
      {!loadingDetail ? (
        <Detail document={document} barcode={barcode} open={openDetail} onClose={handleDetailClose} />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            maxHeight: '100vh',
            zIndex: 9999
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <DataGrid
        columnHeaderHeight={rowHeight + 10}
        disableColumnMenu
        hideFooterSelectedRowCount
        rowHeight={rowHeight}
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        pageSizeOptions={[paginationModel.pageSize]}
        paginationModel={paginationModel}
        paginationMode='server'
        onPaginationModelChange={handlePaginationModelChange}
        initialState={{
          sorting: {
            sortModel: [{ field: 'updatedAt', sort: 'asc' }]
          }
        }}
        sx={{
          border: 'none',
          fontSize: '12px', // default: 14px
          '.MuiDataGrid-footerContainer': {
            borderTop: 'none',
            maxHeight: rowHeight,
            minHeight: rowHeight
          },
          '.MuiToolbar-root': {
            minHeight: rowHeight
          }
        }}
        style={{
          backgroundColor: view === 'dashboard' ? 'transparent' : 'white'
        }}
      />
    </div>
  )
}

ApprovalsTable.propTypes = {
  view: PropTypes.oneOf<'dashboard' | 'full'>(['dashboard', 'full']).isRequired as Validator<'dashboard' | 'full'>
}

export default ApprovalsTable
