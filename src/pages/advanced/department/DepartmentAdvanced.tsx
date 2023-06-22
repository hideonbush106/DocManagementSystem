import { Apartment } from '@mui/icons-material'
import { List, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import React, { useEffect, useState } from 'react'
import { Department } from '~/global/interface'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import { fakeArray } from '~/utils/fakeArray'
import { RejectButton, UpdateButton } from '~/components/button/Button'

const DepartmentAdvanced = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const { getAllDepartments } = useDepartmentApi()
  const [loading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    getAllDepartments().then((res) => {
      setDepartments(res.data)
      setLoading(false)
    })
  }, [getAllDepartments])

  return (
    <>
      <List sx={{ width: '100%', height: '85vh', bgcolor: 'var(--white-color)', padding: '1rem 0' }} component='div'>
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
                <UpdateButton text={'Update'} prop={dept} />
                <RejectButton text={'Remove'} />
              </ListItemButton>
            ))}
            <ListItemButton sx={{ paddingLeft: '5rem', paddingRight: '5rem', height: '53px' }}>
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
          fakeArray(5).map((_, index) => <Skeleton key={index} animation='wave' variant='rectangular' height='53px' />)
        )}
      </List>
    </>
  )
}

export default DepartmentAdvanced
