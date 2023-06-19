import { Apartment } from '@mui/icons-material'
import { Button, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import React, { useEffect, useState } from 'react'
import { Department } from '~/global/interface'
import useDepartmentApi from '~/hooks/api/useDepartmentApi'

const button = [
  { name: 'Update', icon: EditRoundedIcon, color: 'var(--primary-color)' },
  { name: 'Remove', icon: CloseRoundedIcon, color: 'var(--red-color)' }
]

const DepartmentAdvanced = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const { getAllDepartments } = useDepartmentApi()

  useEffect(() => {
    getAllDepartments().then((res) => {
      setDepartments(res.data)
    })
  }, [getAllDepartments])

  return (
    <>
      <List sx={{ width: '100%', height: '100%', bgcolor: 'var(--white-color)', padding: '1rem 0' }} component='div'>
        {departments.map((dept) => (
          <ListItemButton key={dept.id} sx={{ paddingLeft: '5rem', paddingRight: '5rem' }} disableTouchRipple>
            <ListItemIcon>
              <Apartment style={{ color: 'var(--black-color)' }} />
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
          <ListItemIcon>
            <AddRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary={'New department'}
            primaryTypographyProps={{ fontFamily: 'inherit', color: 'var(--black-color)' }}
          />
        </ListItemButton>
      </List>
    </>
  )
}

export default DepartmentAdvanced
