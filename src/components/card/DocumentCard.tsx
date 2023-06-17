import { SvgIconComponent } from '@mui/icons-material'
import { Paper } from '@mui/material'

type Props = {
  icon: {
    Component: SvgIconComponent
    color?: string
  }
  name: string
}

const DocumentCard = (props: Props) => {
  const { icon: Icon, name } = props
  return (
    <Paper elevation={0} sx={{ display: 'flex', padding: '14px', borderRadius: '10px', alignItems: 'center' }}>
      <Icon.Component sx={{ marginRight: '14px' }} style={{ color: Icon.color }} />
      {name}
    </Paper>
  )
}

export default DocumentCard
