/* eslint-disable react-hooks/exhaustive-deps */
import { Apartment, ExpandLess, ExpandMore, MeetingRoom, ViewModule } from '@mui/icons-material'
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
  const { getLockerInRoom } = useLockerApi()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [loadingRoom, setLoadingRoom] = React.useState<boolean>(true)
  const [loadingLocker, setLoadingLocker] = React.useState<boolean>(false)
  const [isModalopen, setModalopen] = useState(false)

  const [openDept, setDeptOpen] = React.useState(false)
  const [openRoom, setRoomOpen] = React.useState(false)

  //handle options dropdown
  const handleDeptOptions = () => {
    setDeptOpen(!openDept)
  }

  const handleRoomOptions = () => {
    setRoomOpen(!openRoom)
  }
  //handle modal open
  const handleModalopen = () => {
    setModalopen(true)
  }

  //handle dropdown close after selecting
  const handleSelectDept = (dept: Department) => {
    setSelectedDepartment(dept)
    setLoadingRoom(true)
    setDeptOpen(!openDept)
  }

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room)
    setLoadingLocker(true)
    setRoomOpen(!openRoom)
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
        setSelectedRoom(result.data[0])
      })
    }
  }

  const fetchLockers = async () => {
    if (selectedRoom !== undefined) {
      if (selectedRoom.id) {
        await getLockerInRoom(selectedRoom.id).then((result) => {
          setLockers(result.data)
          setLoading(false)
          setLoadingRoom(false)
          setLoadingLocker(false)
        })
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

  // const handleCreate = async (values: CreateRoom) => {
  //   try {
  //     await createRoom(values).then((result) => {
  //       if (result) {
  //         setLoadingLocker(true)
  //         setRooms([]) // Clear the room array
  //         notifySuccess('Create successfully')
  //         setModalopen(false)
  //       }
  //     })
  //     await fetchRooms() // Fetch the updated data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const handleDelete = async (id: string) => {
  //   try {
  //     await deleteRoom(id).then((result) => {
  //       if (result) {
  //         setLoadingLocker(true)
  //         setRooms([]) // Clear the room array
  //         notifySuccess('Delete successfully')
  //         // setModalopen(false)
  //       } else {
  //         setLoadingLocker(true)
  //       }
  //     })
  //     await fetchRooms() // Fetch the updated data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const handleUpdate = async (values: UpdateRoom) => {
  //   try {
  //     await updateRoom(values).then((result) => {
  //       if (result) {
  //         setLoadingLocker(true)
  //         setRooms([]) // Clear the room array
  //         notifySuccess('Update successfully')
  //       }
  //     })
  //     await fetchRooms() // Fetch the updated data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      {selectedDepartment.id && selectedRoom && (
        <CreateRoomModal
          open={isModalopen}
          handleClose={() => setModalopen(false)}
          deptId={selectedDepartment.id}
          // onSubmit={handleCreate}
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
              onClick={handleDeptOptions}
              sx={{
                padding: { sm: '0 5rem', xs: '0 1rem' },
                height: '52.5px'
              }}
            >
              {openDept ? null : (
                <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                  <Apartment />
                </ListItemIcon>
              )}

              <ListItemText
                sx={{ paddingLeft: openDept ? { sm: '56px' } : '0' }}
                primary={openDept ? 'Select department' : selectedDepartment.name}
                primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
              />
              {openDept ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider sx={{ margin: { sm: '0 4rem', xs: '0 1rem' } }} />
            <Collapse in={openDept} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                {departments.map((dept) => (
                  <React.Fragment key={dept.id}>
                    <ListItemButton
                      sx={{
                        padding: { sm: '0 5rem', xs: '0 1rem' },
                        height: '52.5px'
                      }}
                      onClick={dept.id === selectedDepartment.id ? undefined : () => handleSelectDept(dept)}
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
                  </React.Fragment>
                ))}
              </List>
            </Collapse>
            {!loadingRoom ? (
              <>
                <ListItemButton
                  onClick={handleRoomOptions}
                  sx={{
                    padding: { sm: '0 5rem', xs: '0 1rem' },
                    paddingLeft: { sm: '8rem' },
                    height: '52.5px'
                  }}
                >
                  {openRoom ? null : (
                    <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                      <MeetingRoom />
                    </ListItemIcon>
                  )}

                  <ListItemText
                    sx={{ paddingLeft: openRoom ? { sm: '56px' } : '0' }}
                    primary={openRoom ? 'Select room' : selectedRoom.name}
                    primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                  />
                  {openRoom ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Divider sx={{ margin: { sm: '0 4rem', xs: '0 1rem' }, marginLeft: { sm: '7rem' } }} />
                <Collapse in={openRoom} timeout='auto' unmountOnExit>
                  <List component='div' disablePadding>
                    {rooms.map((room) => (
                      <React.Fragment key={room.id}>
                        <ListItemButton
                          sx={{
                            padding: { sm: '0 5rem', xs: '0 1rem' },
                            paddingLeft: { sm: '8rem' },
                            height: '52.5px'
                          }}
                          onClick={room.id === selectedRoom.id ? undefined : () => handleSelectRoom(room)}
                          disableTouchRipple={room.id === selectedRoom.id}
                          selected={room.id === selectedRoom.id}
                        >
                          <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                            <MeetingRoom />
                          </ListItemIcon>
                          <ListItemText
                            primary={room.name}
                            primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                          />
                        </ListItemButton>
                        <Divider sx={{ margin: { sm: '0 4rem', xs: '0 1rem' }, marginLeft: { sm: '7rem' } }} />
                      </React.Fragment>
                    ))}
                  </List>
                </Collapse>
                {!loadingLocker ? (
                  <>
                    {lockers.map((locker) => (
                      <ListItemButton
                        key={locker.id}
                        sx={{ paddingLeft: { sm: '11rem', xs: '1rem' }, paddingRight: { sm: '5rem', xs: '1rem' } }}
                        disableTouchRipple
                      >
                        <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                          <ViewModule />
                        </ListItemIcon>
                        <ListItemText
                          primary={locker.name}
                          primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                        />
                        <UpdateRoomButton
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
                        />
                      </ListItemButton>
                    ))}
                    <ListItemButton
                      sx={{
                        paddingLeft: { sm: '11rem', xs: '1rem' },
                        paddingRight: { sm: '5rem', xs: '1rem' },
                        height: '53px'
                      }}
                      onClick={handleModalopen}
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
