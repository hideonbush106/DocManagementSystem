import { styled as mstyled, Modal, Box, Typography, Button } from '@mui/material'
import dayjs from 'dayjs'
import styled from 'styled-components'

const TitleText = styled.span`
  font-weight: 600;
`

const Text = mstyled(Typography)`
  padding: 5px 0;
`
interface RequestModalProps {
  open: boolean
  handleClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedRequest: any
}

const DetailRequestModal = ({ open, handleClose, selectedRequest }: RequestModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'var(--primary-color)'
      case 'REJECTED':
        return 'var(--red-color)'
      case 'APPROVED':
        return 'var(--green-color)'
      default:
        return 'inherit'
    }
  }
  const handleViewPdf = () => {
    window.open(selectedRequest.document.storageUrl)
  }
  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Box
        sx={{
          borderRadius: '5px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 'fit-content',
          bgcolor: 'background.paper',
          boxShadow: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          border: 'none',
          padding: '30px'
        }}
      >
        {selectedRequest && (
          <div>
            <Typography variant='h5' sx={{ fontWeight: '600', marginBottom: '20px' }}>
              Request Details
            </Typography>
            <Text>
              <TitleText>Description: </TitleText> {selectedRequest.description}
            </Text>
            <Text>
              <TitleText>Created by: </TitleText>
              {`${selectedRequest.createdBy.firstName} ${selectedRequest.createdBy.lastName}`}
            </Text>
            <Text>
              <TitleText>Created at: </TitleText>
              {dayjs(selectedRequest.createdAt).format('DD/MM/YYYY HH:mm:ss')}
            </Text>
            {selectedRequest.borrowDuration && (
              <Text>
                <TitleText>Borrow duration: </TitleText> {selectedRequest.borrowDuration}
              </Text>
            )}
            {selectedRequest.status === 'PENDING' && (
              <Text>
                <TitleText>Expired at: </TitleText>
                {dayjs(selectedRequest.expired_at).format('DD/MM/YYYY HH:mm:ss')}
              </Text>
            )}
            <Text>
              <TitleText>Updated at: </TitleText>
              {dayjs(selectedRequest.updatedAt).format('DD/MM/YYYY HH:mm:ss')}
            </Text>
            <Text>
              <TitleText>Status: </TitleText>
              <span style={{ color: getStatusColor(selectedRequest.status) }}>{selectedRequest.status}</span>
            </Text>
            <div style={{ display: 'flex', justifyContent: 'center', width: '450px', margin: '20px 0 0' }}>
              {selectedRequest.document.storageUrl && (
                <Button variant='contained' onClick={handleViewPdf}>
                  View PDF
                </Button>
              )}
            </div>
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default DetailRequestModal
