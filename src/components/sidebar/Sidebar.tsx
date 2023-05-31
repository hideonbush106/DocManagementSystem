import { Avatar, Image, LogOut, Menu, Option, Role, Wrapper, LinkContainer } from './Sidebar.styled'
import { Icon, Typography, styled } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { Options } from './OptionsStaff'
import React, { useState } from 'react'
import useAuth from '~/hooks/useAuth'

const Text = styled(Typography)({
  lineHeight: '1.5rem',
  fontSize: '14px',
  paddingLeft: '0.5rem'
})

const Sidebar = () => {
  const { user, logout } = useAuth()
  const [btn, setButton] = useState<number | null>(1)

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
            <LinkContainer to={`/${option.link}`} onClick={() => setButton(option.id)}>
              <Icon
                sx={{
                  fontWeight: option.id === btn ? 'bold' : 'normal',
                  color: option.id === btn ? 'var(--black-color)' : 'var(--gray-color)'
                }}
              >
                {React.createElement(option.icon)}
              </Icon>
              <Text
                sx={{
                  fontWeight: option.id === btn ? 'bold' : 'normal',
                  color: option.id === btn ? 'var(--black-color)' : 'var(--gray-color)'
                }}
              >
                {option.text}
              </Text>
            </LinkContainer>
          </Option>
        ))}
      </Menu>
      <LogOut onClick={logout}>
        <LogoutIcon sx={{ color: 'var(--red-color)' }} />
        <Typography sx={{ color: 'var(--red-color)', fontWeight: 600, paddingLeft: '0.5rem' }}>Log Out</Typography>
      </LogOut>
    </Wrapper>
  )
}

export default Sidebar
