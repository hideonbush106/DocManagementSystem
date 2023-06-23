/* eslint-disable @typescript-eslint/no-explicit-any */
import RequestCard from '~/components/card/requestCard/RequestCard'
import { Avatar, Box, CardActions, Pagination, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import usePagination from '~/hooks/usePagination'
import useApi from '~/hooks/api/useApi'
import InfoIcon from '@mui/icons-material/Info'
import DetailRequestModal from '~/components/modal/DetailRequestModal'
import { StatusDiv } from '~/pages/requests/importRequest/ImportRequest.styled'
import { AcceptButton, RejectButton } from '~/components/button/Button'
import RejectRequestModal from '~/components/modal/RejectRequestModal'
import useUserApi from '~/hooks/api/useUserApi'

const Text = styled(Typography)`
  color: var(--black-color);
  margin: 0.5rem 0;
`

const StatusText = ({ status }: { status: string }) => {
  if (status === 'REJECTED') {
    return <StatusDiv rejected>Rejected</StatusDiv>
  }
  if (status === 'APPROVED') {
    return <StatusDiv accepted>Accepted</StatusDiv>
  }
  return null
}

const BorrowRequest = () => {
  const PER_PAGE = 10

  const [page, setPage] = useState(1)
  const [borrowRequests, setBorrowRequests] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userProfiles, setUserProfiles] = useState<{ [key: string]: string | null }>({})
  const { getUserProfile } = useUserApi()
  const callApi = useApi()

  useEffect(() => {
    const fetchBorrowRequests = async () => {
      try {
        const response = await callApi('get', '/borrow-requests')
        // console.log(response.data)

        const responseData = response.data.data
        const totalPages = response.data.total

        if (responseData && Array.isArray(responseData)) {
          setBorrowRequests(responseData)
          setTotalPages(Math.ceil(totalPages / PER_PAGE))
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchBorrowRequests()
  }, [PER_PAGE, callApi])

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const userProfileData: { [key: string]: string | null } = {}
      for (const request of borrowRequests) {
        try {
          const response = await getUserProfile(request.createdBy.id)
          // console.log(response)
          // console.log(response.data.photoURL)

          userProfileData[request.createdBy.id] = response?.data?.photoURL || null
          console.log(userProfileData)
        } catch (error) {
          console.log(error)
          userProfileData[request.createdBy.id] = null
        }
      }
      setUserProfiles(userProfileData)
    }

    fetchUserProfiles()
  }, [getUserProfile, borrowRequests])

  const count = totalPages
  const _DATA = usePagination(borrowRequests, PER_PAGE)

  const handleChange = (e: React.ChangeEvent<unknown>, pageNumber: number) => {
    setPage(pageNumber)
    _DATA.jump(pageNumber)
    console.log(e)
  }

  const handleInfoIconClick = async (id: number) => {
    try {
      const response = await callApi('get', `/borrow-requests/${id}`)
      const requestDetails = response.data
      setSelectedRequest(requestDetails)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClosePopup = () => {
    setSelectedRequest(null)
  }

  const handleAccept = () => {
    console.log('Accepted')
  }

  const handleReject = () => {
    setSelectedRequest(null)
    setIsModalOpen(true)
  }

  const handleRejectModalClose = () => {
    setIsModalOpen(false)
  }

  const handleRejectModalSubmit = (reason: string) => {
    console.log('Rejected:', reason)
    setIsModalOpen(false)
  }

  return (
    <>
      <Box display='flex' flexDirection='column' justifyContent='space-between' minHeight='81vh'>
        <Box display='flex' flexWrap='wrap'>
          {borrowRequests.length === 0 ? (
            <Typography variant='body2'>Loading...</Typography>
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
                    <Avatar sx={{ width: '45px', height: '45px' }} src={userProfiles[request.createdBy.id] || ''} />
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
                    {new Date(request.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </Text>
                </div>
                <CardActions sx={{ justifyContent: 'space-evenly', margin: '10px 0' }}>
                  {request.status === 'PENDING' ? (
                    <>
                      <AcceptButton text='Accept' onClick={handleAccept} />
                      <RejectButton text='Reject' onClick={handleReject} />
                    </>
                  ) : (
                    <StatusText status={request.status} />
                  )}
                </CardActions>
              </RequestCard>
            ))
          )}
        </Box>
        <Pagination count={count} size='large' page={page} variant='outlined' shape='rounded' onChange={handleChange} />
        <DetailRequestModal
          open={selectedRequest !== null}
          handleClose={handleClosePopup}
          selectedRequest={selectedRequest}
        />
        <RejectRequestModal open={isModalOpen} onClose={handleRejectModalClose} onSubmit={handleRejectModalSubmit} />
      </Box>
    </>
  )
}

export default BorrowRequest
