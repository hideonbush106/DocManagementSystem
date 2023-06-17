/* eslint-disable @typescript-eslint/no-unused-vars */
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import ActionsCell from './ActionCell'
import PropTypes, { Validator } from 'prop-types'
import { Link } from 'react-router-dom'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ModalLayout from '../modal/ModalLayout'
import CodeScanner from '../modal/scanner/CodeScanner'
import { useState } from 'react'
interface ApprovalsTableProps {
  view: 'dashboard' | 'full'
}

const ApprovalsTable: React.FC<ApprovalsTableProps> = ({ view }) => {
  let columns: GridColDef[] = []

  const [_open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

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
  let rowHeight = 50
  if (view === 'dashboard') {
    columns = [
      {
        field: 'id',
        headerName: 'No.',
        width: 50,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center'
      },
      { field: 'fileName', headerName: 'File Name', flex: 1 },
      { field: 'createAt', headerName: 'Create at', flex: 2 },
      {
        field: 'more-options',
        headerName: '',
        width: 20,
        sortable: false,
        filterable: false,

        align: 'left',
        renderCell: (params: GridRenderCellParams) => {
          const menuItems = [
            { text: 'Detail', onClick: () => console.log('Detail clicked') },
            { text: 'Confirm', onClick: () => console.log('Confirm clicked') }
          ]
          return <ActionsCell id={params.row.id as number} menuItems={menuItems} />
        }
      }
    ]
    rowHeight = 35
  } else if (view === 'full') {
    columns = [
      {
        field: 'id',
        headerName: 'No.',
        width: 50,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center'
      },
      { field: 'fileName', headerName: 'File name', flex: 1, minWidth: 100, maxWidth: 250 },
      { field: 'department', headerName: 'Department', flex: 1, minWidth: 80, maxWidth: 200 },
      {
        field: 'room',
        headerName: 'Room',
        minWidth: 50,
        maxWidth: 120,

        flex: 1,
        headerAlign: 'center',
        align: 'center'
      },
      {
        field: 'locker',
        headerName: 'Locker',
        minWidth: 50,
        maxWidth: 120,
        flex: 1,
        headerAlign: 'center',
        align: 'center'
      },
      {
        field: 'folder',
        headerName: 'Folder',
        minWidth: 50,
        maxWidth: 120,
        flex: 1,
        headerAlign: 'center',
        align: 'center'
      },
      { field: 'category', headerName: 'Category', minWidth: 75, maxWidth: 150, flex: 1 },
      { field: 'createAt', headerName: 'Create at', flex: 1, minWidth: 140 },
      {
        field: 'action',
        headerName: 'Action',
        width: 125,
        sortable: false,
        filterable: false,
        headerAlign: 'center',
        align: 'center',
        renderCell: () => (
          <Link to={''}>
            {/* <Button
              endIcon={<CheckRoundedIcon />}
              size='small'
              style={{ padding: '7px 10px', fontWeight: 600, fontSize: 12 }}
              variant='outlined'
              onClick={() => console.log('Action clicked')}
            >
              Confirm
            </Button> */}
            <ModalLayout
              size='small'
              style={{ padding: '7px 10px', fontWeight: 600, fontSize: 12 }}
              variant='outlined'
              button='confirm'
              endIcon={<CheckRoundedIcon />}
            >
              <CodeScanner handleClose={handleClose} />
            </ModalLayout>
          </Link>
        )
      },
      {
        field: 'more-options',
        headerName: '',
        width: 20,
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
    <div
      style={{
        width: '100%',
        height: view === 'dashboard' ? 'calc(100% - 30px)' : '100%',
        borderRadius: 5,
        margin: '10px 0'
      }}
    >
      <DataGrid
        columnHeaderHeight={rowHeight + 10}
        disableColumnMenu
        hideFooterSelectedRowCount
        rowHeight={rowHeight}
        rows={rows}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createAt', sort: 'asc' }]
          }
        }}
        autoPageSize={true}
        sx={{
          border: 'none',
          fontSize: '12px', // default: 14px
          '.MuiDataGrid-footerContainer': {
            borderTop: 'none',
            maxHeight: rowHeight,
            minHeight: rowHeight
          },
          '.MuiToolbar-root': {
            minHeight: rowHeight
          }
        }}
        style={{
          backgroundColor: view === 'dashboard' ? 'transparent' : 'white'
        }}
      />
    </div>
  )
}

ApprovalsTable.propTypes = {
  view: PropTypes.oneOf<'dashboard' | 'full'>(['dashboard', 'full']).isRequired as Validator<'dashboard' | 'full'>
}

export default ApprovalsTable
