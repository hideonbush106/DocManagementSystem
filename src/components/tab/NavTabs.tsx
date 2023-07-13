import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab, { TabProps } from '@mui/material/Tab'
import { SvgIconComponent } from '@mui/icons-material'
// import Notification from '../notification/Notification'

interface LinkTabProps extends TabProps {
  label?: string
  to?: string
  iconprop?: SvgIconComponent
}

function LinkTab(props: LinkTabProps) {
  return (
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
        padding: '0 20px',
        lineHeight: 1,
        fontFamily: 'inherit'
      }}
      {...props}
    />
  )
}

interface NavTabsProps {
  tabs: { label: string; component: React.ReactNode; icon?: SvgIconComponent }[]
}

const NavTabs = ({ tabs }: NavTabsProps) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
      <Box sx={{ width: 'fit-content' }}>
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
            <LinkTab key={index} label={tab.label} iconprop={tab.icon} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ width: '100%' }}>{renderTabContent()}</Box>
    </>
  )
}

export default NavTabs
