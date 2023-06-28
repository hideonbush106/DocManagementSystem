import React from 'react'
import PropTypes from 'prop-types'
import { SvgIconComponent } from '@mui/icons-material'
import useData from '~/hooks/useData'
import { Box, Skeleton, Typography } from '@mui/material'
import { TreeItemStyledRoot } from './DocumentTreeItem.styled'

interface Props {
  nodeId: string
  labelInfo?: string
  labelText: string
  children?: JSX.Element | React.ReactNode
  labelIcon: SvgIconComponent
  isFull?: boolean
}

const DocumentTreeItem = (props: Props) => {
  const { nodeId, labelIcon: LabelIcon, labelInfo, labelText, children, isFull } = props
  const { loading } = useData()

  return (
    <TreeItemStyledRoot
      nodeId={nodeId}
      label={
        !loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
            <Box component={LabelIcon} color='var(--black-color)' sx={{ mr: 1 }} />
            <Typography variant='body2' sx={{ fontWeight: 'inherit', flexGrow: 1, fontFamily: 'inherit' }}>
              {labelText}
            </Typography>
            <Typography
              variant='caption'
              color={isFull ? 'error' : 'inherit'}
              sx={{ fontFamily: 'inherit', fontWeight: isFull ? 600 : 'inherit' }}
            >
              {labelInfo}
            </Typography>
          </Box>
        ) : (
          <Skeleton animation='wave' variant='text' width='12rem' height='3rem' />
        )
      }
    >
      {children}
    </TreeItemStyledRoot>
  )
}

DocumentTreeItem.propTypes = {
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
  nodeId: PropTypes.string.isRequired,
  children: PropTypes.node
}

export default DocumentTreeItem
