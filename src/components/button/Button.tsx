import { Button } from '@mui/material'
import { ReactNode } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';

interface ButtonProps {
  children: ReactNode
}
export const ImportButton = ({ children }: ButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: 'var(--primary-color)',
        width: '155px',
        height: '35px',
        textTransform: 'capitalize',
        fontSize: '14px',
        padding: '5px',
        '&:hover': {
          backgroundColor: 'var(--primary-dark-color)'
        }
      }}
      variant='contained'
      startIcon={<AddRoundedIcon />}
    >
      {children}
    </Button>
  )
}

export const ReturnButton = ({ children }: ButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: 'var(--green-color)',
        width: '155px',
        height: '35px',
        textTransform: 'capitalize',
        fontSize: '14px',
        padding: '5px',
        '&:hover': {
          backgroundColor: 'var(--green-dark-color)'
        }
      }}
      variant='contained'
      startIcon={<KeyboardReturnRoundedIcon />}
    >
      {children}
    </Button>
  )
}
