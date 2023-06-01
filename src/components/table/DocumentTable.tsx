import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'No.', width: 20, sortable: false, filterable: false },
  { field: 'fileName', headerName: 'File name', width: 180 },
  { field: 'department', headerName: 'Department', width: 150 },
  { field: 'room', headerName: 'Room', width: 60, align: 'center' },
  { field: 'locker', headerName: 'Locker', width: 60, align: 'center' },
  { field: 'folder', headerName: 'Folder', width: 100 },
  {
    field: 'category',
    headerName: 'Category',
    width: 120
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 90,
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
    room: '001',
    locker: '1',
    folder: 'Contact',
    category: 'Contract',
    status: 'Lending'
  },
  {
    id: 2,
    fileName: 'Report meeting',
    department: 'Sales',
    room: '003',
    locker: '2',
    folder: 'Report',
    category: 'Report',
    status: 'Available'
  },
  {
    id: 3,
    fileName: 'Tax bill',
    department: 'Accountant',
    room: '006',
    locker: '6',
    folder: 'Bill',
    category: 'Bill',
    status: 'Lending'
  },
  {
    id: 4,
    fileName: 'Contract',
    department: 'Human Resources',
    room: '001',
    locker: '1',
    folder: 'Contact',
    category: 'Contract',
    status: 'Available'
  },
  {
    id: 5,
    fileName: 'Bill',
    department: 'Accountant',
    room: '001',
    locker: '1',
    folder: 'Bill',
    category: 'Bill',
    status: 'Available'
  },
  {
    id: 7,
    fileName: 'Report',
    department: 'Sales',
    room: '001',
    locker: '1',
    folder: 'Report meeting',
    category: 'Report',
    status: 'Lending'
  },
  {
    id: 8,
    fileName: 'Contract',
    department: 'Human Resources',
    room: '001',
    locker: '1',
    folder: 'Contact',
    category: 'Contract',
    status: 'Lending'
  }
]

const DocumentTable = () => {
  return (
    <div style={{ height: 275, width: '100%', margin: '10px 0' }}>
      <DataGrid
        columnHeaderHeight={42}
        rowHeight={38}
        disableColumnMenu
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        // pageSizeOptions={[5, 10]}
        sx={{
          border: 'none',
          fontSize: '12px',
          '	.MuiDataGrid-footerContainer': {
            borderTop: 'none',
            maxHeight: '30px',
            minHeight: '30px',
            display: 'flex',
            justifyContent: 'flex-end'
          },
          '.MuiDataGrid-selectedRowCount': {
            display: 'none'
          },
          '.MuiTablePagination-root': {
            maxHeight: '30px',
            minHeight: '30px',
            paddingLeft: '0',
            overflow: 'hidden'
          },
          '.MuiToolbar-root': {
            maxHeight: '30px',
            minHeight: '30px'
          },
          '.MuiDataGrid-virtualScroller': {
            overflow: 'visible'
          }
        }}
      />
    </div>
  )
}

export default DocumentTable
