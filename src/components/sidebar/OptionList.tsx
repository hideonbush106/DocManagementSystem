import { Button, Typography } from '@mui/material'
import { Avatar, Image } from './Sidebar.styled'
import useAuth from '~/hooks/useAuth'
import { OptionsEmp, OptionsStaff } from './Options'
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { Role } from '~/global/enum'

interface SidebarProps {
  prop: React.RefObject<HTMLDivElement>
}

const OptionList: React.FC<SidebarProps> = ({ prop }) => {
  const { user, logout } = useAuth()
  const options = user?.role.toLocaleUpperCase() === Role.MANAGER ? OptionsStaff : OptionsEmp
  const [btn, setButton] = useState<number | null>(null) //dashboard is default option

  const role = user?.role.toLocaleUpperCase() === Role.MANAGER ? 'Manager' : 'Employee'

  const handleClick = (id: number) => {
    setButton(id)
    if (prop.current) {
      prop.current.scrollTo(0, 0)
    }
  }

  const location = useLocation()
  useEffect(() => {
    const option = options.find((option) => location.pathname.includes(`/${option.link}`))
    if (option) {
      setButton(option.id)
    } else {
      setButton(null)
    }
  }, [location, options])

  return (
    <>
      <Avatar>
        <Image src={String(user?.photoUrl)} alt='Your Avatar' />
        <Typography align='center' sx={{ width: '100%', fontWeight: 600 }}>
          {user?.name}
        </Typography>
        <Typography color={'var(--gray-color)'}>{role}</Typography>
      </Avatar>
      {options.map((option) => (
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
    </>
  )
}

export default OptionList
