import React from 'react'
import { SpeedDial, SpeedDialAction, SpeedDialIcon, SxProps, ThemeProvider, createTheme } from '@mui/material'

type SpeedDialAction = {
  name: string
  icon: React.ReactNode
  action: () => void
  style?: SxProps
}

type Props = {
  actions: SpeedDialAction[]
  open: boolean
  onClick: () => void
}

const SpeedDialCustom = (props: Props) => {
  const { actions, open, onClick } = props
  const theme = createTheme({
    components: {
      MuiSpeedDial: {
        styleOverrides: {
          fab: {
            marginLeft: 'auto'
          }
        }
      },
      MuiSpeedDialAction: {
        styleOverrides: {
          fab: {
            marginLeft: 'auto',
            width: 'fit-content',
            textTransform: 'inherit',
            padding: '25px 15px',
            borderRadius: '4px',
            font: 'inherit',
            '& > span': {
              marginRight: '10px'
            }
          }
        }
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <SpeedDial
        ariaLabel='SpeedDial controlled open'
        sx={{ position: 'absolute', bottom: 30, right: 30 }}
        icon={<SpeedDialIcon />}
        onClick={onClick}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={
              <>
                <span>{action.name}</span>
                {action.icon}
              </>
            }
            onClick={action.action}
            sx={action.style}
          />
        ))}
      </SpeedDial>
    </ThemeProvider>
  )
}

export default SpeedDialCustom
