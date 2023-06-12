import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Loading from '~/components/loading/Loading'
import useAuth from '~/hooks/useAuth'

interface Props {
  Component: React.ComponentType
}

const PrivateRoute = ({ Component }: Props) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!loading && !user) {
      navigate('/')
    }
  }, [user, loading, navigate])

  return !loading ? <Component /> : <Loading />
}

export default PrivateRoute
