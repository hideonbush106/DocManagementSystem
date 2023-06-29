/* eslint-disable react-hooks/exhaustive-deps */
import { MeetingRoom } from '@mui/icons-material'
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
import CreateAdvancedModal from '~/components/modal/advanced/CreateAdvancedModal'
import { CreateRoom, Department, Room, UpdateRoom } from '~/global/interface'
import { notifySuccess } from '~/global/toastify'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import useRoomApi from '~/hooks/api/useRoomApi'

const RoomAdvanced = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [rooms, setRooms] = useState<Room[]>([])

  const [selectedDepartment, setSelectedDepartment] = useState<Department>({ id: '', name: '' })
  const { getAllDepartments } = useDepartmentApi()
  const { getRoomsInDepartment, createRoom, updateRoom, deleteRoom } = useRoomApi()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [loadingRoom, setLoadingRoom] = React.useState<boolean>(false)
  const [isModalOpen, setModalOpen] = useState(false)

  //option for autocomplete
  const options = {
    options: departments.map((option) => option.name)
  }
  //handle modal open
  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleAutocompleteChange = (_event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    if (value !== null) {
      const selectedDept = departments.find((dept) => dept.name === value)
      if (selectedDept) {
        setSelectedDepartment(selectedDept)
        setLoadingRoom(true)
      }
    }
  }
  const fetchDepartment = async () => {
    try {
      const result = await getAllDepartments()
      setDepartments(result.data)
      setSelectedDepartment(result.data[0])
    } catch (error) {
      console.log('error')
    }
  }

  const fetchRooms = async () => {
    try {
      if (selectedDepartment.id) {
        const result = await getRoomsInDepartment(selectedDepartment.id)
        setRooms(result.data)
        setLoading(false)
        setLoadingRoom(false)
      }
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchDepartment()
  }, [])

  useEffect(() => {
    fetchRooms()
  }, [selectedDepartment])

  const handleCreate = async (values: CreateRoom) => {
    values.department.id = selectedDepartment.id
    const result = await createRoom(values)
    if (result) {
      setLoadingRoom(true)
      setRooms([]) // Clear the room array
      notifySuccess('Create successfully')
      setModalOpen(false)
    }
    await fetchRooms() // Fetch the updated data
  }

  const handleDelete = async (id: string) => {
    const result = await deleteRoom(id)
    if (result) {
      setLoadingRoom(true)
      setRooms([]) // Clear the room array
      notifySuccess('Delete successfully')
    } else {
      setLoadingRoom(true)
    }
    await fetchRooms()
  }

  const handleUpdate = async (values: UpdateRoom) => {
    const result = await updateRoom(values)
    if (result) {
      setLoadingRoom(true)
      setRooms([])
      notifySuccess('Update successfully')
    }
    await fetchRooms()
  }

  return (
    <>
      {selectedDepartment.id && (
        <CreateAdvancedModal<CreateRoom>
          open={isModalOpen}
          type='Room'
          handleClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
          initialValues={{ name: '', capacity: 10, department: { id: selectedDepartment.id } }}
          max={100}
        />
      )}
      <List
        sx={{
          width: '100%',
          height: { xs: 'calc(100vh - 210px)', md: 'calc(100vh - 160px)' },
          bgcolor: 'var(--white-color)',
          padding: '1rem 0',
          overflowY: 'auto'
        }}
        component='div'
      >
        {!loading ? (
          <>
            <Autocomplete
              {...options}
              id='department option'
              size='medium'
              autoComplete
              value={selectedDepartment.name}
              onChange={handleAutocompleteChange}
              sx={{ width: '100%', padding: { sm: '0 4rem', xs: '0 1rem' }, my: '1rem' }}
              renderInput={(params) => (
                <TextField label='Department' {...params} placeholder='Select department' variant='standard' />
              )}
            />
            {!loadingRoom ? (
              <>
                {rooms.map((room) => (
                  <ListItemButton
                    key={room.id}
                    sx={{ paddingLeft: { sm: '8rem', xs: '1rem' }, paddingRight: { sm: '5rem', xs: '1rem' } }}
                    disableTouchRipple
                  >
                    <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                      <MeetingRoom />
                    </ListItemIcon>

                    <ListItemText
                      primary={room.name}
                      primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                    />
                    {/* <UpdateRoomButton
                      text='Update'
                      id={room.id}
                      name={room.name}
                      capacity={room.capacity}
                      onSubmit={handleUpdate}
                    />
                    */}
                    <DeleteButton id={room.id} name={room.name} type='room' handleDelete={handleDelete} />
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
                    primary={'New room'}
                    primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                  />
                </ListItemButton>
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

export default RoomAdvanced
