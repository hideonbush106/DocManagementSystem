/* eslint-disable react-hooks/exhaustive-deps */
import { Apartment } from '@mui/icons-material'
import { CircularProgress, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import React, { useEffect, useState } from 'react'
import { Department, UpdateDepartment, CreateDepartment } from '~/global/interface'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import { DeleteButton, UpdateButton } from '~/components/button/Button'
import { notifySuccess, notifyError } from '~/global/toastify'
import CreateDepartmentModal from '~/components/modal/advanced/department/CreateDepartment'
import { Box } from '@mui/system'

const DepartmentAdvanced = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const { getAllDepartments, updateDepartment, createDepartment, deleteDepartment } = useDepartmentApi()

  const [loading, setLoading] = React.useState<boolean>(true)
  const [isModalOpen, setModalOpen] = useState(false)

  const fetchData = async () => {
    await getAllDepartments().then((result) => {
      setDepartments(result.data)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleUpdate = async (values: UpdateDepartment) => {
    try {
      await updateDepartment(values).then((result) => {
        if (result) {
          setLoading(true)
          setDepartments([]) // Clear the departments array
          notifySuccess('Update successfully')
        }
      })
      await fetchData() // Fetch the updated data
    } catch (error) {
      console.log(error)
    }
  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleCreate = async (values: CreateDepartment) => {
    try {
      await createDepartment(values).then((result) => {
        if (result) {
          setLoading(true)
          setDepartments([]) // Clear the departments array
          notifySuccess('Create successfully')
          setModalOpen(false)
        }
      })
      await fetchData() // Fetch the updated data
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDepartment(id).then((result) => {
        if (result) {
          setLoading(true)
          setDepartments([]) // Clear the departments array
          notifySuccess('Delete successfully')
        } else {
          setLoading(true)
          notifyError('Delete failed')
        }
      })
      await fetchData() // Fetch the updated data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CreateDepartmentModal open={isModalOpen} handleClose={() => setModalOpen(false)} onSubmit={handleCreate} />
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
            {departments.map((dept) => (
              <ListItemButton
                key={dept.id}
                sx={{ paddingLeft: { sm: '5rem', xs: '1rem' }, paddingRight: { sm: '5rem', xs: '1rem' } }}
                disableTouchRipple
              >
                <ListItemIcon sx={{ color: 'var(--black-color)' }}>
                  <Apartment />
                </ListItemIcon>
                <ListItemText
                  primary={dept.name}
                  primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                />
                <UpdateButton text='Update' id={dept.id} name={dept.name} onSubmit={handleUpdate} />
                <DeleteButton text='Delete' id={dept.id} handleDelete={handleDelete} />
              </ListItemButton>
            ))}
            <ListItemButton
              sx={{ paddingLeft: { sm: '5rem', xs: '1rem' }, paddingRight: { sm: '5rem', xs: '1rem' }, height: '53px' }}
              onClick={handleModalOpen}
            >
              <ListItemIcon sx={{ color: 'var(--black-color)' }}>
                <AddRoundedIcon />
              </ListItemIcon>
              <ListItemText
                primary={'New department'}
                primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
              />
            </ListItemButton>
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

export default DepartmentAdvanced
