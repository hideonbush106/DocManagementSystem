import { ReactNode, useRef } from 'react'

// MUI
import { Badge, Fab, Grid, Typography } from '@mui/material'
import { NotificationsOutlined } from '@mui/icons-material'

// Components
import Sidebar from '~/components/sidebar/Sidebar'

// Styles
import { MainContainer, Wrapper } from './BasicLayout.styled'
import Notification from '../notification/Notification'

type Props = {
  children: ReactNode
  title?: string
}

const BasicLayout = ({ children, title }: Props) => {
  const mainContainerRef = useRef<HTMLDivElement>(null)

  return (
    <Wrapper>
      <Sidebar mainContainerRef={mainContainerRef} />
      <MainContainer ref={mainContainerRef}>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid item>
            {title && (
              <Typography variant='h5' sx={{ fontWeight: 600, color: 'var(--black-color)' }}>
                {title}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <Fab
              size='medium'
              sx={{
                backgroundColor: '#fff',
                color: '#000'
              }}
            >
              <Notification />
            </Fab>
          </Grid>
        </Grid>
        {children}
      </MainContainer>
    </Wrapper>
  )
}

export default BasicLayout
