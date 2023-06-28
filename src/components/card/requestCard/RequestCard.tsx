import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

interface RequestCardProps {
  children?: React.ReactNode
}

const RequestCard = ({ children }: RequestCardProps) => {
  return (
    <>
      <Card
        sx={{
          width: '18.5rem',
          margin: '0 20px 15px 0',
          '@media (min-width: 600px)': {
            width: '15rem',
            margin: '0 30px 30px 0'
          },
          '@media (min-width: 900px)': {
            width: '14.25rem',
            margin: '0 20px 20px 0'
          },
          '@media (min-width: 1200px)': {
            width: '12.95 rem'
          }
        }}
      >
        <CardContent
          sx={{
            height: '16.5rem',
            overflow: 'visible',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {children}
        </CardContent>
      </Card>
    </>
  )
}

export default RequestCard
