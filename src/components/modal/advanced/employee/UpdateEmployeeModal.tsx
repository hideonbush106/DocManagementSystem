import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { UpdateUser } from '~/global/interface'

interface UpdateEmployeeProps {
  handleClose: () => void
  handleUpdate: (values: UpdateUser) => void
  initialValues: UpdateUser
}

const UpdateEmployeeModal = (props: UpdateEmployeeProps) => {
  const validationSchema = yup.object({
    firstName: yup
      .string()
      .trim()
      .required('First name is required')
      .max(20, 'First name is less than or equal 20 characters'),
    lastName: yup
      .string()
      .trim()
      .required('Last name is required')
      .max(20, 'Last name is less than or equal 20 characters'),
    email: yup
      .string()
      .trim()
      .required('Email is required')
      .email()
      .max(50, 'Email is less than or equal 30 characters'),
    phone: yup
      .string()
      .trim()
      .required('Phone is required')
      .matches(/^\d{10,11}$/, 'Phone number is not valid')
      .max(20, 'Phone is less than or equal 20 characters')
  })

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: UpdateUser) => {
      values.firstName = values.firstName.trim().replace(/\s\s+/g, ' ')
      values.lastName = values.lastName.trim().replace(/\s\s+/g, ' ')
      values.email = values.email.trim().toLowerCase().replace(/\s\s+/g, ' ')
      values.phone = values.phone.trim().replace(/\s\s+/g, ' ')
      props.handleUpdate?.(values)
    }
  })

  const unchanged =
    formik.values.firstName.trim() === props.initialValues.firstName &&
    formik.values.lastName.trim() === props.initialValues.lastName &&
    formik.values.email.trim() === props.initialValues.email &&
    formik.values.phone.trim() === props.initialValues.phone

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
          width: '100%',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
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
          Update employee
        </Typography>
      </Box>
      <form action='POST' onSubmit={formik.handleSubmit}>
        <FormControl sx={{ width: '100%', height: '40%', px: 4, py: 2 }}>
          <TextField
            sx={{
              my: 1
            }}
            name='firstName'
            label='First name'
            variant='outlined'
            onChange={formik.handleChange}
            placeholder='Enter first name'
            value={formik.values.firstName}
            error={Boolean(formik.errors.firstName)}
            helperText={formik.errors.firstName}
            fullWidth
          />
          <TextField
            sx={{
              my: 1
            }}
            name='lastName'
            label='Last name'
            variant='outlined'
            onChange={formik.handleChange}
            placeholder='Enter last name'
            value={formik.values.lastName}
            error={Boolean(formik.errors.lastName)}
            helperText={formik.errors.lastName}
            fullWidth
          />
          <TextField
            sx={{
              my: 1
            }}
            name='email'
            label='Email'
            variant='outlined'
            onChange={formik.handleChange}
            placeholder='Enter email'
            value={formik.values.email}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
            fullWidth
          />
          <TextField
            sx={{
              my: 1
            }}
            name='phone'
            label='Phone'
            variant='outlined'
            onChange={formik.handleChange}
            placeholder='Enter phone'
            value={formik.values.phone}
            error={Boolean(formik.errors.phone)}
            helperText={formik.errors.phone}
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
            disabled={formik.isValidating || !formik.isValid || unchanged}
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

export default UpdateEmployeeModal
