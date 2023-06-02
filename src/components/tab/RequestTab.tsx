import * as React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab, { TabProps } from '@mui/material/Tab'
import ImportRequest from '~/pages/requests/importRequest/ImportRequest'
import BorrowRequest from '~/pages/requests/borrowRequest/BorrowRequest'

interface LinkTabProps extends TabProps {
  label?: string
  to?: string
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component='a'
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const renderTabContent = () => {
    switch (value) {
      case 0:
        return <ImportRequest />
      case 1:
        return <BorrowRequest />
      default:
        return null
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label='nav tabs example'>
        <LinkTab label='Import Request' />
        <LinkTab label='Borrow Request' />
      </Tabs>
      {renderTabContent()}
    </Box>
  )
}
