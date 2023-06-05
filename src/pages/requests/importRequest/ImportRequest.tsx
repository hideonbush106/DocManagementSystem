import RequestCard from '~/components/cards/requestCard/RequestCard'
import { Avatar, Typography, styled } from '@mui/material'
import { mockRequest } from '~/shared/mockRequest'

const Text = styled(Typography)`
  color: var(--black-color);
  margin: 0.5rem 0;
`

// function stringToColor(string: string) {
//   let hash = 0
//   let i
//   for (i = 0; i < string.length; i += 1) {
//     hash = string.charCodeAt(i) + ((hash << 5) - hash)
//   }

//   let color = '#'

//   for (i = 0; i < 3; i += 1) {
//     const value = (hash >> (i * 8)) & 0xff
//     color += `00${value.toString(16)}`.slice(-2)
//   }
//   return color
// }

// function stringAvatar(name: string) {
//   return {
//     sx: {
//       bgcolor: stringToColor(name)
//     },
//     children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
//   }
// }

const ImportRequest = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {mockRequest.map((request) => (
        <RequestCard key={request.id} request={request}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <Avatar sx={{ width: '50px', height: '50px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.75rem' }}>
              <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>{request.name}</Typography>
              <Typography sx={{ color: '#a5aab5', letterSpacing: '0', fontSize: '16px' }}>{request.role}</Typography>
            </div>
          </div>
          <Text variant='body2'>
            <strong> Title: </strong>
            {request.title}
          </Text>
          <Text variant='body2'>
            <strong> Detail: </strong>
            {request.detail}
          </Text>
          <Text variant='body2'>
            <strong> Time request: </strong>
            {request.timeRequest.toLocaleString()}
          </Text>
        </RequestCard>
      ))}
      {/* <RequestCard>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <Avatar {...stringAvatar('Hao Nguyen')} sx={{ width: '50px', height: '50px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '0.75rem' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>Thanh Hao</Typography>
            <Typography sx={{ color: '#a5aab5', letterSpacing: '0', fontSize: '16px' }}>Accountant</Typography>
          </div>
        </div>
        <Text variant='body2'>
          <strong> Title: </strong>Hello
        </Text>
        <Text variant='body2'>
          <strong> Detail: </strong>Hello
        </Text>
        <Text variant='body2'>
          <strong> Time request: </strong>Hello
        </Text>
      </RequestCard> */}
    </div>
  )
}

export default ImportRequest
