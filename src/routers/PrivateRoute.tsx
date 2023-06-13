import { useNavigate } from 'react-router'
import Layout from '~/components/layouts/Layout'
import Loading from '~/components/loading/Loading'
import useAuth from '~/hooks/useAuth'

interface Props {
  Component: React.ComponentType
}

const PrivateRoute = ({ Component }: Props) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  if (!loading && !user) {
    navigate('/')
  }

  return !loading && user ? (
    <Layout title={Component.name}>
      <Component />
    </Layout>
  ) : (
    <Loading />
  )
}

export default PrivateRoute
