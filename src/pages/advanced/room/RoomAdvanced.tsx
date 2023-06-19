import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const RoomAdvanced = () => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }} component='nav' aria-labelledby='nested-list-subheader'>
        <ListItemButton>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary='Sent mail' />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary='Drafts' />
        </ListItemButton>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon></ListItemIcon>
          <ListItemText primary='Inbox' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary='Starred' />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </>
  )
}

export default RoomAdvanced
