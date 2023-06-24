import { Modal, Button, Theme, SxProps, useMediaQuery, useTheme, Fab } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

interface ModalLayoutProps {
  button: string
  children: React.ReactNode
  variant?: 'outlined' | 'contained'
  size?: 'small' | 'medium' | 'large'
  style?: SxProps<Theme>
  endIcon?: React.ReactNode
  startIcon?: React.ReactNode
  overflow?: 'scroll' | 'hidden'
  mobileStyle?: SxProps<Theme>
}

const ModalLayout = (props: ModalLayoutProps) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
      xs: '95vw',
      md: '60vw',
      lg: '40vw'
    },
    bgcolor: 'white',
    boxShadow: 24,
    maxHeight: {
      xs: '100vh',
      md: '80vh'
    }
  }
  return (
    <>
      {xs || sm || md ? (
        <Fab sx={props.mobileStyle} size={props.size} color='primary' onClick={handleOpen}>
          {props.startIcon}
        </Fab>
      ) : (
        <Button
          sx={props.style}
          variant={props.variant}
          endIcon={props.endIcon}
          startIcon={props.startIcon}
          size={props.size}
          color='primary'
          onClick={handleOpen}
        >
          {props.button}
        </Button>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component={'div'} style={{ overflowY: props.overflow }}>
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
