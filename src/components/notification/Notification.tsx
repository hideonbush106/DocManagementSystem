import { NovuProvider, PopoverNotificationCenter, NotificationBell } from '@novu/notification-center'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
  const navigate = useNavigate()

  const onNotificationClick = (notification: any) => navigate(notification.cta.data.url)
  return (
    <NovuProvider
      subscriberId={import.meta.env.VITE_SUBSCRIBER_ID}
      applicationIdentifier={import.meta.env.VITE_NOVU_IDENTIFIER}
    >
      <PopoverNotificationCenter onNotificationClick={onNotificationClick} colorScheme='light'>
        {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}

export default Notification
