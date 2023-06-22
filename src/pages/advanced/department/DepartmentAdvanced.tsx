import { Apartment } from '@mui/icons-material'
import { List, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import React, { useEffect, useState } from 'react'
import { Department, UpdateDepartment, CreateDepartment } from '~/global/interface'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import { fakeArray } from '~/utils/fakeArray'
import { RejectButton, UpdateButton } from '~/components/button/Button'
import { notifySuccess } from '~/global/toastify'
import CreateDepartmentModal from '~/components/modal/advanced/CreateDepartment'

const DepartmentAdvanced = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const { getAllDepartments, updateDepartment, createDepartment } = useDepartmentApi()

  const [, setOpen] = useState(false)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [isModalOpen, setModalOpen] = useState(false)

  const fetchData = async () => {
    if (loading) {
      await getAllDepartments().then((result) => {
        setDepartments(result.data)
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    fetchData()
  })

  const handleUpdate = async (values: UpdateDepartment) => {
    try {
      await updateDepartment(values) // Wait for the update to complete
      setLoading(true)
      setDepartments([]) // Clear the departments array
      notifySuccess('Update successfully')
      handleClose()
      await fetchData() // Fetch the updated data
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleCreate = async (values: CreateDepartment) => {
    try {
      await createDepartment(values) // Wait for the update to complete
      setLoading(true)
      setDepartments([]) // Clear the departments array
      notifySuccess('Create successfully')
      setModalOpen(false)
      await fetchData() // Fetch the updated data
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CreateDepartmentModal open={isModalOpen} handleClose={() => setModalOpen(false)} onSubmit={handleCreate} />
      <List sx={{ width: '100%', height: '80vh', bgcolor: 'var(--white-color)', padding: '1rem 0' }} component='div'>
        {!loading ? (
          <>
            {departments.map((dept) => (
              <ListItemButton key={dept.id} sx={{ paddingLeft: '5rem', paddingRight: '5rem' }} disableTouchRipple>
                <ListItemIcon sx={{ color: 'var(--black-color)' }}>
                  <Apartment />
                </ListItemIcon>
                <ListItemText
                  primary={dept.name}
                  primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                />
                <UpdateButton text={'Update'} prop={dept} onSubmit={handleUpdate} handleClose={handleClose} />
                <RejectButton text={'Remove'} />
              </ListItemButton>
            ))}
            <ListItemButton
              sx={{ paddingLeft: '5rem', paddingRight: '5rem', height: '53px' }}
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
          fakeArray(6).map((_, index) => <Skeleton key={index} animation='wave' variant='rectangular' height='53px' />)
        )}
      </List>
    </>
  )
}

export default DepartmentAdvanced