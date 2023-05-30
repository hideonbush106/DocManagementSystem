import Icon from '@mui/icons-material/SettingsOutlined'
import {
  SvgIconComponent,
  GridViewOutlined,
  DescriptionOutlined,
  TaskAltOutlined,
  GradingOutlined,
  SignalCellularAltOutlined,
  SettingsOutlined
} from '@mui/icons-material'

export const Options = [
  { id: 1, text: 'Dashboard', link: 'dashboard', icon: GridViewOutlined },
  { id: 2, text: 'Documents', link: 'document', icon: DescriptionOutlined },
  { id: 3, text: 'Pending Approvals', link: 'pending-approval', icon: TaskAltOutlined },
  { id: 4, text: 'Requests', link: 'request', icon: GradingOutlined },
  { id: 5, text: 'Statistic', link: 'statistic', icon: SignalCellularAltOutlined },
  { id: 6, text: 'Advanced', link: 'advanced', icon: SettingsOutlined }
]
