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
import Scanner from '../modal/Scanner.tsx'
import ReturnConfirmModal from '../modal/ReturnConfirmModal.tsx'

type Props = {
  children: React.ReactNode
  title?: string
}

const MainLayout = (props: Props) => {
  const [departmentCount, setDepartmentCount] = React.useState()
  const [userCount, setUserCount] = React.useState()
  const [documentCount, setDocumentCount] = React.useState()
  const [speedDialOpen, setSpeedDialOpen] = React.useState(false)
  const [scanning, setScanning] = React.useState(false)
  const [importDocumentModalOpen, setImportDocumentModalOpen] = React.useState(false)
  const [isImportRequestModalOpen, setIsImportRequestModalOpen] = React.useState(false)
  const [isReturnDocumentModalOpen, setIsReturnDocumentModalOpen] = React.useState(false)
  const [isReturnConfirmModalOpen, setIsReturnConfirmModalOpen] = React.useState(false)
  const [scanData, setScanData] = React.useState<string | null>(null)
  const [response, setResponse] = React.useState({
    data: '',
    message: ''
  })
  const theme = useTheme()
  const { getDepartmentCount } = useDepartmentApi()
  const { getUserCount } = useUserApi()
  const { getDocumentCount } = useDocumentApi()
  const belowLg = useMediaQuery(theme.breakpoints.down('lg'))
  const belowMd = useMediaQuery(theme.breakpoints.down('md'))
  const { children, title } = props
  const user = useAuth()
  const role = user.user?.role
  const { checkReturnDocument } = useDocumentApi()
  const department = user.user?.department
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

  const handleImportRequestModalOpen = () => {
    setIsImportRequestModalOpen(true)
  }

  const handleImportRequestModalClose = () => {
    setIsImportRequestModalOpen(false)
  }

  const handleReturnDocumentModalOpen = () => {
    setScanning(true)
    setIsReturnDocumentModalOpen(true)
  }

  const handleReturnDocumentModalClose = () => {
    setScanning(false)
    setIsReturnDocumentModalOpen(false)
  }

  const handleReturnConfirmModalOpen = () => {
    setIsReturnConfirmModalOpen(true)
  }

  const handleReturnConfirmModalClose = () => {
    setIsReturnConfirmModalOpen(false)
  }

  const fetchReturn = async (scanData: string | null) => {
    if (scanData && scanData !== '') {
      try {
        const response = await checkReturnDocument(scanData)
        console.log(response)
        setResponse(response)
        setScanData(scanData)
        setScanning(false)
      } catch (error) {
        console.log(error)
      } finally {
        handleReturnDocumentModalClose()
        handleReturnConfirmModalOpen()
        setScanning(false)
      }
    }
  }

  const items = [
    {
      icon: <img src='/assets/department.svg' alt='department' />,
      iconBackground: 'blue',
      title: 'Departments',
      content: role === 'STAFF' ? `${departmentCount ? departmentCount : ''} Departments` : `${department}`
    },
    {
      icon: <img src='/assets/user.svg' alt='member' />,
      iconBackground: 'purple',
      title: 'Members',
      content: `${userCount || userCount === 0 ? userCount : ''} Members`
    },
    {
      icon: <img src='/assets/folder.svg' alt='document' />,
      iconBackground: 'green',
      title: 'Documents',
      content: `${documentCount || documentCount === 0 ? documentCount : ''} Files`
    }
  ]

  const actions =
    role === 'STAFF'
      ? [
          {
            name: 'Import Document',
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
            action: handleReturnDocumentModalOpen,
            style: {
              backgroundColor: 'var(--green-color)',
              color: 'var(--white-color)'
            }
          }
        ]
      : [
          {
            name: 'Import Document',
            icon: <AddRoundedIcon />,
            action: handleImportRequestModalOpen,
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
              <React.Fragment key={index}>
                <Grid
                  item
                  container
                  md={3.9}
                  lg={3.7}
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
                  <Grid item md={0.1} lg={0.3} style={{ borderLeft: '1px solid var(--gray-color)' }}></Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>

          {!belowLg &&
            (role === 'STAFF' ? (
              <Grid item container lg={4.55} spacing={1} justifyContent='flex-end'>
                <Grid item>
                  <ImportButton onClick={handleImportDocumentModalOpen} text='New Document' />
                </Grid>
                <Grid item>
                  <ReturnButton text='Return Document' onClick={handleReturnDocumentModalOpen} />
                </Grid>
              </Grid>
            ) : (
              <Grid item container lg={4.55} spacing={1} justifyContent='flex-end'>
                <Grid item>
                  <ImportRequestButton text='Import Document' onClick={handleImportRequestModalOpen} />
                </Grid>
              </Grid>
            ))}
        </Grid>
      )}
      {/* render when screen above large */}
      {belowLg && <SpeedDialCustom actions={actions} open={speedDialOpen} onClick={handleSpeedDial} />}
      {/* Modals */}
      <ImportDocumentModal open={importDocumentModalOpen} handleClose={handleImportDocumentModalClose} />
      <ImportRequestModal open={isImportRequestModalOpen} handleClose={handleImportRequestModalClose} />
      <Scanner
        scanning={scanning}
        handleScan={fetchReturn}
        open={isReturnDocumentModalOpen}
        handleClose={handleReturnDocumentModalClose}
      />
      <ReturnConfirmModal
        scanData={scanData}
        response={response}
        open={isReturnConfirmModalOpen}
        handleClose={handleReturnConfirmModalClose}
      />
      {children}
    </BasicLayout>
  )
}

export default MainLayout
