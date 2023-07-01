import { Category } from '@mui/icons-material'
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
import { Department, Categories, UpdateCategory } from '~/global/interface'
import { notifySuccess } from '~/global/toastify'
import useCategoryApi from '~/hooks/api/useCategoryApi'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'

interface CreateCategory {
  name: string
  department: {
    id: string
  }
}

const CategoryAdvanced = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [categories, setCategories] = useState<Categories[]>([])

  const [selectedDepartment, setSelectedDepartment] = useState<Department>({ id: '', name: '' })
  const { getAllDepartments } = useDepartmentApi()
  const { getAllCategories, createCategory, updateCategory, deleteCategory } = useCategoryApi()
  const [loading, setLoading] = useState<boolean>(true)
  const [loadingCategory, setLoadingCategory] = useState<boolean>(false)
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
        setLoadingCategory(true)
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

  const fetchCategories = async () => {
    try {
      if (selectedDepartment.id) {
        const result = await getAllCategories(selectedDepartment.id)
        setCategories(result.data)
        setLoading(false)
        setLoadingCategory(false)
      }
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchDepartment()
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [selectedDepartment])

  const handleCreate = async (values: CreateCategory) => {
    values.department.id = selectedDepartment.id
    const result = await createCategory(values)
    if (result) {
      setLoadingCategory(true)
      setCategories([]) // Clear the room array
      notifySuccess('Create successfully')
      setModalOpen(false)
    }
    await fetchCategories() // Fetch the updated data
  }

  const handleDelete = async (id: string) => {
    const result = await deleteCategory(id)
    if (result) {
      setLoadingCategory(true)
      setCategories([]) // Clear the room array
      notifySuccess('Delete successfully')
    } else {
      setLoadingCategory(true)
    }
    await fetchCategories()
  }

  const handleUpdate = async (values: UpdateCategory) => {
    const result = await updateCategory(values)
    if (result) {
      setLoadingCategory(true)
      setCategories([])
      notifySuccess('Update successfully')
    }
    await fetchCategories()
  }

  return (
    <>
      {selectedDepartment.id && (
        <CreateAdvancedModal<CreateCategory>
          open={isModalOpen}
          type='Category'
          handleClose={() => setModalOpen(false)}
          onSubmit={handleCreate}
          initialValues={{ name: '', department: { id: selectedDepartment.id } }}
          max={100}
          disableCapacity={true}
        />
      )}
      <List
        sx={{
          width: '100%',
          height: { xs: 'calc(100vh - 210px)', md: 'calc(100vh - 160px)' },
          borderRadius: '5  px',
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
            {!loadingCategory ? (
              <>
                {categories.map((category) => (
                  <ListItemButton
                    key={category.id}
                    sx={{ paddingLeft: { sm: '8rem', xs: '1rem' }, paddingRight: { sm: '5rem', xs: '1rem' } }}
                    disableTouchRipple
                  >
                    <ListItemIcon sx={{ color: 'var(--black-color)', minWidth: { sm: '56px', xs: '40px' } }}>
                      <Category />
                    </ListItemIcon>

                    <ListItemText
                      primary={category.name}
                      primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
                      style={{
                        width: 'min(100%,20px)',
                        overflow: 'hidden'
                      }}
                    />
                    <UpdateButton<UpdateCategory>
                      type='Category'
                      onSubmit={handleUpdate}
                      initialValues={{
                        id: category.id,
                        name: category.name
                      }}
                      max={100}
                    />
                    <DeleteButton id={category.id} name={category.name} type='category' handleDelete={handleDelete} />
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
                    primary={'New category'}
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

export default CategoryAdvanced
