import { CreateNewFolderOutlined } from '@mui/icons-material'
import { Box, Button, FormControl, MenuItem, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import FileUpload from 'react-material-file-upload'
import { useFormik } from 'formik'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import { Categories, Department, Folder, Room } from '~/global/interface'
import useCategoryApi from '~/hooks/api/useCategoryApi'
import useRoomApi from '~/hooks/api/useRoomApi'
import useLockerApi from '~/hooks/api/useLockerApi'
import useFolderApi from '~/hooks/api/useFolderApi'
import { string } from 'prop-types'
interface ImportDocumentProps {
  handleClose: () => void
}

const ImportDocument = (props: ImportDocumentProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [categories, setCategories] = useState<Categories[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [lockers, setLockers] = useState<Room[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const { getAllDepartments } = useDepartmentApi()
  const { getCategories } = useCategoryApi()
  const { getRoomsInDepartment } = useRoomApi()
  const { getLockerInRoom } = useLockerApi()
  const { getFoldersInLocker } = useFolderApi()
  const formik = useFormik({
    initialValues: {
      name: 'Lorem Ipsum',
      description: 'Lorem Ipsum',
      numOfPages: 1,
      folder: {
        id: 'Lorem Ipsum'
      },
      category: {
        id: 'Lorem Ipsum'
      }
    },
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const departmentHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //TODO: will fix to getAllCategories
    getCategories(event.target.value).then((res) => {
      setCategories(res.data)
    })
    getRoomsInDepartment(event.target.value).then((res) => {
      setRooms(res.data)
    })
  }

  const roomHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getLockerInRoom(event.target.value).then((res) => {
      setLockers(res.data)
    })
  }

  const lockerHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getFoldersInLocker(event.target.value).then((res) => {
      setFolders(res.data)
    })
  }

  useEffect(() => {
    getAllDepartments().then((res) => {
      setDepartments(res.data)
    })
  }, [getAllDepartments])

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
            Document Information
          </Typography>
          <TextField
            required
            sx={{ my: 1 }}
            value={formik.values.name}
            label='File name'
            name='name'
            variant='standard'
            fullWidth
            onChange={formik.handleChange}
          />
          <TextField
            required
            sx={{ my: 1 }}
            label='Number of pages'
            value={formik.values.numOfPages}
            type='number'
            name='numOfPages'
            variant='standard'
            fullWidth
            onChange={formik.handleChange}
          />
          <TextField
            required
            sx={{ my: 1 }}
            label='Description'
            value={formik.values.description}
            name='description'
            variant='standard'
            fullWidth
            onChange={formik.handleChange}
            multiline
            maxRows={4}
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
              defaultValue={''}
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
            >
              {lockers.map((locker) => (
                <MenuItem key={locker.id} value={locker.id}>
                  {locker.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              value={formik.values.folder.id}
              onChange={formik.handleChange}
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
              title={`Drag 'n' drop some files here, or click to select files`}
            />
          </Box>
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
          <Button sx={{ my: 1 }} color='error' onClick={props.handleClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </>
  )
}

export default ImportDocument
