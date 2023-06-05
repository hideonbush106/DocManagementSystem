import SearchField from '~/components/TextField/SearchField'
import { ImportButton, ReturnButton } from '~/components/button/Button'
import { ButtonWrapper, DocumentGrid, DocumentWrapper, NavWrapper, TreeWarpper } from './Document.styled'
import { IconDiv } from '~/components/headerBar/HeaderBar.styled'
import TreeView from '@mui/lab/TreeView'
import { Apartment, ChevronRight, ExpandMore, Folder, Work } from '@mui/icons-material'
import DocumentTreeItem from '~/components/treeItem/DocumentTreeItem'
import { Breadcrumbs, Card, Grid } from '@mui/material'
import { fakeData } from '~/shared/fakeData'
import { Link } from 'react-router-dom'

const Document = () => {
  // const breadcrumbs = [
  //   <Link underline='hover' key='1' color='inherit' href='/' onClick={handleClick}>
  //     MUI
  //   </Link>,
  //   <Link
  //     underline='hover'
  //     key='2'
  //     color='inherit'
  //     href='/material-ui/getting-started/installation/'
  //     onClick={handleClick}
  //   >
  //     Core
  //   </Link>,
  //   <Typography key='3' color='text.primary'>
  //     Breadcrumb
  //   </Typography>
  // ]
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
          defaultExpanded={['1.3', '1.1', '1.2']}
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
        >
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
        </TreeView>
      </TreeWarpper>
      <DocumentGrid>
        <Breadcrumbs separator='>'>
          <Link to='/'>Human Resources</Link>
          <Link to='/'>Room 001</Link>
          <Link to='/'>Locker</Link>
        </Breadcrumbs>
        <Grid container spacing={3} columnSpacing={4} sx={{ marginTop: '0.5rem' }}>
          {fakeData.map((item, index) => (
            <Grid key={index} item md={4}>
              <Link to={`/room?id=${item.room[index].id}`}>
                <Card sx={{ p: '1rem' }}>{item.department}</Card>
              </Link>
            </Grid>
          ))}
          <Grid item md={4}>
            <Card sx={{ p: '1rem' }}>Accountant</Card>
          </Grid>
          <Grid item md={4}>
            <Card sx={{ p: '1rem' }}>Phong</Card>
          </Grid>
          <Grid item md={4}>
            <Card sx={{ p: '1rem' }}>Phong</Card>
          </Grid>
          <Grid item md={4}>
            <Card sx={{ p: '1rem' }}>Phong</Card>
          </Grid>
          <Grid item md={4}>
            <Card sx={{ p: '1rem' }}>Phong</Card>
          </Grid>
        </Grid>
      </DocumentGrid>
    </DocumentWrapper>
  )
}

export default Document
