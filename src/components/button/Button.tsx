import { Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

interface ButtonProps {
  text: string
  onClick?: () => void
}

export const ImportButton = (props: ButtonProps) => {
  const { text, onClick } = props

  return (
    <>
      <Button
        sx={{
          backgroundColor: 'var(--primary-color)',
          width: { sm: '165px', xs: '115px' },
          height: '45px',
          textTransform: 'capitalize',
          fontSize: '14px',
          padding: '10px',
          lineHeight: '1.2',
          '&:hover': {
            backgroundColor: 'var(--primary-dark-color)'
          }
        }}
        variant='contained'
        startIcon={<AddRoundedIcon />}
        color='primary'
        onClick={onClick}
      >
        {text}
      </Button>
    </>
  )
}

export const ImportRequestButton = (props: ButtonProps) => {
  const { text, onClick } = props
  return (
    <>
      <Button
        sx={{
          backgroundColor: 'var(--primary-color)',
          width: { sm: '175px', xs: '125px' },
          height: '45px',
          textTransform: 'capitalize',
          fontSize: '14px',
          padding: '10px',
          lineHeight: '1.2',
          '&:hover': {
            backgroundColor: 'var(--primary-dark-color)'
          }
        }}
        variant='contained'
        startIcon={<AddRoundedIcon />}
        color='primary'
        onClick={onClick}
      >
        {text}
      </Button>
    </>
  )
}

export const ReturnButton = (props: ButtonProps) => {
  const { text, onClick } = props
  return (
    <>
      <Button
        sx={{
          backgroundColor: 'var(--green-color)',
          width: { sm: '180px', xs: '140px' },
          height: '45px',
          textTransform: 'capitalize',
          fontSize: '14px',
          padding: '10px',
          lineHeight: '1.2',
          '&:hover': {
            backgroundColor: 'var(--green-dark-color)'
          }
        }}
        variant='contained'
        startIcon={<KeyboardReturnRoundedIcon />}
        color='primary'
        onClick={onClick}
      >
        {text}
      </Button>
    </>
  )
}

export const ViewButton = ({ text }: ButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: 'var(--primary-color)',
        width: '80px',
        height: '30px',
        textTransform: 'uppercase',
        fontSize: '12px',
        padding: '5px',
        '&:hover': {
          backgroundColor: 'var(--primary-dark-color)'
        }
      }}
      variant='contained'
    >
      {text}
    </Button>
  )
}

export const AcceptButton = ({ text, onClick }: ButtonProps) => {
  return (
    <Button
      variant='outlined'
      startIcon={<DoneRoundedIcon />}
      sx={{
        color: 'var(--green-color)',
        border: '0.5px solid var(--green-color)',
        '&:hover': {
          backgroundColor: 'var(--green-light-color)',
          borderColor: 'var(--green-color)',
          transition: '0.3 ease in out'
        },
        padding: '5px 10px',
        fontSize: '12px'
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export const ConfirmButton = (props: ButtonProps) => {
  const { text, onClick } = props

  return (
    <>
      <Button
        variant='outlined'
        startIcon={<DoneRoundedIcon />}
        onClick={onClick}
        sx={{
          color: 'var(--primary-color)',
          border: '0.5px solid var(--primary-color)',
          '&:hover': {
            backgroundColor: 'var(--primary-light-color)',
            borderColor: 'var(--primary-color)',
            transition: '0.3 ease in out'
          },
          padding: '5px 10px',
          fontSize: '12px'
        }}
      >
        {text}
      </Button>
    </>
  )
}

export const RejectButton = ({ text, onClick }: ButtonProps) => {
  return (
    <Button
      variant='outlined'
      startIcon={<CloseRoundedIcon />}
      sx={{
        color: 'var(--red-color)',
        border: '0.5px solid var(--red-color)',
        '&:hover': {
          backgroundColor: 'var(--red-light-color)',
          borderColor: 'var(--red-color)',
          transition: '0.3 ease in out'
        },
        padding: '5px 10px',
        fontSize: '12px'
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}
