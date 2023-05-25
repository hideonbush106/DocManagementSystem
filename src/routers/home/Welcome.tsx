import { Button, Card } from '@mui/material'
import { UserAuth } from '~/context/AuthContext'
const Welcome = () => {
  const { user, logout } = UserAuth()

  return (
    <div>
      <Card sx={{ padding: '2rem', width: 'fit-content' }}>
        <h1>Welcome {user?.displayName}</h1>
        <img src={String(user?.photoURL)} alt='' srcSet='' />
      </Card>
      <Button onClick={logout} variant='outlined'>
        Logout
      </Button>
    </div>
  )
}

export default Welcome
