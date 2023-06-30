/* eslint-disable react-hooks/exhaustive-deps */
import { ViewModule } from '@mui/icons-material'
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
// import { DeleteButton, UpdateRoomButton } from '~/components/button/Button'
import CreateAdvancedModal from '~/components/modal/advanced/CreateAdvancedModal'
import { CreateLocker, Department, Room, UpdateLocker } from '~/global/interface'
import { notifyError, notifySuccess } from '~/global/toastify'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import useLockerApi from '~/hooks/api/useLockerApi'
import useRoomApi from '~/hooks/api/useRoomApi'

const LockerAdvanced = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [lockers, setLockers] = useState<Room[]>([])

  const [selectedDepartment, setSelectedDepartment] = useState<Department>({ id: '', name: '' })
  const [selectedRoom, setSelectedRoom] = useState<Room>({ id: '', name: '', capacity: 0 })
  const { getAllDepartments } = useDepartmentApi()
  const { getRoomsInDepartment } = useRoomApi()
  const { getLockerInRoom, createLocker, deleteLocker, updateLocker } = useLockerApi()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [loadingRoom, setLoadingRoom] = React.useState<boolean>(true)
  const [loadingLocker, setLoadingLocker] = React.useState<boolean>(false)
  const [isModalOpen, setModalOpen] = useState(false)

  //option for autocomplete
  const optionsDept = {
    options: departments.map((option) => option.name)
  }

  const optionsRoom = {
    options: rooms.map((option) => option.name)
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
      }
    }
  }

  const handleRoomChange = (_event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    if (value !== null) {
      const selectedRoom = rooms.find((room) => room.name === value)
      if (selectedRoom) {
        setSelectedRoom(selectedRoom)
        setLoadingLocker(true)
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
      const result = await getRoomsInDepartment(selectedDepartment.id)
      setRooms(result.data)
      setSelectedRoom(result.data[0])
    }
  }

  const fetchLockers = async () => {
    if (selectedRoom !== undefined) {
      if (selectedRoom.id) {
        const result = await getLockerInRoom(selectedRoom.id)
        setLockers(result.data)
        setLoading(false)
        setLoadingRoom(false)
        setLoadingLocker(false)
      }
    } else {
      notifyError('Create a room first')
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

  const handleCreate = async (values: CreateLocker) => {
    values.room.id = selectedRoom.id
    const result = await createLocker(values)
    if (result) {
      setLoadingLocker(true)
      setLockers([]) // Clear the locker array
      notifySuccess('Create successfully')
      setModalOpen(false)
    }
    await fetchLockers() // Fetch the updated data
  }

  const handleDelete = async (id: string) => {
    const result = await deleteLocker(id)
    if (result) {
      setLoadingLocker(true)
      setLockers([]) // Clear the room array
      notifySuccess('Delete successfully')
    } else {
      setLoadingLocker(true)
    }
    await fetchLockers() // Fetch the updated data
  }

  const handleUpdate = async (values: UpdateLocker) => {
    const result = await updateLocker(values)
    if (result) {
      setLoadingLocker(true)
      setLockers([])
      notifySuccess('Update successfully')
    } else {
      setLoadingLocker(true)
    }
    await fetchLockers()
  }

  return (
    <>
      {selectedDepartment.id && selectedRoom && (
        <CreateAdvancedModal<CreateLocker>
          open={isModalOpen}
          type='Locker'
          handleClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
          initialValues={{ name: '', capacity: 10, room: { id: selectedRoom.id } }}
          max={100}
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
                    {lockers.map((locker) => (
                      <ListItemButton
                        key={locker.id}
                        sx={{ paddingLeft: { sm: '8rem', xs: '1rem' }, paddingRight: { sm: '5rem', xs: '1rem' } }}
                        disableTouchRipple
                      >
                        <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                          <ViewModule />
                        </ListItemIcon>
                        <ListItemText
                          primary={locker.name}
                          primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                        />
                        {/* <UpdateRoomButton
                          text='Update'
                          id={locker.id}
                          name={locker.name}
                          capacity={locker.capacity}
                          onSubmit={() => console.log('Submit')}
                        />
                        <DeleteButton
                          text='Delete'
                          id={locker.id}
                          handleDelete={() => console.log('Delete')}
                          type='locker'
                        /> */}
                        <UpdateButton<UpdateLocker>
                          type='Locker'
                          onSubmit={handleUpdate}
                          initialValues={{
                            id: locker.id,
                            name: locker.name,
                            capacity: locker.capacity
                          }}
                          max={100}
                        />
                        <DeleteButton id={locker.id} name={locker.name} type='locker' handleDelete={handleDelete} />
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
                        primary={'New locker'}
                        primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                      />
                    </ListItemButton>
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

export default LockerAdvanced
