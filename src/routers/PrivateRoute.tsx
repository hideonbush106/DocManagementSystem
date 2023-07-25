import React from 'react'
import useAuth from '~/hooks/useAuth'
import BasicLayout from '~/components/layouts/BasicLayout'
import { privateRoutes } from './routes'
import MainLayout from '~/components/layouts/MainLayout'

interface Props {
  Component: React.ComponentType
}

const PrivateRoute = ({ Component }: Props) => {
  const { user } = useAuth()

  const route = privateRoutes.find((r) => r.component === Component)
  const title = route ? route.title : ''
  const layout = route ? route.layout : ''

  let render: React.ReactNode = <></>
  switch (layout) {
    case 'main': {
      render = (
        <MainLayout title={title}>
          <Component />
        </MainLayout>
      )
      break
    }
    default: {
      render = (
        <BasicLayout title={title}>
          <Component />
        </BasicLayout>
      )
    }
  }

  return user ? render : <></>
}

export default PrivateRoute
