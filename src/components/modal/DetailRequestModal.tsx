import { styled as mstyled, Modal, Box, Typography, Button } from '@mui/material'
import dayjs from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'
import Detail from './Detail'
import useAuth from '~/hooks/useAuth'
import { QRCodeSVG } from 'qrcode.react'
import { RequestStatus } from '~/global/enum'

const TitleText = styled.span`
  font-weight: 600;
`

const Text = mstyled(Typography)`
  padding: 5px 0;
`
interface RequestModalProps {
  open: boolean
  handleClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedRequest: any
}

const DetailRequestModal = ({ open, handleClose, selectedRequest }: RequestModalProps) => {
  const [detail, setDetail] = useState(false)
  const { user } = useAuth()
  const role = user?.role

  const getStatusColor = (status: string) => {
    switch (status) {
      case RequestStatus.PENDING:
        return 'var(--primary-color)'
      case RequestStatus.REJECTED:
        return 'var(--red-color)'
      case RequestStatus.APPROVED:
        return 'var(--green-color)'
      case RequestStatus.CANCELED:
        return 'var(--black-light-color)'
      case RequestStatus.EXPIRED:
        return 'var(--orange-color)'
      case RequestStatus.DONE:
        return 'var(--primary-dark-color)'
      default:
        return 'var(--primary-dark-color)'
    }
  }

  const handleDetailClose = () => {
    setDetail(false)
  }

  return (
    <>
      {role === 'STAFF' ? (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
          <Box
            sx={{
              borderRadius: '5px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: {
                xs: '100vw',
                sm: '60vw',
                md: '45vw',
                lg: '32vw'
              },
              height: 'fit-content',
              bgcolor: 'background.paper',
              boxShadow: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              border: 'none',
              padding: '30px'
            }}
          >
            {selectedRequest && (
              <div>
                <Typography variant='h5' sx={{ fontWeight: '600', marginBottom: '20px' }}>
                  Request Details
                </Typography>
                <div style={{ maxHeight: '55px', textOverflow: 'ellipsis' }}>
                  <Text>
                    <TitleText>Description: </TitleText> {selectedRequest.description}
                  </Text>
                </div>
                <Text>
                  <TitleText>Created by: </TitleText>
                  {`${selectedRequest.createdBy.firstName} ${selectedRequest.createdBy.lastName}`}
                </Text>
                <Text>
                  <TitleText>Created at: </TitleText>
                  {dayjs(selectedRequest.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                </Text>
                {selectedRequest.borrowDuration && (
                  <Text>
                    <TitleText>Borrow duration: </TitleText> {selectedRequest.borrowDuration}
                  </Text>
                )}
                {selectedRequest.status === 'PENDING' && (
                  <Text>
                    <TitleText>Expired at: </TitleText>
                    {dayjs(selectedRequest.expired_at).format('DD/MM/YYYY HH:mm:ss')}
                  </Text>
                )}
                <Text>
                  <TitleText>Updated at: </TitleText>
                  {dayjs(selectedRequest.updatedAt).format('DD/MM/YYYY HH:mm:ss')}
                </Text>
                {selectedRequest.status === 'REJECTED' && (
                  <Text>
                    <TitleText>Reason: </TitleText>
                    {selectedRequest.rejectedReason}
                  </Text>
                )}
                <Text>
                  <TitleText>Status: </TitleText>
                  <span style={{ color: getStatusColor(selectedRequest.status), fontWeight: 600 }}>
                    {selectedRequest.status}
                  </span>
                </Text>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: {
                      xs: 'auto',
                      sm: '50vw',
                      md: '40vw',
                      lg: '28vw'
                    },
                    margin: '20px 0 0'
                  }}
                >
                  {selectedRequest.status !== 'REJECTED' && selectedRequest.status !== 'CANCELED' && (
                    <Button
                      variant='contained'
                      onClick={() => {
                        if (selectedRequest.document) setDetail(true)
                      }}
                      sx={{ fontFamily: 'inherit' }}
                    >
                      Document Detail
                    </Button>
                  )}
                </Box>
                <Detail
                  document={selectedRequest.document}
                  barcode={selectedRequest.barcode}
                  open={detail}
                  onClose={handleDetailClose}
                />
              </div>
            )}
          </Box>
        </Modal>
      ) : (
        <Modal open={open} onClose={handleClose} closeAfterTransition>
          <Box
            sx={{
              borderRadius: '5px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: {
                xs: '100vw',
                sm: '60vw',
                md: '45vw',
                lg: '32vw'
              },
              height: 'fit-content',
              bgcolor: 'background.paper',
              boxShadow: 24,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              border: 'none',
              padding: '30px'
            }}
          >
            {selectedRequest && (
              <div>
                <Typography variant='h5' sx={{ fontWeight: '600', marginBottom: '20px' }}>
                  Request Details
                </Typography>
                <div style={{ maxHeight: '55px', textOverflow: 'ellipsis' }}>
                  <Text>
                    <TitleText>Description: </TitleText> {selectedRequest.description}
                  </Text>
                </div>

                <Text>
                  <TitleText>Created at: </TitleText>
                  {dayjs(selectedRequest.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                </Text>
                {selectedRequest.borrowDuration && (
                  <Text>
                    <TitleText>Borrow duration: </TitleText> {selectedRequest.borrowDuration}
                  </Text>
                )}
                {selectedRequest.status === 'PENDING' && (
                  <Text>
                    <TitleText>Expired at: </TitleText>
                    {dayjs(selectedRequest.expired_at).format('DD/MM/YYYY HH:mm:ss')}
                  </Text>
                )}
                <Text>
                  <TitleText>Updated at: </TitleText>
                  {dayjs(selectedRequest.updatedAt).format('DD/MM/YYYY HH:mm:ss')}
                </Text>
                {selectedRequest.updatedBy && (
                  <Text>
                    <TitleText>Updated by: </TitleText>
                    {`${selectedRequest.updatedBy.firstName} ${selectedRequest.updatedBy.lastName}`}
                  </Text>
                )}
                {selectedRequest.status === 'REJECTED' && (
                  <Text>
                    <TitleText>Reason: </TitleText>
                    {selectedRequest.rejectedReason}
                  </Text>
                )}
                <Text>
                  <TitleText>Status: </TitleText>
                  <span style={{ color: getStatusColor(selectedRequest.status), fontWeight: 600 }}>
                    {selectedRequest.status}
                  </span>
                </Text>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: {
                      xs: 'auto',
                      sm: '50vw',
                      md: '40vw',
                      lg: '28vw'
                    },
                    margin: '20px 0 0'
                  }}
                >
                  {selectedRequest.qrcode && <QRCodeSVG value={selectedRequest.qrcode} />}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: {
                      xs: 'auto',
                      sm: '50vw',
                      md: '40vw',
                      lg: '28vw'
                    },
                    margin: '20px 0 0'
                  }}
                >
                  {selectedRequest.status !== 'REJECTED' && selectedRequest.status !== 'CANCELED' && (
                    <Button
                      variant='contained'
                      onClick={() => {
                        if (selectedRequest.document) setDetail(true)
                      }}
                      sx={{ fontFamily: 'inherit' }}
                    >
                      Document Detail
                    </Button>
                  )}
                </Box>
                <Detail
                  document={selectedRequest.document}
                  barcode={selectedRequest.barcode}
                  open={detail}
                  onClose={handleDetailClose}
                />
              </div>
            )}
          </Box>
        </Modal>
      )}
    </>
  )
}

export default DetailRequestModal
