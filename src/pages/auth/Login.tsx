import React from 'react'
import { Typography } from '@mui/material'
import { Footer, FooterText, LoginContainer, LoginImg, OuterContainer } from './Login.styled'
import GoogleButton from 'react-google-button'
import { theme } from '~/global/theme'
import useAuth from '~/hooks/useAuth'
import { useNavigate } from 'react-router'

const Login = () => {
  const { login, user } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [navigate, user])

  return !user ? (
    <OuterContainer>
      <LoginImg>
        <img src='/assets/login.svg' alt='' srcSet='' />
      </LoginImg>
      <LoginContainer>
        <div>
          <Typography
            sx={{
              width: '100%',
              fontSize: {
                xs: '3rem',
                sm: '4rem',
                md: '3rem',
                lg: '4rem'
              },
              fontWeight: 600,
              color: theme.palette.primary.main,
              textAlign: {
                xs: 'center',
                md: 'left'
              }
            }}
            variant='h2'
          >
            DMS
          </Typography>
          <Typography
            sx={{
              width: '100%',
              fontSize: {
                xs: '1.5rem',
                sm: '2.5rem',
                md: '1.25rem',
                lg: '2rem'
              },
              fontWeight: 500,
              color: '#8B8C8D',
              marginBottom: '2rem',
              textAlign: {
                xs: 'center',
                md: 'left'
              }
            }}
            variant='h4'
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
  ) : (
    <></>
  )
}

export default Login
