import React, { useEffect, useState } from 'react'
import { Avatar, Image, LogOut, Menu, Option, Wrapper, LinkContainer, SideBarWrapper } from './Sidebar.styled'
import { Icon, Typography, withTheme } from '@mui/material'
import { Options } from './OptionsStaff'
import useAuth from '~/hooks/useAuth'
import { useLocation } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'

const Sidebar = () => {
  const { user, logout } = useAuth()
  const [btn, setButton] = useState<number | null>(1) //dashboard is default option

  //set option bold when navigate to its address
  const location = useLocation()
  useEffect(() => {
    const option = Options.find((option) => location.pathname.includes(`/${option.link}`))
    if (option) {
      setButton(option.id)
    } else {
      setButton(null)
    }
  }, [location])

  //set togle on or off in mobile view, default off
  const [toggle, setToggle] = React.useState(false)

  //onclick event for mobile view
  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    if (event.type === 'keydown') {
      return
    }
    setToggle(open)
  }

  //menu for mobile view
  const menu = () => (
    <Menu onClick={toggleDrawer(false)}>
      <Avatar>
        <Image src={String(user?.photoURL)} alt='Your Avatar' />
        <Typography align='center' sx={{ width: '100%', fontWeight: 600 }} whiteSpace={'nowrap'}>
          {user?.displayName}
        </Typography>
        <Typography color={'var(--gray-color)'}>Staff</Typography>
      </Avatar>
      {Options.map((option) => (
        <Option key={option.id}>
          <LinkContainer to={`/${option.link}`} onClick={() => setButton(option.id)}>
            <Icon
              sx={{
                fontWeight: option.id === btn ? 'bold' : 'normal',
                color: option.id === btn ? 'var(--black-color)' : 'var(--gray-color)'
              }}
            >
              {React.createElement(option.icon)}
            </Icon>
            <Typography
              sx={{
                fontWeight: option.id === btn ? 'bold' : 'normal',
                color: option.id === btn ? 'var(--black-color)' : 'var(--gray-color)',
                paddingLeft: '0.5rem'
              }}
            >
              {option.text}
            </Typography>
          </LinkContainer>
        </Option>
      ))}
      <LogOut onClick={logout}>
        <LogoutIcon sx={{ color: 'var(--red-color)' }} />
        <Typography sx={{ color: 'var(--red-color)', fontWeight: 600, paddingLeft: '0.5rem' }}>Log Out</Typography>
      </LogOut>
    </Menu>
  )
  return (
    <Wrapper>
      <SideBarWrapper mobile>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Drawer anchor={'left'} open={toggle} onClose={toggleDrawer(false)}>
          {menu()}
        </Drawer>
      </SideBarWrapper>
      <SideBarWrapper desktop>
        <Avatar>
          <Image src={String(user?.photoURL)} alt='Your Avatar' />
          <Typography align='center' sx={{ width: '100%', fontWeight: 600 }}>
            {user?.displayName}
          </Typography>
          <Typography color={'var(--gray-color)'}>Staff</Typography>
        </Avatar>
        {Options.map((option) => (
          <Option key={option.id}>
            <LinkContainer to={`/${option.link}`} onClick={() => setButton(option.id)}>
              <Icon
                sx={{
                  fontWeight: option.id === btn ? 'bold' : 'normal',
                  color: option.id === btn ? 'var(--black-color)' : 'var(--gray-color)'
                }}
              >
                {React.createElement(option.icon)}
              </Icon>
              <Typography
                sx={{
                  fontWeight: option.id === btn ? 'bold' : 'normal',
                  color: option.id === btn ? 'var(--black-color)' : 'var(--gray-color)',
                  paddingLeft: '0.5rem'
                }}
              >
                {option.text}
              </Typography>
            </LinkContainer>
          </Option>
        ))}
        <LogOut onClick={logout}>
          <LogoutIcon sx={{ color: 'var(--red-color)' }} />
          <Typography sx={{ color: 'var(--red-color)', fontWeight: 600, paddingLeft: '0.5rem' }}>Log Out</Typography>
        </LogOut>
      </SideBarWrapper>
    </Wrapper>
  )
}

export default Sidebar
