import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'
import Barcode from 'react-barcode'

const Detail = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const style = {
    fontFamily: 'inherit',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    boxShadow: 24,
    py: 6,
    px: 5,
    color: 'var(--black-color)',
    '& .MuiTypography-root': {
      mb: 2
    }
  }

  return (
    <>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        detail
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant='h5' sx={{ fontWeight: '600' }}>
            Labor Contract 2022
          </Typography>
          <Typography variant='body1'>Description: This is the description of this document. </Typography>
          <Typography variant='body1'>Department: Human Resources </Typography>
          <Typography variant='body1'>Location: Room 001, Locker 2, Folder Contract a1 </Typography>
          <Typography variant='body1'>Category: Contract </Typography>
          <Typography variant='body1'>Created at: 2022 May 23th, 09:35:34 </Typography>
          <Typography variant='body1'>Status: Available </Typography>
          <Barcode value='123456789' />
        </Box>
      </Modal>
    </>
  )
}

export default Detail
