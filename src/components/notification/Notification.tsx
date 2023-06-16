import { IconDiv } from '../headerBar/HeaderBar.styled'

const Notification = () => {
  const handleOpen = () => {
    console.log('hi')
  }
  return (
    <div>
      <IconDiv white style={{ cursor: 'pointer' }} onClick={handleOpen}>
        <img src='/assets/bell-ringing.svg' alt='' />
      </IconDiv>
    </div>
  )
}

export default Notification
