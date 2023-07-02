// react
import React from 'react'
// MUI
import { Grid, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
// coponents
import BasicLayout from './BasicLayout'
import { ImportButton, ReturnButton } from '../button/Button.tsx'
import ImportDocumentModal from '../modal/ImportDocumentModal'
import SpeedDialCustom from '../speed-dial/SpeedDial.tsx'
// styles
import { IconDiv } from './MainLayout.styled.ts'

type Props = {
  children: React.ReactNode
  title?: string
}

const MainLayout = (props: Props) => {
  const [speedDialOpen, setSpeedDialOpen] = React.useState(false)
  const [importDocumentModalOpen, setImportDocumentModalOpen] = React.useState(false)
  const theme = useTheme()
  const belowLg = useMediaQuery(theme.breakpoints.down('lg'))
  const belowMd = useMediaQuery(theme.breakpoints.down('md'))
  const { children, title } = props

  const handleImportDocumentModalOpen = () => {
    setImportDocumentModalOpen(true)
  }

  const handleImportDocumentModalClose = () => {
    setImportDocumentModalOpen(false)
  }

  const items = [
    {
      icon: <img src='/assets/department.svg' alt='department' />,
      iconBackground: 'blue',
      title: 'Departments',
      content: '5 Departments'
    },
    {
      icon: <img src='/assets/user.svg' alt='member' />,
      iconBackground: 'purple',
      title: 'Members',
      content: '5 Members'
    },
    {
      icon: <img src='/assets/folder.svg' alt='document' />,
      iconBackground: 'green',
      title: 'Documents',
      content: '10000 Files'
    }
  ]

  const actions = [
    {
      name: 'New Document',
      icon: <AddRoundedIcon />,
      action: handleImportDocumentModalOpen,
      style: {
        backgroundColor: 'var(--primary-color)',
        color: 'var(--white-color)',
        '&:hover': {
          backgroundColor: 'var(--primary-dark-color)'
        }
      }
    },
    {
      name: 'Return Document',
      icon: <KeyboardReturnRoundedIcon />,
      action: handleImportDocumentModalOpen,
      style: {
        backgroundColor: 'var(--green-color)',
        color: 'var(--white-color)',
        '&:hover': {
          backgroundColor: 'var(--green-dark-color)'
        }
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
        <Grid container alignItems='center' justifyContent='space-between' marginY='10px' paddingX='8px'>
          <Grid item container md={12} lg={7.45}>
            {items.map((item, index) => (
              <>
                <Grid
                  item
                  container
                  md={3.9}
                  lg={3.7}
                  key={index}
                  alignItems='center'
                  justifyContent={belowLg ? 'center' : 'flex-start'}
                >
                  <Grid item mr='8px'>
                    {item.iconBackground === 'blue' ? (
                      <IconDiv blue>{item.icon}</IconDiv>
                    ) : item.iconBackground === 'purple' ? (
                      <IconDiv purple>{item.icon}</IconDiv>
                    ) : (
                      <IconDiv green>{item.icon}</IconDiv>
                    )}
                  </Grid>
                  <Grid
                    item
                    container
                    direction='column'
                    lg
                    justifyContent='space-between'
                    alignItems={belowLg ? 'center' : 'start'}
                  >
                    <Typography fontFamily='inherit' fontSize='15px' color='var(--gray-color)'>
                      {item.title}
                    </Typography>
                    <Typography fontFamily='inherit' fontSize='15px' color='var(--black-color)'>
                      {item.content}
                    </Typography>
                  </Grid>
                </Grid>
                {index <= items.length - 2 && (
                  <Grid md={0.1} lg={0.3} style={{ borderLeft: '1px solid var(--gray-color)' }}></Grid>
                )}
              </>
            ))}
          </Grid>
          {!belowLg && (
            <Grid item container lg={4.55} spacing={1} justifyContent='flex-end'>
              <Grid item>
                <ImportButton text='New Document' />
              </Grid>
              <Grid item>
                <ReturnButton text='Return Document' />
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
      {/* render when screen below large */}
      <SpeedDialCustom actions={actions} open={speedDialOpen} onClick={handleSpeedDial} hidden={!belowLg} />
      {/* Modals */}
      <ImportDocumentModal open={importDocumentModalOpen} handleClose={handleImportDocumentModalClose} />
      {children}
    </BasicLayout>
  )
}

export default MainLayout
