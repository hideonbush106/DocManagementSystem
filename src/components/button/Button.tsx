/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ModalLayout from '../modal/ModalLayout'
import ImportDocument from '../modal/ImportDocument'
import { useState } from 'react'
interface ButtonProps {
  text: string
  onClick?: () => void
}

export const ImportButton = ({ text }: ButtonProps) => {
  const [_open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <ModalLayout
      overflow='scroll'
      style={{
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
      button={text}
      variant='contained'
      startIcon={<AddRoundedIcon />}
    >
      <ImportDocument handleClose={handleClose} />
    </ModalLayout>
  )
}

export const ReturnButton = ({ text }: ButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: 'var(--green-color)',
        width: { sm: '165px', xs: '125px' },
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
    >
      {text}
    </Button>
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
      startIcon={<DoneRoundedIcon />}
      variant='outlined'
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
