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
    >
      <PopoverNotificationCenter onNotificationClick={onNotificationClick} colorScheme='light'>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}

export default Notification
