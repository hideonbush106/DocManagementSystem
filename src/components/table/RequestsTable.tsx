import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 20, sortable: false, filterable: false },
  { field: 'fileName', headerName: 'File name', width: 140 },
  { field: 'requestBy', headerName: 'Request By', width: 180 }
]

const rows = [
  { id: 1, fileName: 'Contract', requestBy: ' Hao Nguyen - HR' },
  { id: 2, fileName: 'Report', requestBy: ' Hoai Phong - Accountant' },
  { id: 3, fileName: 'Bill', requestBy: ' Duc Anh - Sales' }
]

const RequestsTable = () => {
  return (
    <div style={{ height: 180, width: '100%', margin: '10px 0' }}>
      <DataGrid
        columnHeaderHeight={30}
        disableColumnMenu
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
export default RequestsTable
