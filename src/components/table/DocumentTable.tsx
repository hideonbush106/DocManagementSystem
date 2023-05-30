import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 20, sortable: false, filterable: false },
  { field: 'fileName', headerName: 'File name', width: 110 },
  { field: 'department', headerName: 'Department', width: 130 },
  { field: 'location', headerName: 'Location', width: 180 },
  {
    field: 'category',
    headerName: 'Category',
    width: 120
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: false,
    width: 90,
    valueGetter: (params: GridValueGetterParams) => {
      const statusValue = `${params.row.status}`
      return statusValue
    }
  }
]

const rows = [
  {
    id: 1,
    fileName: 'Contract labor 2022',
    department: 'Human Resources',
    location: 'Room 001, Locker 1, Folder Contract',
    category: 'Contract',
    status: 'Pending'
  },
  {
    id: 2,
    fileName: 'Report meeting',
    department: 'Sales',
    location: 'Room 003, Locker 1, Folder Report',
    category: 'Report',
    status: 'Available'
  },
  {
    id: 3,
    fileName: 'Tax bill',
    department: 'Accountant',
    location: 'Room 006, Locker 2, Folder Report',
    category: 'Bill',
    status: 'Pending'
  },
  {
    id: 4,
    fileName: 'Contract',
    department: 'Human Resources',
    location: 'Room 001, Locker 1, Folder Contract',
    category: 'Contract',
    status: 'Pending'
  },
  {
    id: 5,
    fileName: 'Bill',
    department: 'Accountant',
    location: 'Room 006, Locker 2, Folder Report',
    category: 'Bill',
    status: 'Available'
  },
  {
    id: 7,
    fileName: 'Report',
    department: 'Sales',
    location: 'Room 003, Locker 1, Folder Report',
    category: 'Report',
    status: 'Pending'
  },
  {
    id: 8,
    fileName: 'Contract',
    department: 'Human Resources',
    location: 'Room 001, Locker 1, Folder Contract',
    category: 'Contract',
    status: 'Pending'
  }
]

export default function DataTable() {
  return (
    <div style={{ height: 200, width: '100%', margin: '10px 0' }}>
      <DataGrid
        columnHeaderHeight={30}
        rowHeight={27}
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
