import { Typography } from '@mui/material'
import { Footer, FooterText, LoginContainer, LoginImg, OuterContainer } from './Login.styled'
import GoogleButton from 'react-google-button'
import { theme } from '~/global/theme'
import { AuthContext } from '~/context/AuthContext'
import React from 'react'

const Login = () => {
  const login = React.useContext(AuthContext).login
  return (
    <OuterContainer>
      <LoginImg>
        <img src='/assets/login.svg' alt='' srcSet='' />
      </LoginImg>
      <LoginContainer>
        <div>
          <Typography
            sx={{ width: '100%', fontWeight: 600, color: theme.palette.primary.main }}
            variant='h2'
            align='left'
          >
            DMS
          </Typography>
          <Typography
            sx={{ width: '100%', fontWeight: 500, color: '#8B8C8D', marginBottom: '4rem' }}
            variant='h4'
            align='center'
          >
            Document Management System
          </Typography>
        </div>
        <GoogleButton onClick={login} />
      </LoginContainer>
      <Footer>
        <FooterText>&copy; 2023 | All Rights Reserved</FooterText>
      </Footer>
    </OuterContainer>
  )
}

export default Login
