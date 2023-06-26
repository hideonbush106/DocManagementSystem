import { Box, Button, Typography } from '@mui/material'

interface DeleteProps {
  id: string
  handleDelete: (id: string) => void
  type: string
}

const DeleteModal = (props: DeleteProps) => {
  const handleDelete = () => {
    props.handleDelete?.(props.id ?? '')
  }
  return (
    <>
      <Box
        display={'inline-flex'}
        sx={{
          p: {
            xs: 1.5,
            sm: 3
          },
          position: 'sticky',
          top: 0,
          background: 'white',
          zIndex: 1,
          width: '100%'
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: 'var(--black-color)',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem'
            },
            fontFamily: 'inherit',
            mx: 1
          }}
          variant='h4'
        >
          Are you sure?
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          px: {
            xs: 2.5,
            sm: 4
          }
        }}
      >
        <Typography
          sx={{
            color: 'var(--black-color)',
            my: 1.5,
            fontSize: {
              xs: '1.1rem',
              sm: '1.3rem'
            },
            fontFamily: 'inherit'
          }}
          variant='body2'
        >
          This will delete this {props.type} permanently. You cannot undo this action.
        </Typography>
      </Box>
      <Box
        sx={{
          p: 4,
          position: 'sticky',
          bottom: -1,
          zIndex: 1,
          background: 'white',
          display: 'flex',
          justifyContent: 'end',
          width: '100%'
        }}
      >
        <Button
          sx={{ my: 1, mr: 1 }}
          variant='contained'
          color='error'
          onClick={handleDelete}
          style={{ fontFamily: 'inherit' }}
        >
          Delete
        </Button>
      </Box>
    </>
  )
}

export default DeleteModal
