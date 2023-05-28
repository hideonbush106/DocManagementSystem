import { Button, Card } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'
const Welcome = () => {
  const { user, logout } = useAuth()
  const navagite = useNavigate()

  return (
    <div>
      <Card sx={{ padding: '2rem', width: 'fit-content' }}>
        <h1>Welcome {user?.displayName}</h1>
        <img src={String(user?.photoURL)} alt='' srcSet='' />
      </Card>
      <Button onClick={logout} variant='outlined'>
        Logout
      </Button>
      <Button onClick={() => navagite('/test')} variant='outlined'>
        Test
      </Button>
      <Button onClick={() => navagite('/welcome')} variant='outlined'>
        Welcome
      </Button>
    </div>
  )
}

export default Welcome
