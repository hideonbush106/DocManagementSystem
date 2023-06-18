import React, { useEffect, useState } from 'react'
import { Avatar, Image, MenuMobile, Wrapper, SideBarWrapper, Logo } from './Sidebar.styled'
import { Typography } from '@mui/material'
import { OptionsStaff } from './OptionsStaff'
// import { OptionsEmp } from './OptionsEmp'
import useAuth from '~/hooks/useAuth'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'

interface SidebarProps {
  mainContainerRef: React.RefObject<HTMLDivElement>
}

const Sidebar: React.FC<SidebarProps> = ({ mainContainerRef }) => {
  const { user, logout } = useAuth()
  const [btn, setButton] = useState<number | null>(1) //dashboard is default option
  const navigate = useNavigate()

  const handleClick = (id: number) => {
    setButton(id)
    if (mainContainerRef.current) {
      mainContainerRef.current.scrollTo(0, 0)
    }
  }

  //set option bold when navigate to its address
  const location = useLocation()
  useEffect(() => {
    const option = OptionsStaff.find((option) => location.pathname.includes(`/${option.link}`))
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
    <MenuMobile onClick={toggleDrawer(false)}>
      <Avatar>
        <Image src={String(user?.photoUrl)} alt='Your Avatar' />
        <Typography align='center' sx={{ width: '100%', fontWeight: 600 }}>
          {user?.name}
        </Typography>
        <Typography color={'var(--gray-color)'}>{user?.role}</Typography>
      </Avatar>
      {OptionsStaff.map((option) => (
        <Link
          key={option.id}
          to={`/${option.link}`}
          style={{
            width: '100%',
            minHeight: 'fit-content'
          }}
        >
          <Button
            onClick={() => handleClick(option.id)}
            sx={{
              width: '100%',
              height: '100%',
              color: option.id === btn ? 'var(--white-color)' : 'var(--black-light-color)',
              borderRadius: 0,
              padding: '5% 10%',
              justifyContent: 'flex-start',
              textTransform: 'none',
              fontFamily: 'inherit'
            }}
            startIcon={React.createElement(option.icon)}
            variant={option.id === btn ? 'contained' : 'text'}
          >
            {option.text}
          </Button>
        </Link>
      ))}
      <Button
        startIcon={<LogoutIcon />}
        sx={{ color: 'var(--red-color)' }}
        style={{
          position: 'fixed',
          bottom: 10,
          textTransform: 'none',
          fontFamily: 'inherit'
        }}
        onClick={logout}
      >
        Log Out
      </Button>
    </MenuMobile>
  )
  return (
    <Wrapper>
      <SideBarWrapper mobile>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Logo src='/assets/DMS.png' alt='logo' onClick={() => navigate('/dashboard')} />
        <Drawer anchor={'left'} open={toggle} onClose={toggleDrawer(false)}>
          {menu()}
        </Drawer>
      </SideBarWrapper>
      <SideBarWrapper desktop>
        <Avatar>
          <Image src={String(user?.photoUrl)} alt='Your Avatar' />
          <Typography align='center' sx={{ width: '100%', fontWeight: 600 }}>
            {user?.name}
          </Typography>
          <Typography color={'var(--gray-color)'}>{user?.role}</Typography>
        </Avatar>
        {OptionsStaff.map((option) => (
          <Link
            key={option.id}
            to={`/${option.link}`}
            style={{
              width: '100%',
              minHeight: 'fit-content'
            }}
          >
            <Button
              onClick={() => handleClick(option.id)}
              sx={{
                width: '100%',
                height: '100%',
                color: option.id === btn ? 'var(--white-color)' : 'var(--black-light-color)',
                borderRadius: 0,
                padding: '5% 10%',
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontFamily: 'inherit'
              }}
              startIcon={React.createElement(option.icon)}
              variant={option.id === btn ? 'contained' : 'text'}
            >
              {option.text}
            </Button>
          </Link>
        ))}
        <Button
          startIcon={<LogoutIcon />}
          sx={{ color: 'var(--red-color)' }}
          style={{
            position: 'fixed',
            bottom: 10,
            textTransform: 'none',
            fontFamily: 'inherit'
          }}
          onClick={logout}
        >
          Log Out
        </Button>
      </SideBarWrapper>
    </Wrapper>
  )
}

export default Sidebar
