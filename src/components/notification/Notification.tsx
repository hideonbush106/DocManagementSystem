import { NovuProvider, PopoverNotificationCenter, NotificationBell } from '@novu/notification-center'
import { useNavigate } from 'react-router-dom'
import useAuth from '~/hooks/useAuth'

const Notification = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const onNotificationClick = (notification: any) => navigate(notification.cta.data.url)

  return (
    <NovuProvider
      subscriberId={user?.id}
      applicationIdentifier={import.meta.env.VITE_NOVU_IDENTIFIER}
      initialFetchingStrategy={{
        fetchNotifications: true,
        fetchUserPreferences: true
      }}
      styles={{
        footer: {
          root: { display: 'none' }
        },
        loader: {
          root: { height: 'calc(100vh - 320px)' }
        },
        layout: {
          root: {
            marginTop: '20px',
            '.css-2jvpeg': { minHeight: 'fit-content' },
            boxShadow: '2px 2px 30px 5px rgba(0,0,0,0.2)'
          }
        },
        notifications: {
          root: {
            '.infinite-scroll-component': { height: 'calc(100vh - 320px) !important' }
          },
          listItem: {
            unread: { fontWeight: '600', color: 'black', fontSize: '14px' }
          }
        }
      }}
    >
      <PopoverNotificationCenter onNotificationClick={onNotificationClick} colorScheme='light'>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}

export default Notification
