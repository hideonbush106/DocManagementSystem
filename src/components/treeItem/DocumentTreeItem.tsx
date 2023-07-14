import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SvgIconComponent } from '@mui/icons-material'
import useData from '~/hooks/useData'
import { Box, Skeleton, Typography } from '@mui/material'
import { TreeItemStyledRoot } from './DocumentTreeItem.styled'
import { TreeItemProps, useTreeItem, TreeItemContentProps } from '@mui/lab/TreeItem'
import clsx from 'clsx'

const CustomContent = React.forwardRef(function CustomContent(props: TreeItemContentProps, ref) {
  const { classes, className, label, nodeId, icon: iconProp, expansionIcon, displayIcon } = props

  const { disabled, expanded, selected, focused, handleExpansion, handleSelection, preventSelection } =
    useTreeItem(nodeId)

  const icon = iconProp || expansionIcon || displayIcon

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event)
  }

  const handleExpansionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event)
  }

  const handleSelectionClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleSelection(event)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <Typography onClick={handleSelectionClick} component='div' className={classes.label}>
        {label}
      </Typography>
    </div>
  )
})

const CustomTreeItem = (props: TreeItemProps) => {
  return <TreeItemStyledRoot ContentComponent={CustomContent} {...props} />
}

interface Props extends TreeItemProps {
  labelInfo?: string
  labelText: string
  labelIcon: SvgIconComponent
  isFull?: boolean
  href?: string
}

const DocumentTreeItem = (props: Props) => {
  const { labelIcon: LabelIcon, labelInfo, labelText, isFull, href } = props
  const { loading } = useData()
  const navigate = useNavigate()

  const handleDoubleClick = () => {
    if (href) navigate(href)
  }

  return (
    <CustomTreeItem
      {...props}
      label={
        !loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }} onDoubleClick={handleDoubleClick}>
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
    />
  )
}

export default DocumentTreeItem
