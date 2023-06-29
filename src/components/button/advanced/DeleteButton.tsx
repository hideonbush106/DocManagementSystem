import { Button, Fab, useMediaQuery, useTheme } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import React from 'react'
import ModalLayout from '~/components/modal/ModalLayout'
import DeleteAdvancedModal from '~/components/modal/advanced/DeleteAdvancedModal'

interface ButtonProps {
  id: string
  name: string
  type: string
  handleDelete: (id: string) => void
}

export const DeleteButton = ({ id, name, type, handleDelete }: ButtonProps) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const theme = useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'))
  const sm = useMediaQuery(theme.breakpoints.down('sm'))
  const md = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {xs || sm || md ? (
        <Fab
          size={'small'}
          style={{ color: 'var(--white-color)', backgroundColor: 'var(--red-color)' }}
          onClick={handleOpen}
        >
          <CloseRoundedIcon />
        </Fab>
      ) : (
        <Button
          variant='outlined'
          startIcon={<CloseRoundedIcon />}
          sx={{
            width: '100px',
            color: 'var(--red-color)',
            border: '0.5px solid var(--red-color)',
            '&:hover': {
              backgroundColor: 'var(--red-light-color)',
              borderColor: 'var(--red-color)'
            },
            padding: '5px 10px',
            fontSize: '14px',
            marginRight: '10px',
            fontFamily: 'inherit'
          }}
          onClick={handleOpen}
        >
          Delete
        </Button>
      )}
      <ModalLayout open={open} handleClose={handleClose}>
        <DeleteAdvancedModal id={id} name={name} type={type} handleDelete={handleDelete} />
      </ModalLayout>
    </>
  )
}
