import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { useCallback, useEffect, useState } from 'react'
import { AcceptButton, RejectButton } from '~/components/button/Button'
import styled from 'styled-components'
import RejectRequestModal from '~/components/model/rejectRequestModel/RejectRequestModel'
import { mockRequestProps } from '~/shared/mockRequest'

interface StatusDivProps {
  accepted?: boolean
  rejected?: boolean
}

interface RequestCardProps {
  request: mockRequestProps
  children?: React.ReactNode
}

const StatusDiv = styled.div<StatusDivProps>`
  width: fit-content;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white-color);
  border-radius: 5px;
  padding: 5px 15px;
  ${({ accepted }) =>
    accepted &&
    `
    background-color: var(--green-color);
    `};
  ${({ rejected }) =>
    rejected &&
    `
    background-color: var(--red-color);
  `}
`

const RequestCard = ({ request, children }: RequestCardProps) => {
  const [status, setStatus] = useState('pending')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAccept = () => {
    const updatedRequest = { ...request, status: 'accepted' }
    localStorage.setItem('status', 'accepted')
    setStatus('accepted')
    console.log('Accepted:', updatedRequest)
  }

  const handleReject = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalSubmit = (reason: string) => {
    const updatedRequest = { ...request, status: 'rejected', reason }
    localStorage.setItem('status', 'rejected')
    setStatus('rejected')
    console.log('Rejected:', updatedRequest)
    setIsModalOpen(false)
  }

  const renderStatusText = useCallback(() => {
    if (status === 'rejected') {
      return <StatusDiv rejected>Rejected</StatusDiv>
    }
    if (status === 'accepted') {
      return <StatusDiv accepted>Accepted</StatusDiv>
    }
    return null
  }, [status])

  useEffect(() => {
    renderStatusText()
  }, [renderStatusText, status])

  return (
    <>
      <Card sx={{ maxWidth: '13.25rem', margin: '0 20px 15px 0' }}>
        <CardContent sx={{ height: '13.5rem', overflow: 'visible' }}>{children}</CardContent>
        <CardActions sx={{ justifyContent: 'space-evenly', margin: '10px 0' }}>
          {status === 'pending' && (
            <>
              <AcceptButton text='Accept' onClick={handleAccept} />
              <RejectButton text='Reject' onClick={handleReject} />
            </>
          )}
          {renderStatusText()}
        </CardActions>
      </Card>
      <RejectRequestModal open={isModalOpen} onClose={handleModalClose} onSubmit={handleModalSubmit} />
    </>
  )
}

export default RequestCard
