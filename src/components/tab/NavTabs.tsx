import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab, { TabProps } from '@mui/material/Tab'
// import Notification from '../notification/Notification'

interface LinkTabProps extends TabProps {
  label?: string
  to?: string
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component='div'
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault()
      }}
      sx={{
        fontWeight: 'bold',
        backgroundColor: 'var(--background-dark-color)',
        borderRadius: '10px 10px 0 0',
        padding: '0 15px',
        margin: '10px 0',
        letterSpacing: '1px'
      }}
      {...props}
    />
  )
}

interface NavTabsProps {
  tabs: { label: string; component: React.ReactNode }[]
}

const NavTabs = ({ tabs }: NavTabsProps) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    console.log(event)
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
              minHeight: '30px'
            },
            '.MuiTab-root.Mui-selected': {
              backgroundColor: 'var(--white-color)'
            },
            margin: '10px 0 20px'
          }}
        >
          {tabs.map((tab, index) => (
            <LinkTab key={index} label={tab.label} />
          ))}
        </Tabs>
        {renderTabContent()}
      </Box>
    </>
  )
}

export default NavTabs
