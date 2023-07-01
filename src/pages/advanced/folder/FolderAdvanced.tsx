/* eslint-disable react-hooks/exhaustive-deps */
import { Folder as FolderIcon } from '@mui/icons-material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import {
  Autocomplete,
  Box,
  CircularProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DeleteButton } from '~/components/button/advanced/DeleteButton'
import { UpdateButton } from '~/components/button/advanced/UpdateButton'
import CreateAdvancedModal from '~/components/modal/advanced/CreateAdvancedModal'
import { CreateFolder, Department, Folder, Locker, Room, UpdateFolder } from '~/global/interface'
import { notifyError, notifySuccess } from '~/global/toastify'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import useFolderApi from '~/hooks/api/useFolderApi'
import useLockerApi from '~/hooks/api/useLockerApi'
import useRoomApi from '~/hooks/api/useRoomApi'

const FolderAdvanced = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [lockers, setLockers] = useState<Locker[]>([])
  const [folders, setFolders] = useState<Folder[]>([])

  const [selectedDepartment, setSelectedDepartment] = useState<Department>({ id: '', name: '' })
  const [selectedRoom, setSelectedRoom] = useState<Room>({ id: '', name: '', capacity: 0 })
  const [selectedLocker, setSelectedLocker] = useState<Locker>({ id: '', name: '', capacity: 0 })

  const { getAllDepartments } = useDepartmentApi()
  const { getRoomsInDepartment } = useRoomApi()
  const { getLockerInRoom } = useLockerApi()
  const { getFoldersInLocker, createFolder, deleteFolder, updateFolder } = useFolderApi()

  const [loading, setLoading] = React.useState<boolean>(true)
  const [loadingRoom, setLoadingRoom] = React.useState<boolean>(true)
  const [loadingLocker, setLoadingLocker] = React.useState<boolean>(true)
  const [loadingFolder, setLoadingFolder] = React.useState<boolean>(true)

  const [isModalOpen, setModalOpen] = useState(false)

  //option for autocomplete
  const optionsDept = {
    options: departments.map((option) => option.name)
  }

  const optionsRoom = {
    options: rooms.map((option) => option.name)
  }

  const optionsLocker = {
    options: lockers.map((option) => option.name)
  }

  //handle modal open
  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleDeptChange = (_event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    if (value !== null) {
      const selectedDept = departments.find((dept) => dept.name === value)
      if (selectedDept) {
        setSelectedDepartment(selectedDept)
        setLoadingRoom(true)
        setLoadingLocker(true)
        setLoadingFolder(true)
        setSelectedRoom({ id: '', name: '', capacity: 0 })
        setSelectedLocker({ id: '', name: '', capacity: 0 })
      }
    }
  }

  const handleRoomChange = (_event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    if (value !== null) {
      const selectedRoom = rooms.find((room) => room.name === value)
      if (selectedRoom) {
        setSelectedRoom(selectedRoom)
        setLoadingLocker(true)
        setLoadingFolder(true)
        setSelectedLocker({ id: '', name: '', capacity: 0 })
      }
    }
  }

  const handleLockerChange = (_event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    if (value !== null) {
      const selectedLocker = lockers.find((locker) => locker.name === value)
      if (selectedLocker) {
        setSelectedLocker(selectedLocker)
        setLoadingFolder(true)
      }
    }
  }

  const fetchDepartment = async () => {
    const result = await getAllDepartments()
    setDepartments(result.data)
    setSelectedDepartment(result.data[0])
  }

  const fetchRooms = async () => {
    if (selectedDepartment.id) {
      setLoading(false)
      const result = await getRoomsInDepartment(selectedDepartment.id)
      setRooms(result.data)
      setSelectedRoom(result.data[0])
    }
  }

  const fetchLockers = async () => {
    if (selectedRoom !== undefined) {
      if (selectedRoom.id) {
        setLoadingRoom(false)
        const result = await getLockerInRoom(selectedRoom.id)
        setLockers(result.data)
        setSelectedLocker(result.data[0])
      }
    } else {
      notifyError('Create a room first')
    }
  }

  const fetchFolders = async () => {
    if (selectedLocker !== undefined) {
      if (selectedLocker.id) {
        setLoadingLocker(false)
        const result = await getFoldersInLocker(selectedLocker.id)
        setFolders(result.data)
        setLoadingFolder(false)
      }
    } else {
      notifyError('Create a locker first')
    }
  }

  useEffect(() => {
    fetchDepartment()
  }, [])

  useEffect(() => {
    fetchRooms()
  }, [selectedDepartment])

  useEffect(() => {
    fetchLockers()
  }, [selectedRoom])

  useEffect(() => {
    fetchFolders()
  }, [selectedLocker])

  const handleCreate = async (values: CreateFolder) => {
    values.locker.id = selectedLocker.id
    const result = await createFolder(values)
    if (result) {
      setLoadingFolder(true)
      setFolders([]) // Clear the folder array
      notifySuccess('Create successfully')
      setModalOpen(false)
    }
    await fetchFolders() // Fetch the updated data
  }

  const handleDelete = async (id: string) => {
    const result = await deleteFolder(id)
    if (result) {
      setLoadingFolder(true)
      setFolders([]) // Clear the folder array
      notifySuccess('Delete successfully')
    } else {
      setLoadingFolder(true)
    }
    await fetchFolders() // Fetch the updated data
  }

  const handleUpdate = async (values: UpdateFolder) => {
    const result = await updateFolder(values)
    if (result) {
      setLoadingFolder(true)
      setFolders([])
      notifySuccess('Update successfully')
    }
    await fetchFolders()
  }

  return (
    <>
      {selectedDepartment.id && selectedRoom && selectedLocker && (
        <CreateAdvancedModal<CreateFolder>
          open={isModalOpen}
          type='Folder'
          handleClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
          initialValues={{ name: '', capacity: 1000, locker: { id: selectedLocker.id } }}
          max={10000}
        />
      )}
      <List
        sx={{
          width: '100%',
          height: { xs: 'calc(100vh - 210px)', md: 'calc(100vh - 160px)' },
          borderRadius: '5px',
          borderTopLeftRadius: '0px',
          bgcolor: 'var(--white-color)',
          padding: '1rem 0',
          overflowY: 'auto'
        }}
        component='div'
      >
        {!loading ? (
          <>
            <Autocomplete
              {...optionsDept}
              id='department option'
              size='medium'
              autoComplete
              value={selectedDepartment.name}
              onChange={handleDeptChange}
              sx={{ width: '100%', padding: { sm: '0 4rem', xs: '0 1rem' }, my: '1rem' }}
              renderInput={(params) => (
                <TextField label='Department' {...params} placeholder='Select department' variant='standard' />
              )}
            />
            {!loadingRoom ? (
              <>
                <Autocomplete
                  {...optionsRoom}
                  id='room option'
                  size='medium'
                  autoComplete
                  value={selectedRoom.name}
                  onChange={handleRoomChange}
                  sx={{ width: '100%', padding: { sm: '0 4rem', xs: '0 1rem' }, my: '1rem' }}
                  renderInput={(params) => (
                    <TextField label='Room' {...params} placeholder='Select room' variant='standard' />
                  )}
                />
                {!loadingLocker ? (
                  <>
                    <Autocomplete
                      {...optionsLocker}
                      id='locker option'
                      size='medium'
                      autoComplete
                      value={selectedLocker.name}
                      onChange={handleLockerChange}
                      sx={{ width: '100%', padding: { sm: '0 4rem', xs: '0 1rem' }, my: '1rem' }}
                      renderInput={(params) => (
                        <TextField label='Locker' {...params} placeholder='Select locker' variant='standard' />
                      )}
                    />
                    {!loadingFolder ? (
                      <>
                        {folders.map((folder) => (
                          <ListItemButton
                            key={folder.id}
                            sx={{ paddingLeft: { sm: '8rem', xs: '1rem' }, paddingRight: { sm: '5rem', xs: '1rem' } }}
                            disableTouchRipple
                          >
                            <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                              <FolderIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={folder.name}
                              primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                            />
                            <UpdateButton<UpdateFolder>
                              type='Folder'
                              onSubmit={handleUpdate}
                              initialValues={{
                                id: folder.id,
                                name: folder.name,
                                capacity: folder.capacity
                              }}
                              max={10000}
                            />
                            <DeleteButton id={folder.id} name={folder.name} type='folder' handleDelete={handleDelete} />
                          </ListItemButton>
                        ))}
                        <ListItemButton
                          sx={{
                            paddingLeft: { sm: '8rem', xs: '1rem' },
                            paddingRight: { sm: '5rem', xs: '1rem' },
                            height: '53px'
                          }}
                          onClick={handleModalOpen}
                        >
                          <ListItemIcon sx={{ color: 'var(--black-color)' }}>
                            <AddRoundedIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={'New folder'}
                            primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                          />
                        </ListItemButton>
                      </>
                    ) : (
                      <Box
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        width={'100%'}
                        height={'60%'}
                      >
                        <CircularProgress />
                      </Box>
                    )}
                  </>
                ) : (
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    width={'100%'}
                    height={'70%'}
                  >
                    <CircularProgress />
                  </Box>
                )}
              </>
            ) : (
              <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                width={'100%'}
                height={'80%'}
              >
                <CircularProgress />
              </Box>
            )}
          </>
        ) : (
          <>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              width={'100%'}
              height={'100%'}
            >
              <CircularProgress />
            </Box>
          </>
        )}
      </List>
    </>
  )
}

export default FolderAdvanced
