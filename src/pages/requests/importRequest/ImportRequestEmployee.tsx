/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestCard from '~/components/card/requestCard/RequestCard'
import { Avatar, Box, CardActions, Pagination, Typography, styled } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useEffect, useState } from 'react'
import usePagination from '~/hooks/usePagination'
import useApi from '~/hooks/api/useApi'
import InfoIcon from '@mui/icons-material/Info'
import DetailRequestModal from '~/components/modal/DetailRequestModal'
import { StatusDiv } from '~/pages/requests/importRequest/ImportRequest.styled'
import { RejectButton } from '~/components/button/Button'
import useUserApi from '~/hooks/api/useUserApi'
import dayjs from 'dayjs'
import useImportRequestApi from '~/hooks/api/useImportRequestApi'
import { RequestStatus } from '~/global/enum'

const Text = styled(Typography)`
  color: var(--black-color);
  margin: 0.5rem 0;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const StatusText = ({ status }: { status: string }) => {
  if (status === RequestStatus.REJECTED) {
    return <StatusDiv rejected>Rejected</StatusDiv>
  }
  if (status === RequestStatus.APPROVED) {
    return <StatusDiv accepted>Approved</StatusDiv>
  }
  if (status === RequestStatus.CANCELED) {
    return <StatusDiv canceled>Cancelled</StatusDiv>
  }
  if (status === RequestStatus.EXPIRED) {
    return <StatusDiv expired>Expired</StatusDiv>
  }
  if (status === RequestStatus.DONE) {
    return <StatusDiv done>Done</StatusDiv>
  }
  return null
}

const ImportRequestEmployee = () => {
  const PER_PAGE = 10

  const [page, setPage] = useState(1)
  const [importRequests, setImportRequests] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [isFetching, setIsFetching] = useState(true)
  const callApi = useApi()
  const { cancelImportRequest } = useImportRequestApi()
  useUserApi()

  const fetchImportRequests = async () => {
    try {
      const endpoint = '/import-requests/own'
      const response = await callApi('get', `${endpoint}?page=${page}`)
      const responseData = response.data.data
      const totalPages = response.data.total

      if (responseData && Array.isArray(responseData)) {
        setImportRequests(responseData)
        setTotalPages(Math.ceil(totalPages / PER_PAGE))
        setIsFetching(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchImportRequests()
  }, [page])

  const count = totalPages
  const _DATA = usePagination(importRequests, PER_PAGE)

  const handleChange = (e: React.ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
    _DATA.jump(pageNumber)
    console.log(e)
  }

  const handleInfoIconClick = async (id: number) => {
    try {
      const response = await callApi('get', `/import-requests/${id}`)
      const requestDetails = response.data
      setSelectedRequest(requestDetails)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClosePopup = () => {
    setSelectedRequest(null)
  }

  const handleCancel = async (id: string) => {
    try {
      const response = await cancelImportRequest(id)
      console.log(response)
      setImportRequests((prevRequests) =>
        prevRequests.map((request) => (request.id === id ? { ...request, status: 'CANCELED' } : request))
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {isFetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} width='100%' height='60vh'>
          <CircularProgress />
        </Box>
      ) : (
        <Box display='flex' flexDirection='column' justifyContent='space-between' minHeight='75vh' marginTop='20px'>
          <Box display='flex' flexWrap='wrap'>
            {importRequests.length === 0 ? (
              <Typography>There is no requests</Typography>
            ) : (
              _DATA.currentData().map((request) => (
                <RequestCard key={request.id}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Avatar sx={{ width: '45px', height: '45px' }} src={request.createdBy.photoURL} />
                      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.75rem' }}>
                        <Typography
                          sx={{ fontSize: '16px', fontWeight: '600', marginRight: '10px' }}
                        >{`${request.createdBy.firstName} ${request.createdBy.lastName}`}</Typography>
                        <Typography sx={{ color: '#a5aab5', letterSpacing: '0', fontSize: '16px' }}>
                          {request.code}
                        </Typography>
                      </div>
                    </div>
                    <InfoIcon
                      sx={{ color: 'var(--black-light-color)' }}
                      onClick={() => handleInfoIconClick(request.id)}
                    />
                  </div>
                  <div style={{ height: '200px' }}>
                    <Text variant='body2'>
                      <strong> Description: </strong>
                      {request.description}
                    </Text>
                    <Text variant='body2'>
                      <strong> Time request: </strong>
                      {dayjs(request.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                    </Text>
                    {request.rejectedReason && (
                      <Text variant='body2'>
                        <strong> Reason: </strong>
                        {request.rejectedReason}
                      </Text>
                    )}
                  </div>
                  <CardActions sx={{ justifyContent: 'space-evenly', padding: '0' }}>
                    {request.status === 'PENDING' ? (
                      <RejectButton text='Cancel Request' onClick={() => handleCancel(request.id)} />
                    ) : (
                      <StatusText status={request.status} />
                    )}
                  </CardActions>
                </RequestCard>
              ))
            )}
          </Box>
          <Pagination
            count={count}
            size='large'
            page={page}
            variant='outlined'
            shape='rounded'
            onChange={handleChange}
          />
          <DetailRequestModal
            open={selectedRequest !== null}
            handleClose={handleClosePopup}
            selectedRequest={selectedRequest}
          />
        </Box>
      )}
    </>
  )
}

export default ImportRequestEmployee
