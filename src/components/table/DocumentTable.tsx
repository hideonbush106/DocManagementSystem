import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'No.',
    sortable: false,
    filterable: false,
    headerAlign: 'center',
    align: 'center',
    width: 50
  },
  { field: 'fileName', headerName: 'File name', flex: 1, minWidth: 150 },
  { field: 'department', headerName: 'Department', flex: 1, minWidth: 140 },
  { field: 'room', headerName: 'Room', flex: 1, minWidth: 60, align: 'center', headerAlign: 'center' },
  { field: 'locker', headerName: 'Locker', flex: 1, minWidth: 60, align: 'center', headerAlign: 'center' },
  { field: 'folder', headerName: 'Folder', flex: 1, minWidth: 60, align: 'center', headerAlign: 'center' },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1,
    minWidth: 80
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 80,
    renderCell: (params: GridRenderCellParams) => {
      const status = params.value as string

      let statusColor = ''
      if (status === 'Available') {
        statusColor = 'var(--primary-color)'
      } else if (status === 'Lending') {
        statusColor = 'var(--red-color)'
      }

      return <span style={{ color: statusColor, fontWeight: '500' }}>{status}</span>
    }
  }
]

const rows = [
  {
    id: 1,
    fileName: 'Contract labor 2022',
    department: 'Human Resources',
    room: '1',
    locker: '1',
    folder: '1',
    category: 'Contract',
    status: 'Lending'
  },
  {
    id: 2,
    fileName: 'Report meeting',
    department: 'Sales',
    room: '3',
    locker: '2',
    folder: '2',
    category: 'Report',
    status: 'Available'
  },
  {
    id: 3,
    fileName: 'Tax bill',
    department: 'Accountant',
    room: '6',
    locker: '6',
    folder: '6',
    category: 'Bill',
    status: 'Lending'
  },
  {
    id: 4,
    fileName: 'Contract',
    department: 'Human Resources',
    room: '1',
    locker: '1',
    folder: '2',
    category: 'Contract',
    status: 'Available'
  },
  {
    id: 5,
    fileName: 'Bill',
    department: 'Accountant',
    room: '1',
    locker: '1',
    folder: '1',
    category: 'Bill',
    status: 'Available'
  },
  {
    id: 7,
    fileName: 'Report',
    department: 'Sales',
    room: '1',
    locker: '1',
    folder: '1',
    category: 'Report',
    status: 'Lending'
  },
  {
    id: 8,
    fileName: 'Contract',
    department: 'Human Resources',
    room: '1',
    locker: '1',
    folder: '1',
    category: 'Contract',
    status: 'Lending'
  }
]

const DocumentTable = () => {
  return (
    <div style={{ height: 'calc(100% - 30px)', width: '100%', margin: '10px 0' }}>
      <DataGrid
        columnHeaderHeight={40}
        disableColumnMenu
        hideFooterSelectedRowCount
        rowHeight={35}
        rows={rows}
        columns={columns}
        autoPageSize={true}
        sx={{
          border: 'none',
          fontSize: '12px',
          '	.MuiDataGrid-footerContainer': {
            borderTop: 'none',
            maxHeight: '40px',
            minHeight: '40px'
          },
          '.MuiDataGrid-virtualScroller': {
            // overflow: 'visible'
          },
          '.MuiToolbar-root': {
            minHeight: 40
          }
        }}
      />
    </div>
  )
}

export default DocumentTable
