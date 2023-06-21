import { Apartment } from '@mui/icons-material'
import { Button, List, ListItemButton, ListItemIcon, ListItemText, Skeleton } from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import React, { useEffect, useState } from 'react'
import { Department } from '~/global/interface'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'
import { fakeArray } from '~/utils/fakeArray'

const button = [
  { name: 'Update', icon: EditRoundedIcon, color: 'var(--primary-color)' },
  { name: 'Remove', icon: CloseRoundedIcon, color: 'var(--red-color)' }
]

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
                {button.map((btn) => (
                  <Button
                    key={btn.name}
                    startIcon={React.createElement(btn.icon)}
                    size='small'
                    style={{
                      width: 110,
                      margin: '0 10px',
                      padding: '7px 10px',
                      fontWeight: 600,
                      fontSize: 12,
                      color: `${btn.color}`,
                      borderColor: `${btn.color}`,
                      fontFamily: 'inherit',
                      textTransform: 'none'
                    }}
                    variant='outlined'
                  >
                    {btn.name}
                  </Button>
                ))}
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
