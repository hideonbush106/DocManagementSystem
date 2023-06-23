import React from 'react'
import BasicLayout from './BasicLayout'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import { ImportButton, ReturnButton } from '../button/Button.tsx'
import ImportDocumentModal from '../modal/ImportDocumentModal'
import SpeedDialCustom from '../SpeedDial/SpeedDial.tsx'
import { Grid } from '@mui/material'

type Props = {
  children: React.ReactNode
  title?: string
}

const MainLayout = (props: Props) => {
  const [speedDialOpen, setSpeedDialOpen] = React.useState(false)
  const [importDocumentModalOpen, setImportDocumentModalOpen] = React.useState(false)
  const theme = useTheme()
  const belowMd = useMediaQuery(theme.breakpoints.down('md'))
  const { children, title } = props

  const handleImportDocumentModalOpen = () => {
    setImportDocumentModalOpen(true)
  }

  const handleImportDocumentModalClose = () => {
    setImportDocumentModalOpen(false)
  }

  const actions = [
    {
      name: 'New Document',
      icon: <AddRoundedIcon />,
      action: handleImportDocumentModalOpen,
      style: {
        backgroundColor: 'var(--primary-color)',
        color: 'var(--white-color)'
      }
    },
    {
      name: 'Return Document',
      icon: <KeyboardReturnRoundedIcon />,
      action: handleImportDocumentModalOpen,
      style: {
        backgroundColor: 'var(--green-color)',
        color: 'var(--white-color)'
      }
    }
  ]

  const handleSpeedDial = () => {
    setSpeedDialOpen((prev) => !prev)
  }

  return (
    <BasicLayout title={title}>
      {/* render when screen above medium */}
      {!belowMd && (
        <Grid container spacing={2} justifyContent='space-between' mb='10px'>
          <Grid item xs={6}>
            <p>data</p>
          </Grid>
          <Grid item container xs={5} spacing={2} justifyContent='flex-end'>
            <Grid item>
              <ImportButton text='New Document' />
            </Grid>
            <Grid item>
              <ReturnButton text='Return Document' />
            </Grid>
          </Grid>
        </Grid>
      )}
      {/* render when screen below medium */}
      <SpeedDialCustom actions={actions} open={speedDialOpen} onClick={handleSpeedDial} hidden={!belowMd} />
      {/* Modals */}
      <ImportDocumentModal open={importDocumentModalOpen} handleClose={handleImportDocumentModalClose} />
      {children}
    </BasicLayout>
  )
}

export default MainLayout
