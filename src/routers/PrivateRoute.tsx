import React from 'react'
import useAuth from '~/hooks/useAuth'
import Layout from '~/components/layouts/Layout'
import { privateRoutes } from './routes'

interface Props {
  Component: React.ComponentType
}

const PrivateRoute = ({ Component }: Props) => {
  const { user } = useAuth()
  const route = privateRoutes.find((r) => r.component === Component)
  const title = route ? route.title : ''

  return user ? (
    <Layout title={title}>
      <Component />
    </Layout>
  ) : (
    <></>
  )
}

export default PrivateRoute
