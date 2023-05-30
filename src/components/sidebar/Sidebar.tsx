import { Avatar, Heading, Image, Menu, Option, Text, Wrapper } from './Sidebar.styled'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined'
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'

const Sidebar = () => {
  return (
    <Wrapper>
      <Avatar>
        <Image></Image>
        <Heading>Le Do Duc Anh</Heading>
        <p>Staff</p>
      </Avatar>
      <Menu>
        <Option>
          <GridViewOutlinedIcon sx={{ color: 'var(--grey-color)' }} />
          <Text>Dashboard</Text>
        </Option>
        <Option>
          <DescriptionOutlinedIcon sx={{ color: 'var(--grey-color)' }} />
          <Text>Documents</Text>
        </Option>
        <Option>
          <TaskAltOutlinedIcon sx={{ color: 'var(--grey-color)' }} />
          <Text>Pending Approvals</Text>
        </Option>
        <Option>
          <GradingOutlinedIcon sx={{ color: 'var(--grey-color)' }} />
          <Text>Requests</Text>
        </Option>
        <Option>
          <SignalCellularAltOutlinedIcon sx={{ color: 'var(--grey-color)' }} />
          <Text>Statistic</Text>
        </Option>
        <Option>
          <SettingsOutlinedIcon sx={{ color: 'var(--grey-color)' }} />
          <Text>Advanced</Text>
        </Option>
      </Menu>
    </Wrapper>
  )
}

export default Sidebar
