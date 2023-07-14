import { Box, TextField, Button, Typography, FormControl } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as yup from 'yup'
import { CreateUser } from '~/global/interface'
import ModalLayout from '../../ModalLayout'

interface CreateEmployeeProps {
  open: boolean
  departmentId: string
  handleClose: () => void
  onSubmit: (values: CreateUser) => void
}

const CreateEmployeeModal = (props: CreateEmployeeProps) => {
  const validationSchema = yup.object({
    code: yup
      .string()
      .trim()
      .required('Employee code is required')
      .matches(/^DMS\d{6}$/, 'Employee code must be formatted. Ex: DMS123456')
      .max(9, 'Employee code is less than or equal 20 characters'),
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
    initialValues: {
      code: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      department: {
        id: ''
      }
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.firstName = values.firstName.trim().replace(/\s\s+/g, ' ')
      values.lastName = values.lastName.trim().replace(/\s\s+/g, ' ')
      values.email = values.email.trim().toLowerCase().replace(/\s\s+/g, ' ')
      values.phone = values.phone.trim().replace(/\s\s+/g, ' ')
      values.department.id = props.departmentId
      props.onSubmit?.(values)
    }
  })

  const handleClose = () => {
    props.handleClose()
  }

  useEffect(() => {
    if (!props.open) {
      formik.resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!props.open])

  return (
    <ModalLayout open={props.open} handleClose={handleClose}>
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
            }
          }}
          variant='h4'
        >
          New employee
        </Typography>
      </Box>
      <form action='POST' onSubmit={formik.handleSubmit}>
        <FormControl sx={{ width: '100%', height: '40%', px: 4, py: 2 }}>
          <TextField
            sx={{
              my: 1
            }}
            name='code'
            label='Employee code'
            variant='outlined'
            onChange={formik.handleChange}
            placeholder='Enter employee code'
            value={formik.values.code}
            error={formik.touched.code && Boolean(formik.errors.code)}
            helperText={formik.touched.code && formik.errors.code}
            fullWidth
            required
          />
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
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            fullWidth
            required
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
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            fullWidth
            required
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
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            required
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
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            fullWidth
            required
          />
        </FormControl>
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
            sx={{ my: 1, mr: 1, fontFamily: 'inherit' }}
            variant='contained'
            color='primary'
            type='submit'
            disabled={
              formik.values.code === '' ||
              formik.values.firstName === '' ||
              formik.values.lastName === '' ||
              formik.values.email === '' ||
              formik.values.phone === ''
            }
          >
            Create
          </Button>

          <Button sx={{ my: 1, fontFamily: 'inherit' }} onClick={handleClose} color={'error'}>
            Cancel
          </Button>
        </Box>
      </form>
    </ModalLayout>
  )
}

export default CreateEmployeeModal
