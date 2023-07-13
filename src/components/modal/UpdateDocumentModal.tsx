import { EditNoteOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, TextField, Typography, MenuItem } from '@mui/material'
import FileUpload from 'react-material-file-upload'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { UpdateDocument, DocumentDetail, Categories } from '~/global/interface'
import * as yup from 'yup'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { notifySuccess } from '~/global/toastify'
import ModalLayout from './ModalLayout'
import styled from 'styled-components'

interface UpdateDocumentProps {
  document?: DocumentDetail
  categories: Categories[]
  isHavePdf: boolean
  open: boolean
  handleClose: () => void
  reload: (id: string) => void
}

const TitleText = styled.span`
  font-weight: 600;
  font-family: var(--font-family);
`
const Text = styled(Typography)`
  font-size: 14px;
  margin-bottom: 4px;
  font-family: var(--font-family);
  @media (min-width: 400px) {
    font-size: 1rem;
    margin-bottom: 16px;
  }
`

const UpdateDocumentModal = (props: UpdateDocumentProps) => {
  const { open, handleClose, reload, document, categories, isHavePdf } = props
  const [files, setFiles] = useState<File[]>([])
  const { updateDocument, uploadDocumentPdf } = useDocumentApi()

  const validationSchema = yup.object({
    name: yup.string().trim(),
    description: yup.string().trim(),
    category: yup.object({
      id: yup.string()
    })
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: '',
      name: document?.name ?? '',
      description: document?.description ?? '',
      category: {
        id: document?.category?.id ?? ''
      }
    },
    validationSchema: validationSchema,
    onSubmit: async (values: UpdateDocument) => {
      values.name = values.name.trim().replace(/\s\s+/g, '')
      values.description = values.description.trim().replace(/\s\s+/g, '')
      values.id = document?.id ?? ''
      const result = await updateDocument(values)
      if (result.data) {
        if (files.length > 0) {
          uploadDocumentPdf(document?.id ?? '', files)
        }
        notifySuccess('Update document successfully')
        handleClose()
        formik.setFieldValue('name', '')
        formik.setFieldValue('description', '')
        reload(document?.id ?? '')
      }
    }
  })

  useEffect(() => {
    if (!props.open) {
      formik.resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!props.open])

  const unchanged =
    formik.values.name.trim() === document?.name &&
    formik.values.description.trim() === document?.description &&
    formik.values.category.id === document?.category?.id

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
        <EditNoteOutlined fontSize='large' sx={{ color: 'var(--black-color)', mx: 1 }} />
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
          Update Document
        </Typography>
        {document?.id}
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
            Document Information
          </Typography>
          <TextField
            sx={{ my: 1 }}
            value={formik.values.name}
            label='Document name'
            name='name'
            variant='standard'
            fullWidth
            onChange={formik.handleChange}
            required
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
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
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <Box display={'flex'} sx={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Typography
              sx={{
                fontWeight: 600,
                color: 'var(--black-color)',
                my: 1.5,
                fontSize: {
                  xs: '1rem',
                  sm: '1rem'
                }
              }}
              variant='caption'
            >
              <TitleText>Department: </TitleText>
              {document?.folder.locker.room.department.name}
            </Typography>
            <TextField
              value={formik.values.category.id}
              onChange={formik.handleChange}
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '47%'
                }
              }}
              select
              label='Category Type'
              variant='standard'
              name='category.id'
              required
              disabled={categories.length === 0}
            >
              {categories.map((cate) => (
                <MenuItem key={cate.id} value={cate.id}>
                  {cate.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Typography
            sx={{
              fontWeight: 600,
              color: 'var(--black-color)',
              my: 1.5,
              fontSize: {
                xs: '1rem',
                sm: '1rem'
              }
            }}
            variant='caption'
          >
            <TitleText>Number of pages: </TitleText> {document?.numOfPages}
          </Typography>
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
            Location
          </Typography>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }} flexDirection={{ sm: 'row', xs: 'column' }}>
            <Text variant='body1'>
              <TitleText>Room: </TitleText>
              {document?.folder.locker.room.name}
            </Text>
            <Text variant='body1'>
              <TitleText>Locker: </TitleText>
              {document?.folder.locker.name}
            </Text>
            <Text variant='body1'>
              <TitleText>Folder: </TitleText>
              {document?.folder.name}
            </Text>
          </Box>
          {!isHavePdf && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
              <FileUpload
                sx={{
                  my: 1,
                  width: {
                    xs: '100%',
                    sm: '80%'
                  }
                }}
                value={files}
                onChange={setFiles}
                maxFiles={1}
                accept='application/pdf'
                title={`Drag 'n' drop some files here, or click to select files`}
              />
            </Box>
          )}
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
          <Button
            sx={{ my: 1, mr: 1 }}
            variant='contained'
            color='primary'
            type='submit'
            disabled={formik.isValidating || !formik.isValid || unchanged}
          >
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

export default UpdateDocumentModal
