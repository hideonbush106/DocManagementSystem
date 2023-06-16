import React, { useState } from 'react'
import { Modal, Box, TextField, Button } from '@mui/material'

interface RejectionModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (reason: string) => void
}

const RejectRequestModal: React.FC<RejectionModalProps> = ({ open, onClose, onSubmit }) => {
  const [reason, setReason] = useState('')

  const handleReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const inputValue = event.target.value
    const words = inputValue.trim().split(' ')
    if (words.length <= 50) {
      setReason(inputValue)
    } else {
      const truncatedInput = words.slice(0, 50).join(' ')
      setReason(truncatedInput)
    }
  }

  const handleSubmit = () => {
    onSubmit(reason)
    setReason('')
  }

  const isReasonEmpty = reason.trim() === ''

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          borderRadius: '5px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          height: 250,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }}
      >
        <TextField
          label='Reason for Rejection'
          multiline
          rows={4}
          value={reason}
          onChange={handleReasonChange}
          sx={{ width: '400px', marginBottom: '20px' }}
          error
          required
        />
        <Button
          variant='contained'
          onClick={handleSubmit}
          color='error'
          sx={{ padding: '5px 15px' }}
          disabled={isReasonEmpty}
        >
          Reject
        </Button>
      </Box>
    </Modal>
  )
}

export default RejectRequestModal
