import { Box, Button, CircularProgress, Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Barcode from 'react-barcode'
import useDocumentApi from '~/hooks/api/useDocumentApi'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { ArrowForward, Description } from '@mui/icons-material'
import { DocumentStatus } from '~/global/enum'

const TitleText = styled.span`
  font-weight: 600;
  font-family: var(--font-family);
`
const Text = styled(Typography)`
  font-size: 14px;
  margin-bottom: 8px;
  @media (min-width: 400px) {
    font-size: 1rem;
    margin-bottom: 16px;
  }
  font-family: var(--font-family);
`

interface DocumentDetail {
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
  open: boolean
  onClose: () => void
}

const Detail = (props: DetailProps) => {
  const { getDocument, getDocumentBarcode } = useDocumentApi()
  const [document, setDocument] = React.useState<DocumentDetail>()
  const [barcode, setBarcode] = React.useState<string>('')
  const [loading, setLoading] = React.useState<boolean>(true)

  const getStatusColor = (status: string | undefined) => {
    if (status) {
      console.log(status)
      switch (status) {
        case 'REQUESTING':
          return 'var(--orange-color)'
        case 'PENDING':
          return 'var(--primary-color)'
        case 'AVAILABLE':
          return 'var(--green-color)'
        case 'BORROWED':
          return 'var(--red-color)'
        default:
          return 'var(--black-color)'
      }
    }
  }

  const fetchData = async (id: string) => {
    try {
      setBarcode('')
      setDocument(undefined)
      const document = await getDocument(id)
      setDocument(document.data)
      if ([DocumentStatus.PENDING, DocumentStatus.AVAILABLE, DocumentStatus.BORROWED].includes(document.data.status)) {
        const barcode = await getDocumentBarcode(id)
        if (barcode.data.barcode) {
          setBarcode(barcode.data.barcode)
        }
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchData(props.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id])

  const style = {
    fontFamily: 'var(--font-family)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'min(100%, 600px)',
    bgcolor: 'var(--white-color)',
    borderRadius: '5px',
    boxShadow: 24,
    py: { xs: 3, sm: 6 },
    px: { xs: 3, sm: 6 },
    color: 'var(--black-color)'
  }

  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        {!loading ? (
          <Box sx={style}>
            <Box
              display={'inline-flex'}
              alignItems={'center'}
              sx={{
                width: '100%',
                mb: { sm: 4, xs: 2 },
                ml: -1
              }}
            >
              <Description sx={{ color: 'var(--black-color)', mr: 1 }} fontSize='large' />
              <Typography variant='h4' sx={{ fontSize: { sm: '2rem', xs: '1.5rem' }, fontWeight: '600' }}>
                Document Detail
              </Typography>
            </Box>
            <Text variant='body1'>
              <TitleText>File name: </TitleText> {document?.name}
            </Text>
            <Text variant='body1'>
              <TitleText>Description: </TitleText> {document?.description}
            </Text>
            <Text variant='body1'>
              <TitleText>Number of pages: </TitleText> {document?.numOfPages}
            </Text>
            <Text variant='body1'>
              <TitleText>Department: </TitleText>
              {document?.folder.locker.room.department.name}
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
              <span style={{ color: getStatusColor(document?.status), fontWeight: 600 }}>{document?.status}</span>
            </Text>
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {barcode ? <Barcode value={barcode} /> : null}
              <Box
                style={{ width: '90%', height: '35px', display: 'flex', justifyContent: 'space-between' }}
                marginTop={{ sm: '1rem' }}
              >
                <Button size='small' variant='contained' sx={{ lineHeight: 1, fontFamily: 'var(--family-font)' }}>
                  View PDF
                </Button>
                <Button
                  size='small'
                  variant='outlined'
                  endIcon={<ArrowForward />}
                  sx={{ lineHeight: 1, fontFamily: 'var(--family-font)' }}
                >
                  Export
                </Button>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} width={'100%'} height={'100%'}>
            <CircularProgress />
          </Box>
        )}
      </Modal>
    </>
  )
}

export default Detail
