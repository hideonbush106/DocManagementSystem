import { CreateNewFolderOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, MenuItem, TextField, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import FileUpload from 'react-material-file-upload'
import { useFormik } from 'formik'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import { Categories, CreateDocument, Department, Folder, Locker, Room } from '~/global/interface'
import useCategoryApi from '~/hooks/api/useCategoryApi'
import useRoomApi from '~/hooks/api/useRoomApi'
import useLockerApi from '~/hooks/api/useLockerApi'
import useFolderApi from '~/hooks/api/useFolderApi'
import * as yup from 'yup'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { QRCodeSVG } from 'qrcode.react'
import { notifySuccess } from '~/global/toastify'
import ModalLayout from './ModalLayout'
import { useReactToPrint } from 'react-to-print'
import styled from 'styled-components'

interface ImportDocumentModalProps {
  open: boolean
  handleClose: () => void
}

const Print = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 1rem 0;

  @media print {
    margin: 0;
    height: 50vh;
  }
`

const ImportDocumentModal = (props: ImportDocumentModalProps) => {
  const { open, handleClose } = props
  const [files, setFiles] = useState<File[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [categories, setCategories] = useState<Categories[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [lockers, setLockers] = useState<Locker[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [selectedRoom, setSelectedRoom] = useState(false)
  const [selectedLocker, setSelectedLocker] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>()
  const [qrCode, setQrCode] = useState<string>('')
  const { createDocument, uploadDocumentPdf } = useDocumentApi()
  const { getAllDepartments } = useDepartmentApi()
  const { getAllCategories } = useCategoryApi()
  const { getRoomsInDepartment } = useRoomApi()
  const { getLockerInRoom } = useLockerApi()
  const { getFoldersInLocker, getFolder } = useFolderApi()
  const qrCodeRef = useRef(null)
  const componentRef = useRef<HTMLDivElement>(null)

  const isNotEnough = (current: number | undefined, capacity: number | undefined) => {
    if (current === undefined || capacity === undefined) return false
    else return capacity - current < formik.values.numOfPages
  }

  const handlePrint = useReactToPrint({
    content: () => qrCodeRef.current,
    documentTitle: 'Print QR Code',
    onAfterPrint() {
      setQrCode('')
      formik.resetForm()
      setDepartments([])
      setFiles([])
      setRooms([])
      setLockers([])
      setFolders([])
      fetchData()
      props.handleClose()
    }
  })

  const validationSchema = yup.object({
    name: yup.string().trim().required('Document name is required'),
    description: yup.string().trim().required('Document description is required'),
    numOfPages: yup
      .number()
      .integer('Number of pages must be an integer')
      .min(1, 'Number of pages must be greater than 0')
      .required('Number of pages is required'),
    folder: yup.object({
      id: yup.string().required('Folder is required')
    }),
    category: yup.object({
      id: yup.string().required('Category is required')
    })
  })

  const fetchData = useCallback(async () => {
    const departments = await getAllDepartments()
    setDepartments(departments.data)
  }, [getAllDepartments])

  const formik = useFormik({
    initialValues: {
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
    validationSchema: validationSchema,
    onSubmit: (values: CreateDocument) => {
      values.name = values.name.trim().replace(/\s\s+/g, ' ')
      values.description = values.description.trim().replace(/\s\s+/g, ' ')
      createDocument(values)
        .then((res) => {
          setQrCode(res.data.barcode)
          if (files.length > 0) {
            uploadDocumentPdf(res.data.id, files)
          }
          notifySuccess('Import document successfully')
          formik.resetForm()
          setDepartments([])
          setFiles([])
          setRooms([])
          setLockers([])
          setFolders([])
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          fetchData()
        })
    }
  })

  const departmentHandleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategories([])
    formik.setFieldValue('category.id', '')
    setRooms([])
    setLockers([])
    setFolders([])
    setSelectedRoom(false)
    setSelectedLocker(false)
    setSelectedFolder(null)
    formik.setFieldValue('folder.id', '')
    console.log(formik.values)
    const categories = await getAllCategories(event.target.value)
    setCategories(categories.data)
    const rooms = await getRoomsInDepartment(event.target.value)
    setRooms(rooms.data)
  }

  const roomHandleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLockers([])
    setFolders([])
    setSelectedRoom(false)
    setSelectedLocker(false)
    setSelectedFolder(null)
    formik.setFieldValue('document.folder.id', '')
    const lockers = await getLockerInRoom(event.target.value)
    setLockers(lockers.data)
    setSelectedRoom(true)
  }

  const lockerHandleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolders([])
    setSelectedLocker(false)
    setSelectedFolder(null)
    formik.setFieldValue('document.folder.id', '')
    const folder = await getFoldersInLocker(event.target.value)
    setFolders(folder.data)
    setSelectedLocker(true)
  }

  const folderHandleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFolder(null)
    formik.setFieldValue('folder.id', event.target.value)
    const folderInfo = await getFolder(event.target.value)
    setSelectedFolder(folderInfo.data)
  }

  useEffect(() => {
    fetchData()
  }, [fetchData, getAllDepartments])

  useEffect(() => {
    if (!open) {
      setSelectedRoom(false)
      setSelectedLocker(false)
      setSelectedFolder(null)
    }
  }, [open])

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
          {!qrCode ? (
            <>
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
                label='Number of pages'
                value={formik.values.numOfPages}
                type='number'
                name='numOfPages'
                variant='standard'
                fullWidth
                onChange={formik.handleChange}
                required
                error={formik.touched.numOfPages && Boolean(formik.errors.numOfPages)}
                helperText={formik.touched.numOfPages && formik.errors.numOfPages}
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
                <TextField
                  onChange={departmentHandleChange}
                  sx={{
                    my: 1,
                    width: {
                      xs: '100%',
                      sm: '47%'
                    }
                  }}
                  select
                  label='Department'
                  variant='standard'
                  required
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </TextField>
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
                  error={selectedRoom && lockers.length === 0}
                  helperText={selectedRoom && lockers.length === 0 ? 'There is no locker in this room' : ''}
                >
                  {lockers.map((locker) => (
                    <MenuItem key={locker.id} value={locker.id}>
                      {locker.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  value={formik.values.folder.id}
                  onChange={folderHandleChange}
                  name='folder.id'
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
                  error={
                    (selectedLocker && folders.length === 0) ||
                    isNotEnough(selectedFolder?.current, selectedFolder?.capacity)
                  }
                  helperText={
                    selectedLocker && folders.length === 0
                      ? 'There is no folder in this locker'
                      : selectedFolder && `${selectedFolder?.current}/${selectedFolder?.capacity}`
                  }
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
                    }
                  }}
                  value={files}
                  onChange={setFiles}
                  maxFiles={1}
                  maxSize={1024 * 1024 * 8}
                  accept='application/pdf'
                  title={`Drag 'n' drop some files here, or click to select files`}
                />
              </Box>
            </>
          ) : (
            <Box
              ref={componentRef}
              id='barcode'
              display={'flex'}
              sx={{ justifyContent: 'center', width: '100%', my: 2 }}
            >
              <Print ref={qrCodeRef}>
                <QRCodeSVG value={qrCode} />
              </Print>
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
          {qrCode ? (
            <Button sx={{ my: 1, mr: 1 }} variant='contained' color='primary' onClick={handlePrint}>
              Export
            </Button>
          ) : (
            <Button
              sx={{ my: 1, mr: 1 }}
              variant='contained'
              color='primary'
              disabled={
                formik.values.name === '' ||
                formik.values.description === '' ||
                formik.values.folder.id === '' ||
                formik.values.numOfPages <= 0 ||
                formik.values.category.id === '' ||
                isNotEnough(selectedFolder?.current, selectedFolder?.capacity)
              }
              type='submit'
            >
              Submit
            </Button>
          )}

          <Button
            sx={{ my: 1 }}
            color='error'
            variant='outlined'
            onClick={() => {
              setQrCode('')
              formik.resetForm()
              setDepartments([])
              setFiles([])
              setRooms([])
              setLockers([])
              setFolders([])
              fetchData()
              props.handleClose()
            }}
          >
            {qrCode ? 'Close' : 'Cancel'}
          </Button>
        </Box>
      </form>
    </ModalLayout>
  )
}

export default ImportDocumentModal
