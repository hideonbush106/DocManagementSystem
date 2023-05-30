import SearchField from '~/components/TextField/SearchField'
import { ImportButton, ReturnButton } from '~/components/button/Button'
import { ButtonWrapper, DocumentWrapper, NavWrapper, TreeWarpper } from './Document.styled'
import { IconDiv } from '~/components/headerBar/HeaderBar.styled'
import TreeView from '@mui/lab/TreeView'
import { Apartment, ChevronRight, ExpandMore, Folder, Work } from '@mui/icons-material'
import DocumentTreeItem from '~/components/treeItem/DocumentTreeItem'

const Document = () => {
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
        <IconDiv white style={{ cursor: 'pointer' }}>
          <img src='/assets/bell-ringing.svg' alt='' />
        </IconDiv>
      </NavWrapper>
      <TreeWarpper>
        <TreeView
          defaultExpanded={['1', '1.1', '1.2']}
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
        >
          <DocumentTreeItem icon={Apartment} nodeId='1' label='Departments'>
            <DocumentTreeItem icon={Apartment} nodeId='1.1' label='Human Resources'>
              <DocumentTreeItem icon={Work} nodeId='1.1.1' label='Room 001'>
                <DocumentTreeItem icon={Folder} nodeId='1.1.1.1' label='Locker'></DocumentTreeItem>
              </DocumentTreeItem>
              <DocumentTreeItem icon={Work} nodeId='1.1.2' label='Room 001'>
                <DocumentTreeItem icon={Folder} nodeId='1.1.2.1' label='Locker'></DocumentTreeItem>
              </DocumentTreeItem>
              <DocumentTreeItem icon={Work} nodeId='1.1.3' label='Room 001'>
                <DocumentTreeItem icon={Folder} nodeId='1.1.3.1' label='Locker'></DocumentTreeItem>
              </DocumentTreeItem>
            </DocumentTreeItem>
            <DocumentTreeItem icon={Apartment} nodeId='1.2' label='Accountant'>
              <DocumentTreeItem icon={Work} nodeId='1.2.1' label='Room 001'>
                <DocumentTreeItem icon={Folder} nodeId='1.2.1.1' label='Locker'></DocumentTreeItem>
              </DocumentTreeItem>
              <DocumentTreeItem icon={Work} nodeId='1.2.2' label='Room 001'>
                <DocumentTreeItem icon={Folder} nodeId='1.2.2.1' label='Locker'></DocumentTreeItem>
              </DocumentTreeItem>
              <DocumentTreeItem icon={Work} nodeId='1.2.3' label='Room 001'>
                <DocumentTreeItem icon={Folder} nodeId='1.2.3.1' label='Locker'></DocumentTreeItem>
              </DocumentTreeItem>
            </DocumentTreeItem>
            <DocumentTreeItem icon={Apartment} nodeId='1.3' label='Sale'>
              <DocumentTreeItem icon={Work} nodeId='1.3.1' label='Room 001'>
                <DocumentTreeItem icon={Folder} nodeId='1.3.1.1' label='Locker'></DocumentTreeItem>
              </DocumentTreeItem>
              <DocumentTreeItem icon={Work} nodeId='1.3.2' label='Room 001'>
                <DocumentTreeItem icon={Folder} nodeId='1.3.2.1' label='Locker'></DocumentTreeItem>
              </DocumentTreeItem>
              <DocumentTreeItem icon={Work} nodeId='1.3.3' label='Room 001'>
                <DocumentTreeItem icon={Folder} nodeId='1.3.3.1' label='Locker'></DocumentTreeItem>
              </DocumentTreeItem>
            </DocumentTreeItem>
          </DocumentTreeItem>
        </TreeView>
      </TreeWarpper>
    </DocumentWrapper>
  )
}

export default Document
