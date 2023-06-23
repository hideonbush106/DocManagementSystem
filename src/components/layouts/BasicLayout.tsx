import { ReactNode, useRef } from 'react'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined'
import { MainContainer, Wrapper, NotificationIconDiv } from './BasicLayout.styled'
import Sidebar from '~/components/sidebar/Sidebar'
import { Title } from '~/pages/dashboard/Dashboard.styled'

interface LayoutProps {
  children: ReactNode
  title?: string
}

const BasicLayout = ({ children, title }: LayoutProps) => {
  const mainContainerRef = useRef<HTMLDivElement>(null)
  const isnotification = true

  return (
    <Wrapper>
      <Sidebar mainContainerRef={mainContainerRef} />
      <MainContainer ref={mainContainerRef}>
        {title && (
          <Title variant='h5' sx={{ fontWeight: 600 }}>
            {title}
          </Title>
        )}
        <NotificationIconDiv>
          {!isnotification ? (
            <NotificationsNoneOutlinedIcon sx={{ fontSize: '25px' }} />
          ) : (
            <NotificationsActiveOutlinedIcon sx={{ fontSize: '25px' }} />
          )}
        </NotificationIconDiv>
        {children}
      </MainContainer>
    </Wrapper>
  )
}

export default BasicLayout
