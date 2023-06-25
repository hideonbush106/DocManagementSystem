/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ModalLayout from '../modal/ModalLayout'
import ImportDocument from '../modal/ImportDocument'
import { useState } from 'react'
import UpdateDepartmentModal from '../modal/advanced/UpdateDepartment'
import { UpdateDepartment } from '~/global/interface'
import DeleteDepartmentModal from '../modal/advanced/DeleteDepartment'
interface ButtonProps {
  text: string
  id?: string
  name?: string
  onSubmit?: (values: UpdateDepartment) => void
  onClick?: () => void
  handleDelete?: (id: string) => void
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
      size='medium'
      mobileStyle={{
        backgroundColor: 'var(--primary-color)',
        '&:hover': {
          backgroundColor: 'var(--primary-dark-color)'
        }
      }}
      startIcon={<AddRoundedIcon />}
    >
      <ImportDocument handleClose={handleClose} />
    </ModalLayout>
  )
}

export const ReturnButton = ({ text }: ButtonProps) => {
  const [_open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <ModalLayout
      overflow='scroll'
      style={{
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
      button={text}
      variant='contained'
      size='medium'
      mobileStyle={{
        backgroundColor: 'var(--green-color)',
        '&:hover': {
          backgroundColor: 'var(--green-dark-color)'
        }
      }}
      //!! Temporary modal, fix later
      startIcon={<KeyboardReturnRoundedIcon />}
    >
      <ImportDocument handleClose={handleClose} />
    </ModalLayout>
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

//advanced button
export const UpdateButton = ({ text, id, name, onSubmit }: ButtonProps) => {
  return (
    <ModalLayout
      variant='outlined'
      startIcon={<EditRoundedIcon />}
      style={{
        color: 'var(--primary-color)',
        border: '0.5px solid var(--primary-color)',
        '&:hover': {
          backgroundColor: 'var(--background-dark-color)',
          borderColor: 'var(--primary-color)',
          transition: '0.3 ease in out'
        },
        padding: '5px 10px',
        fontSize: '14px',
        marginRight: '10px',
        fontFamily: 'inherit'
      }}
      button={text}
    >
      <UpdateDepartmentModal id={id} name={name} onSubmit={onSubmit} />
    </ModalLayout>
  )
}

export const DeleteButton = ({ text, id, handleDelete }: ButtonProps) => {
  return (
    <ModalLayout
      variant='outlined'
      startIcon={<CloseRoundedIcon />}
      style={{
        color: 'var(--red-color)',
        border: '0.5px solid var(--red-color)',
        '&:hover': {
          backgroundColor: 'var(--red-light-color)',
          borderColor: 'var(--red-color)',
          transition: '0.3 ease in out'
        },
        padding: '5px 10px',
        fontSize: '14px',
        marginRight: '10px',
        fontFamily: 'inherit'
      }}
      button={text}
    >
      <DeleteDepartmentModal id={id} handleDelete={handleDelete} />
    </ModalLayout>
  )
}
