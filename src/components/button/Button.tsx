/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import ModalLayout from '../modal/ModalLayout'
import ImportDocument from '../modal/ImportDocument'
import { useState } from 'react'

interface ButtonProps {
  text: string
}

export const ImportButton = ({ text }: ButtonProps) => {
  const [open, setOpen] = useState(false)

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
