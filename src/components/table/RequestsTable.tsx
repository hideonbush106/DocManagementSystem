import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid'
import ActionsCell from './ActionCell'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'No.', width: 20, sortable: false, filterable: false },
  { field: 'fileName', headerName: 'File name', width: 110 },
  { field: 'requestBy', headerName: 'Request By', width: 180 },
  {
    field: 'actions',
    headerName: '',
    width: 20,
    sortable: false,
    filterable: false,
    align: 'left',
    renderCell: (params: GridCellParams) => {
      const menuItems = [{ text: 'Detail', onClick: () => console.log('Edit clicked') }]
      return <ActionsCell id={params.id as number} menuItems={menuItems} />
    }
  }
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
          },
          '.MuiDataGrid-virtualScroller': {
            overflow: 'visible'
          }
        }}
      />
    </div>
  )
}
export default RequestsTable
