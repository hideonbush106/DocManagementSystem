/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestCard from '~/components/card/requestCard/RequestCard'
import { Avatar, Box, CardActions, Pagination, Skeleton, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import usePagination from '~/hooks/usePagination'
import useApi from '~/hooks/api/useApi'
import InfoIcon from '@mui/icons-material/Info'
import DetailRequestModal from '~/components/modal/DetailRequestModal'
import { StatusDiv } from '~/pages/requests/importRequest/ImportRequest.styled'
import { AcceptButton, RejectButton } from '~/components/button/Button'
import RejectRequestModal from '~/components/modal/RejectRequestModal'
import useImportRequestApi from '~/hooks/api/useImportRequestApi'
import useUserApi from '~/hooks/api/useUserApi'
import useAuth from '~/hooks/useAuth'
import * as dayjs from 'dayjs'

const Text = styled(Typography)`
  color: var(--black-color);
  margin: 0.5rem 0;
`

const StatusText = ({ status }: { status: string }) => {
  if (status === 'REJECTED') {
    return (
      <>
        <StatusDiv rejected>Rejected</StatusDiv>
      </>
    )
  }
  if (status === 'APPROVED') {
    return <StatusDiv accepted>Accepted</StatusDiv>
  }
  return null
}

const ImportRequest = () => {
  const PER_PAGE = 10

  const [page, setPage] = useState(1)
  const [importRequests, setImportRequests] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [rejectID, setRejectID] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const callApi = useApi()
  const { acceptImportRequest, rejectImportRequest } = useImportRequestApi()
  useUserApi()
  const { user } = useAuth()
  const role = user?.role

  const fetchImportRequests = async () => {
    try {
      let endpoint = '/import-requests'

      if (role === 'EMPLOYEE') {
        endpoint = '/import-requests/own'
      }
      const response = await callApi('get', `${endpoint}?page=${page}`)
      const responseData = response.data.data
      const totalPages = response.data.total

      if (responseData && Array.isArray(responseData)) {
        setImportRequests(responseData)
        setTotalPages(Math.ceil(totalPages / PER_PAGE))
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

  const handleAccept = async (importRequestId: string) => {
    try {
      const response = await acceptImportRequest(importRequestId)
      console.log('Accept request successful:', response)

      setImportRequests((prevRequests) =>
        prevRequests.map((request) => (request.id === importRequestId ? { ...request, status: 'APPROVED' } : request))
      )
    } catch (error) {
      console.log('Accept request failed:', error)
    }
  }

  const handleReject = (id: number) => {
    setRejectID(id)
    setIsModalOpen(true)
  }

  const handleRejectModalClose = () => {
    setIsModalOpen(false)
  }

  const handleRejectModalSubmit = async (reason: string) => {
    console.log('Rejected:', reason)
    setIsModalOpen(false)

    if (rejectID) {
      try {
        const response = await rejectImportRequest({ id: String(rejectID), rejectedReason: reason })
        console.log('Reject request successful:', response)

        await fetchImportRequests()

        setImportRequests((prevRequests) =>
          prevRequests.map((request) => (request.id === rejectID ? { ...request, status: 'REJECTED' } : request))
        )
      } catch (error) {
        console.log('Reject request failed:', error)
      }
    }
  }

  return (
    <>
      {role === 'STAFF' ? (
        <Box display='flex' flexDirection='column' justifyContent='space-between' minHeight='81vh' marginTop='20px'>
          <Box display='flex' flexWrap='wrap'>
            {importRequests.length === 0 ? (
              <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation='wave' />
                <Skeleton animation={false} />
              </Box>
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
                    <div style={{ maxHeight: '50px', overflow: 'hidden' }}>
                      <Text variant='body2'>
                        <strong> Description: </strong>
                        {request.description}
                      </Text>
                    </div>
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
                  <CardActions sx={{ justifyContent: 'space-evenly' }}>
                    {request.status === 'PENDING' ? (
                      <>
                        <AcceptButton text='Accept' onClick={() => handleAccept(request.id)} />
                        <RejectButton text='Reject' onClick={() => handleReject(request.id)} />
                      </>
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
          <RejectRequestModal open={isModalOpen} onClose={handleRejectModalClose} onSubmit={handleRejectModalSubmit} />
        </Box>
      ) : (
        <div>Employee</div>
      )}
    </>
  )
}

export default ImportRequest
