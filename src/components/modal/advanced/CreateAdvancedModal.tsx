/* eslint-disable no-prototype-builtins */
import { Modal, Box, TextField, Button, Typography, FormControl } from '@mui/material'
import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as yup from 'yup'
import { CreateRoom, CreateLocker, CreateFolder, CreateCategory } from '~/global/interface'

interface CreateProps<T> {
  open: boolean
  type: string
  handleClose: () => void
  onSubmit: (values: T) => void
  initialValues: T
  max: number
  disableCapacity?: boolean
}

const CreateAdvancedModal = <T extends CreateRoom | CreateLocker | CreateFolder | CreateCategory>(
  props: CreateProps<T>
) => {
  const validationSchema = yup.object(
    props.disableCapacity
      ? {
          name: yup
            .string()
            .trim()
            .required(`${props.type} name is required`)
            .max(20, `${props.type} name is less than 20 characters`)
        }
      : {
          name: yup.string().trim().required(`${props.type} name is required`),
          capacity: yup
            .number()
            .integer('Capacity must be an integer')
            .min(1, 'Capacity must be greater than 0')
            .max(props.max, `Capacity must be less than ${props.max}`)
            .required('Capacity is required')
        }
  )

  const formik = useFormik({
    initialValues: props.initialValues,
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
            New {props.type.toLocaleLowerCase()}
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
              placeholder={`Enter ${props.type.toLocaleLowerCase()} name`}
              value={formik.values.name}
              error={formik.errors.name ? true : false}
              helperText={formik.errors.name?.toString()}
              fullWidth
            />
            {!props.disableCapacity && (
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
                error={Boolean(formik.errors.capacity)}
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

export default CreateAdvancedModal
