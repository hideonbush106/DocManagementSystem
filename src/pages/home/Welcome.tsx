import { Button, Card } from '@mui/material'
import React from 'react'
import { AuthContext } from '~/context/AuthContext'
const Welcome = () => {
  const user = React.useContext(AuthContext).user
  const logout = React.useContext(AuthContext).logout

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
