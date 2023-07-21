import React, { useState } from 'react'
import { Modal, Box, TextField, Button, FormHelperText } from '@mui/material'

interface RejectionModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (reason: string) => void
}

const RejectRequestModal: React.FC<RejectionModalProps> = ({ open, onClose, onSubmit }) => {
  const [reason, setReason] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleReasonChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const inputValue = event.target.value
    if (inputValue.length <= 50) {
      setReason(inputValue)
      setErrorMessage('')
    } else {
      const truncatedInput = inputValue.slice(0, 50)
      setReason(truncatedInput)
      setErrorMessage('Reason should be less than or equal to 50 characters.')
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
          height: 260,
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
          error={!!errorMessage}
          required
        />
        {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
        <Button
          variant='contained'
          onClick={handleSubmit}
          color='error'
          sx={{ padding: '5px 15px', marginTop: '15px' }}
          disabled={isReasonEmpty}
        >
          Reject
        </Button>
      </Box>
    </Modal>
  )
}

export default RejectRequestModal
