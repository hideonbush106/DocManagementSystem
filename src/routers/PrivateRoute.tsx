import React from 'react'
import { useNavigate } from 'react-router'
import Layout from '~/components/layouts/Layout'
import Loading from '~/components/loading/Loading'
import useAuth from '~/hooks/useAuth'

interface Props {
  Component: React.ComponentType
  title?: string
}

const PrivateRoute = ({ Component, title }: Props) => {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading])

  return !loading && user ? (
    <Layout title={title}>
      <Component />
    </Layout>
  ) : (
    <Loading />
  )
}

export default PrivateRoute
