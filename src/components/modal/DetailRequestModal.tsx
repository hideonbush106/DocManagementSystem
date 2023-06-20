import { Modal, Box, Typography } from '@mui/material'
import styled from 'styled-components'

const TitleText = styled.span`
  font-weight: 600;
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
  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Box
        sx={{
          borderRadius: '5px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 300,
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
            <Typography variant='h5' sx={{ fontWeight: '600', margin: '0 0 20px' }}>
              Request Details
            </Typography>
            <Typography>
              <TitleText>Description: </TitleText> {selectedRequest.description}
            </Typography>
            <Typography>
              <TitleText>Create by: </TitleText>
              {`${selectedRequest.createdBy.firstName} ${selectedRequest.createdBy.lastName}`}
            </Typography>
            <Typography>
              <TitleText>Status: </TitleText>
              <span style={{ color: getStatusColor(selectedRequest.status) }}>{selectedRequest.status}</span>
            </Typography>
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default DetailRequestModal
