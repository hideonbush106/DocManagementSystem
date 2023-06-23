import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

interface RequestCardProps {
  children?: React.ReactNode
}

const RequestCard = ({ children }: RequestCardProps) => {
  return (
    <>
      <Card sx={{ maxWidth: '14.5rem', margin: '0 20px 15px 0' }}>
        <CardContent
          sx={{
            height: '18rem',
            overflow: 'scoll',
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
