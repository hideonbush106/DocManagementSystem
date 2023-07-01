import { CreateNewFolderOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { notifySuccess } from '~/global/toastify'
import ModalLayout from './ModalLayout'
import { BorrowRequest } from '~/global/interface'
import useBorrowRequestApi from '~/hooks/api/useBorrowRequestApi'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

interface BorrowDocumentModalProps {
  open: boolean
  fileId: string
  fileName: string
  handleClose: () => void
}

const BorrowDocumentModal = (props: BorrowDocumentModalProps) => {
  const { open, handleClose, fileId, fileName } = props
  const { createBorrowRequest } = useBorrowRequestApi()
  const validationSchema = yup.object({
    description: yup.string().required('Description is required').trim(),
    borrowDuration: yup
      .number()
      .required('Borrow duration is required')
      .min(1, 'Borrow duration must be at least 1 day')
      .max(30, 'Borrow duration must be at most 30 days')
  })

  const formik = useFormik({
    initialValues: {
      document: {
        id: fileId
      },
      description: '',
      borrowDuration: 1,
      startDate: new Date()
    },
    validationSchema: validationSchema,
    onSubmit: async (values: BorrowRequest, { resetForm }) => {
      try {
        await createBorrowRequest(values)
        notifySuccess('Borrow document sent successfully')
        resetForm()
        handleClose()
      } catch (error) {
        console.log(error)
      }
    }
  })

  const shouldDisableDate = (date: Date) => {
    return date < new Date()
  }

  return (
    <ModalLayout open={open} handleClose={handleClose}>
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
        <CreateNewFolderOutlined fontSize='large' sx={{ color: 'var(--black-color)', mx: 1 }} />
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
          Borrow Document
        </Typography>
      </Box>

      <form onSubmit={formik.handleSubmit} action='POST'>
        <FormControl sx={{ width: '100%', px: 5 }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: 'var(--black-color)',
              my: 1.5,
              fontSize: {
                xs: '1.2rem',
                sm: '1.5rem'
              }
            }}
            variant='h6'
          >
            Borrow Information
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              color: 'var(--black-color)',
              fontSize: {
                xs: '1rem',
                sm: '1.2rem'
              }
            }}
            variant='body2'
          >
            File Name: {fileName}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                sx={{ my: 1 }}
                label='Description'
                value={formik.values.description}
                name='description'
                variant='standard'
                fullWidth
                onChange={formik.handleChange}
                multiline
                maxRows={4}
                required
                error={formik.touched.description && formik.errors.description ? true : false}
                helperText={formik.touched.description && formik.errors.description ? formik.errors.description : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                sx={{ my: 1 }}
                label='Borrow Duration (in days)'
                value={formik.values.borrowDuration}
                name='borrowDuration'
                variant='standard'
                fullWidth
                onChange={formik.handleChange}
                required
                error={formik.touched.borrowDuration && formik.errors.borrowDuration ? true : false}
                helperText={
                  formik.touched.borrowDuration && formik.errors.borrowDuration ? formik.errors.borrowDuration : ''
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Start Date'
                  onChange={(date) => formik.setFieldValue('startDate', date)}
                  format='DD/MM/YYYY'
                  shouldDisableDate={shouldDisableDate}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </FormControl>
        <Box
          sx={{
            p: 1.5,
            position: 'sticky',
            bottom: -1,
            zIndex: 1,
            background: 'white',
            display: 'flex',
            justifyContent: 'end',
            width: '100%',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }}
        >
          <Button sx={{ my: 1, mr: 1 }} variant='contained' color='primary' type='submit'>
            Submit
          </Button>

          <Button sx={{ my: 1 }} color='error' variant='outlined' onClick={props.handleClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </ModalLayout>
  )
}

export default BorrowDocumentModal
