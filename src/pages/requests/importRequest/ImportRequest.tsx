import RequestCard from '~/components/card/requestCard/RequestCard'
import { Avatar, Box, Pagination, Typography, styled } from '@mui/material'
import { mockRequest } from '~/shared/mockRequest'
import { useState } from 'react'
import usePagination from '~/hooks/usePagination'

const Text = styled(Typography)`
  color: var(--black-color);
  margin: 0.5rem 0;
`

const ImportRequest = () => {
  const [page, setPage] = useState(1)
  const PER_PAGE = 10

  const count = Math.ceil(mockRequest.length / PER_PAGE)
  const _DATA = usePagination(mockRequest, PER_PAGE)

  const handleChange = (e: React.ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
    _DATA.jump(pageNumber)
    console.log(e)
  }

  return (
    <>
      <Box display='flex' flexDirection='column' justifyContent='space-between' minHeight='85vh'>
        <Box display='flex' flexWrap='wrap'>
          {_DATA.currentData().map((request) => (
            <RequestCard key={request.id} request={request}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <Avatar sx={{ width: '50px', height: '50px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.75rem' }}>
                  <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>{request.name}</Typography>
                  <Typography sx={{ color: '#a5aab5', letterSpacing: '0', fontSize: '16px' }}>
                    {request.role}
                  </Typography>
                </div>
              </div>
              <Text variant='body2'>
                <strong> Title: </strong>
                {request.title}
              </Text>
              <Text variant='body2'>
                <strong> Time request: </strong>
                {request.timeRequest.toLocaleString()}
              </Text>
            </RequestCard>
          ))}
        </Box>
        <Pagination count={count} size='large' page={page} variant='outlined' shape='rounded' onChange={handleChange} />
      </Box>
    </>
  )
}

export default ImportRequest
