import ApprovalsTable from '~/components/table/ApprovalsTable'
import { HeaderWrapper, IconDiv, PendingApprovalsWrapper } from './PendingApprovals.styled'
import SearchField from '~/components/TextField/SearchField'
import { Typography } from '@mui/material'

const PendingApprovals = () => {
  return (
    <PendingApprovalsWrapper>
      <HeaderWrapper>
        <SearchField />
        <IconDiv white style={{ cursor: 'pointer' }}>
          <img src='/assets/bell-ringing.svg' alt='' />
        </IconDiv>
      </HeaderWrapper>
      <Typography variant='h5' width={'100%'} fontWeight={'bold'} padding={'2rem 0 1rem'}>
        Files
      </Typography>
      <ApprovalsTable view='full'/>
    </PendingApprovalsWrapper>
  )
}

export default PendingApprovals
