import { styled as mstyled, Modal, Box, Typography, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import Barcode from 'react-barcode'
import styled from 'styled-components'
import useDocumentApi from '~/hooks/api/useDocumentApi'

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
  const [valueBarcode, setValueBarcode] = useState('')
  const { getDocumentBarcode } = useDocumentApi()
  const [loading, setLoading] = useState(true)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'var(--primary-color)'
      case 'REJECTED':
        return 'var(--red-color)'
      case 'APPROVED':
        return 'var(--green-color)'
      default:
        return 'inherit'
    }
  }
  const handleViewPdf = () => {
    window.open(selectedRequest.document.storageUrl)
  }

  const getValueBarcode = useCallback(async () => {
    if (selectedRequest) {
      try {
        const response = await getDocumentBarcode(selectedRequest.document.id)
        if (response && response.data.barcode) {
          setValueBarcode(response.data.barcode)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }, [getDocumentBarcode, selectedRequest])

  useEffect(() => {
    getValueBarcode()
  }, [getValueBarcode, selectedRequest, loading])

  return (
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
              <span style={{ color: getStatusColor(selectedRequest.status) }}>{selectedRequest.status}</span>
            </Text>
            {selectedRequest.status === 'APPROVED' && (
              <>
                {loading ? (
                  <LoadingButton
                    variant='text'
                    loading={loading}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: {
                        xs: 'auto',
                        md: '40vw',
                        lg: '28vw'
                      },
                      height: 'fit-content'
                    }}
                  />
                ) : (
                  <Barcode value={valueBarcode} />
                )}
              </>
            )}
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
              {selectedRequest.document.storageUrl && (
                <Button variant='contained' onClick={handleViewPdf}>
                  View PDF
                </Button>
              )}
            </Box>
          </div>
        )}
      </Box>
    </Modal>
  )
}

export default DetailRequestModal
