import React from 'react'
import { MenuMobile, Wrapper, SideBarWrapper, Logo } from './Sidebar.styled'
import { useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuIcon from '@mui/icons-material/Menu'
import OptionList from './OptionList'

interface SidebarProp {
  mainContainerRef: React.RefObject<HTMLDivElement>
}

const Sidebar: React.FC<SidebarProp> = ({ mainContainerRef }) => {
  const navigate = useNavigate()

  //set togle on or off in mobile view, default off
  const [toggle, setToggle] = React.useState(false)

  //onclick event for mobile view
  const toggleDrawer = (open: boolean) => (event: React.MouseEvent) => {
    if (event.type === 'keydown') {
      return
    }
    setToggle(open)
  }

  //menu for mobile view
  const menu = () => (
    <MenuMobile onClick={toggleDrawer(false)}>
      <OptionList prop={mainContainerRef} />
    </MenuMobile>
  )

  return (
    <Wrapper>
      <SideBarWrapper mobile>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Logo src='/assets/DMS.png' alt='logo' onClick={() => navigate('/dashboard')} />
        <Drawer anchor={'left'} open={toggle} onClose={toggleDrawer(false)}>
          {menu()}
        </Drawer>
      </SideBarWrapper>
      <SideBarWrapper desktop>
        <OptionList prop={mainContainerRef} />
      </SideBarWrapper>
    </Wrapper>
  )
}

export default Sidebar
