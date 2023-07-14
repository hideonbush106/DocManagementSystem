import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

interface DocumentsTableProps {
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

const DocumentTable = (props: DocumentsTableProps) => {
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
    { field: 'name', headerName: 'File name', flex: 1, minWidth: 130 },
    {
      field: 'department',
      headerName: 'Department',
      flex: 1,
      minWidth: 70,
      maxWidth: 120,
      sortable: false,
      filterable: false,
      valueGetter: ({ row }) => {
        return row.folder.locker.room.department.name
      }
    },
    {
      field: 'room',
      headerName: 'Room',
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      valueGetter: ({ row }) => {
        return row.folder.locker.room.name
      }
    },
    {
      field: 'locker',
      headerName: 'Locker',
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      valueGetter: ({ row }) => {
        return row.folder.locker.name
      }
    },
    {
      field: 'folder',
      headerName: 'Folder',
      flex: 1,
      minWidth: 80,
      maxWidth: 120,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      filterable: false,
      valueFormatter: ({ value }) => value.name
    },
    {
      field: 'category',
      headerName: 'Category',
      flex: 1,
      minWidth: 130,
      sortable: false,
      filterable: false,
      valueFormatter: ({ value }) => value.name
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 2,
      minWidth: 70,
      maxWidth: 120,
      sortable: false,
      filterable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        const status = params.value as string

        let statusColor = ''
        if (status.toLocaleUpperCase() === 'AVAILABLE') {
          statusColor = 'var(--primary-color)'
        } else {
          statusColor = 'var(--red-color)'
        }

        return <span style={{ color: statusColor, fontWeight: '500' }}>{status}</span>
      }
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

export default DocumentTable
