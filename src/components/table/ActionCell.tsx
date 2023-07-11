import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

interface MenuItem {
  text: string
  onClick: () => void
}

interface ActionsCellProps {
  id?: number
  menuItems: (MenuItem | null)[]
}

const ActionsCell: React.FC<ActionsCellProps> = ({ id, menuItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const filteredMenuItems = menuItems.filter((menuItem) => menuItem !== null) as MenuItem[]

  return (
    <>
      <Button
        aria-controls={`actions-menu-${id}`}
        aria-haspopup='true'
        onClick={handleClick}
        startIcon={<MoreVertOutlinedIcon />}
        size='small'
        sx={{
          minWidth: '30px',
          color: 'var(--black-color)',
          '.MuiTouchRipple-root': {
            width: 'fit-content'
          }
        }}
      />
      <Menu
        id={`actions-menu-${id}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ '.MuiList-root': { padding: '0' } }}
      >
        {filteredMenuItems.map((menuItem, index) => (
          <MenuItem
            key={index}
            onClick={menuItem.onClick}
            sx={{ height: '30px', padding: '5px 10px', color: 'var(--black-color)' }}
          >
            {menuItem.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default ActionsCell
