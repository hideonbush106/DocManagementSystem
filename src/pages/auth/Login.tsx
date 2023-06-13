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
  ) : (
    <Loading />
  )
}

export default Login
