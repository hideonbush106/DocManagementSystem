import { Typography } from '@mui/material'
import { LoginContainer, LoginImg, OuterContainer } from './Login.styled'
import GoogleButton from 'react-google-button'
import { theme } from '~/global/theme'
import { UserAuth } from '~/context/AuthContext'

const Login = () => {
  const { login } = UserAuth()

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
          <Typography sx={{ width: '100%', color: '#8B8C8D', marginBottom: '2.5rem' }} variant='h3' align='center'>
            Document Management System
          </Typography>
        </div>
        <GoogleButton onClick={login} />
      </LoginContainer>
    </OuterContainer>
  )
}

export default Login
