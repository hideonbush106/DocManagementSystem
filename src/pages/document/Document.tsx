import { useState } from 'react'
import SearchField from '~/components/TextField/SearchField'
import { ImportButton, ImportRequestButton, ReturnButton } from '~/components/button/Button'
import { ButtonWrapper, DocumentGrid, DocumentWrapper, NavWrapper, TreeWrapper } from './Document.styled'
import TreeView from '@mui/lab/TreeView'
import { Apartment, ChevronRight, ExpandMore, Folder, MeetingRoom, ViewModule } from '@mui/icons-material'
import DocumentTreeItem from '~/components/treeItem/DocumentTreeItem'
import { Outlet } from 'react-router-dom'
import useData from '~/hooks/useData'
import { fakeArray } from '~/utils/fakeArray'
import DataProvider from '~/context/DataContext'
import { File, FolderTree } from '~/global/interface'
import useAuth from '~/hooks/useAuth'
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material'
import SpeedDialCustom from '~/components/speed-dial/SpeedDial'
import ImportDocumentModal from '~/components/modal/ImportDocumentModal'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import SearchDocumentResult from '~/components/modal/SearchDocumentResult'
import ImportRequestModal from '~/components/modal/ImportRequestModal'
import Scanner from '~/components/modal/Scanner'
import ReturnConfirmModal from '~/components/modal/ReturnConfirmModal'
import useDocumentApi from '~/hooks/api/useDocumentApi'

const DocumentDisplay = () => {
  const [speedDialOpen, setSpeedDialOpen] = useState(false)
  const [importDocumentModalOpen, setImportDocumentModalOpen] = useState(false)
  const [isImportRequestModalOpen, setIsImportRequestModalOpen] = useState(false)
  const [searchResultModalOpen, setSearchResultModalOpen] = useState(false)
  const [searchResult, setSearchResult] = useState<File[]>([])
  const [searchResultLoading, setSearchResultLoading] = useState(false)
  const { documentTree, loading } = useData()
  const { findDocument } = useDocumentApi()
  const { user } = useAuth()
  const role = user?.role
  const theme = useTheme()
  const belowLg = useMediaQuery(theme.breakpoints.down('lg'))
  const [scanData, setScanData] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const [isReturnDocumentModalOpen, setIsReturnDocumentModalOpen] = useState(false)
  const [isReturnConfirmModalOpen, setIsReturnConfirmModalOpen] = useState(false)
  const { checkReturnDocument } = useDocumentApi()
  const [response, setResponse] = useState({
    data: '',
    message: ''
  })
  const handleImportDocumentModalOpen = () => {
    setImportDocumentModalOpen(true)
  }

  const handleImportDocumentModalClose = () => {
    setImportDocumentModalOpen(false)
  }

  const handleImportRequestModalOpen = () => {
    setIsImportRequestModalOpen(true)
  }

  const handleImportRequestModalClose = () => {
    setIsImportRequestModalOpen(false)
  }

  const handleReturnDocumentModalOpen = () => {
    setScanning(true)
    setIsReturnDocumentModalOpen(true)
  }

  const handleReturnDocumentModalClose = () => {
    setScanning(false)
    setIsReturnDocumentModalOpen(false)
  }

  const handleReturnConfirmModalOpen = () => {
    setIsReturnConfirmModalOpen(true)
  }

  const handleReturnConfirmModalClose = () => {
    setIsReturnConfirmModalOpen(false)
  }

  const fetchReturn = async (scanData: string | null) => {
    if (scanData && scanData !== '') {
      try {
        const response = await checkReturnDocument(scanData)
        console.log(response)
        setResponse(response)
        setScanData(scanData)
        setScanning(false)
      } catch (error) {
        console.log(error)
      } finally {
        handleReturnDocumentModalClose()
        handleReturnConfirmModalOpen()
      }
    }
  }

  const speedDialActions =
    role === 'STAFF'
      ? [
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
            action: handleReturnDocumentModalOpen,
            style: {
              backgroundColor: 'var(--green-color)',
              color: 'var(--white-color)',
              '&:hover': {
                backgroundColor: 'var(--green-dark-color)'
              }
            }
          }
        ]
      : [
          {
            name: 'Import Document',
            icon: <AddRoundedIcon />,
            action: handleImportRequestModalOpen,
            style: {
              backgroundColor: 'var(--primary-color)',
              color: 'var(--white-color)',
              '&:hover': {
                backgroundColor: 'var(--primary-dark-color)'
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

  const handleSearch = async (value: string) => {
    setSearchResultLoading(true)
    setSearchResultModalOpen(true)
    const { data: documents } = await findDocument(value, 1)
    setSearchResult(documents.data)
    setSearchResultLoading(false)
  }

  return (
    <DocumentWrapper>
      <SearchDocumentResult
        open={searchResultModalOpen}
        handleClose={() => {
          setSearchResultModalOpen(false)
          setSearchResult([])
        }}
        items={searchResult}
        loading={searchResultLoading}
      />
      <NavWrapper>
        <SearchField handleSearch={handleSearch} />
        {/* render when screen above large */}
        {!belowLg &&
          (role === 'STAFF' ? (
            <ButtonWrapper>
              <ImportButton text='New Document' onClick={handleImportDocumentModalOpen} />
              <ReturnButton text='Return Document' onClick={handleReturnDocumentModalOpen} />
            </ButtonWrapper>
          ) : (
            <ButtonWrapper>
              <ImportRequestButton text='Import Document' onClick={handleImportRequestModalOpen} />
            </ButtonWrapper>
          ))}
      </NavWrapper>
      {/* render when screen above large */}
      {belowLg && <SpeedDialCustom actions={speedDialActions} open={speedDialOpen} onClick={handleSpeedDial} />}
      {/* Modals */}
      <ImportDocumentModal open={importDocumentModalOpen} handleClose={handleImportDocumentModalClose} />
      <ImportRequestModal open={isImportRequestModalOpen} handleClose={handleImportRequestModalClose} />
      <Scanner
        scanning={scanning}
        handleScan={fetchReturn}
        open={isReturnDocumentModalOpen}
        handleClose={handleReturnDocumentModalClose}
      />
      <ReturnConfirmModal
        scanData={scanData}
        response={response}
        open={isReturnConfirmModalOpen}
        handleClose={handleReturnConfirmModalClose}
      />
      {/* Tree view */}
      <TreeWrapper>
        <TreeView sx={{ width: '100%' }} defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
          {!loading
            ? documentTree?.map((dept, index) => (
                <DocumentTreeItem
                  key={index}
                  nodeId={dept.id}
                  labelText={dept.name}
                  labelIcon={Apartment}
                  href={`/document/department/${dept.id}`}
                >
                  {dept.rooms.map((room, index) => (
                    <DocumentTreeItem
                      key={index}
                      nodeId={room.id}
                      labelText={`${room.name}`}
                      labelInfo={`${room.lockers.length}/${room.capacity}`}
                      labelIcon={MeetingRoom}
                      isFull={isFull(room.lockers.length, room.capacity)}
                      href={`/document/department/${dept.id}/room/${room.id}`}
                    >
                      {room.lockers.map((locker, index) => (
                        <DocumentTreeItem
                          key={index}
                          nodeId={locker.id}
                          labelText={`${locker.name}`}
                          labelInfo={`${locker.folders.length}/${locker.capacity}`}
                          labelIcon={ViewModule}
                          isFull={isFull(locker.folders.length, locker.capacity)}
                          href={`/document/department/${dept.id}/room/${room.id}/locker/${locker.id}`}
                        >
                          {locker.folders.map((folder, index) => (
                            <DocumentTreeItem
                              key={index}
                              nodeId={folder.id}
                              labelText={`${folder.name}`}
                              labelInfo={`${calculateSize(folder)}/${folder.capacity}`}
                              labelIcon={Folder}
                              isFull={isFull(calculateSize(folder), folder.capacity)}
                              href={`/document/department/${dept.id}/room/${room.id}/locker/${locker.id}/folder/${folder.id}`}
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
        {!loading ? (
          <Outlet />
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} width={'100%'} height={'100%'}>
            <CircularProgress />
          </Box>
        )}
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
