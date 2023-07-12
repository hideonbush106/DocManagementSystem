import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import { RequestStatus } from '~/global/enum'

interface ImportRequestsTableProps {
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

const getStatusColor = (status: string) => {
  switch (status) {
    case RequestStatus.PENDING:
      return 'var(--primary-color)'
    case RequestStatus.REJECTED:
      return 'var(--red-color)'
    case RequestStatus.APPROVED:
      return 'var(--green-color)'
    case RequestStatus.CANCELED:
      return 'var(--black-light-color)'
    case RequestStatus.EXPIRED:
      return 'var(--orange-color)'
    case RequestStatus.DONE:
      return 'var(--primary-dark-color)'
    default:
      return 'var(--primary-dark-color)'
  }
}

const ImportRequestsTable = (props: ImportRequestsTableProps) => {
  const { rows, loading, rowCount, paginationModel, handlePaginationModelChange } = props
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'No.',
      width: 50,
      sortable: false,
      filterable: false,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) =>
        `${
          paginationModel.pageSize * paginationModel.page +
          params.api.getRowIndexRelativeToVisibleRows(params.row.id) +
          1
        }`
    },
    {
      field: 'fileName',
      headerName: 'File name',
      flex: 2,
      sortable: false,
      filterable: false,
      valueGetter: ({ row }) => {
        return row.document.name
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 100,
      maxWidth: 200,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => (
        <Typography
          variant='caption'
          fontFamily={'var(--font-family)'}
          fontWeight={600}
          style={{ color: getStatusColor(row.status) }}
        >
          {row.status}
        </Typography>
      )
    }
  ]

  return (
    <div style={{ height: 'calc(100% - 30px)', width: '100%', margin: '10px 0' }}>
      <DataGrid
        columnHeaderHeight={50}
        disableColumnMenu
        hideFooterSelectedRowCount
        rowHeight={40}
        rows={rows}
        columns={columns}
        rowCount={rowCount}
        loading={loading}
        pageSizeOptions={[paginationModel.pageSize]}
        paginationModel={paginationModel}
        paginationMode='server'
        onPaginationModelChange={handlePaginationModelChange}
        sx={{
          border: 'none',
          fontSize: '12px',
          '	.MuiDataGrid-footerContainer': {
            borderTop: 'none',
            maxHeight: '35px',
            minHeight: '35px'
          },
          '.MuiDataGrid-virtualScroller': {
            // overflow: 'visible'
          },
          '.MuiToolbar-root': {
            minHeight: 35
          }
        }}
      />
    </div>
  )
}
export default ImportRequestsTable
