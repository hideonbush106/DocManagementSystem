/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Barcode from 'react-barcode'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { ArrowForward } from '@mui/icons-material'

const TitleText = styled.span`
  font-weight: 600;
`
const Text = styled(Typography)`
  font-size: 0.8rem;
  @media (min-width: 600px) {
    font-size: 1rem;
  }
`

interface DetailsInterface {
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

interface DetailProps {
  id: string
}

const Detail = (props: DetailProps) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { getDocument, getDocumentBarcode } = useDocumentApi()
  const [document, setDocument] = React.useState<DetailsInterface>()
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
    fontFamily: 'var(--font-family)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(100%, 600px)',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    py: { xs: 3, sm: 6 },
    px: { xs: 3, sm: 6 },
    color: 'var(--black-color)',
    '.MuiTypography-root': {
      mb: { xs: 1, sm: 2 },
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
              <Text variant='body1'>
                <TitleText>Description: </TitleText> {document?.description}{' '}
              </Text>
              <Text variant='body1'>
                <TitleText>Department: </TitleText>
                {document?.folder.locker.room.department.name}{' '}
              </Text>
              <Text variant='body1'>
                <TitleText>Category: </TitleText>
                {document?.category.name}
              </Text>
              <Box
                style={{ display: 'flex', justifyContent: 'space-between' }}
                flexDirection={{ sm: 'row', xs: 'column' }}
              >
                <Text variant='body1'>
                  <TitleText>Room: </TitleText>
                  {document?.folder.locker.room.name}
                </Text>
                <Text variant='body1'>
                  <TitleText>Locker: </TitleText>
                  {document?.folder.locker.name}
                </Text>
                <Text variant='body1'>
                  <TitleText>Folder: </TitleText>
                  {document?.folder.name}
                </Text>
              </Box>
              <Text variant='body1'>
                <TitleText>Created at: </TitleText> {dayjs(document?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
              </Text>
              <Text variant='body1'>
                <TitleText>Status: </TitleText>{' '}
                <span style={{ color: 'var(--green-color)', fontWeight: 600 }}> {document?.status}</span>
              </Text>
              <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Barcode value={barcode} height={100} />
                <Box
                  style={{ width: '90%', height: '35px', display: 'flex', justifyContent: 'space-between' }}
                  marginTop={{ sm: '1rem' }}
                >
                  <Button size='small' variant='contained'>
                    View PDF
                  </Button>
                  <Button size='small' variant='outlined' endIcon={<ArrowForward />}>
                    Export
                  </Button>
                </Box>
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
