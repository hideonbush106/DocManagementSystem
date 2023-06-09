import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ActionsCell from './ActionCell'
import PropTypes, { Validator } from 'prop-types'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
interface ApprovalsTableProps {
  view: 'dashboard' | 'full'
}

const ApprovalsTable: React.FC<ApprovalsTableProps> = ({ view }) => {
  let columns: GridColDef[] = []
  const rows = [
    {
      id: 1,
      fileName: 'Contract Labor 2022',
      department: 'Human Resources',
      room: '1',
      locker: '1',
      folder: '1',
      category: 'Contract',
      createAt: '13:34:45, 23th May, 2023'
    },
    {
      id: 2,
      fileName: 'Report meeting',
      department: 'Sales',
      room: '2',
      locker: '2',
      folder: '2',
      category: 'Report',
      createAt: '10:44:45, 23th May, 2023'
    },
    {
      id: 3,
      fileName: 'Tax bill',
      department: 'Accountant',
      room: '3',
      locker: '3',
      folder: '3',
      category: 'Tax',
      createAt: '10:54:45, 23th May, 2023'
    },
    {
      id: 4,
      fileName: 'Contract Labor 2022',
      department: 'Human Resources',
      room: '1',
      locker: '1',
      folder: '1',
      category: 'Contract',
      createAt: '11:04:45, 23th May, 2023'
    },
    {
      id: 5,
      fileName: 'Report meeting',
      department: 'Sales',
      room: '2',
      locker: '2',
      folder: '2',
      category: 'Report',
      createAt: '11:14:45, 23th May, 2023'
    },
    {
      id: 6,
      fileName: 'Tax bill',
      department: 'Accountant',
      room: '3',
      locker: '3',
      folder: '3',
      category: 'Tax',
      createAt: '11:24:45, 23th May, 2023'
    },
    {
      id: 7,
      fileName: 'Contract Labor 2022',
      department: 'Human Resources',
      room: '1',
      locker: '1',
      folder: '1',
      category: 'Contract',
      createAt: '11:34:45, 23th May, 2023'
    },
    {
      id: 8,
      fileName: 'Report meeting',
      department: 'Sales',
      room: '2',
      locker: '2',
      folder: '2',
      category: 'Report',
      createAt: '11:44:45, 23th May, 2023'
    },
    {
      id: 9,
      fileName: 'Tax bill',
      department: 'Accountant',
      room: '3',
      locker: '3',
      folder: '3',
      category: 'Tax',
      createAt: '11:54:45, 23th May, 2023'
    },
    {
      id: 10,
      fileName: 'Contract Labor 2022',
      department: 'Human Resources',
      room: '1',
      locker: '1',
      folder: '1',
      category: 'Contract',
      createAt: '12:04:45, 23th May, 2023'
    },
    {
      id: 11,
      fileName: 'Report meeting',
      department: 'Sales',
      room: '2',
      locker: '2',
      folder: '2',
      category: 'Report',
      createAt: '12:14:45, 23th May, 2023'
    },
    {
      id: 12,
      fileName: 'Tax bill',
      department: 'Accountant',
      room: '3',
      locker: '3',
      folder: '3',
      category: 'Tax',
      createAt: '12:34:45, 23th May, 2023'
    },
    {
      id: 13,
      fileName: 'Contract Labor 2022',
      department: 'Human Resources',
      room: '1',
      locker: '1',
      folder: '1',
      category: 'Contract',
      createAt: '12:24:45, 23th May, 2023'
    },
    {
      id: 14,
      fileName: 'Report meeting',
      department: 'Sales',
      room: '2',
      locker: '2',
      folder: '2',
      category: 'Report',
      createAt: '12:44:45, 23th May, 2023'
    },
    {
      id: 15,
      fileName: 'Tax bill',
      department: 'Accountant',
      room: '3',
      locker: '3',
      folder: '3',
      category: 'Tax',
      createAt: '12:54:45, 23th May, 2023'
    }
  ]
  let pageSize = 10
  let rowHeight = 50
  if (view === 'dashboard') {
    columns = [
      { field: 'fileName', headerName: 'File Name', flex: 1 },
      { field: 'createAt', headerName: 'Create at', flex: 1 },
      {
        field: 'action',
        headerName: 'Action',
        flex: 0,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => (
          <Link to={''}>
            <Button
              variant='outlined'
              size='small'
              style={{ minWidth: 50, height: 27, padding: 0 }}
              onClick={() => console.log('Action clicked')}
            >
              <CheckRoundedIcon />
            </Button>
          </Link>
        )
      }
    ]
    pageSize = 5
    rowHeight = 35
  } else if (view === 'full') {
    columns = [
      {
        field: 'id',
        headerName: 'No.',
        width: 20,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center'
      },
      { field: 'fileName', headerName: 'File name', flex: 1 },
      { field: 'department', headerName: 'Department', flex: 1 },
      { field: 'room', headerName: 'Room', width: 100, headerAlign: 'center', align: 'center' },
      { field: 'locker', headerName: 'Locker', width: 100, headerAlign: 'center', align: 'center' },
      { field: 'folder', headerName: 'Folder', width: 100, headerAlign: 'center', align: 'center' },
      { field: 'category', headerName: 'Category', width: 120 },
      { field: 'createAt', headerName: 'Create at', flex: 1 },
      {
        field: 'action',
        headerName: 'Action',
        width: 150,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => (
          <Link to={''}>
            <Button
              endIcon={<CheckRoundedIcon />}
              size='small'
              style={{ padding: '7px 10px', fontWeight: 600, fontSize: 12 }}
              variant='outlined'
              onClick={() => console.log('Action clicked')}
            >
              Confirm
            </Button>
          </Link>
        )
      },
      {
        field: 'more-options',
        headerName: '',
        width: 50,
        sortable: false,
        filterable: false,
        align: 'left',
        renderCell: (params: GridRenderCellParams) => {
          const menuItems = [
            { text: 'Detail', onClick: () => console.log('Detail clicked') },
            { text: 'Delete', onClick: () => console.log('Delete clicked') }
          ]
          return <ActionsCell id={params.row.id as number} menuItems={menuItems} />
        }
      }
    ]
  }
  return (
    <div style={{ width: '100%', height: '100%', borderRadius: 5 }}>
      <DataGrid
        columnHeaderHeight={rowHeight + 5}
        disableColumnMenu
        hideFooterSelectedRowCount
        rowHeight={rowHeight}
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createAt', sort: 'asc' }]
          },
          pagination: {
            paginationModel: { page: 0, pageSize: pageSize }
          }
        }}
        hideFooter={view === 'dashboard'}
        autoPageSize={true}
        sx={{
          border: 'none',
          fontSize: '12px', // default: 14px
          '.MuiDataGrid-footerContainer': {
            borderTop: 'none',
            maxHeight: rowHeight - 10,
            minHeight: rowHeight - 10
          },
          '.MuiDataGrid-virtualScroller': {
            overflow: 'visible'
          },
          '.MuiToolbar-root': {
            minHeight: rowHeight
          }
        }}
        style={{
          backgroundColor: view === 'dashboard' ? 'transparent' : 'white',
          paddingTop: view === 'dashboard' ? 10 : 0
        }}
      />
    </div>
  )
}

ApprovalsTable.propTypes = {
  view: PropTypes.oneOf<'dashboard' | 'full'>(['dashboard', 'full']).isRequired as Validator<'dashboard' | 'full'>
}

export default ApprovalsTable
