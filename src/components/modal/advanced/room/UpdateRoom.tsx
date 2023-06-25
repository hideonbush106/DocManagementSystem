import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { UpdateRoom } from '~/global/interface'

interface UpdateRoomProps {
  handleClose?: () => void
  onSubmit?: (values: UpdateRoom) => void
  id?: string
  name?: string
  capacity?: number
}

const UpdateRoomModal = (props: UpdateRoomProps) => {
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
      id: `${props.id}`,
      name: `${props.name}`,
      capacity: props.capacity || NaN
    },
    validationSchema: validationSchema,
    onSubmit: (values: UpdateRoom) => {
      values.name = values.name.trim().replace(/\s\s+/g, ' ')
      props.onSubmit?.(values)
    }
  })

  const unchanged = formik.values.name === props.name && formik.values.capacity === props.capacity

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
            mx: 1,
            fontFamily: 'inherit'
          }}
          variant='h4'
        >
          Update department
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
            placeholder={props.name}
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
            placeholder={props.capacity?.toString()}
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
            disabled={Boolean(formik.errors.name || formik.errors.capacity) || unchanged}
          >
            Update
          </Button>

          <Button sx={{ my: 1, fontFamily: 'inherit' }} onClick={props.handleClose} color={'error'}>
            Cancel
          </Button>
        </Box>
      </form>
    </>
  )
}

export default UpdateRoomModal
