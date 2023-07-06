import { useState } from 'react'
import SearchField from '~/components/TextField/SearchField'
import { ImportButton, ReturnButton } from '~/components/button/Button'
import { ButtonWrapper, DocumentGrid, DocumentWrapper, NavWrapper, TreeWrapper } from './Document.styled'
import TreeView from '@mui/lab/TreeView'
import { Apartment, ChevronRight, ExpandMore, Folder, MeetingRoom, ViewModule } from '@mui/icons-material'
import DocumentTreeItem from '~/components/treeItem/DocumentTreeItem'
import { Outlet } from 'react-router-dom'
import useData from '~/hooks/useData'
import { fakeArray } from '~/utils/fakeArray'
import DataProvider from '~/context/DataContext'
import { File, FolderTree } from '~/global/interface'
import { useMediaQuery, useTheme } from '@mui/material'
import SpeedDialCustom from '~/components/speed-dial/SpeedDial'
import ImportDocumentModal from '~/components/modal/ImportDocumentModal'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'

const DocumentDisplay = () => {
  const [speedDialOpen, setSpeedDialOpen] = useState(false)
  const [importDocumentModalOpen, setImportDocumentModalOpen] = useState(false)
  const { documentTree, loading } = useData()
  const theme = useTheme()
  const belowLg = useMediaQuery(theme.breakpoints.down('lg'))

  const handleImportDocumentModalOpen = () => {
    setImportDocumentModalOpen(true)
  }

  const handleImportDocumentModalClose = () => {
    setImportDocumentModalOpen(false)
  }

  const speedDialActions = [
    {
      name: 'New Document',
      icon: <AddRoundedIcon />,
      action: handleImportDocumentModalOpen,
      style: {
        backgroundColor: 'var(--primary-color)',
        color: 'var(--white-color)',
        '&:hover': {
          backgroundColor: 'var(--primary-dark-color)'
        }
      }
    },
    {
      name: 'Return Document',
      icon: <KeyboardReturnRoundedIcon />,
      action: handleImportDocumentModalOpen,
      style: {
        backgroundColor: 'var(--green-color)',
        color: 'var(--white-color)',
        '&:hover': {
          backgroundColor: 'var(--green-dark-color)'
        }
      }
    }
  ]

  const handleSpeedDial = () => {
    setSpeedDialOpen((prev) => !prev)
  }

  const calculateSize = (folder: FolderTree) => {
    return folder.documents.reduce((sum: number, document: File) => sum + document.numOfPages, 0)
  }
  const isFull = (current: number, capacity: number) => {
    return current / capacity >= 0.8
  }

  return (
    <DocumentWrapper>
      <NavWrapper>
        <SearchField
          onChange={(e) => {
            console.log(e.target.value)
          }}
        />
        {/* render when screen above large */}
        {!belowLg && (
          <ButtonWrapper>
            <ImportButton text='New Document' />
            <ReturnButton text='Return Document' />
          </ButtonWrapper>
        )}
      </NavWrapper>
      {/* render when screen above large */}
      {belowLg && <SpeedDialCustom actions={speedDialActions} open={speedDialOpen} onClick={handleSpeedDial} />}
      {/* Modals */}
      <ImportDocumentModal open={importDocumentModalOpen} handleClose={handleImportDocumentModalClose} />
      {/* Tree view */}
      <TreeWrapper>
        <TreeView sx={{ width: '100%' }} defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
          {!loading
            ? documentTree?.map((dept, index) => (
                <DocumentTreeItem key={index} nodeId={dept.id} labelText={dept.name} labelIcon={Apartment}>
                  {dept.rooms.map((room, index) => (
                    <DocumentTreeItem
                      key={index}
                      nodeId={room.id}
                      labelText={`${room.name}`}
                      labelInfo={`${room.lockers.length}/${room.capacity}`}
                      labelIcon={MeetingRoom}
                      isFull={isFull(room.lockers.length, room.capacity)}
                    >
                      {room.lockers.map((locker, index) => (
                        <DocumentTreeItem
                          key={index}
                          nodeId={locker.id}
                          labelText={`${locker.name}`}
                          labelInfo={`${locker.folders.length}/${locker.capacity}`}
                          labelIcon={ViewModule}
                          isFull={isFull(locker.folders.length, locker.capacity)}
                        >
                          {locker.folders.map((folder, index) => (
                            <DocumentTreeItem
                              key={index}
                              nodeId={folder.id}
                              labelText={`${folder.name}`}
                              labelInfo={`${calculateSize(folder)}/${folder.capacity}`}
                              labelIcon={Folder}
                              isFull={isFull(calculateSize(folder), folder.capacity)}
                            />
                          ))}
                        </DocumentTreeItem>
                      ))}
                    </DocumentTreeItem>
                  ))}
                </DocumentTreeItem>
              ))
            : fakeArray(4).map((_, index) => (
                <DocumentTreeItem key={index} nodeId={''} labelText={''} labelIcon={Folder} />
              ))}
        </TreeView>
      </TreeWrapper>
      <DocumentGrid>
        <Outlet />
      </DocumentGrid>
    </DocumentWrapper>
  )
}

const Document = () => {
  return (
    <DataProvider>
      <DocumentDisplay />
    </DataProvider>
  )
}

export default Document
