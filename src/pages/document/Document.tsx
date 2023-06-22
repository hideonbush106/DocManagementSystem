import SearchField from '~/components/TextField/SearchField'
import { ImportButton, ReturnButton } from '~/components/button/Button'
import { ButtonWrapper, DocumentGrid, DocumentWrapper, NavWrapper, TreeWrapper } from './Document.styled'
import TreeView from '@mui/lab/TreeView'
import { Apartment, ChevronRight, ExpandMore, Folder, MeetingRoom } from '@mui/icons-material'
import DocumentTreeItem from '~/components/treeItem/DocumentTreeItem'
import { Outlet } from 'react-router-dom'
import useData from '~/hooks/useData'
import { fakeArray } from '~/utils/fakeArray'
import DataProvider from '~/context/DataContext'
import { Grid, Skeleton } from '@mui/material'
import { RiArchiveDrawerFill } from 'react-icons/ri'

const DocumentDisplay = () => {
  const { documentTree, loading } = useData()

  return (
    <DocumentWrapper>
      <NavWrapper>
        <SearchField
          onChange={(e) => {
            console.log(e.target.value)
          }}
        />
        <ButtonWrapper>
          <ImportButton text='New Document' />
          <ReturnButton text='Return Document' />
        </ButtonWrapper>
      </NavWrapper>
      <TreeWrapper>
        <TreeView defaultCollapseIcon={<ExpandMore />} defaultExpandIcon={<ChevronRight />}>
          {!loading
            ? documentTree?.map((dept, index) => (
                <DocumentTreeItem key={index} nodeId={dept.id} label={dept.name} icon={Apartment}>
                  {dept.rooms.map((room, index) => (
                    <DocumentTreeItem
                      key={index}
                      nodeId={room.id}
                      label={`${room.name} (${room.lockers.length}/${room.capacity})`}
                      icon={MeetingRoom}
                    >
                      {room.lockers.map((locker, index) => (
                        <DocumentTreeItem
                          key={index}
                          nodeId={locker.id}
                          label={`${locker.name} (${locker.folders.length}/${locker.capacity})`}
                          icon={RiArchiveDrawerFill}
                        >
                          {locker.folders.map((folder, index) => (
                            <DocumentTreeItem key={index} nodeId={folder.id} label={folder.name} icon={Folder} />
                          ))}
                        </DocumentTreeItem>
                      ))}
                    </DocumentTreeItem>
                  ))}
                </DocumentTreeItem>
              ))
            : fakeArray(4).map((_, index) => <DocumentTreeItem key={index} nodeId={''} label={''} icon={Folder} />)}
        </TreeView>
      </TreeWrapper>
      <DocumentGrid>
        {!loading ? (
          <Outlet />
        ) : (
          fakeArray(6).map((_, index) => (
            <Grid key={index} item md={4}>
              <Skeleton animation='wave' variant='rounded' height='3rem' />
            </Grid>
          ))
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
