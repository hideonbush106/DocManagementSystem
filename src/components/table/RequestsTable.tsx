import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid'
import ActionsCell from './ActionCell'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'No.',
    width: 50,
    sortable: false,
    filterable: false,
    headerAlign: 'center',
    align: 'center'
  },
  { field: 'fileName', headerName: 'File name', flex: 1 },
  { field: 'requestBy', headerName: 'Request By', flex: 2 },
  {
    field: 'actions',
    headerName: '',
    width: 20,
    sortable: false,
    filterable: false,
    align: 'center',
    renderCell: (params: GridCellParams) => {
      const menuItems = [{ text: 'Detail', onClick: () => console.log('Detail request clicked') }]
      return <ActionsCell id={params.id as number} menuItems={menuItems} />
    }
  }
]

const rows = [
  { id: 1, fileName: 'Contract', requestBy: ' Hao Nguyen - HR' },
  { id: 2, fileName: 'Report', requestBy: ' Hoai Phong - Accountant' },
  { id: 3, fileName: 'Bill', requestBy: ' Duc Anh - Sales' },
  { id: 4, fileName: 'Contract', requestBy: ' Hao Nguyen - HR' },
  { id: 5, fileName: 'Report', requestBy: ' Hoai Phong - Accountant' },
  { id: 6, fileName: 'Bill', requestBy: ' Duc Anh - Sales' },
  { id: 7, fileName: 'Contract', requestBy: ' Hao Nguyen - HR' },
  { id: 8, fileName: 'Report', requestBy: ' Hoai Phong - Accountant' },
  { id: 9, fileName: 'Bill', requestBy: ' Duc Anh - Sales' },
  { id: 10, fileName: 'Contract', requestBy: ' Hao Nguyen - HR' },
  { id: 11, fileName: 'Report', requestBy: ' Hoai Phong - Accountant' },
  { id: 12, fileName: 'Bill', requestBy: ' Duc Anh - Sales' }
]

const RequestsTable = () => {
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
export default RequestsTable
