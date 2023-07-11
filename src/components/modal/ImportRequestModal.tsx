/* eslint-disable import/no-named-as-default-member */
import { CreateNewFolderOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, MenuItem, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import FileUpload from 'react-material-file-upload'
import { useFormik } from 'formik'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import { Categories, Folder, ImportRequest, Locker, Room } from '~/global/interface'
import useCategoryApi from '~/hooks/api/useCategoryApi'
import useRoomApi from '~/hooks/api/useRoomApi'
import useLockerApi from '~/hooks/api/useLockerApi'
import useFolderApi from '~/hooks/api/useFolderApi'
import * as yup from 'yup'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { notifyError, notifySuccess } from '~/global/toastify'
import ModalLayout from './ModalLayout'
import useImportRequestApi from '~/hooks/api/useImportRequestApi'
import useAuth from '~/hooks/useAuth'
import axios from 'axios'

interface ImportDocumentModalProps {
  open: boolean
  handleClose: () => void
}

const ImportRequestModal = (props: ImportDocumentModalProps) => {
  const { open, handleClose } = props
  const [files, setFiles] = useState<File[]>([])
  const { user } = useAuth()
  const deptId = user?.departmentId
  const [categories, setCategories] = useState<Categories[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [lockers, setLockers] = useState<Locker[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const { uploadDocumentPdf } = useDocumentApi()
  const { getDepartment } = useDepartmentApi()
  const { createImportRequest } = useImportRequestApi()
  const { getAllCategories } = useCategoryApi()
  const { getRoomsInDepartment } = useRoomApi()
  const { getLockerInRoom } = useLockerApi()
  const { getFoldersInLocker } = useFolderApi()
  const [fileError, setFileError] = useState<string>('')

  const handleFileChange = (selectedFiles: File[]) => {
    if (selectedFiles.length > 0) {
      setFiles(selectedFiles)
      setFileError('')
    } else {
      setFiles([])
      setFileError('File upload is required')
    }
  }

  const validationSchema = yup.object({
    document: yup.object({
      name: yup.string().required('Document name is required').trim(),
      description: yup.string().required('Document description is required').trim(),
      numOfPages: yup
        .number()
        .integer('Number of pages must be an integer')
        .min(1, 'Number of pages must be greater than 0')
        .max(500000, 'Number of pages must be less than 500000')
        .required('Number of pages is required'),
      folder: yup.object({
        id: yup.string().required('Folder is required')
      }),
      category: yup.object({
        id: yup.string().required('Category is required')
      })
    }),
    description: yup.string().required('Request description is required').trim()
  })

  const formik = useFormik({
    initialValues: {
      document: {
        name: '',
        description: '',
        numOfPages: 1,
        folder: {
          id: ''
        },
        category: {
          id: ''
        }
      },
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values: ImportRequest) => {
      if (files.length === 0) {
        setFileError('File upload is required')
        return
      }
      values.document.name = values.document.name.trim().replace(/\s\s+/g, ' ')
      values.description = values.description.trim().replace(/\s\s+/g, ' ')
      values.document.description = values.document.description.trim().replace(/\s\s+/g, ' ')
      createImportRequest(values).then((res) => {
        try {
          if (files.length > 0) {
            uploadDocumentPdf(res.data.document.id, files)
            notifySuccess('Import document successfully')
            formik.setFieldValue('description', '')
            formik.setFieldValue('document.name', '')
            formik.setFieldValue('document.description', '')
            formik.setFieldValue('document.numOfPages', 1)
            formik.setFieldValue('document.folder.id', '')
            formik.setFieldValue('document.category.id', '')
            setFiles([])
            setRooms([])
            setLockers([])
            setFolders([])
            setCategories([])
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            notifyError(error.response?.data?.message || 'An error occurred')
          } else {
            notifyError(error instanceof Error ? error.message : 'An error occurred')
          }
        }
      })
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      if (deptId) {
        const categories = await getAllCategories(deptId)
        setCategories(categories.data)
        const rooms = await getRoomsInDepartment(deptId)
        setRooms(rooms.data)
      }
    }
    fetchData()
  }, [getAllCategories, getRoomsInDepartment, getDepartment, deptId])

  const roomHandleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLockers([])
    setFolders([])
    formik.setFieldValue('document.folder.id', '')
    const lockers = await getLockerInRoom(event.target.value)
    setLockers(lockers.data)
  }

  const lockerHandleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolders([])
    formik.setFieldValue('document.folder.id', '')
    const folder = await getFoldersInLocker(event.target.value)
    setFolders(folder.data)
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
          Import Document
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
            Request Information
          </Typography>
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
            value={formik.values.document.name}
            label='Document name'
            name='document.name'
            variant='standard'
            fullWidth
            onChange={formik.handleChange}
            required
            error={formik.touched.document?.name && formik.errors.document?.name ? true : false}
            helperText={
              formik.touched.document?.name && formik.errors.document?.name ? formik.errors.document?.name : ''
            }
          />
          <TextField
            sx={{ my: 1 }}
            label='Number of pages'
            value={formik.values.document.numOfPages}
            type='number'
            name='document.numOfPages'
            variant='standard'
            fullWidth
            onChange={formik.handleChange}
            required
            error={formik.touched.document?.numOfPages && formik.errors.document?.numOfPages ? true : false}
            helperText={
              formik.touched.document?.numOfPages && formik.errors.document?.numOfPages
                ? formik.errors.document?.numOfPages
                : ''
            }
          />
          <TextField
            sx={{ my: 1 }}
            label='Description'
            value={formik.values.document.description}
            name='document.description'
            variant='standard'
            fullWidth
            onChange={formik.handleChange}
            multiline
            maxRows={4}
            required
            error={formik.touched.document?.description && formik.errors.document?.description ? true : false}
            helperText={formik.touched.document?.description && formik.errors.document?.description}
          />
          <Box display={'flex'} sx={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TextField
              value={formik.values.document.category.id}
              onChange={formik.handleChange}
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '100%'
                }
              }}
              select
              label='Category Type'
              variant='standard'
              name='document.category.id'
              required
              disabled={categories.length === 0}
              error={formik.touched.document?.category?.id && formik.errors.document?.category?.id ? true : false}
              helperText={formik.touched.document?.category?.id && formik.errors.document?.category?.id}
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
                xs: '1.2rem',
                sm: '1.5rem'
              }
            }}
            variant='h6'
          >
            Location
          </Typography>
          <Box display={'flex'} sx={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TextField
              onChange={roomHandleChange}
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '31%'
                }
              }}
              select
              label='Room'
              variant='standard'
              required
              disabled={rooms.length === 0}
              error={rooms.length === 0}
              helperText={rooms.length === 0 ? 'There is no room in this department' : ''}
            >
              {rooms.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              onChange={lockerHandleChange}
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '31%'
                }
              }}
              select
              label='Locker'
              variant='standard'
              required
              disabled={lockers.length === 0}
              error={lockers.length === 0}
              helperText={lockers.length === 0 ? 'There is no locker in this room' : ''}
            >
              {lockers.map((locker) => (
                <MenuItem key={locker.id} value={locker.id}>
                  {locker.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              value={formik.values.document.folder.id}
              onChange={formik.handleChange}
              name='document.folder.id'
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '31%'
                }
              }}
              select
              label='Folder'
              variant='standard'
              required
              disabled={folders.length === 0}
              error={folders.length === 0}
              helperText={folders.length === 0 ? 'There is no folder in this locker' : ''}
            >
              {folders.map((folder) => (
                <MenuItem key={folder.id} value={folder.id}>
                  {folder.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <FileUpload
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '80%'
                },
                border: fileError ? '1px solid red' : '1px solid #ccc',
                backgroundColor: fileError ? '#ffeeee' : 'transparent',
                textAlign: 'center',
                padding: '20px'
              }}
              value={files}
              onChange={(selectedFiles: File[]) => handleFileChange(selectedFiles)}
              maxFiles={1}
              accept='application/pdf'
              title="Drag 'n' drop some files here, or click to select files"
            />
          </Box>
          {fileError && (
            <Typography
              sx={{ color: 'red', margin: '0.5rem 0 1rem', display: 'flex', justifyContent: 'center' }}
              variant='body2'
            >
              {fileError}
            </Typography>
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

export default ImportRequestModal
