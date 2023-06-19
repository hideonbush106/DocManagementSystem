import RequestCard from '~/components/card/requestCard/RequestCard'
import { Avatar, Box, Pagination, Typography, styled, useMediaQuery } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import usePagination from '~/hooks/usePagination'
import { RequestDataContext } from '~/context/ImportDataContext'

const Text = styled(Typography)`
  color: var(--black-color);
  margin: 0.5rem 0;
`

const ImportRequest = () => {
  const isExtraLargeScreen = useMediaQuery('(min-width:1500px)')
  const isLargeScreen = useMediaQuery('(min-width:1200px)')
  const isMediumScreen = useMediaQuery('(min-width:1000px)')
  const isSmallScreen = useMediaQuery('(min-width:900px)')

  let PER_PAGE = 6
  if (isExtraLargeScreen) {
    PER_PAGE = 10
  } else if (isLargeScreen) {
    PER_PAGE = 8
  } else if (isMediumScreen) {
    PER_PAGE = 6
  } else if (isSmallScreen) {
    PER_PAGE = 4
  }
  const [page, setPage] = useState(1)
  const { requestData } = useContext(RequestDataContext)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    setTotalPages(Math.ceil(requestData.length / PER_PAGE))
  }, [requestData, PER_PAGE])

  const count = totalPages
  const _DATA = usePagination(requestData, PER_PAGE)

  const handleChange = (e: React.ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
    _DATA.jump(pageNumber)
    console.log(e)
  }

  return (
    <>
      <Box display='flex' flexDirection='column' justifyContent='space-between' minHeight='81vh'>
        <Box display='flex' flexWrap='wrap'>
          {requestData.length === 0 ? (
            <Typography variant='body2'>Loading...</Typography>
          ) : (
            _DATA.currentData().map((request) => (
              <RequestCard key={request.id}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Avatar sx={{ width: '50px', height: '50px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.75rem' }}>
                    <Typography
                      sx={{ fontSize: '18px', fontWeight: '600' }}
                    >{`${request.createdBy.firstName} ${request.createdBy.lastName}`}</Typography>
                    <Typography sx={{ color: '#a5aab5', letterSpacing: '0', fontSize: '16px' }}>
                      {request.code}
                    </Typography>
                  </div>
                </div>
                <Text variant='body2'>
                  <strong> Description: </strong>
                  {request.description}
                </Text>
                <Text variant='body2'>
                  <strong> Time request: </strong>
                  {new Date(request.createdAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </Text>
              </RequestCard>
            ))
          )}
        </Box>
        <Pagination count={count} size='large' page={page} variant='outlined' shape='rounded' onChange={handleChange} />
      </Box>
    </>
  )
}

export default ImportRequest
