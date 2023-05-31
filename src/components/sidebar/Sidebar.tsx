import { Avatar, Image, LogOut, Menu, Option, Role, Text, Wrapper, LinkContainer } from './Sidebar.styled'
import { Icon, Typography } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { Options } from './OptionsStaff'
import React from 'react'
import useAuth from '~/hooks/useAuth'

const Sidebar = () => {
  const { user, logout } = useAuth()
  return (
    <Wrapper>
      <Avatar>
        <Image src={String(user?.photoURL)} alt='Your Avatar' />
        <Typography align='center' sx={{ width: '100%', fontWeight: 600 }}>
          {user?.displayName}
        </Typography>
        <Role>Staff</Role>
      </Avatar>
      <Menu>
        {Options.map((option) => (
          <Option key={option.id}>
            <LinkContainer to={`/${option.link}`}>
              <Icon sx={{ scale: '0.9' }}>{React.createElement(option.icon)}</Icon>
              <Text>{option.text}</Text>
            </LinkContainer>
          </Option>
        ))}
      </Menu>
      <LogOut onClick={logout}>
        <LogoutIcon sx={{ color: 'var(--red-color)' }} />
        <Typography sx={{ color: 'var(--red-color)', fontWeight: 600, paddingLeft: '1rem' }}>Log Out</Typography>
      </LogOut>
    </Wrapper>
  )
}

export default Sidebar
