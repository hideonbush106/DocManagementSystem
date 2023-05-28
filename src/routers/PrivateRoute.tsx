import { useEffect } from 'react'
import { useNavigate } from 'react-router'

interface Props {
  Component: React.ComponentType
}

const PrivateRoute = ({ Component }: Props) => {
  const navigate = useNavigate()
  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin')
    if (!isLogin) {
      navigate('/')
    }
  }, [navigate])

  return <Component />
}

export default PrivateRoute
