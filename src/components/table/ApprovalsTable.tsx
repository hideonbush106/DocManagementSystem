import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 20, sortable: false, filterable: false },
  { field: 'fileName', headerName: 'File name', width: 110 },
  { field: 'department', headerName: 'Department', width: 130 }
]

const rows = [
  { id: 1, fileName: 'Contract', department: 'Snow' },
  { id: 2, fileName: 'Contract', department: 'Snow' }
]

export default function ApprovalsTable() {
  return (
    <div style={{ height: 200, width: '100%', margin: '10px 0' }}>
      <DataGrid
        columnHeaderHeight={30}
        rowHeight={27}
        rows={rows}
        columns={columns}
        hideFooter
        sx={{
          border: 'none',
          fontSize: '12px',
          '	.MuiDataGrid-footerContainer': {
            borderTop: 'none',
            maxHeight: '30px',
            minHeight: '30px'
          }
        }}
      />
    </div>
  )
}
