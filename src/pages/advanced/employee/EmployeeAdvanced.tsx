/* eslint-disable react-hooks/exhaustive-deps */
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
import { UpdateEmployeeButton } from '~/components/button/advanced/UpdateButton'
import { CreateUser, Department, Room, UpdateUser, User } from '~/global/interface'
import { notifySuccess } from '~/global/toastify'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import useUserApi from '~/hooks/api/useUserApi'
import { PeopleAlt } from '@mui/icons-material'
import CreateEmployeeModal from '~/components/modal/advanced/employee/CreateEmployeeModal'

const EmployeeAdvanced = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [employees, setEmployees] = useState<User[]>([])

  const [selectedDepartment, setSelectedDepartment] = useState<Department>({ id: '', name: '' })
  const { getAllDepartments } = useDepartmentApi()
  const { getAllUsers, createUser, updateUser, disableUser } = useUserApi()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [loadingEmployee, setLoadingEmployee] = React.useState<boolean>(false)
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
        setLoadingEmployee(true)
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

  const fetchEmployees = async () => {
    try {
      if (selectedDepartment.id) {
        const result = await getAllUsers(selectedDepartment.id)
        setEmployees(result.data)
        setLoading(false)
        setLoadingEmployee(false)
      }
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchDepartment()
  }, [])

  useEffect(() => {
    fetchEmployees()
  }, [selectedDepartment])

  const handleCreate = async (values: CreateUser) => {
    values.department.id = selectedDepartment.id
    const result = await createUser(values)
    if (result) {
      setLoadingEmployee(true)
      setEmployees([]) // Clear the employee array
      notifySuccess('Create successfully')
      setModalOpen(false)
    }
    await fetchEmployees() // Fetch the updated data
  }

  const handleDelete = async (id: string) => {
    const result = await disableUser(id)
    if (result) {
      setLoadingEmployee(true)
      setEmployees([]) // Clear the employee array
      notifySuccess('Delete successfully')
    } else {
      setLoadingEmployee(true)
    }
    await fetchEmployees()
  }

  const handleUpdate = async (values: UpdateUser) => {
    const result = await updateUser(values)
    if (result) {
      setLoadingEmployee(true)
      setEmployees([])
      notifySuccess('Update successfully')
    }
    await fetchEmployees()
  }

  return (
    <>
      {selectedDepartment.id && (
        <CreateEmployeeModal
          departmentId={selectedDepartment.id}
          open={isModalOpen}
          handleClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
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
            {!loadingEmployee ? (
              <>
                {employees.map((employee) => (
                  <ListItemButton
                    key={employee.id}
                    sx={{
                      paddingLeft: { sm: '8rem', xs: '1rem' },
                      paddingRight: { sm: '5rem', xs: '1rem' },
                      cursor: 'default'
                    }}
                    disableTouchRipple
                  >
                    <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                      <PeopleAlt />
                    </ListItemIcon>

                    <ListItemText
                      primary={employee.code + ' - ' + employee.firstName + ' ' + employee.lastName}
                      primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                      style={{
                        width: 'min(100%,20px)',
                        overflow: 'hidden'
                      }}
                    />
                    <UpdateEmployeeButton
                      handleUpdate={handleUpdate}
                      initialValues={{
                        id: employee.id,
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        email: employee.email,
                        phone: employee.phone
                      }}
                    />
                    <DeleteButton
                      id={employee.id}
                      name={employee.code + ' - ' + employee.firstName + ' ' + employee.lastName}
                      type='employee'
                      handleDelete={handleDelete}
                    />
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
                    primary={'New employee'}
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

export default EmployeeAdvanced
