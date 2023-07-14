import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0D66FF',
      dark: '#1152C1',
      contrastText: '#000000'
    },

    secondary: {
      //sidebar
      main: '#D0DBEE59',
      contrastText: '#A5AAB5'
    },
    warning: {
      main: '#FFA015'
    },
    success: {
      main: '#34A853'
    },
    error: {
      main: '#EA4335'
    }
  }
})
