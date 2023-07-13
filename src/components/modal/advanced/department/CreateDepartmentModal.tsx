import { Modal, Box, TextField, Button, Typography, FormControl } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as yup from 'yup'
import { CreateDepartment } from '~/global/interface'

interface CreateDepartmenProps {
  open: boolean
  handleClose: () => void
  onSubmit: (values: CreateDepartment) => void
}

const CreateDepartmentModal = (props: CreateDepartmenProps) => {
  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required('Department name is required')
      .max(20, 'Department name is less than 20 characters')
  })

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.name = values.name.trim().replace(/\s\s+/g, ' ')
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
            New department
          </Typography>
        </Box>
        <form action='POST' onSubmit={formik.handleSubmit}>
          <FormControl sx={{ width: '100%', height: '100px', px: 4, py: 2 }}>
            <TextField
              sx={{
                my: 1
              }}
              name='name'
              label='Department name'
              variant='outlined'
              onChange={formik.handleChange}
              placeholder='Enter department name'
              value={formik.values.name}
              error={Boolean(formik.errors.name)}
              helperText={formik.errors.name}
              fullWidth
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
              disabled={formik.isValidating || !formik.isValid}
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

export default CreateDepartmentModal
