import { Button, Fab, useMediaQuery, useTheme } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import React from 'react'
import ModalLayout from '~/components/modal/ModalLayout'
import { Edit } from '@mui/icons-material'
import { UpdateFolder, UpdateLocker, UpdateRoom } from '~/global/interface'
import UpdateAdvancedModal from '~/components/modal/advanced/UpdateAdvancedModal'

interface ButtonProps<T> {
  type: string
  onSubmit: (values: T) => void
  initialValues: T
  max: number
}

export const UpdateButton = <T extends UpdateRoom | UpdateLocker | UpdateFolder>({
  type,
  onSubmit,
  initialValues,
  max
}: ButtonProps<T>) => {
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
          style={{
            minWidth: '40px',
            color: 'var(--white-color)',
            backgroundColor: 'var(--primary-color)',
            margin: '0 5px'
          }}
          onClick={handleOpen}
        >
          <Edit />
        </Fab>
      ) : (
        <Button
          variant='outlined'
          startIcon={<Edit />}
          sx={{
            minWidth: '100px',
            color: 'var(--primary-color)',
            border: '0.5px solid var(--primary-color)',
            '&:hover': {
              backgroundColor: 'var(--background-dark-color)',
              borderColor: 'var(--primary-color)'
            },
            padding: '5px 10px',
            fontSize: '14px',
            marginRight: '10px',
            fontFamily: 'inherit',
            margin: '0 5px'
          }}
          onClick={handleOpen}
        >
          Update
        </Button>
      )}
      <ModalLayout open={open} handleClose={handleClose}>
        <UpdateAdvancedModal
          type={type}
          onSubmit={onSubmit}
          initialValues={initialValues}
          max={max}
          handleClose={handleClose}
        />
      </ModalLayout>
    </>
  )
}
