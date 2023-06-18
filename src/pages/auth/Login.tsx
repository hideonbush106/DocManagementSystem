import React from 'react'
import { Typography } from '@mui/material'
import { Footer, FooterText, LoginContainer, LoginImg, OuterContainer } from './Login.styled'
import GoogleButton from 'react-google-button'
import { theme } from '~/global/theme'
import useAuth from '~/hooks/useAuth'
import { useNavigate } from 'react-router'
import Loading from '~/components/loading/Loading'

const Login = () => {
  const { user, loading, login } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])

  return !loading && !user ? (
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
                xs: '5rem',
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
                xs: '2rem',
                sm: '2.5rem',
                md: '1.25rem',
                lg: '2rem'
              },
              fontWeight: 500,
              color: '#8B8C8D',
              marginBottom: '4rem',
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
    <Loading />
  )
}

export default Login
