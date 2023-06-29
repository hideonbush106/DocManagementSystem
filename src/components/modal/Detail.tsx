import { Box, Button, Modal, Typography } from '@mui/material'
import Barcode from 'react-barcode'
import dayjs from 'dayjs'
import styled from 'styled-components'
import { ArrowForward, Description } from '@mui/icons-material'
import { DocumentDetail } from '~/global/interface'

const TitleText = styled.span`
  font-weight: 600;
  font-family: var(--font-family);
`
const Text = styled(Typography)`
  font-size: 14px;
  margin-bottom: 8px;
  font-family: var(--font-family);
  @media (min-width: 400px) {
    font-size: 1rem;
    margin-bottom: 16px;
  }
`

interface DetailProps {
  document: DocumentDetail | undefined
  barcode: string
  open: boolean
  onClose: () => void
}

const Detail = (props: DetailProps) => {
  const getStatusColor = (status: string | undefined) => {
    if (status) {
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
            <TitleText>File name: </TitleText> {props.document?.name}
          </Text>
          <Text variant='body1'>
            <TitleText>Description: </TitleText> {props.document?.description}
          </Text>
          <Text variant='body1'>
            <TitleText>Number of pages: </TitleText> {props.document?.numOfPage}
          </Text>
          <Text variant='body1'>
            <TitleText>Department: </TitleText>
            {props.document?.folder.locker.room.department.name}
          </Text>
          <Text variant='body1'>
            <TitleText>Category: </TitleText>
            {props.document?.category.name}
          </Text>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }} flexDirection={{ sm: 'row', xs: 'column' }}>
            <Text variant='body1'>
              <TitleText>Room: </TitleText>
              {props.document?.folder.locker.room.name}
            </Text>
            <Text variant='body1'>
              <TitleText>Locker: </TitleText>
              {props.document?.folder.locker.name}
            </Text>
            <Text variant='body1'>
              <TitleText>Folder: </TitleText>
              {props.document?.folder.name}
            </Text>
          </Box>
          <Text variant='body1'>
            <TitleText>Created at: </TitleText> {dayjs(props.document?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </Text>
          <Text variant='body1'>
            <TitleText>Status: </TitleText>{' '}
            <span style={{ color: getStatusColor(props.document?.status), fontWeight: 600 }}>
              {props.document?.status}
            </span>
          </Text>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {props.barcode ? <Barcode value={props.barcode} /> : null}
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
      </Modal>
    </>
  )
}

export default Detail
