import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useNavigate, useLocation } from 'react-router-dom'
import { SvgIconComponent } from '@mui/icons-material'
import { useMediaQuery, useTheme } from '@mui/material'

interface LinkTabProps {
  href?: string
  label?: string
  to?: string
  iconprop?: SvgIconComponent
}

function LinkTab(props: LinkTabProps) {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Tab
      component='a'
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
  )
}

interface NavTabsProps {
  tabs: { label: string; href: string; icon?: SvgIconComponent }[]
}

export default function RequestTab({ tabs }: NavTabsProps) {
  const [value, setValue] = React.useState(0)
  const navigate = useNavigate()
  const location = useLocation() // Get the current route location
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.down('md'))

  React.useEffect(() => {
    // Find the index of the active route in the tabs array based on the pathname
    const activeIndex = tabs.findIndex((tab) => tab.href === location.pathname)
    if (activeIndex !== -1) {
      setValue(activeIndex) // Update the active tab index
    }
  }, [location.pathname, tabs])

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    navigate(tabs[newValue].href) // Update the route based on the selected tab
  }

  return (
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
          <LinkTab key={index} label={!md ? tab.label : ''} iconprop={tab.icon} href={tab.href} />
        ))}
      </Tabs>
    </Box>
  )
}
