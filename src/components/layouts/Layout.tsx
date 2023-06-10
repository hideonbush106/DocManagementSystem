import { ReactNode } from 'react'
import { MainContainer, Wrapper } from './Layout.styled'
import Sidebar from '~/components/sidebar/Sidebar'
import { Title } from '~/pages/dashboard/Dashboard.styled'
import DataProvider from '~/context/DataContext'

interface LayoutProps {
  children: ReactNode
  title?: string
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <DataProvider>
      <Wrapper>
        <Sidebar />
        <MainContainer>
          {title && (
            <Title variant='h5' sx={{ fontWeight: 600 }}>
              {title}
            </Title>
          )}
          {children}
        </MainContainer>
      </Wrapper>
    </DataProvider>
  )
}

export default Layout
