import { ReactNode } from 'react'
import { MainContainer, Wrapper } from './Layout.styled'
import Sidebar from '~/components/sidebar/Sidebar'
import { Title } from '~/pages/dashboard/Dashboard.styled'

interface LayoutProps {
  children: ReactNode
  title?: string
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
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
  )
}

export default Layout
