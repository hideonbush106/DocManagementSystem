import { Modal, Box, TextField, Button, Typography, FormControl } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as yup from 'yup'
import { CreateRoom } from '~/global/interface'

interface CreateRoomProps {
  open: boolean
  handleClose: () => void
  onSubmit?: (values: CreateRoom) => void
  deptId: string
}

const CreateRoomModal = (props: CreateRoomProps) => {
  const validationSchema = yup.object({
    name: yup.string().trim().required('Room name is required'),
    capacity: yup
      .number()
      .integer('Capacity must be an integer')
      .min(1, 'Capacity must be greater than 0')
      .max(20, 'Capacity must be less than 20')
      .required('Capacity is required')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      capacity: 10,
      department: {
        id: props.deptId
      }
    },
    validationSchema: validationSchema,
    onSubmit: (values: CreateRoom) => {
      values.name = values.name.trim().replace(/\s\s+/g, ' ')
      props.onSubmit?.(values)
    }
  })

  const handleClose = () => {
    props.handleClose()
  }

  useEffect(() => {
    if (props.open) {
      formik.resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!props.open])

  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box
        sx={{
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
        }}
      >
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
              mx: 1,
              fontFamily: 'inherit'
            }}
            variant='h4'
          >
            New room
          </Typography>
        </Box>
        <form action='POST' onSubmit={formik.handleSubmit}>
          <FormControl sx={{ width: '100%', height: '100%', px: 4, py: 2 }}>
            <TextField
              sx={{
                my: 1
              }}
              name='name'
              label='Room name'
              variant='outlined'
              onChange={formik.handleChange}
              placeholder='Enter room name'
              value={formik.values.name}
              error={formik.errors.name ? true : false}
              helperText={formik.errors.name}
              fullWidth
            />
            <TextField
              sx={{
                my: 1
              }}
              name='capacity'
              label='Capacity'
              type='number'
              variant='outlined'
              onChange={formik.handleChange}
              placeholder='Enter capacity'
              value={formik.values.capacity}
              error={formik.errors.capacity ? true : false}
              helperText={formik.errors.capacity}
              fullWidth
            />
          </FormControl>
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
              sx={{ my: 1, mr: 1, fontFamily: 'inherit' }}
              variant='contained'
              color='primary'
              type='submit'
              disabled={Boolean(formik.errors.name || formik.errors.capacity)}
            >
              Create
            </Button>

            <Button sx={{ my: 1, fontFamily: 'inherit' }} onClick={handleClose} color={'error'}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default CreateRoomModal
