import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 20, sortable: false, filterable: false },
  { field: 'fileName', headerName: 'File name', width: 120 },
  { field: 'createAt', headerName: 'Create at', width: 190 }
]

const rows = [
  { id: 1, fileName: 'Contract', createAt: ' 09:05:34, 23th May, 2023' },
  { id: 2, fileName: 'Bill', createAt: ' 10:34:45, 23th May, 2023' }
]

export default function ApprovalsTable() {
  return (
    <div style={{ height: 200, width: '100%', margin: '10px 0' }}>
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
          },
          '.MuiDataGrid-virtualScroller': {
            overflow: 'visible'
          }
        }}
      />
    </div>
  )
}
