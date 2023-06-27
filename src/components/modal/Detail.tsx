/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Barcode from 'react-barcode'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import dayjs from 'dayjs'
import styled from 'styled-components'

const TitleText = styled.span`
  font-weight: 600;
`
interface DetailProps {
  id: string
  name: string
  description: string
  status: string
  numOfPages: number
  createdAt: Date
  updatedAt: Date
  folder: {
    name: string
    locker: {
      name: string
      room: {
        name: string
        department: {
          name: string
        }
      }
    }
  }
  category: {
    name: string
  }
}

interface id {
  id: string
}

const Detail = (props: id) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { getDocument, getDocumentBarcode } = useDocumentApi()
  const [document, setDocument] = React.useState<DetailProps>()
  const [barcode, setBarcode] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(true)

  const fetchData = async (id: string) => {
    await getDocument(id).then((result) => {
      setDocument(result.data)
    })
    await getDocumentBarcode(id).then((result) => {
      setBarcode(result.data.barcode)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData(props.id)
  }, [])

  const style = {
    fontFamily: 'Poppins',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(100%, 650px)',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    py: 6,
    px: 6,
    color: 'var(--black-color)',
    '& .MuiTypography-root': {
      mb: 2,
      fontFamily: 'inherit'
    }
  }

  return (
    <>
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Detail
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {!loading ? (
            <>
              <Typography variant='h5' sx={{ fontWeight: '600' }}>
                {document?.name}
              </Typography>
              <Typography variant='body1'>
                <TitleText>Description: </TitleText> {document?.description}{' '}
              </Typography>
              <Typography variant='body1'>
                <TitleText>Department: </TitleText>
                {document?.folder.locker.room.department.name}{' '}
              </Typography>
              <Typography variant='body1'>
                <TitleText>Category: </TitleText>
                {document?.category.name}
              </Typography>
              <Box style={{ display: 'flex' }}>
                <Typography variant='body1' mr={3} fontWeight={'bold'}>
                  Location:
                </Typography>
                <Box>
                  <Typography variant='body1'>
                    <TitleText>Room: </TitleText>
                    {document?.folder.locker.room.name}
                  </Typography>
                  <Typography variant='body1'>
                    <TitleText>Locker: </TitleText>
                    {document?.folder.locker.name}
                  </Typography>
                  <Typography variant='body1'>
                    <TitleText>Folder: </TitleText>
                    {document?.folder.name}
                  </Typography>
                </Box>
              </Box>
              <Typography variant='body1'>
                <TitleText>Created at: </TitleText> {dayjs(document?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
              </Typography>
              <Typography variant='body1'>
                <TitleText>Status: </TitleText>{' '}
                <span style={{ color: 'var(--green-color)', fontWeight: 600 }}> {document?.status}</span>
              </Typography>
              <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Barcode value={barcode} />
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                width={'100%'}
                height={'100%'}
              >
                <CircularProgress />
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default Detail
