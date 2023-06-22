import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { UpdateDepartment } from '~/global/interface'
import { notifySuccess } from '~/global/toastify'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'

interface UpdateDepartmentProps {
  handleClose: () => void
  prop?: { id: string; name: string }
}

const UpdateDepartmentModal = (props: UpdateDepartmentProps) => {
  const { updateDepartment } = useDepartmentApi()
  const [response, setResponse] = React.useState({ message: '', data: false })

  const validationSchema = yup.object({
    name: yup.string().required('Department name is required').trim()
  })

  const formik = useFormik({
    initialValues: {
      id: `${props.prop?.id}`,
      name: `${props.prop?.name}`
    },
    validationSchema: validationSchema,
    onSubmit: (values: UpdateDepartment) => {
      values.name = values.name.trim().replace(/\s\s+/g, ' ')
      updateDepartment(values).then((res) => {
        setResponse({ message: res.message, data: res.data })
      })
    }
  })

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
            mx: 1
          }}
          variant='h4'
        >
          Update department
        </Typography>
      </Box>
      <form action='POST' onSubmit={formik.handleSubmit}>
        <FormControl sx={{ width: '100%', px: 4, py: 2 }}>
          <TextField
            required
            sx={{
              my: 1
            }}
            name='name'
            variant='outlined'
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder={props.prop?.name}
            fullWidth
            disabled={response.data ? true : false}
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
          {response.data ? (
            <Typography
              variant='subtitle1'
              sx={{ width: '100%', textAlign: 'left', my: 'auto', color: 'var(--green-color)' }}
            >
              {'* ' + response.message}
            </Typography>
          ) : (
            <Button sx={{ my: 1, mr: 1 }} variant='contained' color='primary' type='submit'>
              Update
            </Button>
          )}

          <Button
            sx={{ my: 1 }}
            variant={response.data ? 'contained' : 'text'}
            onClick={props.handleClose}
            color={response.data ? 'primary' : 'error'}
          >
            {response.data ? 'Return' : 'Cancel'}
          </Button>
        </Box>
      </form>
    </>
  )
}

export default UpdateDepartmentModal
