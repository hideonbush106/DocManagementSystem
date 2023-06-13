import { Modal, Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface ModalLayoutProps {
  button: string
  children: React.ReactNode
}

const ModalLayout = (props: ModalLayoutProps) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    bgcolor: 'white',
    boxShadow: 24,
    px: 3,
    py: 5
  }
  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleOpen}>
        {props.button}
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {React.Children.map(props.children, (child) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            React.cloneElement(child as React.ReactElement<any>, { handleClose })
          )}
        </Box>
      </Modal>
    </>
  )
}

export default ModalLayout
