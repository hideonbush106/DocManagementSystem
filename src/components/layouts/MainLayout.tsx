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
import { ImportButton, ImportRequestButton, ReturnButton } from '../button/Button.tsx'
import ImportDocumentModal from '../modal/ImportDocumentModal'
import SpeedDialCustom from '../speed-dial/SpeedDial.tsx'
import useAuth from '~/hooks/useAuth.tsx'
// custom hooks
import useDepartmentApi from '~/hooks/api/useDepartmentApi.tsx'
import useUserApi from '~/hooks/api/useUserApi.tsx'
import useDocumentApi from '~/hooks/api/useDocumentApi.tsx'
// styles
import { IconDiv } from './MainLayout.styled.ts'
import ImportRequestModal from '../modal/ImportRequestModal.tsx'

type Props = {
  children: React.ReactNode
  title?: string
}

const MainLayout = (props: Props) => {
  const [departmentCount, setDepartmentCount] = React.useState()
  const [userCount, setUserCount] = React.useState()
  const [documentCount, setDocumentCount] = React.useState()
  const [speedDialOpen, setSpeedDialOpen] = React.useState(false)
  const [importDocumentModalOpen, setImportDocumentModalOpen] = React.useState(false)
  const [isImportRequestModalOpen, setIsImportRequestModalOpen] = React.useState(false)
  const theme = useTheme()
  const { getDepartmentCount } = useDepartmentApi()
  const { getUserCount } = useUserApi()
  const { getDocumentCount } = useDocumentApi()
  const belowLg = useMediaQuery(theme.breakpoints.down('lg'))
  const belowMd = useMediaQuery(theme.breakpoints.down('md'))
  const { children, title } = props
  const user = useAuth()
  const role = user.user?.role

  React.useEffect(() => {
    const getData = async () => {
      const getDataApis = [getDepartmentCount(), getUserCount(), getDocumentCount()]
      const data = await Promise.all(getDataApis)
      setDepartmentCount(data[0].data)
      setUserCount(data[1].data)
      setDocumentCount(data[2].data)
    }
    getData()
  }, [getDepartmentCount, getDocumentCount, getUserCount])

  const handleImportDocumentModalOpen = () => {
    setImportDocumentModalOpen(true)
  }

  const handleImportDocumentModalClose = () => {
    setImportDocumentModalOpen(false)
  }

  const handleImportReqquestModalOpen = () => {
    setIsImportRequestModalOpen(true)
  }

  const handleImportReqquestModalClose = () => {
    setIsImportRequestModalOpen(false)
  }
  const items = [
    {
      icon: <img src='/assets/department.svg' alt='department' />,
      iconBackground: 'blue',
      title: 'Departments',
      content: `${departmentCount ? departmentCount : ''} Departments`
    },
    {
      icon: <img src='/assets/user.svg' alt='member' />,
      iconBackground: 'purple',
      title: 'Members',
      content: `${userCount ? userCount : ''} Members`
    },
    {
      icon: <img src='/assets/folder.svg' alt='document' />,
      iconBackground: 'green',
      title: 'Documents',
      content: `${documentCount ? documentCount : ''} Files`
    }
  ]

  const actions =
    role === 'STAFF'
      ? [
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
      : [
          {
            name: 'Import Document',
            icon: <AddRoundedIcon />,
            action: handleImportReqquestModalOpen,
            style: {
              backgroundColor: 'var(--primary-color)',
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
        <Grid container alignItems='center' justifyContent='space-between' marginY='19px' paddingX='8px'>
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

          {!belowLg &&
            (role === 'STAFF' ? (
              <Grid item container lg={4.55} spacing={1} justifyContent='flex-end'>
                <Grid item>
                  <ImportButton text='New Document' />
                </Grid>
                <Grid item>
                  <ReturnButton text='Return Document' />
                </Grid>
              </Grid>
            ) : (
              <Grid item container lg={4.55} spacing={1} justifyContent='flex-end'>
                <Grid item>
                  <ImportRequestButton text='Import Document' />
                </Grid>
              </Grid>
            ))}
        </Grid>
      )}
      {/* render when screen above large */}
      {belowLg && <SpeedDialCustom actions={actions} open={speedDialOpen} onClick={handleSpeedDial} />}
      {/* Modals */}
      <ImportDocumentModal open={importDocumentModalOpen} handleClose={handleImportDocumentModalClose} />
      <ImportRequestModal open={isImportRequestModalOpen} handleClose={handleImportReqquestModalClose} />
      {children}
    </BasicLayout>
  )
}

export default MainLayout
