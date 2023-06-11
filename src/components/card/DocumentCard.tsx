import { SvgIconComponent } from '@mui/icons-material'
import { Paper } from '@mui/material'

type Props = {
  icon: SvgIconComponent
  name: string
}

const DocumentCard = (props: Props) => {
  const { icon: Icon, name } = props
  return (
    <Paper elevation={0} sx={{ display: 'flex', padding: '14px', borderRadius: '10px', alignItems: 'center' }}>
      <Icon sx={{ marginRight: '14px' }} />
      {name}
    </Paper>
  )
}

export default DocumentCard
