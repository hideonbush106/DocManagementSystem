import { ChangeEvent, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ModalLayout from './ModalLayout'
import { Box, Button, FormControl, MenuItem, TextField, Typography } from '@mui/material'
import { DocumentDetail, PossibleLocation } from '~/global/interface'
import styled from 'styled-components'
import PdfViewer from './PdfViewer'
import useMedia from '~/hooks/api/useMedia'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import { notifySuccess } from '~/global/toastify'

const TitleText = styled.span`
  font-weight: 600;
  font-family: var(--font-family);
`

const validationSchema = yup.object({
  folder: yup
    .object({
      id: yup.string()
    })
    .required()
})

interface Props {
  open: boolean
  handleClose: () => void
  document: DocumentDetail
  onSubmit?: () => void
}

const MoveDocumentModal = ({ open, handleClose, document, onSubmit }: Props) => {
  const [possibleLocation, setPossibleLocation] = useState<PossibleLocation[]>([])
  const [selectedRoom, setSelectedRoom] = useState<PossibleLocation>()
  const [selectedLocker, setSelectedLocker] = useState<{
    id: string
    name: string
    capacity: number
    folders: { id: string; name: string; capacity: number; current: number }[]
  }>()
  const [fileUrl, setFileUrl] = useState<string>('initial')
  const [openPDF, setOpenPDF] = useState<boolean>(false)
  const { getPossibleLocation, moveDocument } = useDocumentApi()
  const { getMedia } = useMedia()
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      folder: {
        id: document.folder.id
      }
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      moveDocument({ id: document.id, folderId: value.folder.id }).then((res) => {
        if (res) {
          notifySuccess('Move document successfully')
        }
        handleClose()
        onSubmit && onSubmit()
      })
    }
  })

  useEffect(() => {
    if (!open) {
      formik.resetForm()
      const currentRoom = possibleLocation.find((el: PossibleLocation) => el.id === document.folder.locker.room.id)
      const currentLocker = currentRoom?.lockers.find((el) => el.id === document.folder.locker.id)
      setSelectedRoom(currentRoom)
      setSelectedLocker(currentLocker)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getPossibleLocation({
          numOfPages: document.numOfPages,
          departmentId: document.folder.locker.room.department.id
        })
        const currentRoom = data.data.find((el: PossibleLocation) => el.id === document.folder.locker.room.id)
        const currentLocker = currentRoom.lockers.find(
          (el: {
            id: string
            name: string
            capacity: number
            folders: { id: string; name: string; capacity: number; current: number }
          }) => el.id === document.folder.locker.id
        )
        setPossibleLocation(data.data)
        setSelectedRoom(currentRoom)
        setSelectedLocker(currentLocker)
      } catch (error) {
        console.log(error)
        setPossibleLocation([])
      }
    }
    if (document) getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPossibleLocation])

  const unchanged = formik.values.folder.id === document.folder?.id

  const handleRoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('folder.id', '')
    setSelectedLocker(undefined)
    const room = possibleLocation.find((location) => location.id === e.target.value)
    setSelectedRoom(room)
  }

  const handleLockerChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('folder.id', '')
    if (selectedRoom) {
      const locker = selectedRoom.lockers.find((locker) => locker.id === e.target.value)
      setSelectedLocker(locker)
    }
  }

  const getFile = async () => {
    setOpenPDF(true)
    try {
      setFileUrl('initial')
      const response = await getMedia(document.id || '')
      const base64toBlob = (data: string) => {
        const bytes = atob(data)
        let length = bytes.length
        const out = new Uint8Array(length)
        while (length--) {
          out[length] = bytes.charCodeAt(length)
        }

        return new Blob([out], { type: 'application/pdf' })
      }
      const blob = base64toBlob(response)
      const url = URL.createObjectURL(blob)
      setFileUrl(url)
    } catch (error) {
      console.log(error)
      setFileUrl('')
    }
  }

  return (
    <ModalLayout open={open} handleClose={handleClose}>
      <Box
        display={'inline-flex'}
        sx={{
          p: {
            xs: 1.5,
            sm: 3
          },
          position: 'sticky',
          top: 0,
          background: 'white',
          zIndex: 1,
          width: '100%',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: 'var(--black-color)',
            fontSize: {
              xs: '1.5rem',
              sm: '2rem'
            }
          }}
          variant='h4'
        >
          Move Document
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} action='POST'>
        <FormControl sx={{ width: '100%', px: 5 }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: 'var(--black-color)',
              my: 1.5,
              fontSize: {
                xs: '1.2rem',
                sm: '1.5rem'
              }
            }}
            variant='h6'
          >
            Document Information
          </Typography>
          <Typography
            sx={{
              color: 'var(--black-color)',
              my: 1.5,
              fontSize: {
                xs: '1rem',
                sm: '1rem'
              }
            }}
            variant='caption'
          >
            <TitleText>Document name: </TitleText>
            {document.name}
          </Typography>
          <Typography
            sx={{
              color: 'var(--black-color)',
              my: 1.5,
              fontSize: {
                xs: '1rem',
                sm: '1rem'
              }
            }}
            variant='caption'
          >
            <TitleText>Description: </TitleText>
            {document.description}
          </Typography>
          <Box display={'flex'} sx={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Typography
              sx={{
                color: 'var(--black-color)',
                my: 1.5,
                fontSize: {
                  xs: '1rem',
                  sm: '1rem'
                }
              }}
              variant='caption'
            >
              <TitleText>Department: </TitleText>
              {document.folder?.locker?.room?.department?.name}
            </Typography>
            <Typography
              sx={{
                color: 'var(--black-color)',
                my: 1.5,
                fontSize: {
                  xs: '1rem',
                  sm: '1rem'
                }
              }}
              variant='caption'
            >
              <TitleText>Category: </TitleText>
              {document.category?.name}
            </Typography>
          </Box>
          <Typography
            sx={{
              color: 'var(--black-color)',
              my: 1.5,
              fontSize: {
                xs: '1rem',
                sm: '1rem'
              }
            }}
            variant='caption'
          >
            <TitleText>Number of pages: </TitleText> {document.numOfPages}
          </Typography>
          <Typography
            sx={{
              fontWeight: 600,
              color: 'var(--black-color)',
              my: 1.5,
              fontSize: {
                xs: '1.2rem',
                sm: '1.5rem'
              }
            }}
            variant='h6'
          >
            Location
          </Typography>
          <Box display={'flex'} sx={{ width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TextField
              value={selectedRoom?.id}
              onChange={handleRoomChange}
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '31%'
                }
              }}
              select
              label='Room'
              variant='standard'
              required
              disabled={possibleLocation.length === 0}
            >
              {possibleLocation.map((room) => (
                <MenuItem key={room.id} value={room.id}>
                  {room.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              value={selectedLocker?.id}
              onChange={handleLockerChange}
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '31%'
                }
              }}
              select
              label='Locker'
              variant='standard'
              required
              disabled={!selectedRoom}
            >
              {selectedRoom?.lockers.map((locker) => (
                <MenuItem key={locker.id} value={locker.id}>
                  {locker.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              value={formik.values.folder.id}
              onChange={formik.handleChange}
              name='folder.id'
              sx={{
                my: 1,
                width: {
                  xs: '100%',
                  sm: '31%'
                }
              }}
              select
              label='Folder'
              variant='standard'
              required
              disabled={!selectedLocker}
            >
              {selectedLocker?.folders.map((folder) => (
                <MenuItem key={folder.id} value={folder.id}>
                  {folder.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box display='flex' alignItems='center' justifyContent='center' height='100px'>
            <Button
              size='small'
              variant='contained'
              onClick={getFile}
              sx={{
                width: '95px',
                height: '40px',
                lineHeight: 1,
                fontFamily: 'var(--family-font)',
                boxShadow: 'none'
              }}
            >
              View PDF
            </Button>
          </Box>
          <PdfViewer fileUrl={fileUrl} open={openPDF} handleClose={() => setOpenPDF(false)} />
        </FormControl>

        <Box
          sx={{
            p: 1.5,
            position: 'sticky',
            bottom: -1,
            zIndex: 1,
            background: 'white',
            display: 'flex',
            justifyContent: 'end',
            width: '100%',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }}
        >
          <Button
            sx={{ my: 1, mr: 1 }}
            variant='contained'
            color='primary'
            type='submit'
            disabled={formik.isValidating || !formik.isValid || unchanged || formik.values.folder.id === ''}
          >
            Submit
          </Button>
          <Button sx={{ my: 1 }} color='error' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </form>
    </ModalLayout>
  )
}

export default MoveDocumentModal
