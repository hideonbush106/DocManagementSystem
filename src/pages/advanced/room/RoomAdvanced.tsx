/* eslint-disable react-hooks/exhaustive-deps */
import { Apartment, ExpandLess, ExpandMore, MeetingRoom } from '@mui/icons-material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import {
  Box,
  CircularProgress,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DeleteButton, UpdateRoomButton } from '~/components/button/Button'
import CreateRoomModal from '~/components/modal/advanced/room/CreateRoom'
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

  const [open, setOpen] = React.useState(false)
  //handle options dropdown
  const handleOptions = () => {
    setOpen(!open)
  }
  //handle modal open
  const handleModalOpen = () => {
    setModalOpen(true)
  }

  //handle dropdown close after selecting
  const handleSelect = (dept: Department) => {
    setSelectedDepartment(dept)
    setLoadingRoom(true)
    setOpen(!open)
  }

  const fetchDepartment = async () => {
    await getAllDepartments().then((result) => {
      setDepartments(result.data)
      setSelectedDepartment(result.data[0])
    })
  }

  const fetchRooms = async () => {
    if (selectedDepartment.id) {
      await getRoomsInDepartment(selectedDepartment.id).then((result) => {
        setRooms(result.data)
        setLoading(false)
        setLoadingRoom(false)
      })
    }
  }

  useEffect(() => {
    fetchDepartment()
  }, [])

  useEffect(() => {
    fetchRooms()
  }, [selectedDepartment])

  const handleCreate = async (values: CreateRoom) => {
    try {
      await createRoom(values).then((result) => {
        if (result) {
          setLoadingRoom(true)
          setRooms([]) // Clear the room array
          notifySuccess('Create successfully')
          setModalOpen(false)
        }
      })
      await fetchRooms() // Fetch the updated data
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteRoom(id).then((result) => {
        if (result) {
          setLoadingRoom(true)
          setRooms([]) // Clear the room array
          notifySuccess('Delete successfully')
          // setModalOpen(false)
        } else {
          setLoadingRoom(true)
        }
      })
      await fetchRooms() // Fetch the updated data
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (values: UpdateRoom) => {
    try {
      await updateRoom(values).then((result) => {
        if (result) {
          setLoadingRoom(true)
          setRooms([]) // Clear the room array
          notifySuccess('Update successfully')
        }
      })
      await fetchRooms() // Fetch the updated data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {selectedDepartment.id && (
        <CreateRoomModal
          open={isModalOpen}
          handleClose={() => setModalOpen(false)}
          deptId={selectedDepartment.id}
          onSubmit={handleCreate}
        />
      )}
      <List
        sx={{
          width: '100%',
          height: { xs: 'calc(100vh - 92px - 6rem)', md: 'calc(100vh - 42px - 6rem)' },
          bgcolor: 'var(--white-color)',
          padding: '1rem 0',
          overflowY: 'scroll'
        }}
        component='div'
      >
        {!loading ? (
          <>
            <ListItemButton
              onClick={handleOptions}
              sx={{
                padding: { sm: '0 5rem', xs: '0 1rem' },
                height: '52.5px'
              }}
            >
              {open ? null : (
                <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                  <Apartment />
                </ListItemIcon>
              )}

              <ListItemText
                sx={{ paddingLeft: open ? { sm: '56px' } : '0' }}
                primary={open ? 'Select department' : selectedDepartment.name}
                primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider sx={{ margin: { sm: '0 4rem', xs: '0 1rem' } }} />
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {departments.map((dept) => (
                  <>
                    <ListItemButton
                      key={dept.id}
                      sx={{
                        padding: { sm: '0 5rem', xs: '0 1rem' },
                        height: '52.5px'
                      }}
                      onClick={dept.id === selectedDepartment.id ? undefined : () => handleSelect(dept)}
                      disableTouchRipple={dept.id === selectedDepartment.id}
                      selected={dept.id === selectedDepartment.id}
                    >
                      <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                        <Apartment />
                      </ListItemIcon>
                      <ListItemText
                        primary={dept.name}
                        primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                      />
                    </ListItemButton>
                    <Divider sx={{ margin: { sm: '0 4rem', xs: '0 1rem' } }} />
                  </>
                ))}
              </List>
            </Collapse>
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
                    <UpdateRoomButton
                      text='Update'
                      id={room.id}
                      name={room.name}
                      capacity={room.capacity}
                      onSubmit={handleUpdate}
                    />
                    <DeleteButton text='Delete' id={room.id} handleDelete={handleDelete} type='room' />
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
