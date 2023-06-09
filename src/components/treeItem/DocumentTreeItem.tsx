import React from 'react'
import TreeItem from '@mui/lab/TreeItem'
import { SvgIconComponent } from '@mui/icons-material'
import useData from '~/hooks/useData'
import { Skeleton } from '@mui/material'

interface Props {
  nodeId: string
  label: string
  children?: JSX.Element | React.ReactNode
  icon: SvgIconComponent
}

const DocumentTreeItem = (props: Props) => {
  const { loading } = useData()

  return (
    <TreeItem
      nodeId={props.nodeId}
      label={
        loading ? (
          <div style={{ display: 'flex', alignItems: 'center', padding: '0.5rem 0' }}>
            {React.createElement(props.icon)} <p style={{ marginLeft: '0.25rem' }}>{props.label}</p>
          </div>
        ) : (
          <Skeleton animation='wave' variant='text' width='12rem' height='3rem' />
        )
      }
    >
      {props.children}
    </TreeItem>
  )
}

export default DocumentTreeItem
