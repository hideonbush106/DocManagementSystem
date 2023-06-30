import { Box, Button, Typography } from '@mui/material'

interface DeleteProps {
  id: string
  name: string
  type: string
  handleDelete: (id: string) => void
}

const DeleteAdvancedModal = (props: DeleteProps) => {
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
          Delete {props.type.toLocaleLowerCase()}
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
          Are you sure you want to delete this <span>{props.type.toLocaleLowerCase()} </span>
          <span style={{ fontWeight: '600', whiteSpace: 'nowrap' }}>{props.name}</span>?
        </Typography>
      </Box>
      <Box
        sx={{
          p: {
            xs: 1.5,
            sm: 4
          },
          background: 'white',
          display: 'flex',
          justifyContent: 'end',
          width: '100%'
        }}
      >
        <Button
          sx={{ m: 1, mr: 1 }}
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

export default DeleteAdvancedModal
