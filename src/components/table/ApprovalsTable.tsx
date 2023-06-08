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
        resizable: true,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => (
          <Link to={''}>
            <Button
              variant='outlined'
              size='small'
              style={{ padding: 2, fontSize: '12px' }}
              onClick={() => console.log('Action clicked')}
            >
              Confirm
            </Button>
          </Link>
        )
      }
    ]
    pageSize = 5
    rowHeight = 32
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
      { field: 'department', headerName: 'Department', width: 140 },
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
              style={{ padding: '5px 10px' }}
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
    <div style={{ width: '100%', backgroundColor: 'white', borderRadius: 10 }}>
      <DataGrid
        columnHeaderHeight={rowHeight}
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
        sx={{
          border: 'none',
          fontSize: '12px',
          '.MuiDataGrid-footerContainer': {
            borderTop: 'none',
            maxHeight: rowHeight,
            minHeight: rowHeight
          },
          '.MuiDataGrid-virtualScroller': {
            overflow: 'visible'
          }
        }}
      />
    </div>
  )
}

ApprovalsTable.propTypes = {
  view: PropTypes.oneOf<'dashboard' | 'full'>(['dashboard', 'full']).isRequired as Validator<'dashboard' | 'full'>
}

export default ApprovalsTable
