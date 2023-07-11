import ApprovalsTable from '~/components/table/ApprovalsTable'
import { HeaderWrapper, PendingApprovalsWrapper } from './PendingApprovals.styled'
import SearchField from '~/components/TextField/SearchField'
import { Typography } from '@mui/material'
import { useState } from 'react'

const PendingApprovals = () => {
  const [searchData, setSearchData] = useState('')
  return (
    <PendingApprovalsWrapper>
      <HeaderWrapper>
        <SearchField
          onChange={(e) => {
            setSearchData(e.target.value)
          }}
        />
      </HeaderWrapper>
      <Typography variant='h5' width={'100%'} fontWeight={'bold'} style={{ color: 'var(--black-color)' }}>
        Files
      </Typography>
      <ApprovalsTable view='full' searchData={searchData} />
    </PendingApprovalsWrapper>
  )
}

export default PendingApprovals
