import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { UpdateDepartment } from '~/global/interface'

interface UpdateDepartmentProps {
  handleClose?: () => void
  handleUpdate?: (values: UpdateDepartment) => void
  id?: string
  name?: string
}

const UpdateDepartmentModal = (props: UpdateDepartmentProps) => {
  const validationSchema = yup.object({
    name: yup.string().trim().required('Department name is required')
  })

  const formik = useFormik({
    initialValues: {
      id: `${props.id}`,
      name: `${props.name}`
    },
    validationSchema: validationSchema,
    onSubmit: (values: UpdateDepartment) => {
      values.name = values.name.trim().replace(/\s\s+/g, ' ')
      props.handleUpdate?.(values)
    }
  })

  const nameUnchanged = formik.values.name === props.name

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
        <FormControl sx={{ width: '100%', height: '100px', px: 4, py: 2 }}>
          <TextField
            sx={{
              my: 1
            }}
            name='name'
            label='Department name'
            variant='outlined'
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder={props.name}
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}
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
            disabled={formik.isValidating || !formik.isValid || nameUnchanged}
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

export default UpdateDepartmentModal
