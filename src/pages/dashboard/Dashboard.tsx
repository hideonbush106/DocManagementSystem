import HeaderBar from '~/components/headerBar/HeaderBar'
import {
  RequestContainer,
  DashboardWrapper,
  DocumentContainer,
  SumaryContainer,
  StatisticContainer,
  TitleUnderline,
  SubtitleWrapper
} from './Dashboard.styled'
import { styled } from '@mui/system'
import { Typography } from '@mui/material'
import { ViewButton } from '~/components/button/Button'
import DocumentTable from '~/components/table/DocumentTable'
import { Link } from 'react-router-dom'

const Subtitle = styled(Typography)({
  fontWeight: '600',
  fontSize: '0.85rem',
  letterSpacing: '1.2px',
  textTransform: 'uppercase',
  color: 'var(--black-light-color)'
})

const Dashboard = () => {
  return (
    <>
      <HeaderBar />
      <DashboardWrapper>
        <DocumentContainer>
          <SubtitleWrapper>
            <div className='title'>
              <Subtitle variant='h6'>Documents</Subtitle>
              <TitleUnderline />
            </div>
            <Link to='/document'>
              <ViewButton text='View All' />
            </Link>
          </SubtitleWrapper>
          <DocumentTable />
        </DocumentContainer>
        <SumaryContainer>
          <Subtitle variant='h6'>Summary</Subtitle>
          <TitleUnderline />
        </SumaryContainer>
        <RequestContainer>
          <SubtitleWrapper>
            <div className='title'>
              <Subtitle variant='h6'>Pending Approvals</Subtitle>
              <TitleUnderline />
            </div>
            <Link to='/pending-approval'>
              <ViewButton text='View' />
            </Link>
          </SubtitleWrapper>
        </RequestContainer>
        <RequestContainer>
          <SubtitleWrapper>
            <div className='title'>
              <Subtitle variant='h6'>Borrow Requests</Subtitle>
              <TitleUnderline />
            </div>
            <Link to='/request'>
              <ViewButton text='View' />
            </Link>
          </SubtitleWrapper>
        </RequestContainer>
        <StatisticContainer>
          <Subtitle variant='h6' sx={{ fontWeight: '600', fontSize: '0.85rem', letterSpacing: '1.2px' }}>
            Monthly Statistics
          </Subtitle>
          <TitleUnderline />
        </StatisticContainer>
      </DashboardWrapper>
    </>
  )
}

export default Dashboard
