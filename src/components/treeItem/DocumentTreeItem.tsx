import React from 'react'
import TreeItem from '@mui/lab/TreeItem'
import { SvgIconComponent } from '@mui/icons-material'

interface Props {
  nodeId: string
  label: string
  children?: JSX.Element | React.ReactNode
  icon: SvgIconComponent
}

const DocumentTreeItem = (props: Props) => {
  return (
    <TreeItem
      nodeId={props.nodeId}
      label={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {React.createElement(props.icon)} {props.label}
        </div>
      }
    >
      {props.children}
    </TreeItem>
  )
}

export default DocumentTreeItem
