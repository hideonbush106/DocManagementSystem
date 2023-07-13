import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab, { TabProps } from '@mui/material/Tab'
import { SvgIconComponent } from '@mui/icons-material'
import { useMediaQuery, useTheme } from '@mui/material'
// import Notification from '../notification/Notification'

interface LinkTabProps extends TabProps {
  label?: string
  to?: string
  iconprop?: SvgIconComponent
}

function LinkTab(props: LinkTabProps) {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Tab
        component='div'
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          event.preventDefault()
        }}
        icon={props.iconprop ? React.createElement(props.iconprop) : ''}
        iconPosition='start'
        sx={{
          fontWeight: 'bold',
          backgroundColor: 'var(--background-dark-color)',
          borderRadius: '10px 10px 0 0',
          padding: md ? '0' : '0 15px',
          minWidth: 'fit-content',
          maxWidth: '90px',
          lineHeight: 1,
          fontFamily: 'inherit',
          flex: 1
        }}
        {...props}
      />
    </>
  )
}

interface NavTabsProps {
  tabs: { label: string; component: React.ReactNode; icon?: SvgIconComponent }[]
}

const NavTabs = ({ tabs }: NavTabsProps) => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.down('md'))

  const [value, setValue] = React.useState(0)

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const renderTabContent = () => {
    if (tabs[value] && tabs[value].component) {
      return tabs[value].component
    }
    return null
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='nav tabs'
          sx={{
            '.MuiTab-root': {
              minHeight: '45px'
            },
            '.MuiTab-root.Mui-selected': {
              backgroundColor: 'var(--white-color)'
            },
            margin: '10px 0 0'
          }}
        >
          {tabs.map((tab, index) => (
            <LinkTab key={index} label={!md ? tab.label : ''} iconprop={tab.icon} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ width: '100%' }}>{renderTabContent()}</Box>
    </>
  )
}

export default NavTabs
