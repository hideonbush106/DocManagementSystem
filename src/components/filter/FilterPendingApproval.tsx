/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Box, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Department, Folder, Locker, Room } from '~/global/interface'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import useFolderApi from '~/hooks/api/useFolderApi'
import useLockerApi from '~/hooks/api/useLockerApi'
import useRoomApi from '~/hooks/api/useRoomApi'

interface FilterPendingApprovalProps {
  selectedDepartment: Department
  setSelectedDepartment: React.Dispatch<React.SetStateAction<Department>>
  selectedRoom: Room
  setSelectedRoom: React.Dispatch<React.SetStateAction<Room>>
  selectedLocker: Locker
  setSelectedLocker: React.Dispatch<React.SetStateAction<Locker>>
  selectedFolder: Folder
  setSelectedFolder: React.Dispatch<React.SetStateAction<Folder>>
  filterOpen: boolean
}

const FilterPendingApproval = ({
  selectedDepartment,
  setSelectedDepartment,
  selectedRoom,
  setSelectedRoom,
  selectedLocker,
  setSelectedLocker,
  selectedFolder,
  setSelectedFolder,
  filterOpen
}: FilterPendingApprovalProps) => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [lockers, setLockers] = useState<Locker[]>([])
  const [folders, setFolders] = useState<Folder[]>([])

  const { getAllDepartments } = useDepartmentApi()
  const { getRoomsInDepartment } = useRoomApi()
  const { getLockerInRoom } = useLockerApi()
  const { getFoldersInLocker } = useFolderApi()

  const fetchDepartment = async () => {
    const result = await getAllDepartments()
    setDepartments(result.data)
  }

  const fetchRooms = async () => {
    if (selectedDepartment.id) {
      const result = await getRoomsInDepartment(selectedDepartment.id)
      setRooms(result.data)
    }
  }

  const fetchLockers = async () => {
    if (selectedRoom !== undefined) {
      if (selectedRoom.id) {
        const result = await getLockerInRoom(selectedRoom.id)
        setLockers(result.data)
      }
    }
  }

  const fetchFolders = async () => {
    if (selectedLocker !== undefined) {
      if (selectedLocker.id) {
        const result = await getFoldersInLocker(selectedLocker.id)
        setFolders(result.data)
      }
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

  useEffect(() => {
    if (!filterOpen) {
      setSelectedDepartment({ id: '', name: '' })
      setSelectedRoom({ id: '', name: '', capacity: 0 })
      setSelectedLocker({ id: '', name: '', capacity: 0 })
      setSelectedFolder({ id: '', name: '', capacity: 0 })
    }
  }, [filterOpen])

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

  const optionsFolder = {
    options: folders.map((option) => option.name)
  }

  const handleDeptChange = (_event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    const selectedDept = departments.find((dept) => dept.name === value)
    if (selectedDept) {
      setSelectedDepartment(selectedDept)
    } else {
      setSelectedDepartment({ id: '', name: '' })
    }
    setRooms([])
    setLockers([])
    setFolders([])
    setSelectedRoom({ id: '', name: '', capacity: 0 })
    setSelectedLocker({ id: '', name: '', capacity: 0 })
    setSelectedFolder({ id: '', name: '', capacity: 0 })
  }

  const handleRoomChange = (_event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    const selectedRoom = rooms.find((room) => room.name === value)
    if (selectedRoom) {
      setSelectedRoom(selectedRoom)
    } else {
      setSelectedRoom({ id: '', name: '', capacity: 0 })
    }
    setLockers([])
    setFolders([])
    setSelectedLocker({ id: '', name: '', capacity: 0 })
    setSelectedFolder({ id: '', name: '', capacity: 0 })
  }

  const handleLockerChange = (_event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    const selectedLocker = lockers.find((locker) => locker.name === value)
    if (selectedLocker) {
      setSelectedLocker(selectedLocker)
    } else {
      setSelectedLocker({ id: '', name: '', capacity: 0 })
    }
    setFolders([])
    setSelectedFolder({ id: '', name: '', capacity: 0 })
  }

  const handleFolderChange = (_event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    const selectedFolder = folders.find((folder) => folder.name === value)
    if (selectedFolder) {
      setSelectedFolder(selectedFolder)
    } else {
      setSelectedFolder({ id: '', name: '', capacity: 0 })
    }
  }

  return (
    <Box display={'flex'}>
      <Autocomplete
        {...optionsDept}
        id='department option'
        size='medium'
        autoComplete
        onChange={handleDeptChange}
        value={selectedDepartment.id ? selectedDepartment.name : null}
        sx={{ width: '150px' }}
        renderInput={(params) => <TextField label='Department' {...params} variant='standard' />}
      />
      <Autocomplete
        {...optionsRoom}
        id='room option'
        size='medium'
        autoComplete
        onChange={handleRoomChange}
        value={selectedDepartment.id ? selectedRoom.name : null}
        disabled={selectedDepartment.id === ''}
        sx={{ width: '150px', marginLeft: 2 }}
        renderInput={(params) => <TextField label='Room' {...params} variant='standard' />}
      />
      <Autocomplete
        {...optionsLocker}
        id='locker option'
        size='medium'
        autoComplete
        onChange={handleLockerChange}
        value={selectedRoom.id ? selectedLocker.name : null}
        disabled={selectedRoom.id === ''}
        sx={{ width: '150px', marginLeft: 2 }}
        renderInput={(params) => <TextField label='Locker' {...params} variant='standard' />}
      />
      <Autocomplete
        {...optionsFolder}
        id='folder option'
        size='medium'
        autoComplete
        onChange={handleFolderChange}
        value={selectedLocker.id ? selectedFolder.name : null}
        disabled={selectedLocker.id === ''}
        sx={{ width: '150px', marginLeft: 2 }}
        renderInput={(params) => <TextField label='Folder' {...params} variant='standard' />}
      />
    </Box>
  )
}
export default FilterPendingApproval
