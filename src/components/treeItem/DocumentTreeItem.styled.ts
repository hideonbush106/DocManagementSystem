import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem'
import { styled } from '@mui/material/styles'

export const TreeItemStyledRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.primary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.primary,
    paddingRight: theme.spacing(1),
    fontWeight: 'inherit',
    '&.Mui-expanded': {
      fontWeight: 'inherit'
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)'
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit'
    }
  }
}))
