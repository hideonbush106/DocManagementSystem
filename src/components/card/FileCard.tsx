import DocumentCard from './DocumentCard'
import { SvgIconComponent } from '@mui/icons-material'
import ActionsCell from '../table/ActionCell'

type Props = {
  icon: {
    Component: SvgIconComponent
    color?: string
  }
  name: string
}

const actions = [
  {
    text: 'Details',
    onClick: () => {
      return
    }
  },
  {
    text: 'Edit',
    onClick: () => {
      return
    }
  },
  {
    text: 'Delete',
    onClick: () => {
      return
    }
  }
]

const FileCard = (props: Props) => {
  const { icon, name } = props
  return (
    <DocumentCard icon={icon} name={name}>
      <div style={{ marginLeft: 'auto', marginRight: '-18px' }}>
        <ActionsCell menuItems={actions} />
      </div>
    </DocumentCard>
  )
}

export default FileCard
