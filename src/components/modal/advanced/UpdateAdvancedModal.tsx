/* eslint-disable no-prototype-builtins */
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { UpdateDepartment, UpdateFolder, UpdateLocker, UpdateRoom } from '~/global/interface'

interface UpdateProps<T> {
  type: string
  onSubmit: (values: T) => void
  initialValues: T
  max: number
  handleClose: () => void
}

const UpdateAdvancedModal = <T extends UpdateDepartment | UpdateRoom | UpdateLocker | UpdateFolder>(
  props: UpdateProps<T>
) => {
  const validationSchema = yup.object({
    name: yup.string().trim().required(`${props.type} name is required`),
    ...(props.initialValues.hasOwnProperty('capacity') && {
      capacity: yup
        .number()
        .integer('Capacity must be an integer')
        .min(1, 'Capacity must be greater than 0')
        .max(props.max, `Capacity must be less than ${props.max}`)
        .required('Capacity is required')
    })
  })

  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.name = values.name.trim().replace(/\s\s+/g, ' ')
      props.onSubmit?.(values)
    }
  })

  const unchanged =
    formik.values.name === props.initialValues.name &&
    (props.initialValues.hasOwnProperty('capacity') ? formik.values.capacity === props.initialValues.capacity : true)

  return (
    <>
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
          Update {props.type.toLocaleLowerCase()}
        </Typography>
      </Box>
      <form action='POST' onSubmit={formik.handleSubmit}>
        <FormControl sx={{ width: '100%', height: '100%', px: 4, py: 2 }}>
          <TextField
            sx={{
              my: 1
            }}
            name='name'
            label={`${props.type} name`}
            variant='outlined'
            onChange={formik.handleChange}
            placeholder={props.initialValues.name}
            value={formik.values.name}
            error={formik.errors.name ? true : false}
            helperText={formik.errors.name?.toString()}
            fullWidth
          />
          {props.initialValues.hasOwnProperty('capacity') && (
            <TextField
              sx={{
                my: 1
              }}
              name='capacity'
              label='Capacity'
              type='number'
              variant='outlined'
              onChange={formik.handleChange}
              placeholder={props.initialValues.capacity?.toString()}
              value={formik.values.capacity}
              error={formik.errors.capacity ? true : false}
              helperText={formik.errors.capacity?.toString()}
              fullWidth
            />
          )}
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

export default UpdateAdvancedModal
